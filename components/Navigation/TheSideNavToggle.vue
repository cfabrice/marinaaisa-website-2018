<template>
  <div
    class="drawer-toggle"
    role="button"
    @click="$emit('toggle')">
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
  </div>
</template>

<style scoped lang="scss">
.drawer-toggle {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 50%;
  width: 35px;
  cursor: pointer;

  @media (min-width: $screen-sm){
    display: none;
  }

  .bar {
    width: 90%;
    height: 2px;
    background-color: white;
    margin-bottom: .8rem;
    border-radius: 20px;
  }
}
</style>
