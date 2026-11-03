<template>
  <template v-if="data">
    <div :class="[
      'stream-item',
      'stream-item--platform-' + data.platform
    ]">
      <div class="stream-item__content">
        <router-link class="stream-item__title" :to="streamLink">
          {{ data.title }}
        </router-link>
        <div class="stream-item__hashtags">
          <div class="hashtag hashtag--disabled">#{{data.stream_id}}</div>

          <template v-for="item in data.hashtags" :key="`hashtag-${item.slug}`">
            <router-link class="hashtag" :to="{ name: 'streams', query: { h: item.slug } }">{{item.label}}</router-link>
          </template>
        </div>
      </div>
      <meta-list class="stream-item__meta">
        <meta-item component="router-link" :to="streamLink" icon="calendar-line" :label="formatedDate" />
        <meta-item component="router-link" :to="streamLink" icon="video-duration-line" :label="formatedDuration" />
        <template v-for="(item, index) in data.links" :key="`meta-item-${index}`">
          <meta-item component="a" :class="`platform-${item.platform}`" :href="item.href" target="_blank" :icon="`${item.platform}-fill`" :disabled="!item.available" />
        </template>
      </meta-list>
    </div>
  </template>

  <template v-else>
    <div :class="[ 'stream-item' ]">
      <div class="stream-item__content">
        <router-link class="stream-item__title" tag="div">
          <skeleton :width="skeletonWidths.title" :height="9" />
        </router-link>
        <div class="stream-item__hashtags">
          <div class="hashtag hashtag--disabled"><skeleton :width="skeletonWidths.hashtag" :height="9" /></div>
        </div>
      </div>
      <div class="stream-item__meta">
        <skeleton :width="skeletonWidths.q" :height="9" />
        <skeleton :width="skeletonWidths.w" :height="9" />
        <skeleton :width="skeletonWidths.e" :height="9" />
      </div>
    </div>
  </template>
</template>

<script>
import { Icon } from '@vue-norma/ui'

import { MetaItem, MetaList } from '@/components/meta'

export default {
  name: 'stream-item',
  components: {
    Icon,
    MetaItem, MetaList
  },
  props: {
    data: false
  },
  data() {
    return {
      skeletonWidths: {
        title: Math.floor(Math.random() * 100) + 220,
        hashtag: Math.floor(Math.random() * 100) + 200,
        q: Math.floor(Math.random() * 100) + 200,
        w: Math.floor(Math.random() * 100) + 200,
        e: Math.floor(Math.random() * 100) + 80
      }
    }
  },
  computed: {
    streamLink() {
      return { name: 'stream', params: { uuid: this.data.uuid } }
    },
    formatedDate() {
      return this.$filters.timeFormatOnlyYear(this.data.meta.date_started, this.$i18n.locale)
    },
    formatedDuration() {
      return this.$filters.formatDuration(this.data.meta.duration)
    }
  },
  methods: { }
}
</script>

<style lang="scss">
.stream-item {
  --stream-item--background: transparent;
  --stream-item__icon--background: #f5f5f5;
  --stream-item__label--color: #262339;
}

.stream-item {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  background: var(--stream-item--background);
  position: relative;
  overflow: hidden;

  &__content {
    display: flex;
    flex-direction: column;
    margin-bottom: .5rem;
  }

  &__title {
    font-family: "Pixelify Sans", sans-serif;
    font-optical-sizing: auto;
    color: var(--stream-item__label--color);
    font-size: 2rem;
    line-height: calc(1.2 * 1em);
    margin-bottom: 0;
    text-decoration: none;

    @media(hover: hover) {
      &:hover {
        color: var(--stream-item__label--color);
      }
    }
  }
  &__hashtags {
    * + * {
      margin-left: .25rem;
    }
  }
}
</style>