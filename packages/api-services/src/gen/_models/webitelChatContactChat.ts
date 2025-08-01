/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */

import type { WebitelChatChatPeer } from './webitelChatChatPeer';
import type { WebitelChatContactChatContext } from './webitelChatContactChatContext';
import type { WebitelChatContactChatInvite } from './webitelChatContactChatInvite';

/**
 * The Chat info.
Alias: participant, subscriber, member, peer, leg.
 */
export interface WebitelChatContactChat {
	/** Context. Variables. */
	context?: WebitelChatContactChatContext;
	/** [D]omain[C]omponent primary ID. */
	dc?: string;
	/** Unique identifier for this chat.
[FROM] Member / Channel ID.

// [TO] Group. Conversation ID.
 string chat_id = 2; */
	id?: string;
	/** OPTIONAL. Invite[d] BY member info. */
	invite?: WebitelChatContactChatInvite;
	/** OPTIONAL. A non-zero value indicates that
the participant has joined the chat. */
	join?: string;
	left?: string;
	/** [FROM]: User identity. Seed. */
	peer?: WebitelChatChatPeer;
	/** [TO]: Chat title. */
	title?: string;
	/** [FROM] VIA text gateway profile. */
	via?: WebitelChatChatPeer;
}
