<template>
  <nuxt-link
    v-if="isWork"
    class="card"
    :to="`/work/${work.name}`"
    >
    <div class="cardThumbnail-container">
      <img class="cardThumbnail" v-lazy="cardImage" alt="">
    </div>
    <span class="cardTitle">{{ work.title }}</span>
    <span class="cardRole">{{ work.role }}</span>
  </nuxt-link>
  <a
    v-else
    class="card"
    target="_blank"
    :href="article.url"
    >
    <div class="cardThumbnail-container">
      <div
        class="cardThumbnail"
        v-lazy:background-image="cardImage"/>
    </div>
    <span class="cardTitle">{{ article.title }}</span>
    <span class="cardRole">{{ article.appear_on }}</span>
  </a>

</template>

<script lang="js">
  // import Vue from "vue";
  // // import Component from "nuxt-class-component";
  //
  // import { namespace } from "vuex-class";
  // import { name as PixelsNamespace } from "~/store/modules/pixels";
  // const PixelsStore = namespace(PixelsNamespace);

  // import { Work } from "~/store/modules/work";
  //
  // @Component({
  //   props: {
  //     work: {
  //       type: Object,
  //     },
  //     article: {
  //       type: Object
  //     }
  //   }
  // })
  export default {
    // @PixelsStore.Action setDefaultColors;
    // @PixelsStore.Action setColors;
    //
    // work: Work;
    // article: any;

    props: {
      work: {
        type: Object,
      },
      article: {
        type: Object
      }
    },

    computed: {
      isWork: function() {
        return !!this.work;
      },
      cardImage: function() {
        return this.isWork ?
          `/images/work/${this.work.name}/_thumbnail.jpg` :
          `/images/articles/${this.article.name}.jpg`;
      }
    }

    // get isWork (): boolean {
    //   return !!this.work;
    // }
    //
    // get cardImage (): string {
    //   return this.isWork ?
    //     `/images/work/${this.work.name}/_thumbnail.jpg` :
    //     `/images/articles/${this.article.name}.jpg`;
    // }
    //
    // onFocusCard () {
    //   this.setColors(this.isWork ? this.work.colors : this.article.colors);
    // }
  }
</script>

<style lang="scss" scoped>
.cardThumbnail {
    transition: all ease .75s;
    opacity: .7;
    &[lazy='loaded'] {
      opacity: 1;
    }
  }
</style>
