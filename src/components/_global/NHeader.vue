<template>
  <div class="n-header">
    <div v-if="title" class="n-header__title">{{ title }}</div>
    <div v-if="subtitle" class="n-header__subtitle">{{ subtitle }}</div>
  </div>
</template>

<script>
export default {
  name: 'n-header',
  props: {
    title: {
      type: [Boolean, String],
      default: false
    },
    subtitle: {
      type: [Boolean, String],
      default: false
    }
  },
  computed: { },
  methods: {
    hasSlot(name) { return !!this.$slots[name] },
  }
}
</script>

<style lang="scss">
.n-header {
  &__title {
    white-space: pre-line;
    word-wrap: break-word;
    word-break: break-word;
    font-weight: 400;
    font-size: 2.6rem;
    line-height: calc(1.5 * 1em);
  }
  &__subtitle {
    white-space: pre-line;
    word-wrap: break-word;
    word-break: break-word;
    font-weight: 400;
    font-size: 2rem;
    line-height: calc(1.4 * 1em);
  }
}
</style>