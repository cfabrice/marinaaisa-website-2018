<template>
  <section class="blogSelected">
    <div class="intro">
      <ImageResponsive
        :imageURL="'blog/' + this.$route.params.slug + '/_main.jpg'"
        :width="'50%'"
        :alt="'Blog picture'" />
      <h1>
        {{ blog.title }}
        <span class="blogSelected-year">{{ blog.year }}</span>
      </h1>
    </div>
    <div>
      <p>{{ blog.description }}</p>
      <dl class="blogSelected-meta">
        <dt>Product Owner</dt>
        <dd>{{ blog.owner }}</dd>
        <dt>Product Role</dt>
        <dd>{{ blog.role }}</dd>
      </dl>
      <DynamicMarkdown
        :render-func="blog.renderFunc"
        :static-render-funcs="blog.staticRenderFuncs" />
      <div id="relatedblogs">
        <span class="relatedblogs-header">"See more"</span>
        <div class="relatedblogs-cards">
          <card
            v-for="blog in relatedblogs"
            :key="blog.name"
            :work="blog"
            :isWork="false" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="js">

  import DynamicMarkdown from "~/components/Work/DynamicMarkdown.vue";
  import blogMedia from "~/components/Work/WorkMedia.vue";
  import Card from "~/components/Card.vue";

  export default {

    components: { DynamicMarkdown, blogMedia, Card },

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

    data () {
      let mainImageUrl = require("@/assets/images/blog/" + this.$route.params.slug + "/_main.jpg");
      return {
        blog: this.searchArray(this.$route.params.slug, this.$store.state[this.$i18n.locale].blogs),
        relatedblogs: this.$store.state[this.$i18n.locale].blogs,
        objImageUrl: {
          src: mainImageUrl,
          loading: mainImageUrl.placeholder
        }
      }
    },

    methods: {
      searchArray: function (nameKey, myArray) {
        for (var i=0; i < myArray.length; i++) {
          if (myArray[i].name === nameKey) {
              return myArray[i];
          }
        }
      }
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

<style lang="scss">
.overflowhidden {
  overflow: hidden;
}
.blogSelected-horizontalImage {
  height: 56rem;
  background-size: contain;
  transition: all ease .35s;
  opacity: 0;

  &[lazy='loading'] {
    filter: blur(15px);
    background-repeat: no-repeat!important;
    background-size: contain!important;
  }
  &[lazy='loaded'] {
    opacity: 1;
    background-repeat: no-repeat!important;
    background-size: contain!important;
  }
  .intro {
    display: flex;
  }
}
</style>
