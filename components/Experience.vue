<template lang="html">
  <div class="experience">
    <li :class="`experience__item ${isActive}`">
      <div class="experience__time-place">
        <div class="experience__place">
          {{ item.place }}
        </div>
        <div class="experience__time">
          {{ item.startingTime }} - <span :class="isActive">{{ item.finishTime }}</span>
        </div>
      </div>
      <div class="experience__image">
        <img class="img-circle img-responsive" :src="`images/work-experience/${item.imageURL}.png`" :alt="item.company">
      </div>
      <div class="experience__panel">
        <div class="experience__position">
          <h4>{{ item.position }} —
          <a target="_blank" :href="item.companyURL" class="experience__company ani">
            <span>{{ item.company }}</span>
          </a>
        </h4>
        </div>
        <div class="experience__description">
          <p>
            {{ item.description }} Here is where I learnt <span class="experience__learnt">{{ item.learnt }}</span>
          </p>
        </div>
      </div>
    </li>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    }
  },
  computed: {
    isActive () {
      this.item.isActive ? 'active' : '';
    }
  }
}
</script>

<style lang="scss">
.experience {
  position: relative;
  padding: 0;

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
    // // @include make-sm-column(2, 0);
    padding-top: 1.5rem;
    margin-bottom: 1rem;
    @media (min-width: $screen-sm){
      margin-bottom: 0;
    }
  }
  &__time {
    .active {
      color: $primary;
    }
  }

  &__panel {
    // @include make-sm-column(9, 0);
    position: relative;
    width: 100%;
    padding: 0;
    text-align: left;
    @media (min-width: $screen-sm){
      padding: 0 0 0 2.7rem;
    }
  }
  &__image {
    position: relative;
    // @include make-column(2, 0);
    // @include make-sm-column(1, 0);
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
      border-radius: 100%;
      text-align: center;
      float: left;
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
