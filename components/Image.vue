<template lang="html">
  <div v-lazy-container="{ selector: 'img' }" class="image-placeholder">
    <img :data-src="imageRequired" :data-loading="imageRequired.placeholder" :width="width" :height="height" :class="classes" :alt="alt" />
  </div>
</template>

<script>
export default {
  props: {
    imageURL: {
      type: String
    },
    alt: {
      type: String
    },
    width: {
      type: String
    },
    height: {
      type: String
    },
    classes: {
      type: String
    },
    alt: {
      type: String
    }
  },
  computed: {
    imageRequired () {
      return require("@/assets/images/" + this.imageURL);
    }
  }
}
</script>

<style scoped lang="scss">

.image-placeholder {
  overflow: hidden;
}

img {
  transition: all ease .75s;
  opacity: 0;

  &[lazy='loading'] {
    opacity: 1;
    filter: blur(15px);
  }
  &[lazy='loaded'] {
    opacity: 1;
  }
}

</style>
