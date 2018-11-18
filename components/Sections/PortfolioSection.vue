<template>
  <section>
    <h2>Portfolio</h2>
    <div id="works">
      <card
        v-for="work in works"
        :key="work.name"
        :work="work"
        :isWork="true" />
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
      works: store.works
    }
  }
}
</script>

