<template>
  <div class="page-index">
    <HeroSection />
    <div class="container">
      <BlogSection :blogs="blogs"/>
      <PortfolioSection/>
      <AboutSection />
      <ExperienceSection />
    </div>
      <CallToActionSection />
    <div class="container">
      <lazy-component>
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

  import blogsEn from '~/contents/en/blogsEn.js'
  import blogsEs from '~/contents/es/blogsEs.js'

  export default {
    async asyncData ({store}) {

      const blogs = store.state.i18n.locale === 'en' ? blogsEn : blogsEs
      
      async function asyncImport (blogName) {
        const wholeMD = await import(`~/contents/${store.state.i18n.locale}/blog/${blogName}.md`)
        return wholeMD.attributes
      }

      return Promise.all(blogs.map(blog => asyncImport(blog)))
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
        return `${process.env.baseUrl}/images/fb-banner.jpg`;
      }
    }
  }
</script>
