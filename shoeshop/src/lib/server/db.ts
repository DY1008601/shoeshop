import initSqlJs, { type Database } from 'sql.js';
import { building } from '$app/environment';
import fs from 'node:fs';
import path from 'node:path';

let _db: Database | null = null;
let _initPromise: Promise<Database> | null = null;
const dbPath = path.resolve('data/shoeshop.db');

function getDataDir(): string {
	const dataDir = path.resolve('data');
	if (!building && !fs.existsSync(dataDir)) {
		fs.mkdirSync(dataDir, { recursive: true });
	}
	return dataDir;
}

async function initDb(): Promise<Database> {
	if (_db) return _db;
	if (_initPromise) return _initPromise;

	_initPromise = (async () => {
		getDataDir();
		const SQL = await initSqlJs();
		let db: Database;

		if (fs.existsSync(dbPath)) {
			const buffer = fs.readFileSync(dbPath);
			db = new SQL.Database(buffer);
		} else {
			db = new SQL.Database();
		}

		runMigrations(db);
		seedDefaultData(db);
		saveDb(db);
		_db = db;
		return db;
	})();

	return _initPromise;
}

export function saveDb(db?: Database) {
	const d = db || _db;
	if (!d) return;
	getDataDir();
	const data = d.export();
	fs.writeFileSync(dbPath, Buffer.from(data));
}

function runMigrations(db: Database) {
	db.run('PRAGMA foreign_keys = ON');

	db.run(`
		CREATE TABLE IF NOT EXISTS admins (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			username TEXT NOT NULL UNIQUE,
			password_hash TEXT NOT NULL
		)
	`);
	db.run(`
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
		)
	`);
	db.run(`
		CREATE TABLE IF NOT EXISTS product_images (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			product_id TEXT NOT NULL,
			url TEXT NOT NULL,
			alt_text TEXT NOT NULL DEFAULT '',
			position INTEGER NOT NULL DEFAULT 0
		)
	`);
	db.run(`
		CREATE TABLE IF NOT EXISTS product_sizes (
			product_id TEXT NOT NULL,
			size TEXT NOT NULL,
			PRIMARY KEY (product_id, size)
		)
	`);
	db.run(`
		CREATE TABLE IF NOT EXISTS orders (
			id TEXT PRIMARY KEY,
			customer_name TEXT NOT NULL,
			customer_email TEXT NOT NULL,
			address TEXT NOT NULL DEFAULT '{}',
			total REAL NOT NULL,
			status TEXT NOT NULL DEFAULT 'pending',
			created_at INTEGER NOT NULL
		)
	`);
	db.run(`
		CREATE TABLE IF NOT EXISTS order_items (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			order_id TEXT NOT NULL,
			product_id TEXT NOT NULL,
			product_title TEXT NOT NULL,
			size TEXT NOT NULL,
			quantity INTEGER NOT NULL,
			price REAL NOT NULL
		)
	`);
	db.run(`
		CREATE TABLE IF NOT EXISTS customers (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			email TEXT NOT NULL UNIQUE,
			phone TEXT,
			created_at INTEGER NOT NULL
		)
	`);
	db.run(`
		CREATE TABLE IF NOT EXISTS settings (
			key TEXT PRIMARY KEY,
			value TEXT NOT NULL
		)
	`);
}

function seedDefaultData(db: Database) {
	const admin = db.exec('SELECT id FROM admins LIMIT 1');
	if (!admin.length) {
		const bcrypt = require('bcryptjs') as typeof import('bcryptjs');
		const hash = bcrypt.hashSync('admin123', 10);
		db.run('INSERT INTO admins (username, password_hash) VALUES (?, ?)', ['admin', hash]);
	}

	const storeName = db.exec("SELECT key FROM settings WHERE key = 'store_name'");
	if (!storeName.length) {
		db.run("INSERT INTO settings (key, value) VALUES (?, ?)", ['store_name', 'ShoeShop']);
		db.run("INSERT INTO settings (key, value) VALUES (?, ?)", ['store_description', 'Premium running shoes']);
	}
}

function queryOne(db: Database, sql: string, params?: any[]): any | undefined {
	const stmt = db.prepare(sql);
	if (params) stmt.bind(params);
	if (stmt.step()) {
		const row = stmt.getAsObject();
		stmt.free();
		return row;
	}
	stmt.free();
	return undefined;
}

function queryAll(db: Database, sql: string, params?: any[]): any[] {
	const stmt = db.prepare(sql);
	if (params) stmt.bind(params);
	const rows: any[] = [];
	while (stmt.step()) {
		rows.push(stmt.getAsObject());
	}
	stmt.free();
	return rows;
}

function execRun(db: Database, sql: string, params?: any[]) {
	db.run(sql, params);
}

export type { Database };
export { initDb, queryOne, queryAll, execRun };
