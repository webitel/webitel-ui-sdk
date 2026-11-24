// keys, parameters and text shapes that mark secrets and personal data
export const REDACTED = '[REDACTED]';

/** keys whose values are secrets: dropped entirely */
export const SECRET_KEY_RE =
	/pass(word|wd)?$|^pwd$|secret|token|authori[sz]ation|credential|api[-_]?key|cookie|^ha1$|^x-webitel-access$|^access$/i;

/** keys whose values are personal data: masked, last chars kept for correlation */

export const PII_KEY_RE =
	/(^|_)(number|phone|destination|email|display|msisdn|display_?name|full_?name|first_?name|last_?name|caller_?name)$|^(phone|email)/i;
// camelCase variants (`fromNumber`), case-sensitive on purpose

export const PII_CAMEL_KEY_RE =
	/[a-z](Number|Phone|Email|Destination|DisplayName|FullName|FirstName|LastName)$/;
// `name` is PII only inside a party object (`from.name`), not for queues or agents

export const PARTY_KEY_RE =
	/^(from|to|members?|contacts?|customers?|clients?|callers?|callees?|participants?|peers?|parties|party)$/i;

export const PARTY_NAME_KEY_RE = /^name$/i;

// arbitrary data attached to a call or form: keep the keys, drop the values
export const FREE_DATA_KEY_RE = /^(variables|vars|custom_?data|form_?data)$/i;

/** chat message bodies: replaced by their length */
export const CONTENT_KEY_RE = /^text$/i;

/** query params that are secrets although the key rule does not match them */
export const SECRET_PARAM_RE = /^(key|auth|sig|signature)$/i;

// fail-closed: a value/token whose decoded form still holds `<secret>=` is replaced whole
export const PARAM_RE = /([?&#;])([^=?&#;\s"'<>]+)=([^&#;\s"'<>]*)/g;

// lookbehind keeps the delimiter, so `a=token=x` still yields `token`
export const PAIR_NAME_RE =
	/(?<=^|[?&#;,\s{(=/:])([^=?&#;,\s"'<>{}()/:]+)=(?!\[REDACTED\])/g;

export const TEXT_TOKEN_RE = /[^\s"'<>]+/g;

// prose `name: value`: only the separator is searched, the name is read backwards (linear)
export const PROSE_SEPARATOR_RE = /[:=]/g;

export const MAX_GAP_CHARS = 64;

export const NAME_CHAR_RE = /[\w.-]/;

export const MAX_NAME_CHARS = 64;

export const VALUE_STOP_RE = /[\s,;"'&<>]/;

export const JSON_STRING_PAIR_RE =
	/("((?:[^"\\]|\\.)*)"\s*:\s*)"(?:[^"\\]|\\.)*"/g;

export const MAX_DECODE_PASSES = 5;

export const SIP_AUTH_HEADER_RE = /^((?:Proxy-)?Authorization)[ \t]*:.*$/gim;

// one-token credentials after an HTTP auth scheme, wherever they appear
// no `\b`: in an escaped string `\nBearer` has a letter right before the scheme
export const AUTH_SCHEME_RE =
	/(Basic|Bearer|Negotiate|NTLM)(\s+)[A-Za-z0-9\-._~+/]+=*/gi;
// Digest carries `response=`, `nonce=` etc. as a list: the rest of the line goes
export const DIGEST_RE = /(Digest)\s+[^\r\n]*/gi;
// header names whose whole value is a credential, whatever its scheme
export const AUTH_HEADER_NAME_RE = /^(proxy-)?authori[sz]ation$/i;

export const isSecretKey = (key: string) => SECRET_KEY_RE.test(key);

export const isSecretName = (name: string) =>
	isSecretKey(name) || SECRET_PARAM_RE.test(name);

/** decodes each %XX on its own: a malformed escape elsewhere cannot block decoding */

// not preceded by a word char or `sip:`, so SIP URIs keep their user part
export const EMAIL_RE =
	/(?<![\w.%+-]|sips?:)[A-Za-z0-9._%+-]+@([A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,})/g;
// 9+ digits: external numbers; internal extensions (3-6 digits) stay readable

export const PHONE_RE = /(?<![\w.])\+?\d{9,15}(?![\w.])/g;

// only what really ends an authority; quotes and `\` do not (a JSON-escaped password holds `\\`), so nothing cuts the scan short
export const AUTHORITY_END_RE = /[/?#\s]/;

export const SIP_IDENTITY_HEADER_RE =
	/^(from|to|contact|p-asserted-identity|p-preferred-identity|remote-party-id|referred-by|refer-to|diversion|f|t|m)([ \t]*:[ \t]*)(.*)$/gim;

export const SIP_CONTENT_TYPE_RE =
	/^(?:content-type|c)[ \t]*:[ \t]*([^\r\n;]+)/im;

// ICE password and SDES SRTP keys are credentials; the rest of the SDP (codecs, candidates) is what support needs
export const SDP_SECRET_RE =
	/^(a=ice-pwd:|a=crypto:[^\r\n]*?inline:)[^\s|]+/gim;
