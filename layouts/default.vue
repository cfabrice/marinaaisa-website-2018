<template>
  <div>
    <nuxt/>
    <footer>
      <div id="exposures">
        <div class="mainExposures">
          <a
            v-for="exp in mainExposures"
            :key="exp[0]"
            :href="exp[1]"
            target="_blank">
            <svg-icon :name="exp[0]" />
          </a>
        </div>
      </div>
      <div id="copyright">
      </div>
    </footer>
  </div>
</template>

<script lang="js">
  import Vue from "vue";

  import HeaderNavigation from "~/components/HeaderNavigation.vue";
  import SvgIcon from "~/components/SvgIcon.vue";

  export default {
    components: { HeaderNavigation, SvgIcon },

    data () {
      return {
        mainExposures: [
          ["twitter", "https://twitter.com/marinaaisa"]
        ]
      }
    }
  }
</script>

<style lang="scss">

</style>
