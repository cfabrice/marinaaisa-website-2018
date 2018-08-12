<template>
  <div
    class="workMedia"
    :class="{ 'workMedia--shrink': full === 'false' }">
    <work-carousel
      v-if="multipleFileNames.length > 0"
      :names="multipleFileNames" />
    <work-video
      v-else-if="isVideo"
      :path="mediaPath"
    />
    <work-img
      v-else
      :path="mediaPath"
      :alt="alt"
      :caption="caption"
    />
  </div>
</template>

<script lang="js">
  import Vue from "vue";
  // import Component from "nuxt-class-component";

  import WorkImg from "./WorkImg.vue";
  import WorkVideo from "./WorkVideo.vue";
  import WorkCarousel from "./WorkCarousel.vue";

  export default {

    components: { WorkImg, WorkVideo, WorkCarousel },

    props: {
      name: {
        type: String,
        required: true
      },
      alt: {
        type: String
      },
      caption: {
        type: String
      },
      full: {
        type: String
      }
    },

    data () {
      return {
        multipleFileNames: "",
      }
    },

    created: function() {
      if (this.name.includes(",")) {
        this.multipleFileNames = this.name.split(",");
      } else {
        this.singleFileName = this.name;
      }
    },

    computed: {
      isVideo: function() {
        return !!this.singleFileName && !!this.singleFileName.match(/\.mp4$/);
      },
      isYoutube: function() {
        return !!this.singleFileName.match("https://www.youtube.com");
      },
      mediaPath: function() {
        const slug = this.$route.params.slug;
        return `/images/work/${slug}/${this.singleFileName}`;
      }
    }
  }
</script>

<style lang="scss">
</style>
