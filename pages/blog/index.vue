<template>
  <div class="page-blog">
    <div class="container">
      <BlogSection />
    </div>
  </div>
</template>

<script>
  import HeroSection from "~/components/Sections/HeroSection"
  import PortfolioSection from "~/components/Sections/PortfolioSection"
  import BlogSection from "~/components/Sections/BlogSection"
  import AboutSection from "~/components/Sections/AboutSection"
  import ExperienceSection from "~/components/Sections/ExperienceSection"
  import CallToActionSection from "~/components/Sections/CallToActionSection"
  import MapSection from "~/components/Sections/MapSection"

  export default {

    components: { PortfolioSection, BlogSection, HeroSection, AboutSection, ExperienceSection, CallToActionSection, MapSection },

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
