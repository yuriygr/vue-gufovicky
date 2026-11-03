<template>
  <card size="small">
    <card-header :title="$t('modals.correct-page.title')" />

    <form-group @submit="submit" :loading="loading">
      <form-text align="center">
        {{ $t('modals.correct-page.help') }}
      </form-text>

      <form-block>
        <text-field tabindex="1" type="text" name="message" v-model.trim="message" :disabled="loading" autocomplete="url" />
      </form-block>
      <form-text align="center" v-if="error">
        {{ error }}
      </form-text>
      <buttons-group>
        <card-button size="s" @click.exact="closeModal">{{ $t('action.cancel') }}</card-button>
        <card-button tabindex="2" size="s" :disabled="message == ''" @click.exact="sendMessage">{{ $t('action.send') }}</card-button>
      </buttons-group>
    </form-group>
  </card>
</template>

<script>
import { ButtonsGroup } from '@vue-norma/ui'

export default {
  name: 'correct-page-modal',
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
      message: '',
      loading: false,
      error: false
    }
  },
  methods: {
    sendMessage() {
      this.loading = true
      this.error = false

      this.$api.post(`kb/${this.data.uuid}`, { message: this.message })
      .then(r => {
        this.$alerts.success({ text: r.status })
        this.$modals.close()
      })
      .catch(error => {
        this.error = error.message
      })
      .then(_ => this.loading = false)
    },
    closeModal() {
      this.$modals.close()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>