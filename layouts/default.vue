<template>
  <div>
    <TheHeader @sidenavToggle="displaySidenav = !displaySidenav" />
    <TheSidenav
      :show="displaySidenav"
      @close="displaySidenav = false" />
    <nuxt/>
    <Footer />
  </div>
</template>
<script>
  import TheHeader from '~/components/TheHeader'
  import TheSidenav from '~/components/Navigation/TheSidenav'
  import Footer from '~/components/Sections/Footer'

  export default {
    components: {
      Footer,
      TheHeader,
      TheSidenav
    },
    data() {
      return {
        displaySidenav: false
      }
    }
  }
</script>