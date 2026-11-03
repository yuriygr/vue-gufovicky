<template>
  <div class="app-tabbar" 
    @contextmenu="$event.preventDefault()"
    @dragstart="$event.preventDefault()"
    @drop="$event.preventDefault()"
  >
    <div class="app-tabbar__layout">
      <tabbar class="app-tabbar__tabbar">
        <tabbar-item :to="{ name: 'home' }" :title="$t('tabbar.home')">
          <icon name="home-line" size="24" />
        </tabbar-item>
        <tabbar-item :to="{ name: 'streams' }" :title="$t('tabbar.streams')">
          <icon name="videos-line" size="24" />
        </tabbar-item>
        <tabbar-item :to="{ name: 'clips' }" :title="$t('tabbar.clips')">
          <icon name="clips-line" size="24" />
        </tabbar-item>
        <tabbar-item :to="{ name: 'kb' }" :title="$t('tabbar.kb')">
          <icon name="kb-line" size="24" />
        </tabbar-item>
      </tabbar>
    </div>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Icon } from '@vue-norma/ui'

export default {
  name: 'app-tabbar',
  components: { Tabbar, TabbarItem, Icon },
  data() {
    return {}
  },
  computed: { },
  methods: {}
}
</script>

<style lang="scss">
.app-tabbar {
  --tabbar-item-count: 4;
}

.app-tabbar {
  height: var(--tabbar--height);
  z-index: 500;
  width: 100%;
  position: fixed;
  bottom: 6px;

  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);

  &__layout {
    background: #999 url("@/assets/tabbar.png") center / cover;
    image-rendering: pixelated;
    border: 2px solid #111;
    box-shadow: var(--x-box-shadow--4);
    border-radius: 8px;
    display: flex;
    justify-content: space-between;

    margin-right: auto;
    margin-left: auto;
  }

  &__tabbar.tabbar {
    grid-template-columns: repeat(var(--tabbar-item-count), 25%);
  }

  &--loading {
    opacity: 0.6;
  }
}
</style>