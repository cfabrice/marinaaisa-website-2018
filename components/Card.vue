<template>
  <div class="portfolio__item">
    <nuxt-link
      :to="localePath({
        name: nuxtLink,
        params: { slug: work.name }
      })" class="portfolio__thumb-inner">
      <div class="portfolio__thumb-hover" :style="backgroundColor">
        <h3 class="portfolio__thumb-description">
          {{ work.title }}
        </h3>
        <h3 class="portfolio__thumb-client<% if s.color_text_dark %>--dark<% end %>">
          {{ work.role }}
        </h3>
      </div>
      <ImageResponsive
        :imageURL="cardImage"
        :classes="'cardThumbnail'"
        :width="'952'"
        :height="'509'"
        :alt="work.cardAlt" />
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
import ImageResponsive from "~/components/Image.vue";

  export default {
    components: { ImageResponsive },
    props: {
      work: {
        type: Object
      },
      article: {
        type: Object
      },
      isWork: {
        type: Boolean
      }
    },

    computed: {
      cardImage: function() {
        return this.isWork ?
          `work/${this.work.name}/_thumbnail.jpg` :
          `blog/${this.work.name}/_thumbnail.jpg`;
      },
      nuxtLink: function() {
        return this.isWork ?
          'work-slug':
          'blog-slug';
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
