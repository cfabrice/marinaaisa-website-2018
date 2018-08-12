<template>
  <section class="workSelected">
    <div
      class="workSelected-horizontalImage"
      v-lazy:background-image="mainImageUrl" />
    <div class="outerMoat">
      <h1>
        {{ work.title }}
        <span class="workSelected-year">{{ work.year }}</span>
      </h1>
      <p>{{ work.description }}</p>
      <dl class="workSelected-meta">
        <dt>{{ $t("work.product_owner") }}</dt>
        <dd>{{ work.owner }}</dd>
        <dt>{{ $t("work.role") }}</dt>
        <dd>{{ work.role }}</dd>
      </dl>
      <DynamicMarkdown
        :render-func="work.renderFunc"
        :static-render-funcs="work.staticRenderFuncs" />
      <div id="relatedWorks">
        <span class="relatedWorks-header">{{ $t("work.see_more") }}</span>
        <div class="relatedWorks-cards">
          <card
            v-for="relatedWork in relatedWorks"
            :key="relatedWork.name"
            :work="relatedWork" />
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
          { name: "author", content: this.$t("index.author") },
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
      return {
        work: this.searchArray(this.$route.params.slug, this.$store.state[this.$store.state.locale])
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
      mainImageUrl: function () {
        return `/images/work/${this.$route.params.slug}/${this.work.image.main || "_main.jpg"}`;
      },

      relatedWorks: function () {
        const array = this.$store.state[this.$store.state.locale];
        const index = array.findIndex(x => x.name==this.work.name);
        return array;
      },
      ogUrl: function () {
        return process.env.baseUrl;
      },
      ogImage: function () {
        return `${process.env.baseUrl}/images/ogp_1200x630.jpg`;
      },
      pageTitle: function () {
        return this.$t("index.title");
      },
      pageDescription: function () {
        return this.$t("index.description");
      }
    }
  }
</script>

<style lang="scss">
.workSelected-horizontalImage {
  height: 56rem;
  background-size: contain;
  transition: all ease .35s;
  opacity: .7;
  &[lazy='loaded'] {
    opacity: 1;
    background-color: unset;
  }
}
</style>
