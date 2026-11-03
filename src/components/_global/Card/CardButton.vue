<template>
  <component :is="component" :class="elClass">
    <div class="card-button__container">
      <span class="card-button__icon card-button__icon--before" v-if="icon_before">
        <icon :name="icon_before" :size="iconSize" />
      </span>
      <span class="card-button__label" v-if="hasSlot('default')"><slot /></span>
      <span class="card-button__icon card-button__icon--after" v-if="icon_after">
        <icon :name="icon_after" :size="iconSize" />
      </span>
    </div>
  </component>
</template>

<script>
import { Icon } from '@vue-norma/ui'

export default {
  name: 'card-button',
  components: {
    Icon
  },
  props: {
    icon_before: {
      type: [String, Boolean],
      default: false
    },
    icon_after: {
      type: [String, Boolean],
      default: false
    },
    // Mods
    size: {
      type: String,
      default: 'm',
      validator(value) {
        return ['s', 'm', 'l'].includes(value)
      }
    },
    stretched: {
      type: Boolean,
      default: false
    },
    // State
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    // Other
    component: {
      type: String,
      default: 'button'
    },
    mode: {
      type: String,
      default: 'primary',
      validator(value) {
        return ['primary', 'secondary', 'tertiary', 'outline', 'link'].includes(value)
      }
    }
  },
  computed: {
    elClass() {
      return [
        'card-button',
        'card-button--size-' + this.size,
        'card-button--mode-' + this.mode,
        {
          'card-button--singe-icon': (!!this.icon_before ^ !!this.icon_after) && !this.hasSlot('default'),
          'card-button--has-icon': (!!this.icon_before || !!this.icon_after),
          'card-button--stretched': this.stretched,
          'card-button--loading': this.loading,
          'card-button--disabled': this.disabled,
          'card-button--active': this.active
        }
      ]
    },
    iconSize() {
      switch (this.size) {
        case 's':
          return 14;
        case 'm':
          return 16;
        case 'l':
          return 18;
        default:
          return 16;
      }
    }
  },
  methods: {
    hasSlot(name) { return !!this.$slots[name] }
  }
}
</script>

<style lang="scss">
.card-button {
  &--size-s {
    --card-button--button-size: 26px;
    --card-button--font-size: 1.3rem;
    --card-button--padding: 16px;
  }
  &--size-m {
    --card-button--button-size: 36px;
    --card-button--font-size: 1.8rem;
    --card-button--padding: 16px;
  }
  &--size-l {
    --card-button--button-size: 38px;
    --card-button--font-size: 1.5rem;
    --card-button--padding: 16px;
  }
}

.card-button {
  &--mode-primary {
    --card-button--background: #d9d5a3;
    --card-button--color: #262339;
    --card-button--border-color: #2a291a;

    --card-button--background-hover: #c5c18e;
    --card-button--color-hover: #262339;

    --card-button--background-active: #bdb985;
    --card-button--color-active: #262339;
  }

  &--mode-secondary {
    --card-button--background: #faf7c6;
    --card-button--color: #262339;
    --card-button--border-color: #2a291a;

    --card-button--background-hover: #d9d5a3;
    --card-button--color-hover: #262339;

    --card-button--background-active: #d9d5a3;
    --card-button--color-active: #262339;
  }
}

.card-button {
  $parent: &;

  background: var(--card-button--background);
  color: var(--card-button--color);
  box-shadow: var(--x-box-shadow--6);
  font-optical-sizing: auto;
  margin: 0;
  padding: 0;
  cursor: pointer;
  border: 2px solid var(--card-button--border-color);
  outline: none;
  appearance: none;
  position: relative;
  max-width: 100%;
  min-height: var(--card-button--button-size);
  min-width: var(--card-button--button-size);
  display: inline-block;
  border-radius: 4px;
  user-select: none;
  transition: var(--x-transition);
  font-family: var(--x-font-family);

  @media(hover: hover) {
    &:hover {
      background: var(--card-button--background-hover);
      color: var(--card-button--color-hover);
      text-decoration: none;
    }
  }

  &__container {
    align-items: center;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    min-height: inherit;
    text-align: center;
    width: 100%;
  }

  &__icon {
    svg { fill: currentColor; flex-shrink: 0; display: block; }
    &--before {
      padding-left: var(--card-button--padding);
    }
    &--after {
      padding-right: var(--card-button--padding);
    }
  }
  
  &__label {
    white-space: nowrap;
    word-break: keep-all;
    font-size: var(--card-button--font-size);
    line-height: calc(1.2 * 1em);
    font-weight: 400;

    &:last-child {
      padding-right: var(--card-button--padding);
    }
    &:first-child {
      padding-left: var(--card-button--padding);
    }
  }
  &--singe-icon {
    #{$parent}__icon--after,
    #{$parent}__icon--before {
      margin-left: auto;
      margin-right: auto;
      padding-left: 0;
      padding-right: 0;
    }
  }

  &__icon--after:not(:first-child),
  &__icon--before:not(:last-child) + &__label {
    margin-left: 6px;
  }

  &--stretched {
    display: block;
    flex-basis: 0;
    flex-grow: 1;
    width: 100%;
  }

  &--active {
    background: var(--card-button--background-active);
    color: var(--card-button--color-active);
  }

  &--disabled {
    opacity: 0.4;
    pointer-events: none;
    cursor: default;
    @media(hover: hover) {
      &:hover {
        background: var(--card-button--background);
        color: var(--card-button--color);
      }
    }
  }
}
</style>