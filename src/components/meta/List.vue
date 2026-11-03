<template>
  <div class="stream-meta-list">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'stream-meta-list',
}
</script>

<style lang="scss">
.stream-meta-list {
  display: flex;
  justify-items: center;
  
  * + * {
    margin-left: .5rem;
  }
}
</style>