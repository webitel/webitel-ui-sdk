export const useTableColumnDrag = (table, reorderableColumns) => {
	let animationFrameId = null;
	let containerEl = null;
	let currentMouseX = null;
	let isDragging = false;

	const autoScroll = () => {
		if (!containerEl || !isDragging || currentMouseX === null) return;

		const rect = containerEl.getBoundingClientRect();
		const scrollZone = 150; // pixels from edge to trigger scroll
		const minScrollSpeed = 1; // minimum scroll speed
		const maxScrollSpeed = 25; // maximum scroll speed

		const distanceFromLeft = currentMouseX - rect.left;
		const distanceFromRight = rect.right - currentMouseX;

		// Easing function for smooth acceleration (ease-in-out cubic)
		const easeInOutCubic = (t) => {
			return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
		};

		// Determine scroll direction and distance
		let scrollDirection = 0; // -1 for left, 1 for right, 0 for no scroll
		let distance = 0;

		if (distanceFromLeft < scrollZone && containerEl.scrollLeft > 0) {
			scrollDirection = -1;
			distance = distanceFromLeft;
		} else if (distanceFromRight < scrollZone) {
			scrollDirection = 1;
			distance = distanceFromRight;
		}

		// Apply scroll if needed
		if (scrollDirection !== 0) {
			const proximity = 1 - distance / scrollZone; // 0 to 1, where 1 is at the edge
			const easedProximity = easeInOutCubic(proximity);
			const scrollSpeed =
				minScrollSpeed + (maxScrollSpeed - minScrollSpeed) * easedProximity;
			containerEl.scrollLeft += scrollSpeed * scrollDirection;

			animationFrameId = requestAnimationFrame(autoScroll);
		} else {
			animationFrameId = null;
		}
	};

	const tableDragHandler = (event) => {
		event.dataTransfer.effectAllowed = 'move';
		const copyEl = event.target.cloneNode(true);
		copyEl.style.position = 'absolute';
		copyEl.style.top = '-9999px';
		copyEl.style.background = 'var(--p-datatable-header-cell-drag-background)';
		copyEl.style.width = event.target.offsetWidth + 'px';
		document.body.appendChild(copyEl);
		event.dataTransfer.setDragImage(copyEl, event.offsetX, event.offsetY);
		// Clean up after drag starts
		setTimeout(() => {
			document.body.removeChild(copyEl);
		}, 0);

		// Initialize dragging state
		isDragging = true;
		if (!containerEl) {
			containerEl = table.value?.$el?.querySelector(
				'.p-datatable-table-container',
			);
		}
	};

	const tableDragOverHandler = (event) => {
		// Update mouse position
		currentMouseX = event.clientX;

		// Start animation loop if not already running
		if (!animationFrameId && isDragging) {
			animationFrameId = requestAnimationFrame(autoScroll);
		}
	};

	const tableDragEndHandler = () => {
		// Stop animation loop
		if (animationFrameId) {
			cancelAnimationFrame(animationFrameId);
			animationFrameId = null;
		}
		isDragging = false;
		currentMouseX = null;
		containerEl = null;
	};

	const addTableDragListener = () => {
		if (!reorderableColumns) return;
		const el = table.value?.$el;
		el?.addEventListener('dragstart', tableDragHandler);
		el?.addEventListener('dragover', tableDragOverHandler);
		el?.addEventListener('dragend', tableDragEndHandler);
	};

	const removeTableDragListener = () => {
		if (!reorderableColumns) return;
		const el = table.value?.$el;
		el?.removeEventListener('dragstart', tableDragHandler);
		el?.removeEventListener('dragover', tableDragOverHandler);
		el?.removeEventListener('dragend', tableDragEndHandler);
	};

	return {
		addTableDragListener,
		removeTableDragListener,
	};
};
