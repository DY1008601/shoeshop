import { initDb, queryOne, queryAll, execRun, saveDb } from './db';
import bcrypt from 'bcryptjs';

const SESSION_COOKIE = 'admin_session';
const SESSION_MAX_AGE = 60 * 60 * 24;

export function verifyPassword(password: string, hash: string): boolean {
	return bcrypt.compareSync(password, hash);
}

export function hashPassword(password: string): string {
	return bcrypt.hashSync(password, 10);
}

export async function createSession(username: string): Promise<string> {
	const token = crypto.randomUUID();
	const db = await initDb();
	execRun(db, "DELETE FROM settings WHERE key = ?", [`session_${username}`]);
	execRun(db, "INSERT INTO settings (key, value) VALUES (?, ?)", [
		`session_${username}`,
		JSON.stringify({ token, created_at: Date.now() })
	]);
	saveDb(db);
	return token;
}

export async function validateSession(token: string): Promise<{ username: string } | null> {
	const db = await initDb();
	const rows = queryAll(db, "SELECT key, value FROM settings WHERE key LIKE 'session_%'");
	for (const row of rows) {
		const data = JSON.parse(row.value) as { token: string; created_at: number };
		if (data.token === token) {
			if (Date.now() - data.created_at > SESSION_MAX_AGE * 1000) {
				execRun(db, "DELETE FROM settings WHERE key = ?", [row.key]);
				saveDb(db);
				return null;
			}
			return { username: (row.key as string).replace('session_', '') };
		}
	}
	return null;
}

export async function clearSession(username: string) {
	const db = await initDb();
	execRun(db, "DELETE FROM settings WHERE key = ?", [`session_${username}`]);
	saveDb(db);
}

export { SESSION_COOKIE };
