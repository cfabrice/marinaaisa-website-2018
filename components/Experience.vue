<template lang="html">
  <li :class="`experience__item experience__item--${isActive}`">
    <div class="experience__time-place">
      <div class="experience__place">
        {{ $t(`${type}.${item.id}.place`) }}
      </div>
      <div class="experience__time">
        <span v-if="!item.noStartingTime">{{ $t(`${type}.${item.id}.startingTime`) }} - </span><span :class="isActive">{{ $t(`${type}.${item.id}.finishTime`) }}</span>
      </div>
    </div>
    <div class="experience__image">
      <ImageResponsive
        :imageURL="`${type}/${item.id}.png`"
        :classes="'img-circle img-responsive'"
        :width="'79'"
        :height="'79'"
        :radius="true"
        :alt="$t(`${type}.alt`) + item.name" />
    </div>
    <div class="experience__panel">
      <div class="experience__position">
        <h4>{{ $t(`${type}.${item.id}.position`) }} —
        
        <a v-if="!item.noURL" target="_blank" :href="$t(`${type}.${item.id}.url`)" class="experience__company ani">
          <span>{{ $t(`${type}.${item.id}.name`) }}</span>
        </a>
        <span v-else >{{ $t(`${type}.${item.id}.name`) }}</span>
      </h4>
      </div>
      <div class="experience__description">
        <p>
          {{ $t(`${type}.${item.id}.description`) }} {{ $t(`${type}.hereIlearnt`) }} <span class="experience__learnt">{{ $t(`${type}.${item.id}.learnt`) }}</span>
        </p>
      </div>
    </div>
  </li>
</template>

<script>
import ImageResponsive from "~/components/Image.vue";

export default {
  components: { ImageResponsive },

  props: {
    item: {
      type: Object
    },
    type: {
      type: String
    }
  },
  computed: {
    isActive () {
      return this.item.isActive ? 'active' : '';
    }
  }
}
</script>

<style lang="scss">
.experience {
  position: relative;
  padding: 0;

  &__item {
    @media (min-width: $screen-sm){
      display: flex;
    }
  }

  &__content {
    vertical-align: middle;
    list-style: none;
    position: relative;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 14rem;
      left: 21%;
      width: 2px;
      display: block;
      margin-left: -1.5px;
      display: none;
      background-color: $secondary-lighter;
      @media (min-width: $screen-sm){
        display: initial;
      }
      @media (min-width: $screen-md){
        bottom: 11rem;
      }
    }

    > li {
      position: relative;
      margin-bottom: 1rem;
      min-height: 5rem;

      &:before,&:after {
        content: " ";
        display: table;
      }

      &:after {
        clear: both;
      }
      @media (min-width: $screen-sm){
        margin-bottom: 5rem;
      }
    }
  }

  &__time-place {
    width: 100%;
    padding-top: 1.5rem;
    margin-bottom: 1rem;
    @media (min-width: $screen-sm){
      margin-bottom: 0;
      width: 16.66667%;
    }
  }
  &__time {
    .active {
      color: $primary;
    }
  }

  &__panel {
    position: relative;
    padding: 0;
    text-align: left;
    @media (min-width: $screen-sm){
      padding: 0 0 0 2.7rem;
      width: 75%;
    }
  }
  &__image {
    position: relative;
    width: 16.66667%;
    height: 16.66667%;

    @media (min-width: $screen-sm){
      height: 8.33333%;
      width: 8.33333%;
    }

    &:after {
      content: " ";
      display: block;
      position: absolute;
      top: -5px;
      left: -5px;
      height: calc(100% + 6px);
      border-radius: 100%;
      background: white;
      border: 2px solid $secondary-lighter;
      width: calc(100% + 6px);

      .experience__item--active & {
        border: 2px solid $primary;
      }
    }

    img {
      z-index: 100;
      position: relative;
      width: 100%;
      height: auto;
      margin-left: 0;
      text-align: center;
    }
  }
  &__position,
  &__place,
  &__studies {
    color: $secondary;
  }
  &__description {
    margin-top: 2rem;
    @media (min-width: $screen-sm){
      margin-top: 0;
    }
  }
  &__learnt {
    color: $secondary;
  }
  &__place,
  &__time {
    display: inline-block;
    @media (min-width: $screen-sm){
      display: block;
    }
  }
  &__time {
    float: right;
    @media (min-width: $screen-sm){
      float: initial;
    }
  }
  &__position,
  &__studies {
    padding: .3rem 0 0 7rem;
    min-height: 5rem;
    @media (min-width: $screen-sm){
      padding: 0;
      min-height: 0;
    }
  }
  }
  ul {
    padding-left: 0;
  }

</style>
