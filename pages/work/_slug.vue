<template>
  <section class="workSelected">
    <div class="overflowhidden">
      <div
        class="workSelected-horizontalImage"
        v-lazy:background="objImageUrl" />
      </div>
    </div>
    <div class="outerMoat">
      <h1>
        {{ work.title }}
        <span class="workSelected-year">{{ work.year }}</span>
      </h1>
      <p>{{ work.description }}</p>
      <dl class="workSelected-meta">
        <dt>Product Owner</dt>
        <dd>{{ work.owner }}</dd>
        <dt>Product Role</dt>
        <dd>{{ work.role }}</dd>
      </dl>
      <DynamicMarkdown
        :render-func="work.renderFunc"
        :static-render-funcs="work.staticRenderFuncs" />
      <div id="relatedWorks">
        <span class="relatedWorks-header">"See more"</span>
        <div class="relatedWorks-cards">
          <card
            v-for="work in relatedWorks"
            :key="work.name"
            :work="work" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="js">

  import DynamicMarkdown from "~/components/Work/DynamicMarkdown.vue";
  import WorkMedia from "~/components/Work/WorkMedia.vue";
  import Card from "~/components/Card.vue";

  export default {

    components: { DynamicMarkdown, WorkMedia, Card },

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
      let mainImageUrl = require("@/assets/images/work/" + this.$route.params.slug + "/_main.jpg");
      return {
        work: this.searchArray(this.$route.params.slug, this.$store.state[this.$store.state.locale].works),
        relatedWorks: this.$store.state[this.$store.state.locale].works,
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
.workSelected-horizontalImage {
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
}
</style>
