<template>
  <div class="links-list">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'links-list',
}
</script>

<style lang="scss">
.links-list {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 1rem;
}
</style>
