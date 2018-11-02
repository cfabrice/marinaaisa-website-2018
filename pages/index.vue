<template>
  <div class="page-index">
    <LangSwitcher />
    <HeroSection />
    <div class="container">
      <PortfolioSection />
      <BlogSection />
      <AboutSection />
      <ExperienceSection />
      <CallToActionSection />
      <MapSection />
    </div>
  </div>
</template>

<script lang="js">
  import LangSwitcher from '~/components/LangSwitcher'
  import HeroSection from "~/components/Sections/HeroSection.vue";
  import PortfolioSection from "~/components/Sections/PortfolioSection.vue";
  import BlogSection from "~/components/Sections/BlogSection.vue";
  import AboutSection from "~/components/Sections/AboutSection.vue";
  import ExperienceSection from "~/components/Sections/ExperienceSection.vue";
  import CallToActionSection from "~/components/Sections/CallToActionSection.vue";
  import MapSection from "~/components/Sections/MapSection.vue";

  export default {

    components: { LangSwitcher, PortfolioSection, BlogSection, HeroSection, AboutSection, ExperienceSection, CallToActionSection, MapSection },

    head () {
      return {
        title: this.pageTitle,
        meta: [
          { name: "author", content: "Marina Aisa" },
          { name: "description", property: "og:description", content: this.pageDescription, hid: "description" },
          { property: "og:title", content: this.pageTitle },
          { property: "og:url", content: this.ogUrl },
          { property: "og:image", content: this.ogImage },
          { name: "twitter:description", content: this.pageDescription },
          { name: "twitter:image", content: this.ogImage }
        ]
      };
    },

    computed: {
      ogUrl: function () {
        return process.env.baseUrl;
      },
      ogImage: function () {
        return `${process.env.baseUrl}/images/ogp_1200x630.jpg`;
      },
      pageTitle: function () {
        return "title";
      },
      pageDescription: function () {
        return "description";
      }
    }
  }
</script>
