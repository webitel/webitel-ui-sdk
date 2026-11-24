// report.html behaviour: filters, page loads, problems, row details; renders through textContent only
export const SCRIPT = `
(() => {
	const data = JSON.parse(document.getElementById('report-data').textContent);
	let events = null;
	const eventAt = (i) => {
		if (!events) events = JSON.parse(document.getElementById('event-data').textContent);
		return events[i];
	};
	const el = (tag, text, cls) => {
		const node = document.createElement(tag);
		if (text !== undefined) node.textContent = String(text);
		if (cls) node.className = cls;
		return node;
	};

	const m = data.meta;
	const metaRows = [
		['Exported from', m.app], ['Recorder', m.recorder], ['Recorded', m.span], ['Time zone', m.timezone],
		['Events', m.records], ['Origin', m.origin], ['Browser', m.userAgent], ['Exported', m.generatedAt],
	];
	const dl = document.getElementById('meta');
	for (const [k, v] of metaRows) { dl.append(el('dt', k), el('dd', v)); }

	const sessionBody = document.querySelector('#sessions tbody');
	const sessionSelect = document.getElementById('session');
	const appSelect = document.getElementById('app');
	for (const app of [...new Set(data.rows.map((r) => r[7]))].sort()) {
		appSelect.append(el('option', app));
		appSelect.lastChild.value = app;
	}
	for (const s of data.sessions) {
		const tr = el('tr');
		tr.append(el('td', s.no), el('td', s.app), el('td', s.start), el('td', s.end), el('td', s.events), el('td', s.problems || ''));
		sessionBody.append(tr);
		sessionSelect.append(el('option', 'Page load ' + s.no + ' · ' + s.app + ' · ' + s.start));
		sessionSelect.lastChild.value = String(s.no);
	}

	const problems = data.rows.filter((r) => r[5]);
	document.getElementById('problem-count').textContent = problems.length ? '(' + problems.length + ')' : '';
	const problemList = document.getElementById('problems');
	if (!problems.length) problemList.replaceWith(el('p', 'None found.', 'hint'));
	for (const r of problems.slice(0, 200)) {
		const li = el('li');
		const a = el('a', r[0] + '  #' + r[1] + ' ' + r[7] + '  ' + r[2] + '  ' + r[4]);
		a.href = '#';
		a.addEventListener('click', (e) => { e.preventDefault(); reveal(r[6]); });
		li.append(a);
		problemList.append(li);
	}

	const counts = {};
	for (const r of data.rows) counts[r[2]] = (counts[r[2]] || 0) + 1;
	const channelBox = document.getElementById('channels');
	const enabled = new Set(Object.keys(counts));
	for (const ch of Object.keys(counts).sort()) {
		const label = el('label');
		const box = el('input');
		box.type = 'checkbox';
		box.checked = true;
		box.addEventListener('change', () => { box.checked ? enabled.add(ch) : enabled.delete(ch); render(); });
		label.append(box, el('span', ch + ' (' + counts[ch] + ')'));
		channelBox.append(label);
	}

	const PAGE = 1000;
	let limit = PAGE;
	let pinned = null;
	const search = document.getElementById('search');
	const onlyProblems = document.getElementById('only-problems');
	const body = document.querySelector('#timeline tbody');
	const more = document.getElementById('more');
	const shown = document.getElementById('shown');

	const matches = () => {
		const q = search.value.trim().toLowerCase();
		const session = sessionSelect.value;
		const app = appSelect.value;
		return data.rows.filter((r) =>
			r[6] === pinned || (
				enabled.has(r[2]) &&
				(!app || r[7] === app) &&
				(!onlyProblems.checked || r[5]) &&
				(!session || String(r[1]) === session) &&
				(!q || (r[4] + ' ' + r[3] + ' ' + r[2]).toLowerCase().includes(q))
			));
	};

	const toggleDetail = (tr, index) => {
		const next = tr.nextElementSibling;
		if (next && next.classList.contains('detail')) { next.remove(); return; }
		const detail = el('tr', undefined, 'detail');
		const td = el('td');
		td.colSpan = 4;
		const event = eventAt(index);
		const text = event && event.data && typeof event.data.text === 'string' && event.data.text.includes('\\n') ? event.data.text : null;
		const shown = text ? { ...event, data: { ...event.data, text: '(message below)' } } : event;
		td.append(el('pre', JSON.stringify(shown, null, 2)));
		if (text) td.append(el('pre', text, 'raw'));
		detail.append(td);
		tr.after(detail);
	};

	function render() {
		const list = matches();
		body.replaceChildren();
		let session = 0;
		for (const r of list.slice(0, limit)) {
			const tr = el('tr', undefined, 'row' + (r[5] ? ' problem' : '') + (r[1] !== session && session ? ' session-start' : ''));
			session = r[1];
			tr.dataset.index = r[6];
			const chCell = el('td');
			chCell.append(el('span', r[2], 'ch'));
			tr.append(el('td', r[0]), el('td', '#' + r[1] + ' ' + r[7], 'load'), chCell, el('td', r[4]));
			tr.title = r[3] + ' · page load ' + r[1];
			tr.addEventListener('click', () => toggleDetail(tr, r[6]));
			body.append(tr);
		}
		shown.textContent = 'Showing ' + Math.min(limit, list.length) + ' of ' + list.length + ' matching events (' + data.rows.length + ' total).';
		more.hidden = list.length <= limit;
	}

	function reveal(index) {
		pinned = index;
		const list = matches();
		const pos = list.findIndex((r) => r[6] === index);
		if (pos >= limit) limit = Math.ceil((pos + 1) / PAGE) * PAGE;
		render();
		const tr = body.querySelector('tr[data-index="' + index + '"]');
		if (!tr) return;
		tr.scrollIntoView({ block: 'center' });
		if (!tr.nextElementSibling || !tr.nextElementSibling.classList.contains('detail')) toggleDetail(tr, index);
	}

	let timer = null;
	search.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(() => { limit = PAGE; pinned = null; render(); }, 150); });
	for (const control of [sessionSelect, appSelect, onlyProblems]) control.addEventListener('change', () => { limit = PAGE; pinned = null; render(); });
	more.addEventListener('click', () => { limit += PAGE; render(); });
	render();
})();
`;
