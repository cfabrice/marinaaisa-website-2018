<template>
  <video
    class="workVideo"
    width="100%"
    autoplay
    loop>
    <source
      :src="path"
      type="video/mp4">
    Your browser does not support the video tag.
  </video>
</template>

<script lang="js">
  import Vue from "vue";
  // import Component from "nuxt-class-component";

  export default {
    props: {
      path: {
        type: String,
        required: true
      },
      alt: {
        type: String
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
