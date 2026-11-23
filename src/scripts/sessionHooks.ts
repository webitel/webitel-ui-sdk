/**
 * Session lifecycle hooks: lets a module react to logout and to the signed-in
 * user without each app wiring it by hand. The Userinfo store runs them; any
 * module (e.g. DebugRecorder) subscribes.
 */

type BeforeLogoutHook = () => unknown;
type SessionUserHook = (userId: string) => unknown;

interface Registry {
	beforeLogout: Set<BeforeLogoutHook>;
	sessionUser: Set<SessionUserHook>;
	userId: string | null;
}

// kept on globalThis: an app can load this file twice (pre-bundled in one dep, as source in another)
const REGISTRY_KEY = Symbol.for('webitel.ui-sdk.session-hooks');
const holder = globalThis as Record<symbol, Registry | undefined>;
holder[REGISTRY_KEY] ??= {
	beforeLogout: new Set(),
	sessionUser: new Set(),
	userId: null,
};
const registry = holder[REGISTRY_KEY] as Registry;

/** runs before the logout request; awaited, but never longer than the logout timeout */
export function onBeforeLogout(hook: BeforeLogoutHook): () => void {
	registry.beforeLogout.add(hook);
	return () => registry.beforeLogout.delete(hook);
}

/** runs whenever the signed-in user is known, and at once if it already is */
export function onSessionUser(hook: SessionUserHook): () => void {
	registry.sessionUser.add(hook);
	if (registry.userId !== null)
		void safely(() => hook(registry.userId as string));
	return () => registry.sessionUser.delete(hook);
}

async function safely(run: () => unknown): Promise<void> {
	try {
		await run();
	} catch (err) {
		console.error('[session-hooks]', err);
	}
}

/** called by the Userinfo store; never rejects and is time-bounded, so a hook cannot block logout */
export async function runBeforeLogout(timeoutMs = 3_000): Promise<void> {
	const hooks = [
		...registry.beforeLogout,
	].map((hook) => safely(hook));
	await Promise.race([
		Promise.all(hooks),
		new Promise((resolve) => setTimeout(resolve, timeoutMs)),
	]);
}

/** called by the Userinfo store once the logout request succeeded; a failed logout keeps the user known */
export function clearSessionUser(): void {
	registry.userId = null;
}

/** the signed-in user, or null before the session is loaded and after logout */
export function getSessionUser(): string | null {
	return registry.userId;
}

/** called by the Userinfo store once the session is loaded */
export function notifySessionUser(userId: string | number): void {
	registry.userId = String(userId);
	for (const hook of registry.sessionUser) {
		void safely(() => hook(registry.userId as string));
	}
}
