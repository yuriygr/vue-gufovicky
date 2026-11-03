<template>
  <a :class="elClass" :href="data.href" target="_blank">
    <div class="stream-link-item__icon">
      <icon :name="`${data.platform}-fill`" :size="24" />
    </div>
    <div class="stream-link-item__content">
      <div class="stream-link-item__label">{{ $t(`stream.link.${data.platform}`) }}</div>
      <div class="stream-link-item__href">{{ data.href }}</div>
    </div>
  </a>
</template>

<script>
import { Icon } from '@vue-norma/ui'

export default {
  name: 'stream-link-item',
  components: { Icon },
  props: {
    data: false,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    elClass() {
      return [
        'stream-link-item',
        'platform-' + this.data.platform,
        {
          'stream-link-item--disabled': this.disabled
        }
      ]
    },
  }
}
</script>

<style lang="scss">
.stream-link-item {
  --stream-link-item__icon--background: #d9d5a3;
  --stream-link-item__icon--color: #262339;
  --stream-link-item__icon--border-color: #2a291a;
  
  --stream-link-item__label--color: #262339;
  --stream-link-item__url--color: #495057;

  &[class*="platform"] {
    --stream-link-item__icon--background: var(--platform--background);
    --stream-link-item__icon--color: #fff;
    --stream-link-item__icon--border-color: var(--platform--border-color);

    --stream-link-item__label--color: var(--platform--color);
  }
}

.stream-link-item {
  display: inline-flex;
  flex-direction: row;
  align-items: center;

  position: relative;
  overflow: hidden;
  text-decoration: none;
  transition: var(--x-transition);

  &__icon {
    background: var(--stream-link-item__icon--background);
    border: 2px solid var(--stream-link-item__icon--border-color);
    color: var(--stream-link-item__icon--color);
    box-shadow: var(--x-box-shadow--6);
    margin-right: 9px;
    padding: 9px;
    border-radius: 8px;

    svg { display: block; fill: currentColor; }
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: baseline;
  }

  &__label {
    color: var(--stream-link-item__label--color);
    font-family: "Pixelify Sans", sans-serif;
    font-optical-sizing: auto;
    font-size: 1.95rem;
    font-weight: 400;
    line-height: calc(1.2 * 1em);
  }

  &__href {
    color: var(--stream-link-item__url--color);
    font-size: 1.3rem;
    font-weight: var(--x-font-weight--normal);
    line-height: calc(1.2 * 1em);
  }

  @media(hover: hover) {
    &:hover {
      text-decoration: none;
    }
  }

  &--disabled {
    opacity: 0.4;
    pointer-events: none;
    cursor: default;
  }
}
</style>