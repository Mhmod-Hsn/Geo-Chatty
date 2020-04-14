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
					<router-link :to="{ name : 'Login' }" tag="b-nav-item"
					             class="text-white"
					             v-if="!user">
						<b-icon icon="person"></b-icon>
						Login
					</router-link>
					<router-link :to="{ name : 'Signup' }" tag="b-nav-item"
					             class="text-white"
					             v-if="!user">
						<b-icon icon="person-plus-fill"></b-icon>
						Signup
					</router-link>
					<b-nav-text class="text-white" v-if="user">{{user.email}}</b-nav-text>
					<b-nav-item @click="logout" class="text-white" href="#"
					            v-if="user">
						<b-icon icon="people-circle"></b-icon>
						Logout
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
    data() {
      return {
        user: null
      }
    },
    methods: {
      logout() {
        firebase.auth().signOut()
          .then(() => {
            this.$router.push({
              name: 'Login'
            })
          })
      }
    },
    created() {
      // let user = firebase.auth().currentUser
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.user = user
        } else {
          this.user = null
        }
      })
    }



  }
</script>

<style scoped>

</style>