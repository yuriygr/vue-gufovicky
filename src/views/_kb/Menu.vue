<template>
  <card>
    <card-header :title="t('kb.title')" />

    <card-navigation v-if="(!kb_loading && !error) || kb_data.length > 0">
      <template v-for="(item, index) in kbItems" :key="`kb-item-${index}`">
        <card-navigation-item :to="item.to" :chevron="item.chevron" :disabled="item.disabled">
          {{ item.label }}
        </card-navigation-item>
      </template>
    </card-navigation>

    <template v-if="kb_data.length == 0">
      <placeholder-loading v-if="kb_loading" />
      <placeholder v-else :text="t('kb.error.empty_list')" />
    </template>
  </card>

  <card>
    <card-header :title="t('kb.app.title')" :subtitle="t('kb.app.version', { version: this.appVersion })" />

    <card-navigation v-if="appItems.length > 0">
      <template v-for="(item, index) in appItems" :key="`app-item-${index}`">
        <card-navigation-item :to="item.to" :chevron="item.chevron" :disabled="item.disabled">
          {{ item.label }}
        </card-navigation-item>
      </template>
    </card-navigation>

    <spacer />

    <card-button :stretched="true" @click.prevent="refresh">{{ t('kb.app.refresh') }}</card-button>
  </card>
</template>

<script>
import { mapState } from 'pinia'
import { Placeholder, PlaceholderLoading, NHeader, Spacer, NavigationSection, NavigationItem } from '@vue-norma/ui'

import { useModals } from '@vue-norma/ui'
import { useHumanizeError } from '@/app/composables/useHumanizeError'
import { useMeta } from '@/app/composables/useMeta'
import { useKBStore } from '@/app/store/modules/kb'
import { useAppStore } from '@/app/store/modules/app'
import { useI18n } from 'vue-i18n'

export default {
  name: 'kb-menu',
  components: {
    NHeader, Spacer, Placeholder, PlaceholderLoading,
    NavigationSection, NavigationItem
  },
  setup() {
    const store = useKBStore()
    const modals = useModals()
    const { t } = useI18n()
    const humanizeError = useHumanizeError()
    
    useMeta(() => ({ title: t('kb.title') }))

    return { t, store, modals, humanizeError }
  },
  computed: {
    ...mapState(useAppStore, {
      appTitle: (state) => state.title,
      appVersion: (state) => state.version
    }),
    ...mapState(useKBStore, {
      kb_data: (store) => store.data,
      kb_loading: (store) => store.loading,
      kb_error: (store) => store.error,
    }),

    kbItems() {
      return this.kb_data.map(item => {
        item.label = item.title
        item.to = { name: 'kb-page', params: { uuid: item.uuid } },
        item.chevron = true
        return item
      })
    },
    appItems() {
      return [
        {
          label: this.t('kb.app.item.user-agreement'),
          to: { name: 'kb-page', params: { uuid: 'user-agreement' } },
          chevron: true
        },
        {
          label: this.t('kb.app.item.privacy'),
          to: { name: 'kb-page', params: { uuid: 'privacy' } },
          chevron: true
        },
        {
          label: this.t('kb.app.item.legal'),
          to: { name: 'kb-page', params: { uuid: 'legal' } },
          chevron: true
        },
        {
          label: this.t('kb.app.item.data-security'),
          to: { name: 'kb-page', params: { uuid: 'data-security' } },
          chevron: true
        }
      ]
    }
  },
  methods: {
    refresh() {
      window.location.reload()
    }
  },
  async mounted() {
    this.store.fetch()
  },
  unmounted() { },
}
</script>

<style lang="scss">

</style>