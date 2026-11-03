<template>
  <template v-if="data">
    <div :class="[ 'clip-item' ]">
      <div class="clip-item__content">
        <a :href="data.link" target="_blank" class="clip-item__title">
          {{ data.title }}
        </a>
      </div>
      <meta-list class="stream-item__meta">
        <meta-item component="a" icon="author-line" :label="data.creator.name" :href="creatorURL" target="_blank"/>
        <meta-item icon="calendar-line" :label="formatedDate" />
        <meta-item icon="video-duration-line" :label="formatedDuration" />
      </meta-list>
    </div>
  </template>

  <template v-else>
    <div :class="[ 'clip-item' ]">
      <div class="clip-item__content">
        <div class="clip-item__title">
          <skeleton :width="skeletonWidths.title" :height="9" />
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
  name: 'clip-item',
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
        q: Math.floor(Math.random() * 100) + 200,
        w: Math.floor(Math.random() * 100) + 200,
        e: Math.floor(Math.random() * 100) + 80
      }
    }
  },
  computed: {
    creatorURL() {
      return `https://www.twitch.tv/${this.data.creator.name}`
    },
    clipLink() {
      return { name: 'clip', params: { uuid: this.data.uuid } }
    },
    formatedDate() {
      return this.$filters.timeFormatOnlyYear(this.data.meta.date_created, this.$i18n.locale)
    },
    formatedDuration() {
      return this.$filters.formatDuration(this.data.meta.duration)
    }
  },
  methods: { }
}
</script>

<style lang="scss">
.clip-item {
  --clip-item--background: transparent;
  --clip-item__icon--background: #f5f5f5;
  --clip-item__label--color: #262339;
}

.clip-item {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  background: var(--clip-item--background);
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
    color: var(--clip-item__label--color);
    font-size: 2rem;
    line-height: calc(1.2 * 1em);
    margin-bottom: 0;
    text-decoration: none;
    
    @media(hover: hover) {
      &:hover {
        color: var(--clip-item__label--color);
      }
    }
  }
}
</style>