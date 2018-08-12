<template>
  <div class="workImg">
    <img
      class="workImg-image"
      :alt="alt || caption"
      :src="path"
    >
    <span
      class="workImg-caption"
      v-if="caption">
      {{ caption }}
    </span>
  </div>
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
      caption: {
        type: String,
      },
      alt: {
        type: String
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
