<template>
  <card size="small" class="card">
    <card-header :title="$t('modals.add-stream-link.title')" />

    <form-text align="center">
      {{ $t('modals.add-stream-link.help') }}
    </form-text>

    <form-block :label="$t('modals.add-stream-link.link')">
      <text-field tabindex="1" type="text" name="link" v-model.trim="link" :disabled="loading" autocomplete="url" />
    </form-block>

    <buttons-group>
      <card-button size="s" @click.exact="closeModal">{{ $t('action.cancel') }}</card-button>
      <card-button size="s" :disabled="link == ''" @click.exact="sendLink">{{ $t('action.send_link') }}</card-button>
    </buttons-group>
  </card>
</template>

<script>
import { ButtonsGroup } from '@vue-norma/ui'

export default {
  name: 'add-stream-link-modal',
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
  methods: {
    sendLink() {
      this.loading = true
      this.error = false

      this.$api.post(`streams/${this.data.uuid}/archive`, { link: this.link })
      .then(_ => {
        this.$alerts.success({ text: 'Ссылка добавлена' })
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