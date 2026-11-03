<template>
  <router-link :class="elClass" :to="to" active-class="card-navigation-item--active" exact-active-class="">
    <div v-if="icon" class="card-navigation-item__icon"><icon :name="icon" size="22" /></div>
    <div class="card-navigation-item__content">
      <div class="card-navigation-item__label"><slot /></div>
    </div>
    <div v-if="chevron" class="card-navigation-item__chevron">
      <icon name="chevron-line" size="18" />
    </div>
  </router-link>
</template>

<script>
import { Icon } from '@vue-norma/ui'

export default {
  name: 'card-navigation-item',
  components: { Icon },
  props: {
    to: {
      type: [ Object ],
      default: false 
    },
    icon: {
      type: [ String, Boolean ],
      default: false 
    },
    chevron: {
      type: [ Boolean ],
      default: true 
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    elClass() {
      return [
        'card-navigation-item',
        {
          'card-navigation-item--disabled': this.disabled
        }
      ]
    },
    isHasLink() {
      return typeof this.to === 'string' || typeof this.to === 'object'
    },
    isInnerLink() {
      return typeof this.to === 'object'
    },
    isExternalLink() {
      return typeof this.to === 'string' && this.to.startsWith('http')
    }
  }
}
</script>

<style lang="scss">
.card-navigation-item {
  --card-navigation-item--background: #faf7c6;
  --card-navigation-item--color: #262339;
  --card-navigation-item__icon--color: #2a291a;
  --card-navigation-item--border-color: #2a291a;
  --card-navigation-item__chevron--color: #484467;

  --card-navigation-item--background-hover: #efecb5;
  --card-navigation-item--color-hover: #262339;
  --card-navigation-item__icon--color-hover: #2a291a;
  --card-navigation-item--border-color-hover: #2a291a;
  --card-navigation-item__chevron--color-hover: #484467;
}

.card-navigation-item {
  background: var(--card-navigation-item--background);
  color: var(--card-navigation-item--color);
  box-shadow: var(--x-box-shadow--6);
  display: flex;
  align-items: center;
  user-select: none;
  padding: 8px;
  border-radius: 4px;
  border: 2px solid var(--card-navigation-item--border-color);

  & + & {
    margin-top: .5rem;
  }

  &--active {
    color: var(--card-navigation-item--color-hover);
  }

  &--disabled {
    opacity: 0.4;
    pointer-events: none;
    cursor: default;
    @media(hover: hover) {
      &:hover {
        background: var(--card-navigation-item--background);
        color: var(--card-navigation-item--color);
        border: 2px solid var(--card-navigation-item--border-color);
      }
    }
  }

  @media(hover: hover) {
    &:hover {
      background: var(--card-navigation-item--background-hover);
      color: var(--card-navigation-item--color-hover);
      border: 2px solid var(--card-navigation-item--border-color-hover);
      text-decoration: none;
    }
  }

  &__icon {
    margin-right: 10px;
    padding: 7px;
    color: var(--card-navigation-item__icon--color);

    svg { display: block; fill: currentColor; }

    .card-navigation-item--active & {
      color: var(--card-navigation-item__icon--color-hover);
    }

    @media(hover: hover) {
      :hover > & {
        color: var(--card-navigation-item__icon--color-hover);
      }
    }
  }

  &__content {
    flex: 1;
  }

  &__label {
    font-family: "Pixelify Sans", sans-serif;
    font-optical-sizing: auto;
    font-size: 1.9rem;
    line-height: calc(1.2 * 1em);
  }

  &__chevron {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--card-navigation-item__chevron--color);
    transition: var(--x-transition);

    svg { display: block; fill: currentColor; }

    .card-navigation-item--active & {
      color: var(--card-navigation-item__chevron--color-hover);
    }

    @media(hover: hover) {
      :hover > & {
        color: var(--card-navigation-item__chevron--color-hover);
      }
    }
  }
}
</style>