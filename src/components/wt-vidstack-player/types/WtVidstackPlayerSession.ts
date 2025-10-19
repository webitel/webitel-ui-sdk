export interface WWtVidstackPlayerSession {
  close: () => void;
  screenshot: () => void;
  stopRecord: () => void;
  startRecord: () => void;
  recordings: boolean;
}
