import { createItemStore, createListStore } from '@/app/store/factory'

export const useKBPageStore = createItemStore('kb_page',
  (slug) => `kb/${slug}`
)
export const useKBStore = createListStore('kb', 'kb', { query: '', offset: 0 })