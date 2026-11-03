<template>
  <div class="os" ref="os" :style="$elStyle">
    <div class="os__wrapper">
      <div class="os__thumb" :style="{ 'background-image': 'url(' + thumbURL + ')' }"></div>
      <div class="os__content">
        <div class="os__title">{{ data.title }}</div>
        <meta-list class="os__meta">
          <meta-item icon="calendar-line" :label="formatedDate" />
          <meta-item icon="views-line" :label="data.viewer_count" />
          <meta-item class="platform-twitch" icon="stream-line"  :label="$t('home.watch')" component="a" target="_blank" :stretched="true" href="https://www.twitch.tv/gufovicky" />
        </meta-list>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from '@vue-norma/ui'

import { MetaItem, MetaList } from '@/components/meta'

export default {
  name: 'online-thumb',
  components: {
    Icon,
    MetaItem, MetaList
  },
  props: {
    data: {
      type: Object
    },
    size: {
      default: 'small'
    }
  },
  data() {
    return {
      thumb_sizes: {
        'small': { width: 640, height: 360 },
        'medium': { width: 854, height: 480 },
        'large': { width: 1280, height: 720 },
      },
      current_width: 0
    }
  },
  computed: {
    thumbURL() {
      let size = this.thumb_sizes[this.size]
      return this.data.thumbnail_url.replace('{width}', size.width).replace('{height}', size.height)
    },
    metaItems() {
      let _result = []

      _result.push({ label: this.$t('stream.meta.game_name', { game_name: this.data.game_name }) })
      _result.push({ label: this.$tc('stream.meta.started_at', { started_at: this.data.started_at }) })
      _result.push({ label: this.$tc('stream.meta.viewer_count', { count: this.data.viewer_count }) })

      return _result
    },
    formatedDate() {
      return this.$filters.timeAgo(this.data.started_at, this.$i18n.locale)
    },
    $el() { 
      return this.$refs.os
    },
    $elStyle() {
      let size = this.thumb_sizes[this.size]

      return {
        '--os-size-width': size.width,
        '--os-size-height': size.height,
        '--os-current-width': this.current_width
      }
    },
  },
  methods: {
    resizeHandler(e) {
      let { width } = this.$el.getBoundingClientRect()
      this.current_width = width
    }
  },
  mounted()  {
    this.resizeHandler()
    window.addEventListener("resize", this.resizeHandler);
  },
  destroyed()  {
    window.removeEventListener("resize", this.resizeHandler);
  },
}
</script>

<style lang="scss" scoped>
.os {
  --ratio: calc(var(--os-size-height) / var(--os-size-width));
  --height-with-units: calc(var(--os-size-height) * 1px);
  --os-height: calc(calc(var(--os-current-width) * var(--ratio)) * 1px);
}

.os {
  --os__info-background: #111;
}

.os {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;

  &__wrapper {
    background: #999;
    box-shadow: var(--x-box-shadow--4);
    background: #f9f5b9;
    border: 2px solid #480b6c;
    border-radius: 6px;
    position: relative;
    overflow: hidden;
  }

  &__thumb {
    background-repeat: no-repeat;
    background-size: cover;
    max-width: calc(var(--os-size-width) * 1px);
    max-height: calc(var(--os-size-height) * 1px);
    width: 100%;
    height: var(--os-height);
    z-index: 102;
  }

  &__content {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin-bottom: .5rem;
  }

  &__title {
    font-family: "Pixelify Sans", sans-serif;
    font-optical-sizing: auto;
    font-size: 2rem;
    line-height: 1.2;
    margin-bottom: 1rem;
  }
}
</style>