// another user signs in on this browser: their predecessor's records must not reach them
import { originalConsole } from '../collectors/console';
import { ENABLED_TTL_MS, enabledUntil, STORAGE } from '../config';
import { readOwner, writeOwner } from './ownership';
import { wipeDebugRecorder } from './recording';
import { PREFIX, state } from './state';
import { clearStoreInPlace, readItem, safeLocalStorage } from './storage-flags';

// records belong to one user: another user signing in on this browser must not get them
export async function onSessionUserChanged(userId: string): Promise<void> {
	const owner = readOwner();
	const enabledBy = readItem(STORAGE.enabledBy);
	// nobody signed in while it recorded, but another user switched it on: still theirs
	if (!owner && enabledBy && enabledBy !== userId) {
		await wipeDebugRecorder();
		originalConsole.info(
			PREFIX,
			"another user signed in: the previous user's debug records were deleted",
		);
		return;
	}
	if (owner && owner.id !== userId) {
		const until = enabledUntil();
		// switched on by the new user, or before sign-in after the previous user was last seen: keep recording
		const armedForNewUser =
			until !== null &&
			(enabledBy === userId ||
				(!enabledBy && until - ENABLED_TTL_MS > owner.at));
		if (armedForNewUser) {
			try {
				if (state.sink) await state.sink.clear();
				else await clearStoreInPlace();
				writeOwner(userId);
			} catch {
				// a half-reset store must not stay readable by the new user
				await wipeDebugRecorder();
			}
		} else {
			await wipeDebugRecorder();
		}
		originalConsole.info(
			PREFIX,
			"another user signed in: the previous user's debug records were deleted",
		);
		return;
	}
	let hasData = false;
	safeLocalStorage((s) => {
		hasData = s.getItem(STORAGE.hasData) !== null;
	});
	if (state.sink || hasData) writeOwner(userId);
}
