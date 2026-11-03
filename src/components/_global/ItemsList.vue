<template>
  <div v-if="hasData || loading" class="items-list" :class="`items-list--${type}`">
    <template v-if="hasData">
      <slot />

      <template v-if="hasMore">
        <loadmore-trigger @intersected="$emit('more')" />
        <n-button mode="secondary" @click.exact="$emit('more')" size="l" :stretched="true" :disabled="loading">{{ $t('action.load_more') }}</n-button>
      </template>
    </template>

    <template v-else-if="loading">
      <slot name="skeleton" />
    </template>
  </div>
</template>

<script setup>
import { NButton, LoadmoreTrigger } from '@vue-norma/ui'

defineOptions({ name: 'items-list' })
const emit = defineEmits(['more'])

const props = defineProps({
  type:    { type: String,  default: 'default' },
  loading: { type: Boolean, default: false },
  hasMore: { type: Boolean, default: false },
  hasData: { type: Boolean, default: false },
})

</script>

<style lang="scss">
.items-list {
  display: flex;
  flex-direction: column;

  & > *:not(:last-child) {
    position: relative;
    margin-bottom: var(--m-size, 1.5rem);
  }
}
</style>