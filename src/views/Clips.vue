<template>
  <card>
    <card-header :title="t('clips.title')">
      <template #after>
        <card-button icon_before="add-bold" size="s" mode="secondary" @click="openAddClipModal" />
      </template>
    </card-header>

    <items-list type="clips" v-if="data.length > 0 || loading" :has-data="data.length > 0" :loading="loading" :has-more="hasMoreItems" @more="loadMore">
      <clip-item v-for="item in data" :key="`clip-${item.uuid}`" :data="item" />

      <template #skeleton>
        <clip-item v-for="index in 15" :key="`item-${index}`" />
      </template>
    </items-list>

    <placeholder v-else-if="error"
      :icon="humanizeError(error).icon"
      :header="humanizeError(error).title"
      :text="humanizeError(error).description"
    />
    <placeholder v-else :text="t('clips.error.empty_list')" />
  </card>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { Placeholder } from '@vue-norma/ui'
import { useI18n } from 'vue-i18n'

import { ClipItem } from '@/components/clip'
import { useClipsStore } from '@/app/store/modules/clips'
import { useModals } from '@vue-norma/ui'
import { useHumanizeError } from '@/app/composables/useHumanizeError'
import { useMeta } from '@/app/composables/useMeta'

let AddClipModal = defineAsyncComponent(() => import("@/modals/AddClip.vue"))

export default {
  name: 'clips',
  components: {
    Placeholder, ClipItem
  },
  setup() {
    const store = useClipsStore()
    const modals = useModals()
    const { t } = useI18n()
    const humanizeError = useHumanizeError()
    
    const { data, loading, error, hasMoreItems } = storeToRefs(store)

    useMeta(() => ({ title: t('clips.title') }))

    return { t, store, modals, humanizeError, data, loading, error, hasMoreItems }
  },
  methods: {
    loadMore() {
      this.store.more()
    },
    openAddClipModal() {
      this.modals.show(AddClipModal)
    }
  },
  async mounted() {
    this.store.setFilters({
      h: this.$route.query.q, offset: undefined
    })
    this.store.fetch()
  },
  unmounted() {
    this.store.clear()
  },
  watch: {
    async '$route.query.h'(to) {
      this.store.setFilters({
        h: to, offset: undefined
      })
      this.store.fetch()
    }
  }
}
</script>