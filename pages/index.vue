<template>
  <div class="page-index">
    <div class="hero" id="hero">
    	<div class="hero__content">
        <div v-lazy-container="{ selector: 'img' }">
          <img :data-src="require('@/assets/images/marina-aisa-photo.jpg')" :data-loading="require('@/assets/images/marina-aisa-photo.jpg?size=100')" class="hero__profile" alt="Marina Aisa Picture" />
        </div>
        <div class="hero__text">
          <h1 id="hero-text">
            <span id="hero-text-content"></span>
          </h1>
        </div>
    	</div>
    </div>
    <div class="container">
      <i18n
        path="index.greeting.message"
        tag="h1"
        for="index.greeting.name">
        <nuxt-link
          to="/about">
          {{ $t("index.greeting.name") }}
        </nuxt-link>
      </i18n>
      <div id="works">
        <card
          v-for="work in works"
          :key="work.name"
          :work="work" />
      </div>
    </div>
  </div>
</template>

<script lang="js">
  import theaterJS from 'theaterJS';
  import createStore from '~/store/index';
  import Card from "~/components/Card.vue";

  export default {

    components: { Card },

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
        works: this.$store.state[this.$store.state.locale]
      }
    },

    computed: {
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
    },

    mounted: function() {
      var theater = theaterJS()

      theater
        .on('type:start, erase:start', function () {
          theater.getCurrentActor().$element.classList.add('hero-text--typing')
        })
        .on('type:end, erase:end', function () {
          theater.getCurrentActor().$element.classList.remove('hero-text--typing')
        })
        .on('type:start, erase:start', function () {
          if (theater.getCurrentActor().name === 'hero-text') {
            document.body.classList.add('dark')
          } else {
            document.body.classList.remove('dark')
          }
        })

      theater
        .addActor('hero-text-content', { speed: .9, accuracy: 1 })
        .addScene('hero-text-content: Hi! I\'m <a target="_blank" href="https://twitter.com/MarinaAisa">Marina Aisa</a>', 600, ', <br> a product designer.', 600, function (done) { document.getElementById("hero-text").style.background = 'black'; done(); }, -17, 'front-end developer.', 600,function (done) { document.getElementById("hero-text").style.background = 'white'; done(); })
        .addScene(theater.replay.bind(theater))
    }
  }
</script>

<style lang="scss">
.hero {
width: 100%;
background: $background-secondary;
text-align: center;
position: relative;

.hero__content {
  vertical-align: middle;
  @extend .container;
  overflow: hidden;
}

.hero__text {
  position: relative;
  top: 39%;
  background: white;
  min-height: 74px;
  margin-bottom: 2rem;
  padding: 0;
  width: 100%;
  @media (min-width: $screen-sm){
    width: 48%;
    position: absolute;
    min-height: 0;
    margin-bottom: 0;
  }
  @media (min-width: $screen-md){
    width: 40%;
  }
  @media (min-width: $screen-lg){
    width: 30%;
  }
  @media (min-width: $screen-xlg){
    width: 40rem;
  }

  h1 {
    margin-bottom: 0;
    padding: .7rem 2rem;
    text-align: left;
    transition:
      background-color 0.3s ease-out,
  }
}

.hero__profile {
  width: 50%;
  margin-bottom: -8px;
  @media (min-width: $screen-sm){
    float: right;
    margin-bottom: 0;
  }
  transition: all ease .75s;
  opacity: 0;
  &[lazy='loading'] {
    opacity: 1;
    filter: blur(5px);
  }
  &[lazy='loaded'] {
    opacity: 1;
  }
}

.hero__image {
  height: 90px;
  width: auto;
  @include margin-bottom(50px);

  svg {
    opacity: .2;
  }
}

.hero__button {
  margin-top: 2em;
}

@keyframes blink {
  from { opacity: 0; }
  to { opacity: 1; }
}

.hero-text--typing::after {
  content: '|';
  animation: blink 500ms infinite;
  color: $primary;
}
&__waving {
  width: 27px;
  @media (min-width: $screen-sm){
    width: 36px;
  }
}
}
</style>
