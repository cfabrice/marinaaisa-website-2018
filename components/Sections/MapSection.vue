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
          <Map :visited="this.visited" :lived="this.lived"/>
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
        'AT', 'PL', 'KH', 'DK', 'BG', 'CZ', 'EE', 'FR', 'DE', 'EE',
        'FR', 'DE', 'HU', 'IE', 'IT', 'NL', 'NO', 'RU', 'SE', 'CH',
        'UA', 'US', 'GB', 'ID', 'MY', 'TH', 'VN'
      ],
      lived: [
        'ES', 'FI', 'CN', 'BE'
      ]
    }
  }
}
</script>

