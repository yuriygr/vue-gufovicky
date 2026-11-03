<template>
  <card>
    <card-header :title="meta.title">
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
        :text="$t('kb.error.empty_page')"
      />
    </template>
  </card>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapState } from 'vuex'
import { Placeholder, PlaceholderLoading } from '@vue-norma/ui'

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
  meta() { return this.meta },
  data() {
    return {
      meta: {
        title: false
      }
    }
  },
  computed: {
    ...mapState('kb-page', [ 'data', 'loading', 'error' ]),
    humanizeError(error) {
      return this.$filters.humanizeError(error)
    }
  },
  methods: {
    openCorrectPageModal() {
      this.$modals.show(CorrectPageModal, {
        data: this.data
      }) 
    },
  },
  async mounted() {
    this.$store.dispatch('kb-page/fetch', this.uuid)
  },
  unmounted() {
    this.$store.dispatch('kb-page/clear')
  },
  watch: {
    'data'(to) {
      if (to)
        this.meta.title = to.title
    },
    '$route.params.uuid'(to, from) {
      if (typeof to == 'undefined') {
        return
      }
      if (to != from) {
        this.$store.dispatch('kb-page/fetch', to)
      }
    }
  }
}
</script>