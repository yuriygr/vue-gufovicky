<template>

  <div class="logo">
    <div class="logo__wrapper">
      <span class="g">G</span>
      <span class="u">u</span>
      <span class="f">f</span>
      <span class="o">o</span>
      <span class="v">v</span>
      <span class="i">i</span>
      <span class="c">c</span>
      <span class="k">k</span>
      <span class="y">y</span>
    </div>
  </div>

  <online-thumb v-if="status_data.status == 'Online'" :data="status_data.data" />

  <card v-for="(items, key) in links_data" :key="`links-${key}`"> 
    <card-header :title="$t(`home.links_${key}.title`)" :subtitle="$t(`home.links_${key}.subtitle`)" />

    <links-list>
      <template v-for="(item, index) in items" :key="`links-${key}-${index}`">
        <link-item :data="item" :size="item.size" />
      </template>
    </links-list>
  </card>

  <card v-if="(!streams_loading && !streams_error) || streams_data.length > 0">
    <card-header :title="$t('home.last_streams.title')" :subtitle="$t('home.last_streams.subtitle')" />
 
    <streams-list>
      <stream-item-wrapper v-for="item in streams_data" :key="`stream-${item.uuid}`">
        <stream-item :data="item" />
      </stream-item-wrapper>

      <card-button component="router-link" :stretched="true" active-class="" exact-active-class="" :to="{ name: 'streams' }">
        {{ $t('action.show_more') }}
      </card-button>
    </streams-list>
  </card>
</template>

<script>
import { mapState } from 'pinia'
import { Spacer } from '@vue-norma/ui'

import { useStreamStatusStore, useStreamsStore } from '@/app/store/modules/streams'

import { LinksList, LinkItem } from '@/components/links'
import { StreamsList, StreamItem, StreamItemWrapper, OnlineThumb } from '@/components/stream'
import { useLinksStore } from '@/app/store/modules/links'

export default {
  name: 'home',
  components: {
    Spacer,
    StreamsList, StreamItem, StreamItemWrapper, OnlineThumb,
    LinksList, LinkItem
  },
  setup() {
    const linksStore = useLinksStore()
    const streamsStore = useStreamsStore()
    const streamStatusStore = useStreamStatusStore()

    return { linksStore, streamsStore, streamStatusStore }
  },
  computed: {
    ...mapState(useLinksStore, {
      links_data: (store) => store.data,
    }),
    ...mapState(useStreamsStore, {
      streams_data: (store) => store.data,
      streams_loading: (store) => store.loading,
      streams_error: (store) => store.error,
    }),
    ...mapState(useStreamStatusStore, {
      status_data: (store) => store.data,
      status_loading: (store) => store.loading,
      status_error: (store) => store.error,
    }),
  },
  methods: {},
  async mounted() {
    this.streamsStore.fetch()
    this.streamStatusStore.fetch()
  },
  unmounted() {
    this.streamsStore.clear()
    this.streamStatusStore.clear()
  },
  watch: { }
}
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;

  font-family: "Pixelify Sans", sans-serif;
  font-optical-sizing: auto;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.35);
  font-size: 5rem;
  line-height: calc(1.6 * 1em);
  text-align: center;

  .g { color: #6a02bf; }
  .u { color: #c70100; }
  .f { color: #960091; }
  .o { color: #034e99; }
  .v { color: #098c0a; }
  .i { color: #e30194; }
  .c { color: #ec7907; }
  .k { color: #7102b4; }
  .y { color: #034e99; }
}
</style>