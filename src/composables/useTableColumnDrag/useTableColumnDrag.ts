export const useTableColumnDrag = (table, reorderableColumns) => {
  const tableDragHandler = (event) => {
    event.dataTransfer.effectAllowed = 'move'
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
  }
  
  const addTableDragListener = () => {
    if (!reorderableColumns) return;
    table.value?.$el?.addEventListener('dragstart', tableDragHandler);
  }
  
  const removeTableDragListener = () => {
    if (!reorderableColumns) return;
    table.value?.$el?.removeEventListener('dragstart', tableDragHandler);
  }

  return {
    addTableDragListener,
    removeTableDragListener,
  };
};