<template>
  <card>
    <card-header :title="data.title">
      <template #before>
        <card-button icon_before="arrow-back-bold" size="s" mode="secondary" component="router-link" :to="{ name: 'kb-menu' }" />
      </template>
      <template #after v-if="Object.keys(data).length > 0">
        <card-button icon_before="pen-bold" size="s" mode="secondary" @click="openCorrectPageModal" />
      </template>
    </card-header>

    <div v-html="data.content" v-if="(!loading && !error) && Object.keys(data).length > 0" />

    <template v-if="Object.keys(data).length == 0">
      <placeholder-loading v-if="loading" />
      <placeholder v-else
        :text="t('kb.error.empty_page')"
      />
    </template>
  </card>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapState } from 'pinia'
import { Placeholder, PlaceholderLoading } from '@vue-norma/ui'

import { useKBPageStore } from '@/app/store/modules/kb'
import { useModals } from '@vue-norma/ui'
import { useHumanizeError } from '@/app/composables/useHumanizeError'
import { useMeta } from '@/app/composables/useMeta'
import { useI18n } from 'vue-i18n'

let CorrectPageModal = defineAsyncComponent(() => import("@/modals/CorrectPage.vue"))

export default {
  name: 'kb-page',
  props: {
    uuid: {
      type: [ Boolean, String ],
      default: false
    }
  },
  components: {
    Placeholder, PlaceholderLoading
  },
  setup() {
    const store = useKBPageStore()
    const modals = useModals()
    const { t } = useI18n()
    const humanizeError = useHumanizeError()
    
    const { setTitle } = useMeta(() => ({ title: t('kb.title') }))

    return { t, store, modals, humanizeError, setTitle}
  },
  computed: {
    ...mapState(useKBPageStore, {
      data: (store) => store.data,
      loading: (store) => store.loading,
      error: (store) => store.error,
    }),
  },
  methods: {
    openCorrectPageModal() {
      this.modals.show(CorrectPageModal, {
        data: this.data
      }) 
    },
  },
  async mounted() {
    this.store.fetch(this.uuid)
  },
  unmounted() {
    this.store.clear()
  },
  watch: {
    'data'(to) {
      if (to)
        this.setTitle(to.title)
    },
    '$route.params.uuid'(to, from) {
      if (typeof to == 'undefined') {
        return
      }
      if (to != from) {
        this.store.fetch(to)
      }
    }
  }
}
</script>