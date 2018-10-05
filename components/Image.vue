<template lang="html">
  <div v-lazy-container="{ selector: 'img' }">
    <img :data-src="imageURL" :data-loading="imageURL.placeholder" :class="classes" :alt="alt" />
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
    classes: {
      type: String
    },
    alt: {
      type: String
    }
  }
}
</script>

<style scoped lang="scss">

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
