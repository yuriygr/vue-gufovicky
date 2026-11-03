<template>
  <app-layout>
    <app-tabbar />
    <app-content />
  </app-layout>

  <toast-layer />
  <modals-layer />
  <popover-layer />

  <icons-sprite-layer :path="iconsSpritePath" />
</template>

<script>
import { IconsSpriteLayer, ModalsLayer, PopoverLayer } from '@vue-norma/ui'
import { useI18n } from 'vue-i18n'

import { AppTabbar, AppContent, AppLayout } from '@/components/_app'
import { applyMeta, applyDataset } from '@/app/composables/useMeta'
import { useModals } from '@vue-norma/ui'
import { useToast } from '@/app/composables/useToast'
import { useAppStore } from '@/app/store/modules/app'

export default {
  name: 'app',
  components: {
    IconsSpriteLayer, ModalsLayer, PopoverLayer,
    AppTabbar, AppContent, AppLayout
  },
  data() {
    return {
      iconsSpritePath: require('@/assets/symbols.svg'),
      modal: false
    }
  },
  setup() {
    const appStore = useAppStore()
    const { t } = useI18n()
    const toast = useToast()
    const modals = useModals()

    return { appStore, t, toast, modals }
  },
  computed: {
    locale()         { return this.appStore.locale },
    theme()          { return this.appStore.theme },
    density()        { return this.appStore.density },
    themeStatusBar() { return this.appStore.themeStatusBar }
  },
  methods: {
    setModal(state = false) {
      applyDataset('modal', state ? 'on' : false)
    }, 
    setLocale(state = false) {
      this.$i18n.locale = state
      applyDataset('locale', state || false)

      if (state) {
        document.documentElement.setAttribute('lang', state)
      } else {
        document.documentElement.removeAttribute('lang')
      }
    },
    setTheme(state = false) {
      applyDataset('theme', state)
      applyMeta('theme-color', this.themeStatusBar)
    }, 
    setDensity(state = false) {
      applyDataset('density', state)
    }, 
    setLayout(state = false) {
      applyDataset('layout', state ?? false)
    }
  },
  async mounted() {
    this.modals.on('show', _ => this.modal = true)
    this.modals.on('close', _ => this.modal = false)
  },
  beforeUnmount() {
    this.modals.off('show')
    this.modals.off('close')
  },
  watch: {
    modal: {
      handler: 'setModal',
      immediate: true
    },
    locale: {
      handler: 'setLocale',
      immediate: true
    },
    theme: {
      handler: 'setTheme',
      immediate: true
    },
    density: {
      handler: 'setDensity',
      immediate: true
    },
    '$route.meta.layout': {
      handler: 'setLayout',
      immediate: true
    }
  }
}
</script>