<template>
	<b-navbar type="dark" variant="primary">
		<div class="container">

			<router-link :to="{ name : 'GMap' }"
			             class="text-white"
			             tag="b-navbar-brand">Geo Chatty App
			</router-link>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>

				<!-- Right aligned nav items -->
				<b-navbar-nav class="ml-auto">
					<router-link :to="{ name : 'Login' }"
					             class="text-white"
					             tag="b-nav-item">Login
					</router-link>
					<router-link :to="{ name : 'Signup' }"
					             class="text-white"
					             tag="b-nav-item">Signup
					</router-link>
					<b-nav-item @click="logout" class="text-white" href="#">Logout
					</b-nav-item>
				</b-navbar-nav>
			</b-collapse>
		</div>
	</b-navbar>

</template>

<script>
  import firebase from 'firebase'


  export default {
    name: "Navbar",

    methods: {
      logout() {
        firebase.auth().signOut()
          .then(() => {
            this.$router.push({
              name: 'Login'
            })
          })
      }
    }

  }
</script>

<style scoped>

</style>