<template>
  <div :class="elClass">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'form-text',
  props: {
    align: {
      type: [ String ],
      default: 'left'
    }
  },
  computed: {
    elClass() {
      return [
        'form-text',
        'form-text--align-' + this.align
      ]
    }
  }
}
</script>

<style lang="scss">
.form-text {
  font-family: "Pixelify Sans", sans-serif;
  font-optical-sizing: auto;
  font-size: 1.7rem;
  line-height: calc(1.25 * 1em);
  margin-bottom: 1.5rem;
  position: relative;

  &--align-center {
    text-align: center;
  }

  &--align-right {
    text-align: right;
  }

  &--align-left {
    text-align: left;
  }

  &:last-of-type { margin-bottom: 0; }
}
</style>