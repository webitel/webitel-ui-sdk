// README.txt of the archive: what each file is and what was removed
export const README = `Webitel debug archive

report.html     start here: open in a browser; summary, likely problems, filterable
                timeline, click a row for its full data (works offline)
timeline.txt    the same timeline as plain text, likely problems listed on top
sip.txt         SIP signalling as plain text, full messages
events.ndjson   every recorded event with all its data, one JSON object per line,
                oldest first; for tools (jq, grep) and for details behind a timeline line
stats.json      volume per channel and per event type, per page-load session
manifest.json   when/where the archive was made

All webitel apps of the site write into one store, so this archive covers every
app the user went through (e.g. auth -> admin -> flow diagram).

Event fields: t (epoch ms), sid (page-load session; a new one after every F5 and
in every tab), app (the webitel app of that page load),
ch (console | error | http | ws | sip | webrtc | device | env | lifecycle | perf | recorder),
type, data.

Passwords, tokens, SIP Authorization headers are removed before anything is
written. Phone numbers (9+ digits) and e-mails are masked; chat texts are
replaced by their length.
`;
