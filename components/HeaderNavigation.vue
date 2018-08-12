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
      <locale-switcher />
    </nav>
  </header>
</template>

<script lang="js">
  import Vue from "vue";
  import LocaleSwitcher from "~/components/LocaleSwitcher.vue";

  export default {
    components: { LocaleSwitcher },

    data () {
      return {
        showNavigation: true
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
