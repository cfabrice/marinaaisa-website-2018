<template>
  <footer>
    <div class="footer__main">
      <div class="container">
        <div class="footer__contact">
          <span class="text-negative">
          Feel free to drop an “Hi or Hola” back, <br>
          just writing me a <a target="_blank" href="https://twitter.com/MarinaAisa" class="ani twitter"><span>tweet</span></a>, or sending me an <a target="_blank" href="mailto:marina@marinaaisa.com" class="ani"><span>email</span></a>. <br></span>
          As you see, I love emojis so don’t forget to add one.
        </div>
      </div>
    </div>
    <div class="footer__info">
      <div class="container footer__info-container">
        <div class="footer__copyright">
          © {{ year }} — Designed and <a target="_blank" href="https://github.com/marinaaisa/marinaaisa-website-2018" class="ani"><span>coded</span></a> by<span class="text-negative"> Marina Aisa</span>.
        </div>
        <a href="#top" class="footer__top-page">
          ^
        </a>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  computed: {
    year () {
      return new Date().getFullYear()
    }
  }
}
</script>

<style lang="scss">
.footer {
	&__main {
		padding: 50px 0;
		background-color: $background-secondary;
		border-bottom: 1px solid darken($secondary-light,40%);
  }
  
	&__contact {
		text-align: center;
  }
  
	&__logo {
		height: 5rem;
		width: 18rem;
		display: inline-block;
		margin-bottom: 1em;
	}

	&__info {
		background-color: $background-secondary;
		padding: 1.5em 0;
  }
  
  &__info-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

	&__copyright {
		text-align: center;
		@media (min-width: $screen-sm) {
			text-align: inherit;
		}
	}

	&__top-page {
		color: $text-negative;
		display: block;
		text-align: center;
		line-height: 1;
		-webkit-transition: 1s;
		-moz-transition: 1s;
    transition: 1s;
    
		@media (min-width: $screen-sm){
			text-align: right;
		}
	}
}
</style>

