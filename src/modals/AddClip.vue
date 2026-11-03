<template>
  <card size="small">
    <card-header :title="t('modals.add-clip.title')" />

    <form-group @submit="submit" :loading="loading">
      <form-text align="center">
        {{ t('modals.add-clip.help') }}
      </form-text>

      <form-block :label="t('modals.add-clip.link')">
        <text-field tabindex="1" type="text" name="link" v-model.trim="link" :disabled="loading" autocomplete="url" />
      </form-block>
      <form-text align="center" v-if="error">
        {{ error }}
      </form-text>
      <buttons-group>
        <card-button size="s" @click.exact="closeModal">{{ t('action.cancel') }}</card-button>
        <card-button tabindex="2" size="s" :disabled="link == ''" @click.exact="sendLink">{{ t('action.send_link') }}</card-button>
      </buttons-group>
    </form-group>
  </card>
</template>

<script>
import { ButtonsGroup } from '@vue-norma/ui'
import { useModals } from '@vue-norma/ui'
import { useToast } from '@/app/composables/useToast'

export default {
  name: 'add-clip-modal',
  components: {
    ButtonsGroup
  },
  props: {
    data: {
      type: Object,
      default: false
    }
  },
  data() {
    return {
      link: '',
      loading: false,
      error: false
    }
  },
  setup() {
    const modals = useModals()
    const toast = useToast()
    const { t } = useI18n()

    return { modals, toast, t }
  },
  methods: {
    sendLink() {
      this.loading = true
      this.error = false

      this.$api.post(`clips`, { link: this.link })
      .then(result => {
        this.toast.success(this.t(`alerts.${result.status}`))
        this.modals.close()
      })
      .catch(error => {
        this.toast.danger(this.t(`alerts.${error.status}`))
        this.error = error.message
      })
      .then(_ => this.loading = false)
    },
    closeModal() {
      this.modals.close()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>