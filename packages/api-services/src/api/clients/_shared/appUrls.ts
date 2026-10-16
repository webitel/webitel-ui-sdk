/**
 * [Claude] Where the app's services live, and its access token. The app passes
 * them: the urls and the token are its concern, not this package's. Used for
 * `src`/`href` targets that can't send the auth header, and for services
 * outside the api base url, like the chat service.
 */
export type AppUrls = {
	apiUrl: string;
	chatUrl: string;
	accessToken: string;
};
