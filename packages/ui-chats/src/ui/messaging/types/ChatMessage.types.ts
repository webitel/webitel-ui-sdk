export interface ChatMessageType {
  id: number;
  date: number;
  file?: ChatMessageFile;
  member: ChatMember;
  peer?: ChatMember;
  chat?: ChatMessageChatInfo;
  createdAt: number;
  channelId?: string;
  updatedAt?: number;
  contact?: null | ContactInfo;
  text?: string;
}

export type ContactInfo = {
  id: string;
  name?: string;
};

export type ChatMessageFile = {
  id?: string;
  name?: string;
  size?: string;
  mime?: string;
  url?: string;
  streamUrl?: string;
};

export type ChatMember = {
  id: number;
  name: string;
  type: string;
  user_id?: number;
  external_id?: string;
  via?: ChatVia;
  self?: boolean;
};

export type ChatMessageChatInfo = {
  id: string;
  via: ChatVia;
};

export type ChatVia = {
  id: number;
  name: string;
  type: string;
  messenger?: string;
};
