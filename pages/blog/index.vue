<template>
  <div class="page-blog">
    <div class="container">
      <BlogSection />
    </div>
  </div>
</template>

<script>
  import BlogSection from "~/components/Sections/BlogSection"

  export default {

    components: { BlogSection },

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
