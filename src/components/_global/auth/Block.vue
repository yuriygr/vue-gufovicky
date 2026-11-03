<template>
  <div class="form-block">
    <div v-if="label" v-text="label" class="form-block__label" />
    <slot />
  </div>
</template>

<script>
export default {
  name: 'form-block',
  props: {
    label: {
      type: [ String, Number, Boolean ],
      default: false
    }
  }
}
</script>

<style lang="scss">
.form-block {
  margin-bottom: 1.75rem;
  position: relative;

  &:last-of-type { margin-bottom: 0; }

  &__label {
    font-family: "Pixelify Sans", sans-serif;
    font-optical-sizing: auto;
    display: block;
    font-weight: 500;
    font-size: 1.7rem;
    margin-bottom: .25rem;
    line-height: 2rem;
  }
}
</style>