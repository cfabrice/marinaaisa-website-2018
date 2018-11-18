<template>
<div class="sidenav-container">
  <div
    v-if="show"
    class="sidenav-backdrop"
    @click="$emit('close')"></div>
  <transition name="slide-side">
    <div
      v-if="show"
      class="sidenav">
      <NavItems @click="$emit('close')"/>
    </div>
  </transition>
</div>
</template>

<script>
import NavItems from '~/components/Navigation/NavItems'

export default {
  name: "TheSidenav",
  components: {
    NavItems
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
};
</script>


<style scoped lang="scss">
.sidenav-container {
  height: 100%;
  width: 100%;
}

.sidenav-backdrop {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
}

.sidenav {
  height: auto;
  width: 100%;
  background-color: $primary;
  z-index: 10000;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  padding: 30px;
}

.slide-side-enter-active,
.slide-side-leave-active {
  transition: all 0.3s ease-out;
}
.slide-side-enter,
.slide-side-leave-to {
  transform: translateY(-100%);
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  flex-direction: column;
}

.nav-item {
  margin: 20px 0;
}

.nav-item a {
  text-decoration: none;
  color: white;
  font-size: 1.5rem;
}

.nav-item a:hover,
.nav-item a:active {
  color: red;
}
</style>
