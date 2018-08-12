<template>
  <div class="container">
    <header-navigation />
    <form
      netlify
      name="contact"
      netlify-honeypot="bot-field"
      style="display: none">
      <input
        type="hidden"
        name="form-name"
        value="contact">
      <input
        type="text"
        name="sender">
      <input
        type="email"
        name="email">
      <textarea
        id="hiddenTextArea"
        name="message" />
      <div
        netlify-recaptcha
        ref="recaptcha" />
    </form>
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
        <span>{{ $t('root.copyright', { year: new Date().getFullYear() }) }} /
        </span>
        <i18n
          path="root.made_by.message"
          tag="span">
          <nuxt-link
            to="/about"
            place="marina">
            {{ $t("root.made_by.marina") }}
          </nuxt-link>
        </i18n>
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
