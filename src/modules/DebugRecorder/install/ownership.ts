// whose records these are: switching recording on, and who may read the archive
import { getSessionUser } from '../../../scripts/sessionHooks';
import { STORAGE, setEnabled } from '../config';
import { clearStoredData, safeLocalStorage } from './storage-flags';

export interface Owner {
	id: string;
	/** last time this user was seen signed in */
	at: number;
}

export function readOwner(): Owner | null {
	try {
		const raw = localStorage.getItem(STORAGE.owner);
		const owner = raw ? (JSON.parse(raw) as Owner) : null;
		return owner && typeof owner.id === 'string' ? owner : null;
	} catch {
		return null;
	}
}

export function writeOwner(id: string): void {
	safeLocalStorage((s) =>
		s.setItem(
			STORAGE.owner,
			JSON.stringify({
				id,
				at: Date.now(),
			} satisfies Owner),
		),
	);
}

/** switches recording on; a fresh start (it was off) begins with an empty store owned by the signed-in user */
export function arm(wasOn: boolean): void {
	if (!wasOn) clearStoredData();
	const user = getSessionUser();
	safeLocalStorage((s) => {
		setEnabled(true);
		if (!wasOn) s.setItem(STORAGE.enabledBy, user ?? '');
	});
	if (!wasOn && user !== null) writeOwner(user);
}

// records bound to a user are readable only by that user: not before sign-in, not by another one
export function canRead(): boolean {
	const owner = readOwner();
	return !owner || getSessionUser() === owner.id;
}
