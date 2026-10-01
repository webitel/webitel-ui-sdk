# ui-chats

Presentational chat UI shared by the Webitel frontend apps. Draws the inside of
a chat — what was said and where the operator types — while the host app owns
the surrounding card (top bar, tabs, side panels).

## Language

**Thread**:
One conversation between a client and the participants serving it, as the chat
backend models it.
_Avoid_: Chat session, conversation, dialog

**Client**:
The external person the thread serves, writing from a messenger channel.
_Avoid_: Customer, contact, user

**Contact-centre side**:
Every thread participant speaking for the contact centre — operators and bots —
as opposed to the client.
_Avoid_: Agent side, our side, internal

**Self**:
The operator using the UI right now — one specific participant of the
contact-centre side.
_Avoid_: Me, current user, agent

**Message history**:
The scrollable record of a thread — every message and system notice, across the
current and earlier sessions, oldest at the top.
_Avoid_: Chat log, transcript, messages container

**Composer**:
The area under the message history where the operator writes and sends a
message, with its attach / emoji / quick-reply actions.
_Avoid_: Footer, input, chat footer

**System notice**:
A backend-generated entry in the message history recording a thread event —
started, a participant joined / left, transferred, ended — rather than
something a participant wrote.
_Avoid_: System message, service message, event

**Read horizon**:
The highest message sequence number a given participant has received
(delivered) or seen (read) in a thread.
_Avoid_: Last read, read receipt
