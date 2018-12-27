<template>
  <div class="page-index">
    <HeroSection />
    <div class="container">
      <BlogSection :blogs="blogs"/>
      <AboutSection />
      <ExperienceSection />
    </div>
      <CallToActionSection />
    <div class="container">
      <lazy-component @show="handler">
        <MapSection/>
      </lazy-component>
    </div>
  </div>
</template>

<script>
  import HeroSection from "~/components/Sections/HeroSection"
  import PortfolioSection from "~/components/Sections/PortfolioSection"
  import BlogSection from "~/components/Sections/BlogSection"
  import AboutSection from "~/components/Sections/AboutSection"
  import ExperienceSection from "~/components/Sections/ExperienceSection"
  import CallToActionSection from "~/components/Sections/CallToActionSection"
  const MapSection = () => import('~/components/Sections/MapSection')

  export default {
    async asyncData ({store}) {
    
      const blogsEn = ['blog-portfolio-using-vue-nuxt-vuex']
      const blogsEs = ['blog-portfolio-usando-vue-nuxt-vuex']

      const blogs = store.state.i18n.locale === 'en' ? blogsEn : blogsEs
      
      async function sacalotodo (blogname) {
        const wholeMD = await import(`~/contents/${store.state.i18n.locale}/blog/${blogname}.md`)
        return wholeMD.attributes
      }

      return Promise.all(blogs.map(blog => sacalotodo(blog)))
      .then((res) => {
        return {
          blogs: res
        }
      })
    },

    components: { PortfolioSection, BlogSection, HeroSection, AboutSection, ExperienceSection, CallToActionSection, MapSection },

    head () {
      return {
        title: this.$t('indexPageHead.title'),
        htmlAttrs: {
          lang: this.$i18n.locale,
        },
        meta: [
          { name: "author", content: "Marina Aisa" },
          { name: "description", property: "og:description", content: this.$t('indexPageHead.description'), hid: "description" },
          { property: "og:title", content: this.$t('indexPageHead.title') },
          { property: "og:image", content: this.ogImage },
          { name: "twitter:description", content: this.$t('indexPageHead.description') },
          { name: "twitter:image", content: this.ogImage }
        ]
      };
    },

    computed: {
      ogImage: function () {
        return `${process.env.baseUrl}/images/ogp_1200x630.jpg`;
      }
    },

    methods: {
      handler (component) {
        console.log('this component is showing')
      }
    }
  }
</script>
