import { getDb } from './db';
import bcrypt from 'bcryptjs';

const SESSION_COOKIE = 'admin_session';
const SESSION_MAX_AGE = 60 * 60 * 24; // 24 hours

export function verifyPassword(password: string, hash: string): boolean {
	return bcrypt.compareSync(password, hash);
}

export function hashPassword(password: string): string {
	return bcrypt.hashSync(password, 10);
}

export function createSession(username: string): string {
	const token = crypto.randomUUID();
	const db = getDb();
	db.prepare('DELETE FROM settings WHERE key = ?').run(`session_${username}`);
	db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run(
		`session_${username}`,
		JSON.stringify({ token, created_at: Date.now() })
	);
	return token;
}

export function validateSession(token: string): { username: string } | null {
	const db = getDb();
	const rows = db.prepare("SELECT key, value FROM settings WHERE key LIKE 'session_%'").all() as { key: string; value: string }[];
	for (const row of rows) {
		const data = JSON.parse(row.value) as { token: string; created_at: number };
		if (data.token === token) {
			if (Date.now() - data.created_at > SESSION_MAX_AGE * 1000) {
				db.prepare('DELETE FROM settings WHERE key = ?').run(row.key);
				return null;
			}
			return { username: row.key.replace('session_', '') };
		}
	}
	return null;
}

export function clearSession(username: string) {
	const db = getDb();
	db.prepare('DELETE FROM settings WHERE key = ?').run(`session_${username}`);
}

export { SESSION_COOKIE };
