<template>
  <div>
    <LangSwitcher />
    <nuxt/>
    <Footer />
  </div>
</template>
<script>
  import LangSwitcher from '~/components/LangSwitcher'
  import Footer from '~/components/Sections/Footer'

  export default {
    components: { LangSwitcher, Footer }
  }
</script>