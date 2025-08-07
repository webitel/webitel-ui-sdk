import { onBeforeUnmount, onMounted, watch, type Ref } from 'vue'
import Sortable, { Swap } from 'sortablejs'

export interface SortableTableOptions {
  tableRef: Ref<any>
  enabled?: boolean
  sortableConfig?: Partial<Sortable.Options>
  onReorder?: (params: { oldIndex: number; newIndex: number }) => void
}

export interface ReorderParams {
  oldIndex: number
  newIndex: number
}

export function useSortableTable(options: SortableTableOptions) {
  const {
    tableRef,
    enabled = true,
    sortableConfig = {},
    onReorder = () => {},
  } = options

  let sortableInstance: Sortable | null = null
  let observer: MutationObserver | null = null

  // Default sortable configuration
  const defaultSortableConfig: Partial<Sortable.Options> = {
    swap: true,
    swapClass: 'sortable-swap-highlight',
    animation: 150,
    easing: 'cubic-bezier(1, 0, 0, 1)',
    filter: (_, rowElement: HTMLElement) => {
      const allowDraggable = rowElement.getElementsByClassName('sortable-btn')?.length
      return !allowDraggable // Prevent draggable if the element has no draggable button
    },
    onMove: function(evt: Sortable.MoveEvent) {
      const preventSwap = evt.related.getElementsByClassName('sortable-btn')?.length
      return !!preventSwap // Prevent swap if the element has no draggable button
    },
  }

  // Setup draggable functionality with MutationObserver
  const setupDraggableObserver = (): void => {
    const tableElement = tableRef.value?.$el
    if (!tableElement) return

    const tableBody = tableElement.querySelector('.p-datatable-tbody')
    if (!tableBody) return

    // Initial setup of draggable attributes
    enableDraggableAttributes(tableBody)

    // Create MutationObserver
    observer = new MutationObserver((mutations: MutationRecord[]) => {
      mutations.forEach((mutation) => {
        // Handle attribute changes (draggable attribute being set to false)
        if (mutation.type === 'attributes' && mutation.attributeName === 'draggable') {
          const target = mutation.target as HTMLElement
          if (target.tagName === 'TR' && target.getAttribute('draggable') === 'false') {
            target.setAttribute('draggable', 'true')
          }
        }

        // Handle new rows being added
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1 && (node as HTMLElement).tagName === 'TR') {
              const element = node as HTMLElement
              if (element.getAttribute('draggable') === 'false') {
                element.setAttribute('draggable', 'true')
              }
            }
          })
        }
      })
    })

    // Start observing
    observer.observe(tableBody, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ['draggable']
    })
  }

  // Enable draggable attributes on all rows (change false to true)
  const enableDraggableAttributes = (tableBody: HTMLElement): void => {
    const rows = tableBody.querySelectorAll('tr')
    
    rows.forEach(row => {
      // Set draggable to true for all rows, regardless of current state
      if (row.getAttribute('draggable') !== 'true') {
        row.setAttribute('draggable', 'true')
      }
    })
  }

  // Initialize SortableJS
  const initSortable = (wrapper: HTMLElement): void => {
    if (sortableInstance) {
      sortableInstance.destroy()
      sortableInstance = null
    }

    const config: Sortable.Options = {
      ...defaultSortableConfig,
      ...sortableConfig,
      onEnd: (evt: Sortable.SortableEvent) => {
        const { oldIndex, newIndex } = evt
        if (oldIndex !== undefined && newIndex !== undefined) {
          onReorder({ oldIndex, newIndex })
        }
      }
    }

    sortableInstance = new Sortable(wrapper, config)
  }

  // Main initialization function
  const initializeSortable = (): void => {
    if (!enabled) return

    const tableElement = tableRef.value?.$el
    if (!tableElement) return

    const tableBody = tableElement.querySelector('.p-datatable-tbody')
    if (!tableBody) return

    enableDraggableAttributes(tableBody)
    initSortable(tableBody)
  }

  const cleanup = (): void => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
    
    if (sortableInstance) {
      sortableInstance.destroy()
      sortableInstance = null
    }
  }

  watch(
    () => tableRef.value,
    (newValue) => {
      if (newValue?.$el && enabled) {
        setTimeout(() => {
          setupDraggableObserver()
          initializeSortable()
        }, 100)
      }
    },
    {
      immediate: true
    }
  )

  // Mount Sortable plugins
  onMounted(() => {
    if (!(Sortable as any).__pluginsMounted) {
      Sortable.mount(new Swap());
      (Sortable as any).__pluginsMounted = true
    }
  })

  onBeforeUnmount(() => {
    cleanup()
  })

  return {
    initializeSortable,
    cleanup,
    setupDraggableObserver,
    enableDraggableAttributes
  }
}