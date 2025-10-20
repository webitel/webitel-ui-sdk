export interface WtVidstackPlayerSession {
  close: () => void;
  screenshot: () => void;
  stopRecord: () => void;
  startRecord: () => void;
  recordings: boolean;
}
