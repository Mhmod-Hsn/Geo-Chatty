<template>
  <div id="app">
	  <Navbar></Navbar>
    <router-view/>
  </div>
</template>

<script>
  import Navbar from '@/components/layout/Navbar'

  export default {
    name: 'App',
    components: {
      Navbar
    }
  }
</script>


<style lang="sass">
	// customizing Bootstrap colors
	$primary: #8a03ff

	@import '../node_modules/bootstrap/scss/bootstrap'
	@import '../node_modules/bootstrap-vue/src/index.scss'

	// Navbar
	.navbar
		.navbar-brand
			cursor: pointer

		.navbar-nav
			.nav-link
				color: rgba(255, 255, 255, 0.8)

	.login,
	.signup
		.card
			width: 400px
			max-width: 90%
			margin: auto
</style>
