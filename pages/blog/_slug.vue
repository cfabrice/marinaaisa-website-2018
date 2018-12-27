<template>
  <section class="blogSelected">
    <div class="intro">
      <div class="elevate-cover">
        <div class="elevate-cover__textOffset">
          <div class="elevate-cover__text">
            <span class="blogSelected-year">{{ year }}</span>
            —
            <nuxt-link
              v-if="trans"
              v-for="(locale, i) in showLocales"
              :key="i"
              :to="(locale.code == 'en' ? '' : '/' + locale.code) + '/blog/' + trans">
              
                {{ $t('changeLanguagePost') }}
            </nuxt-link>
            <h1 class="elevate-cover__title">
              {{ title }}
            </h1>
            <p class="elevate-cover__description">{{ description }}</p>
          </div>
        </div>
        <ImageResponsive
          :imageURL="'blog/' + id + '/_main.jpg'"
          width="100%"
          class="elevate-cover__img"
          :alt="'Blog picture'" />
      </div>
    </div>
    <div class="container small">
      <DynamicMarkdown
        :render-func="renderFunc"
        :static-render-funcs="staticRenderFuncs" />
    </div>
  </section>
</template>

<script lang="js">
  
  import DynamicMarkdown from "~/components/Work/DynamicMarkdown.vue"
  import blogMedia from "~/components/Work/WorkMedia.vue"
  import Card from "~/components/Card.vue"


  export default {

    async asyncData ({params, store}) {
      const fileContent = await import(`~/contents/${store.state.i18n.locale}/blog/${params.slug}.md`)
      const attr = fileContent.attributes
      return {
        name: params.slug,
        title: attr.title,
        trans: attr.trans,
        year: attr.year,
        id: attr.id,
        owner: attr.owner,
        colors: attr.colors,
        role: attr.role,
        cardAlt: attr.cardAlt,
        description: attr.description,
        related: attr.related,
        renderFunc: fileContent.vue.render,
        staticRenderFuncs: fileContent.vue.staticRenderFns,
        image: {
          main: attr.image && attr.image.main,
          og: attr.image && attr.image.og
        }
      }
    },

    nuxtI18n: {
      seo: false
    },

    components: { DynamicMarkdown, blogMedia, Card },

    head () {
      return {
        title: this.pageTitle,
        htmlAttrs: {
          lang: this.$i18n.locale,
        },
        meta: [
          { name: "author", content: "Marina Aisa" },
          { name: "description", property: "og:description", content: this.description, hid: "description" },
          { property: "og:title", content: this.pageTitle },
          { property: "og:image", content: this.ogImage },
          { name: "twitter:description", content: this.description },
          { name: "twitter:image", content: this.ogImage }
        ],
        link: [
          this.hreflang
        ]
      };
    },

    computed: {
      ogImage: function () {
        return `${process.env.baseUrl}/images/ogp_1200x630.jpg`;
      },
      pageTitle: function () {
        return 'Marina Aisa | ' + this.title;
      },
      showLocales () {
        return this.$i18n.locales.filter(locale => locale.code !== this.$i18n.locale)
      },
      hreflang () {
        if (!this.trans) {
          return ''
        }
        return {
          hid: 'alternate-hreflang-' + this.showLocales[0].iso,
          rel: 'alternate',
          href: (this.showLocales[0].code === 'en' ? '' : this.showLocales[0].code) + '/blog/' + this.trans,
          hreflang: this.showLocales[0].code
        }
      }
    }
  }
</script>

<style lang="scss">
.overflowhidden {
  overflow: hidden;
}
.blogSelected-horizontalImage {
  height: 56rem;
  background-size: contain;
  transition: all ease .35s;
  opacity: 0;

  &[lazy='loading'] {
    filter: blur(15px);
    background-repeat: no-repeat!important;
    background-size: contain!important;
  }
  &[lazy='loaded'] {
    opacity: 1;
    background-repeat: no-repeat!important;
    background-size: contain!important;
  }
  .intro {
    display: flex;
  }
}
.elevate-cover {
  display: flex;
  flex-direction: column;

  @media (min-width: $screen-md){
    flex-direction: row;
  }

  &__img, &__textOffset {
    width: 100%;
  }

  &__text {
    max-width: 500px;
    width: 100%;
    padding: 2.4rem;

    @media (min-width: $screen-md){
      margin-left: auto;
      padding: 2.4rem 4rem 2.4rem 2.4rem;
    }
  }

  &__textOffset {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__title {
    font-size: 4rem;
    font-family: 'Tiempos Headline', Arial, sans-serif;
    color: $secondary;
  }

  &__description {
    margin: 0;
  }
}
.dynamicMarkdown {
  font-size: 21px;
  line-height: 1.7;

  p, h2 {
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
