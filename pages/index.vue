<template>
  <div class="page-index">
    <LangSwitcher />
    <div class="hero" id="hero">
    	<div class="hero__content">
        <ImageResponsive
          :imageURL="'marina-aisa-photo.jpg'"
          :classes="'hero__profile'"
          :width="'478'"
          :height="'476'"
          :alt="'Imagen de Marina'" />
        <div class="hero__text">
          <h1 id="hero-text">
            <span id="hero-text-content"></span>
          </h1>
        </div>
    	</div>
    </div>
    <div class="container">
      <h2>Portfolio eey lo quasdad</h2>
      <div id="works">
        <card
          v-for="work in works"
          :key="work.name"
          :work="work"
          :isWork="true" />
      </div>
      <div id="blogs">
        <card
          v-for="work in blogs"
          :key="work.name"
          :work="work"
          :isWork="false" />
      </div>
      <p> {{ $t('hi') }}</p>
      <Experience
        v-for="item in workExperience"
        :key="item.name"
        :item="item"
        :isWork="true"
      />
    </div>
  </div>
</template>

<script lang="js">
  import LangSwitcher from '~/components/LangSwitcher'
  import theaterJS from 'theaterjs';
  import createStore from '~/store/index';
  import Card from "~/components/Card.vue";
  import ImageResponsive from "~/components/Image.vue";
  import Experience from "~/components/Experience.vue";
  import workExperience from '@/contents/workexperience.js';

  export default {

    components: { Card, ImageResponsive, Experience, LangSwitcher },

    head () {
      return {
        title: this.pageTitle,
        meta: [
          { name: "author", content: "Marina Aisa" },
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
      const store = this.$store.state[this.$i18n.locale];
      return {
        works: store.works,
        blogs: store.blogs,
        workExperience: [
          {
            id: 'thedream',
            finish_time: 'today',
            active: true,
            image: 'thedream'
          }
        ]
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
        return "title";
      },
      pageDescription: function () {
        return "description";
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

      theater.addActor('hero-text-content', { speed: .9, accuracy: 1 })
      if (this.$i18n.locale == 'en') {
        theater.addScene('hero-text-content: Hi! I\'m <a target="_blank" href="https://twitter.com/MarinaAisa">Marina Aisa</a>', 600, ', <br> a product designer.', 600, function (done) { document.getElementById("hero-text").style.background = 'black'; done(); }, -17, 'front-end developer.', 600,function (done) { document.getElementById("hero-text").style.background = 'white'; done(); })
      } else {
        theater.addScene('hero-text-content: Hola, soy <a target="_blank" href="https://twitter.com/MarinaAisa">Marina Aisa</a>', 600, ', <br> diseñadora de producto.', 600, function (done) { document.getElementById("hero-text").style.background = 'black'; done(); }, -17, 'front-end developer.', 600,function (done) { document.getElementById("hero-text").style.background = 'white'; done(); })
      }
      theater.addScene(theater.replay.bind(theater))
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
