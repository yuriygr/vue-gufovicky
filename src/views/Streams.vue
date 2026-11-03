<template>
  <card>
    <card-header :title="t('streams.title')">
      <template #after>
        <card-button icon_before="add-bold" size="s" mode="secondary" @click="openAddStreamModal" />
      </template>
    </card-header>

    <items-list type="streams" v-if="data.length > 0 || loading" :has-data="data.length > 0" :loading="loading" :has-more="hasMoreItems" @more="loadMore">
      <stream-item v-for="item in data" :key="`stream-${item.uuid}`" :data="item" />

      <template #skeleton>
        <stream-item v-for="index in 15" :key="`item-${index}`" />
      </template>
    </items-list>

    <placeholder v-else-if="error"
      :icon="humanizeError(error).icon"
      :header="humanizeError(error).title"
      :text="humanizeError(error).description"
    />
    <placeholder v-else :text="t('streams.error.empty_list')" />
  </card>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { Placeholder } from '@vue-norma/ui'
import { useI18n } from 'vue-i18n'

import { StreamItem } from '@/components/stream'
import { useStreamsStore } from '@/app/store/modules/streams'
import { useModals } from '@vue-norma/ui'
import { useHumanizeError } from '@/app/composables/useHumanizeError'
import { useMeta } from '@/app/composables/useMeta'

let AddStreamModal = defineAsyncComponent(() => import("@/modals/AddStream.vue"))

export default {
  name: 'streams',
  components: {
    Placeholder, StreamItem
  },
  setup() {
    const store = useStreamsStore()
    const modals = useModals()
    const { t } = useI18n()
    const humanizeError = useHumanizeError()
    
    const { data, loading, error, hasMoreItems } = storeToRefs(store)

    useMeta(() => ({ title: t('streams.title') }))

    return { t, store, modals, humanizeError, data, loading, error, hasMoreItems }
  },
  methods: {
    loadMore() {
      this.store.more()
    },
    openAddStreamModal() {
      this.modals.show(AddStreamModal)
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