<template>
  <div class="portfolio__item">
    <nuxt-link :to="`/work/${work.name}`" class="portfolio__thumb-inner">
      <div class="portfolio__thumb-hover" :style="backgroundColor">
        <h3 class="portfolio__thumb-description">
          {{ work.title }}
        </h3>
        <h3 class="portfolio__thumb-client<% if s.color_text_dark %>--dark<% end %>">
          {{ work.role }}
        </h3>
      </div>
      <img class="cardThumbnail" v-lazy="cardImage" alt="">
    </nuxt-link>
    <div class="portfolio__description">
      {{ work.title }}
    </div>
    <div class="portfolio__client">
      {{ work.role }}
    </div>
  </div>
</template>

<script lang="js">
  export default {
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
      },
      backgroundColor: function() {
        return `background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, ${this.work.colors} 70%);`
      }
    }
  }
</script>

<style lang="scss">
.cardThumbnail {
    transition: all ease .75s;
    opacity: .7;
    &[lazy='loaded'] {
      opacity: 1;
    }
  }
  .portfolio {
    width: 100%;
    position: relative;

    &__title {
      &--coming {
        color: $secondary-lighter;
      }
    }

    &__content {
  	  vertical-align: middle;
      padding-left: 0;
      padding-right: 0;
    }
    &__client {
      @media (min-width: $screen-sm){
        display: none;
      }
    }
    &__description {
      color: $secondary;
      padding-top: 1rem;
      @media (min-width: $screen-sm){
        display: none;
      }
    }
    &__thumb-inner {
      position: relative;
      font-size: 0;
      line-height: 0;
      display: block;

      &:hover {
        .portfolio__thumb-hover {
          opacity: 1;
        }
      }
    }

    &__thumb-hover {
      opacity: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      transition: all .3s ease;
      -moz-transition: all .3s ease;
      -webkit-transition: all .3s ease;
      -o-transition: all .3s ease;
      @media (max-width: $screen-sm){
        display: none;
      }
    }

    &__thumb-description {
      position: absolute;
      bottom: 5.8rem;
      left: 4rem;
      line-height: initial;
      text-align: left;
      color: white;
      &--dark {
        @extend .portfolio__thumb-description;
        color: $secondary;
      }
    }
    &__thumb-client {
      position: absolute;
      bottom: 3.5rem;
      left: 4rem;
      text-align: left;
      color: white;
      font-family: 'Graphik Regular', sans-serif;
      &--dark {
        @extend .portfolio__thumb-client;
        color: $secondary;
      }
    }
  }
</style>
