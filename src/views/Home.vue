<template>

  <div class="logo">
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

import { LinksList, LinkItem } from '@/components/links'
import { StreamsList, StreamItem, StreamItemWrapper, OnlineThumb } from '@/components/stream'

import { useStreamStatusStore, useStreamsStore } from '@/app/store/modules/streams'
import { useLinksStore } from '@/app/store/modules/links'
import { useMeta } from '@/app/composables/useMeta'
import { useI18n } from 'vue-i18n'

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
    const { t } = useI18n()

    useMeta(() => ({ title: t('home.title') }))

    return { t, linksStore, streamsStore, streamStatusStore }
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
  mounted() {
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

  > span {
    display: inline-block;
    animation: dance 0.4s ease-in-out infinite;
    will-change: transform;
  }

  > span:nth-child(1) { animation-delay: 0s;    }
  > span:nth-child(2) { animation-delay: 0.12s; }
  > span:nth-child(3) { animation-delay: 0.24s; }
  > span:nth-child(4) { animation-delay: 0.36s; }
  > span:nth-child(5) { animation-delay: 0.48s; }
  > span:nth-child(6) { animation-delay: 0.60s; }
  > span:nth-child(7) { animation-delay: 0.72s; }
  > span:nth-child(8) { animation-delay: 0.84s; }
  > span:nth-child(9) { animation-delay: 0.96s; }

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

@keyframes dance {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-0.005em); }
}

/* уважаем настройки доступности */
@media (prefers-reduced-motion: reduce) {
  //.logo > span { animation: none; }
}
</style>