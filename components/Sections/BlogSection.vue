<template>
  <section>
    <h2>{{ $t('posts') }}</h2>
    <span class="emoji-title emoji--writing"/>
    <div id="blogs">
      <card
        v-for="blog in blogs"
        :key="blog.name"
        :work="blog"
        :isWork="false" />
    </div>
  </section>
</template>
<script>
import Card from "~/components/Card.vue";
export default {
  components: { Card },
  data () {
    const store = this.$store.state[this.$i18n.locale];
    return {
      blogs: store.blogs
    }
  }
}
</script>

