<template>
  <header>
    <nav id="headerLinks">
      <nuxt-link
        to="/"
        :class="{ active: $route.path == '/' }">
        Work
      </nuxt-link>
      <nuxt-link
        to="/about"
        :class="{ active: $route.path == '/about' }">
        About
      </nuxt-link>
    </nav>
  </header>
</template>

<script lang="js">
  import Vue from "vue";

  export default {

    data () {
      return {
        showNavigation: true
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
