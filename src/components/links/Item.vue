<template>
  <div :class="elClass" @click="tracking">
    <a :href="data.href" class="link__link" target="_blank" rel="noreferrer noopener"/>
    <div class="link__content">
      <div class="link__label">{{ data.label }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'link-item',
  components: { },
  props: {
    data: {
      type: Object
    },
    size: {
      default: 'medium'
    }
  },
  data() {
    return { }
  },
  computed: {
    elClass() {
      return [
        'link',
        'link--size-' + this.size,
        'platform-' + this.data.platform,
      ]
    }
  },
  methods: {
    tracking() {
      this.$gtag.event('click_on_main_link', {
        'event_category': 'main_links',
        'event_label': this.data.label,
        'value': this.data.label
      })
    }
  }
}
</script>

<style lang="scss">
.link {
  --link--background: #fff;
  --link--border-color: #222;
  --link--color: #222;
}

.link {
  &[class*="platform"] {
    --link--background: var(--platform--background);
    --link--border-color: var(--platform--border-color);
    --link--color: #fff;
  }

  &--size-6 { grid-column: span 6 }
  &--size-5 { grid-column: span 5 }
  &--size-4 { grid-column: span 4 }
  &--size-3 { grid-column: span 3 }
  &--size-2 { grid-column: span 2 }
  &--size-1 { grid-column: span 1 }
}

.link {
  position: relative;
  background: var(--link--background);
  border: 2px solid var(--link--border-color);
  transition: box-shadow .1s ease-out;
  box-shadow: var(--x-box-shadow--4);
  display: flex;
  padding: 4rem 1rem;
  margin: 0;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  user-select: none;
  transition: var(--x-transition);

  &__link {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 5
  }

  &__content {
    z-index: 4;
    text-align: center
  }

  &__label {
    font-family: "Pixelify Sans", sans-serif;
    font-optical-sizing: auto;
    text-shadow: 2px 2px #000A;
    color: var(--link--color);
    white-space: pre-line;
    word-wrap: break-word;
    word-break: break-word;
    font-weight: 400;
    font-size: 2.6rem;
    line-height: calc(1.2 * 1em);
    padding: 0;
    margin: 0;
  }
}
</style>