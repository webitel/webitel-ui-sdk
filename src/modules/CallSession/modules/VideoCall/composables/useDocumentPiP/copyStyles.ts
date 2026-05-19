export const copyStyles = (targetWindow: Window) => {
	for (const sheet of Array.from(document.styleSheets)) {
		try {
			const style = targetWindow.document.createElement('style');
			style.textContent = Array.from(sheet.cssRules)
				.map((r) => r.cssText)
				.join('');
			targetWindow.document.head.appendChild(style);
		} catch {
			if (sheet.href) {
				const link = targetWindow.document.createElement('link');
				link.rel = 'stylesheet';
				link.href = sheet.href;
				targetWindow.document.head.appendChild(link);
			}
		}
	}
};
