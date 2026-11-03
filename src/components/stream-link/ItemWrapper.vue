<template>
  <div class="stream-link-wrapper">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'stream-link-wrapper'
}
</script>

<style lang="scss">
.stream-link-wrapper:not(:last-child) {
  position: relative;
  margin-bottom: .25rem;
  padding-bottom: .25rem;
}
</style>