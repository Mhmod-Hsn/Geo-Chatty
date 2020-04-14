<template>
	<div class="login container">
		<h4 class="font-weight-bold text-center text-primary mt-4 mb-3">Login</h4>
		<b-alert :show="!!feedback" variant="danger">{{feedback}}</b-alert>
		<div class="card shadow mt-3">
			<div class="card-body">
				<b-form @submit.prevent="login">
					<b-form-group
						label="Email address:"
						label-for="email"
					>
						<b-form-input
							id="email"
							placeholder="Enter email"
							type="email"
							v-model="email"
						></b-form-input>
					</b-form-group>
					<b-form-group
						label="Password:"
						label-for="password"
					>
						<b-form-input
							id="password"
							placeholder="Enter your password"
							type="password"
							v-model="password"
						></b-form-input>
					</b-form-group>
					<b-button class="float-right" type="submit" variant="primary">Login
					</b-button>
				</b-form>
			</div>
		</div>

	</div>
</template>

<script>
  // import db from '@/firebase/init'
  import firebase from 'firebase'

  export default {
    name: "Signup",
    data() {
      return {
        email: null,
        password: null,
        feedback: null
      }
    },
    methods: {
      login() {
        if (this.email && this.password) {
          firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then((cred) => {
              this.$router.push({name: 'GMap'})
            })
            .catch(e => {
              this.feedback = e.msg
            })

          this.feedback = null
        } else {
          this.feedback = 'you must enter all fields'
        }
      }
    }
  }
</script>

<style scoped>

</style>