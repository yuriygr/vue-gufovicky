import { createItemStore, createListStore } from '@/app/store/factory'

export const useStreamStore = createItemStore('stream',
  (slug) => `streams/${slug}`
)
export const useStreamStatusStore = createItemStore('stream_status', `streams/status`)
export const useStreamsStore = createListStore('streams', 'streams', { query: '', offset: 0 })