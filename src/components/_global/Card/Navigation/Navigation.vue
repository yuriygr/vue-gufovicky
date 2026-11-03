<template>
  <div class="card-navigation">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'card-navigation'
}
</script>

<style lang="scss">
.card-navigation {
  & + & {
    margin-top: 1.75rem;
  }
}
</style>