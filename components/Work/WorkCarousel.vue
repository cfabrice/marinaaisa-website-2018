<template>
  <div class="workCarousel">
    <no-ssr>
      <carousel
        :per-page="1"
        :loop="true"
        :pagination-size="12"
        pagination-color="#999999"
        pagination-active-color="#555555">
        <slide
          v-for="mediaPathFromArray in mediaPaths"
          :key="mediaPathFromArray">
          <work-img :path="mediaPathFromArray" />
        </slide>
      </carousel>
    </no-ssr>
  </div>
</template>

<script lang="js">
  import Vue from "vue";
  // import Component from "nuxt-class-component";
  import { Carousel, Slide } from "vue-carousel";

  import WorkImg from "./WorkImg.vue";

  export default {

    components: { Carousel, Slide, WorkImg },
    props: {
      names: {
        type: Array,
        required: true
      }
    },
    computed: {
      mediaPaths: function () {
        const slug= this.$route.params.slug;
        return this.names.map(n => `/images/work/${slug}/${n}`);
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
