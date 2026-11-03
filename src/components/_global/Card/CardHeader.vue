<template>
  <div
    class="card-header"
    @contextmenu="$event.preventDefault()"
    @dragstart="$event.preventDefault()"
    @drop="$event.preventDefault()"
  >
  <div class="card-header__before">
      <slot name="before" />
    </div>
    <div v-if="title || subtitle" class="card-header__content">
      <div v-if="title" class="card-header__title">{{ title }}</div>
      <div v-if="subtitle" class="card-header__subtitle">{{ subtitle }}</div>
    </div>
    <div class="card-header__after">
      <slot name="after" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'card-header',
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
.card-header {
  background: #d9d5a2;
  border-bottom: 2px solid #490b6d;
  border-radius: 4px 4px 0 0;
  box-shadow: var(--x-box-shadow--6);
  margin: -1rem -1rem 1rem;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  font-family: "Pixelify Sans", sans-serif;
  font-optical-sizing: auto;
  user-select: none;

  position: relative;
  white-space: nowrap;
  min-height: 52px;

  &__title {
    color: #262339;
    white-space: pre-line;
    word-wrap: break-word;
    word-break: break-word;
    font-weight: 400;
    font-size: 2.3rem;
    line-height: calc(1.2 * 1em);
  }
  &__subtitle {
    color: #484467;
    white-space: pre-line;
    word-wrap: break-word;
    word-break: break-word;
    font-weight: 400;
    font-size: 2rem;
    line-height: calc(1.2 * 1em);
  }

  &__before {
    flex-basis: 0;
    flex-grow: 1;
    flex-shrink: 0;
    opacity: 1;
    display: flex;
    justify-content: start;
  }

  &__after {
    flex-basis: 0;
    flex-grow: 1;
    flex-shrink: 0;
    opacity: 1;
    display: flex;
    justify-content: end;
  }
}
</style>