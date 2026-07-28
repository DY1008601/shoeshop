import Database from 'better-sqlite3';
import { building } from '$app/environment';
import fs from 'node:fs';
import path from 'node:path';

let _db: Database.Database | null = null;

function getDbPath(): string {
	const dataDir = path.resolve('data');
	if (!building && !fs.existsSync(dataDir)) {
		fs.mkdirSync(dataDir, { recursive: true });
	}
	return path.join(dataDir, 'shoeshop.db');
}

export function getDb(): Database.Database {
	if (!_db) {
		const dbPath = getDbPath();
		_db = new Database(dbPath);
		_db.pragma('journal_mode = WAL');
		_db.pragma('foreign_keys = ON');
		runMigrations(_db);
	}
	return _db;
}

function runMigrations(db: Database.Database) {
	db.exec(`
		CREATE TABLE IF NOT EXISTS admins (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			username TEXT NOT NULL UNIQUE,
			password_hash TEXT NOT NULL
		);

		CREATE TABLE IF NOT EXISTS products (
			id TEXT PRIMARY KEY,
			title TEXT NOT NULL,
			handle TEXT NOT NULL UNIQUE,
			description TEXT NOT NULL DEFAULT '',
			description_html TEXT NOT NULL DEFAULT '',
			price REAL NOT NULL,
			compare_at_price REAL,
			stock INTEGER NOT NULL DEFAULT 0,
			collection TEXT NOT NULL DEFAULT 'running',
			status TEXT NOT NULL DEFAULT 'active',
			created_at INTEGER NOT NULL,
			updated_at INTEGER NOT NULL
		);

		CREATE TABLE IF NOT EXISTS product_images (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
			url TEXT NOT NULL,
			alt_text TEXT NOT NULL DEFAULT '',
			position INTEGER NOT NULL DEFAULT 0
		);

		CREATE TABLE IF NOT EXISTS product_sizes (
			product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
			size TEXT NOT NULL,
			PRIMARY KEY (product_id, size)
		);

		CREATE TABLE IF NOT EXISTS orders (
			id TEXT PRIMARY KEY,
			customer_name TEXT NOT NULL,
			customer_email TEXT NOT NULL,
			address TEXT NOT NULL DEFAULT '{}',
			total REAL NOT NULL,
			status TEXT NOT NULL DEFAULT 'pending',
			created_at INTEGER NOT NULL
		);

		CREATE TABLE IF NOT EXISTS order_items (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
			product_id TEXT NOT NULL,
			product_title TEXT NOT NULL,
			size TEXT NOT NULL,
			quantity INTEGER NOT NULL,
			price REAL NOT NULL
		);

		CREATE TABLE IF NOT EXISTS customers (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			email TEXT NOT NULL UNIQUE,
			phone TEXT,
			created_at INTEGER NOT NULL
		);

		CREATE TABLE IF NOT EXISTS settings (
			key TEXT PRIMARY KEY,
			value TEXT NOT NULL
		);
	`);

	seedDefaultData(db);
}

function seedDefaultData(db: Database.Database) {
	const existingAdmin = db.prepare('SELECT id FROM admins LIMIT 1').get() as { id: number } | undefined;
	if (!existingAdmin) {
		const bcrypt = require('bcryptjs') as typeof import('bcryptjs');
		const hash = bcrypt.hashSync('admin123', 10);
		db.prepare('INSERT INTO admins (username, password_hash) VALUES (?, ?)').run('admin', hash);
	}

	const existingSettings = db.prepare('SELECT key FROM settings WHERE key = ?').get('store_name') as { key: string } | undefined;
	if (!existingSettings) {
		db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run('store_name', 'ShoeShop');
		db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run('store_description', 'Premium running shoes');
	}
}
