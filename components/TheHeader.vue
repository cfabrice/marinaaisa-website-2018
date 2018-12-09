<template>
  <header class="the-header">
    <div class="container">
      <TheSideNavToggle @toggle="$emit('sidenavToggle')" />
      <div class="spacer"></div>
      <div class="navigation-items">
        <NavItems/>
        <LangSwitcher/>
      </div>
    </div>
  </header>
</template>

<script>
import NavItems from '~/components/Navigation/NavItems'
import LangSwitcher from '~/components/LangSwitcher'
import TheSideNavToggle from "~/components/Navigation/TheSideNavToggle";

export default {
  name: "TheHeader",
  components: {
    TheSideNavToggle, LangSwitcher, NavItems
  }
};
</script>


<style lang="scss">

.the-header {
  width: 100%;
  height: 8rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 100;
  box-sizing: border-box;
  background: $secondary-light;
}

.logo {
  font-size: 1.3rem;
}

.spacer {
  flex: 1;
}

.navigation-items {
  display: none;
}

@media (min-width: 768px) {
  .navigation-items {
    display: flex;
    justify-content: space-between;
  }
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;

  a {
    color: white;
  }
}

.nav-item ~ .nav-item{
  @media (min-width: $screen-sm){
    margin-left: 2rem;
  }
}

</style>
