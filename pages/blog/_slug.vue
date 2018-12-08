<template>
  <section class="blogSelected">
    <div class="intro">
      <nuxt-link
        v-if="blog.trans"
        v-for="(locale, i) in showLocales"
        :key="i"
        :to="(locale.code == 'en' ? '' : '/' + locale.code) + '/blog/' + blog.trans">
        <button>
          Cambio de idioma
        </button>
      </nuxt-link>
      <ImageResponsive
        :imageURL="'blog/' + blog.id + '/_main.jpg'"
        :width="'50%'"
        :alt="'Blog picture'" />
      <h1>
        {{ blog.title }}
        {{ blog.trans }}
        <span class="blogSelected-year">{{ blog.year }}</span>
      </h1>
    </div>
    <div>
      <p>{{ blog.description }}</p>
      <dl class="blogSelected-meta">
        <dt>Product Owner</dt>
        <dd>{{ blog.owner }}</dd>
        <dt>Product Role</dt>
        <dd>{{ blog.role }}</dd>
      </dl>
      <DynamicMarkdown
        :render-func="blog.renderFunc"
        :static-render-funcs="blog.staticRenderFuncs" />
      <div id="relatedblogs">
        <span class="relatedblogs-header">"See more"</span>
        <div class="relatedblogs-cards">
          <card
            v-for="blog in relatedblogs"
            :key="blog.name"
            :work="blog"
            :isWork="false" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="js">
  
  import DynamicMarkdown from "~/components/Work/DynamicMarkdown.vue"
  import blogMedia from "~/components/Work/WorkMedia.vue"
  import Card from "~/components/Card.vue"


  export default {

    async asyncData ({params, store}) {
      const blogs = store.state[store.state.i18n.locale].blogs
      return {
        blog: blogs[params.slug],
        relatedblogs: blogs
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
          { name: "description", property: "og:description", content: this.pageDescription, hid: "description" },
          { property: "og:title", content: this.pageTitle },
          { property: "og:url", content: this.ogUrl },
          { property: "og:image", content: this.ogImage },
          { name: "twitter:description", content: this.pageDescription },
          { name: "twitter:image", content: this.ogImage },
        ],
        link: [
          this.hreflang
        ]
      };
    },

    computed: {
      ogUrl () {
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
      },
      showLocales () {
        return this.$i18n.locales.filter(locale => locale.code !== this.$i18n.locale)
      },
      hreflang () {
        if (!this.blog.trans) {
          return ''
        }
        if (this.blog.trans) {
          return {
            hid: 'alternate-hreflang-' + this.showLocales[0].iso,
            rel: 'alternate',
            href: (this.showLocales[0].code === 'en' ? '' : this.showLocales[0].code) + '/blog/' + this.blog.trans,
            hreflang: this.showLocales[0].code
          }
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
</style>
