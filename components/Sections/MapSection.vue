<template>
  <section class="map">
    <div class="map__container">
      <div class="map__title">
        <h1>Hobby: Discovering the world</h1>
      </div>
      <div class="map__content">
        <div class="map__text">
          <p>
            These are all the countries that I have <span class="map__text--visited">visited</span> or <span class="map__text--lived">lived in</span>.
          </p>
        </div>
        <div class="map__map">
          <Map :visited="this.visited"/>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import Map from "~/components/Map.vue";
export default {
  components: { Map },
  data () {
    return {
      visited: [
        'ES', 'FR'
      ]
    }
  }
}
</script>

