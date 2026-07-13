/**
 * @summary Register device to receive PUSH notifications
 */
export declare const AccountRegisterDeviceBody: any;
export declare const AccountRegisterDeviceResponse: any;
/**
 * @summary Deletes a device by its token, stops sending PUSH-notifications to it.
 */
export declare const AccountUnregisterDeviceBody: any;
export declare const AccountUnregisterDeviceResponse: any;
/**
 * @summary Logout Device Request
 */
export declare const AccountLogoutResponse: any;
/**
 * @summary Inspect current Authorization credentials
 */
export declare const AccountInspectResponse: any;
/**
 * @summary // Authorization Request. Part of OAuth flow
rpc Auth(AuthRequest) returns (AuthResponse);
 */
export declare const AccountTokenBody: any;
export declare const AccountTokenResponse: any;
