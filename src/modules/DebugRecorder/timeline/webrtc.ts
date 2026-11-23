// RTCPeerConnection states, ICE errors and getStats() samples as one timeline line
import {
	bad,
	compact,
	type Data,
	errorText,
	type Line,
	ok,
	type Stat,
} from './format';

export function findStat(
	stats: Stat[],
	type: string,
	kind?: string,
): Stat | undefined {
	return stats.find((s) => s.type === type && (!kind || s.kind === kind));
}

export function candidate(stat?: Stat): string {
	if (!stat) return '';
	const where = stat.address ? ` ${stat.address}:${stat.port}` : '';
	return `${stat.candidateType} ${stat.protocol}${where}`;
}

export function rtcStats(tag: string, stats: Stat[]): Line {
	const parts: string[] = [];
	const remote = findStat(stats, 'remote-inbound-rtp', 'audio');
	const pair = findStat(stats, 'candidate-pair');
	const rtt = Number(remote?.roundTripTime ?? pair?.currentRoundTripTime);
	if (rtt >= 0) parts.push(`rtt ${Math.round(rtt * 1_000)} ms`);

	const inbound = findStat(stats, 'inbound-rtp', 'audio');
	let lossRatio = 0;
	if (inbound) {
		const lost = Number(inbound.packetsLost ?? 0);
		const received = Number(inbound.packetsReceived ?? 0);
		lossRatio = lost + received > 0 ? lost / (lost + received) : 0;
		parts.push(`jitter ${Math.round(Number(inbound.jitter ?? 0) * 1_000)} ms`);
		parts.push(`lost ${lost}/${lost + received}`);
	}
	const outbound = findStat(stats, 'outbound-rtp', 'audio');
	if (outbound) parts.push(`sent ${outbound.packetsSent ?? 0} pkts`);

	const codecId = (inbound ?? outbound)?.codecId;
	const codec = stats.find((s) => s.id === codecId);
	if (codec?.mimeType)
		parts.push(String(codec.mimeType).replace(/^audio\//, ''));
	if (pair) {
		const local = stats.find((s) => s.id === pair.localCandidateId);
		const remoteCandidate = stats.find((s) => s.id === pair.remoteCandidateId);
		parts.push(`via ${candidate(local)} ⇄ ${candidate(remoteCandidate)}`);
	}
	const text = `${tag} stats · ${parts.join(' · ') || 'no audio yet'}`;
	return lossRatio > 0.05 || rtt > 0.4 ? bad(text) : ok(text);
}

export function webrtc(type: string, d: Data): Line {
	const tag = `pc#${d.id}`;
	switch (type) {
		case 'pc:create': {
			const config = (d.config ?? {}) as Data;
			const servers = (config.iceServers as unknown[] | undefined)?.length ?? 0;
			return ok(
				`${tag} created · ${servers} ICE server(s)${config.iceTransportPolicy ? ` · ${config.iceTransportPolicy}` : ''}`,
			);
		}
		case 'pc:stats':
			return rtcStats(tag, (d.stats as Stat[] | undefined) ?? []);
		case 'pc:stats-error':
			return bad(`${tag} getStats failed · ${errorText(d.error)}`);
		case 'pc:icecandidateerror':
			return bad(
				`${tag} ICE candidate error ${d.errorCode} ${d.errorText ?? ''} · ${d.url ?? ''} ${d.address ?? ''}:${d.port ?? ''}`,
			);
		case 'pc:track':
			return ok(`${tag} remote ${d.kind} track`);
		case 'pc:closed':
			return ok(`${tag} closed${d.collected ? ' (garbage-collected)' : ''}`);
	}
	if (d.state !== undefined) {
		const what = type
			.replace(/^pc:/, '')
			.replace(/statechange$/, '')
			.replace('iceconnection', 'ice')
			.replace('icegathering', 'ice gathering');
		const text = `${tag} ${what} → ${d.state}`;
		return d.state === 'failed' || d.state === 'disconnected'
			? bad(text)
			: ok(text);
	}
	return ok(`${tag} ${type} ${compact(d)}`);
}
