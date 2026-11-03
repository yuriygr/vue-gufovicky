import { createListStore } from '@/app/store/factory'

export const useClipsStore = createListStore('clips', 'clips', { query: '', offset: 0 })