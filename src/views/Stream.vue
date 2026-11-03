<template>

  <template v-if="(!loading && !error) && Object.keys(data).length > 0">
    <card>
      <card-header :title="$t('stream.title')">
        <template #before>
          <card-button icon_before="arrow-back-bold" size="s" mode="secondary" component="router-link" :to="{ name: 'streams' }" active-class="" exact-active-class="" />
        </template>
      </card-header>

      <stream-item :data="data" />
      
      <spacer :height="10"/>

      <buttons-group>
        <card-button size="s" @click="openReportStreamModal">
          {{ $t('stream.action.report') }}
        </card-button>
      </buttons-group>
    </card>

    <card>
      <card-header :title="$t('stream.links')">
        <template #after>
          <card-button icon_before="add-bold" size="s" mode="secondary" :title="$t('stream.action.add_link')" @click="openAddStreamLinkModal" />
        </template>
      </card-header>

      <stream-links-list v-if="(data.links != null) && data.links.length > 0">
        <stream-link-item-wrapper v-for="(item, index) in data.links" :key="`stream-link-item-${index}`">
          <stream-link-item :data="item" :disabled="!item.available" />
        </stream-link-item-wrapper>
      </stream-links-list>
      <placeholder v-else :text="$t('stream.error.no_links')" />
    </card>

    <card>
      <card-header :title="$t('stream.comments')" />

      <placeholder :text="$t('stream.error.comments_disabled')" />
    </card>
  </template>

  <card v-if="Object.keys(data).length == 0">
    <card-header :title="$t('stream.title')">
        <template #before>
          <card-button icon_before="arrow-back-bold" size="s" mode="secondary" component="router-link" :to="{ name: 'streams' }" active-class="" exact-active-class="" />
        </template>
      </card-header>

    <placeholder-loading v-if="loading" />
    <placeholder v-else
      :text="$t('stream.error.not_found')"
    />
  </card>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapState } from 'vuex'
import { Spacer, Placeholder, PlaceholderLoading, ButtonsGroup } from '@vue-norma/ui'

import { StreamItem } from '@/components/stream'
import { StreamLinkItem, StreamLinkItemWrapper, StreamLinksList } from '@/components/stream-link'

let AddStreamLinkModal = defineAsyncComponent(() => import("@/modals/AddStreamLink.vue"))
let ReportStreamModal = defineAsyncComponent(() => import("@/modals/Report.vue"))

export default {
  name: 'stream',
  props: {
    uuid: {
      type: [ Boolean, String ],
      default: false
    }
  },
  components: {
    Spacer, Placeholder, PlaceholderLoading, ButtonsGroup,
    StreamItem,
    StreamLinkItem, StreamLinkItemWrapper, StreamLinksList
  },
  computed: {
    ...mapState('stream', [ 'data', 'loading', 'error' ]),
    humanizeError(error) {
      return this.$filters.humanizeError(error)
    }
  },
  methods: {
    reportStream(reason = 0) {
      return this.$api.post(`stream/${this.data.uuid}/report`, { reason })
      .then(result => {
        this.toast.success(this.t(`alerts.${result.status}`))
      })
      .catch(error => {
        this.toast.danger(this.t(`alerts.${error.status}`))
      })
    },

    // Modals
    openAddStreamLinkModal() {
      this.modals.show(AddStreamLinkModal, {
        data: this.data
      }) 
    },
    openReportStreamModal() {
      this.modals.show(ReportModal, {
        callback: this.reportStream
      })
      this.$popover.close()
    }
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
        this.meta.title = to.title
    },
    '$route.params.uuid'(to, from) {
      if (to != from) {
        this.$store.dispatch('stream/fetch', to)
      }
    }
  }
}
</script>