<template>
  <section :class="elClass">
    <slot name="default" />
  </section>
</template>

<script>
export default {
  name: 'card',
  props: {
    size: {
      type: [ Boolean, String ],
      default: false,
      validator(value) {
        return ['small', 'normal', 'wide'].includes(value)
      }
    }
  },
  computed: {
    elClass() {
      return [
        'card',
        this.size ? `card--modal--${this.size}`: ''
      ]
    }
  },
  methods: {
    hasSlot(name) { return !!this.$slots[name] },
    
  }
}
</script>

<style lang="scss">
.card {
  padding: 1rem;
  background: #f9f5b9;
  border: 2px solid #480b6c;
  box-shadow: var(--x-box-shadow--4);
  border-radius: 6px;
  overflow: hidden;

  & + & {
    margin-top: 2rem;
  }

  &.modal-layer__content {
    position: relative;
    margin: 5rem auto;
  }
  &--modal {
    &--wide {
      max-width: 890px;
      @media (max-width: 905px) {
        &.modal-layer__content { margin: 5rem var(--mobile-page-vertical-padding); }
      }
    }

    &--normal {
      max-width: 650px;
      @media (max-width: 665px) {
        &.modal-layer__content { margin: 5rem var(--mobile-page-vertical-padding); }
      }
    }

    &--small {
      max-width: 490px;
      @media (max-width: 505px) {
        &.modal-layer__content { margin: 5rem var(--mobile-page-vertical-padding); }
      }
    }
  }
}
</style>