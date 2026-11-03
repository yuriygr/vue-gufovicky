<template>
  <component :is="component" :class="elClass">
    <div v-if="icon" class="meta-item__icon">
      <icon :name="icon" size="14" />
    </div>
    <div v-if="label" class="meta-item__label">{{ label }}</div>
  </component>
</template>

<script>
import { Icon } from '@vue-norma/ui'

export default {
  name: 'meta-item',
  props: {
    icon: false,
    label: false,
    disabled: {
      type: Boolean,
      default: false
    },
    component: {
      type: String,
      default: 'div'
    },
  },
  components: { Icon },
  computed: {
    elClass() {
      return [
        'meta-item',
        { 
          'meta-item--has-label': this.label,
          'meta-item--disabled': this.disabled
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.meta-item {
  --meta-item--background: #faf7c6;
  --meta-item--color: #262339;
  --meta-item--border-color: #2a291a;

  &[class*="platform"] {
    --meta-item--background: var(--platform--background);
    --meta-item--color: #fff;
    --meta-item--border-color: var(--platform--border-color);
  }
}

.meta-item {
  display: flex;
  align-items: center;
  flex-direction: row;

  background: var(--meta-item--background);
  border: 2px solid var(--meta-item--border-color);
  border-radius: 4px;
  box-shadow: var(--x-box-shadow--6);
  padding: .25rem .5rem .3rem;
  user-select: none;

  @media(hover: hover) {
    &:hover {
      opacity: .8;
      text-decoration: none;
    }
  }

  &__icon {
    color: var(--meta-item--color);

    svg {
      display: block;
      fill: currentColor;
    }
  }

  &__label {
    margin-left: 0.2rem; // @todo
    color: var(--meta-item--color);
    font-size: 1.2rem;
    line-height: calc(1.4 * 1em);
    white-space: nowrap;
    word-break: keep-all;
  }

  &--disabled {
    opacity: 0.4;
    pointer-events: none;
    cursor: default;
  }
}
</style>