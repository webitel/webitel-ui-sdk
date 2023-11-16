import "./chunk-ROME4SDB.js";

// node_modules/webitel-sdk/esm2015/enums/cloud-providers/microsoft/microsoft-language.enum.js
var MicrosoftLanguage = Object.freeze([
  "af-ZA",
  "am-ET",
  "ar-AE",
  "ar-BH",
  "ar-DZ",
  "ar-EG",
  "ar-IL",
  "ar-IQ",
  "ar-JO",
  "ar-KW",
  "ar-LB",
  "ar-LY",
  "ar-MA",
  "ar-OM",
  "ar-PS",
  "ar-QA",
  "ar-SA",
  "ar-SY",
  "ar-TN",
  "ar-YE",
  "az-AZ",
  "bg-BG",
  "bn-BD",
  "bn-IN",
  "bs-BA",
  "ca-ES",
  "cs-CZ",
  "cy-GB",
  "da-DK",
  "de-AT",
  "de-CH",
  "de-DE",
  "el-GR",
  "en-AU",
  "en-CA",
  "en-GB",
  "en-GH",
  "en-HK",
  "en-IE",
  "en-IN",
  "en-KE",
  "en-NG",
  "en-NZ",
  "en-PH",
  "en-SG",
  "en-TZ",
  "en-US",
  "en-ZA",
  "es-AR",
  "es-BO",
  "es-CL",
  "es-CO",
  "es-CR",
  "es-CU",
  "es-DO",
  "es-EC",
  "es-ES",
  "es-GQ",
  "es-GT",
  "es-HN",
  "es-MX",
  "es-NI",
  "es-PA",
  "es-PE",
  "es-PR",
  "es-PY",
  "es-SV",
  "es-US",
  "es-UY",
  "es-VE",
  "et-EE",
  "eu-US",
  "fa-IR",
  "fi-FI",
  "fil-PH",
  "fr-BE",
  "fr-CA",
  "fr-CH",
  "fr-FR",
  "ga-IE",
  "gl-ES",
  "gu-IN",
  "he-IL",
  "hi-IN",
  "hr-HR",
  "hu-HU",
  "hy-AM",
  "id-ID",
  "is-IS",
  "it-CH",
  "it-IT",
  "ja-JP",
  "jv-ID",
  "ka-GE",
  "kk-KZ",
  "km-KH",
  "kn-IN",
  "ko-KR",
  "lo-LA",
  "lt-LT",
  "lv-LV",
  "mk-MK",
  "ml-IN",
  "mn-MN",
  "mr-IN",
  "ms-MY",
  "mt-MT",
  "my-MM",
  "nb-NO",
  "ne-NP",
  "nl-BE",
  "nl-NL",
  "pl-PL",
  "ps-AF",
  "pt-BR",
  "pt-PT",
  "ro-RO",
  "ru-RU",
  "si-LK",
  "sk-SK",
  "sl-SI",
  "so-SO",
  "sq-AL",
  "sr-RS",
  "su-ID",
  "sv-SE",
  "sw-KE",
  "sw-TZ",
  "ta-IN",
  "ta-LK",
  "ta-MY",
  "ta-SG",
  "te-IN",
  "th-TH",
  "tr-TR",
  "uk-UA",
  "ur-IN",
  "ur-PK",
  "uz-UZ",
  "vi-VN",
  "wuu-CN",
  "yue-CN",
  "zh-CN",
  "zh-CN-henan",
  "zh-CN-liaoning",
  "zh-CN-shaanxi",
  "zh-CN-shandong",
  "zh-CN-sichuan",
  "zh-HK",
  "zh-TW",
  "zu-ZA"
].reduce((obj, lang) => ({
  ...obj,
  [lang]: lang
}), {}));
var microsoft_language_enum_default = MicrosoftLanguage;

// node_modules/webitel-sdk/esm2015/enums/queues/member-stop-cause.enum.js
var MemberStopCause;
(function(MemberStopCause2) {
  MemberStopCause2["MISSED"] = "missed";
  MemberStopCause2["TIMEOUT"] = "timeout";
  MemberStopCause2["FAILED"] = "failed";
  MemberStopCause2["ABANDONED"] = "abandoned";
  MemberStopCause2["SUCCESS"] = "success";
  MemberStopCause2["CANCEL"] = "cancel";
  MemberStopCause2["EXPIRED"] = "expired";
})(MemberStopCause || (MemberStopCause = {}));
var member_stop_cause_enum_default = MemberStopCause;

// node_modules/webitel-sdk/esm2015/enums/queues/queue-type.enum.js
var QueueType;
(function(QueueType2) {
  QueueType2[QueueType2["OFFLINE_QUEUE"] = 0] = "OFFLINE_QUEUE";
  QueueType2[QueueType2["INBOUND_QUEUE"] = 1] = "INBOUND_QUEUE";
  QueueType2[QueueType2["OUTBOUND_IVR_QUEUE"] = 2] = "OUTBOUND_IVR_QUEUE";
  QueueType2[QueueType2["PREVIEW_DIALER"] = 3] = "PREVIEW_DIALER";
  QueueType2[QueueType2["PROGRESSIVE_DIALER"] = 4] = "PROGRESSIVE_DIALER";
  QueueType2[QueueType2["PREDICTIVE_DIALER"] = 5] = "PREDICTIVE_DIALER";
  QueueType2[QueueType2["CHAT_INBOUND_QUEUE"] = 6] = "CHAT_INBOUND_QUEUE";
  QueueType2[QueueType2["INBOUND_JOB_QUEUE"] = 7] = "INBOUND_JOB_QUEUE";
  QueueType2[QueueType2["OUTBOUND_JOB_QUEUE"] = 8] = "OUTBOUND_JOB_QUEUE";
})(QueueType || (QueueType = {}));
var queue_type_enum_default = QueueType;
export {
  member_stop_cause_enum_default as MemberStopCause,
  microsoft_language_enum_default as MicrosoftLanguage,
  queue_type_enum_default as QueueType
};
//# sourceMappingURL=webitel-sdk_esm2015_enums.js.map
