<template>
	<div class="signup container">
		<h4 class="font-weight-bold text-center text-primary mt-4 mb-3">Sign up</h4>
		<b-alert :show="!!feedback" variant="danger">{{feedback}}</b-alert>
		<div class="card shadow mt-3">
			<div class="card-body">
				<b-form @submit.prevent="signup">
					<b-form-group
						description="We'll never share your email with anyone else."
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
					<b-form-group
						label="Alias"
						label-for="alias"
					>
						<b-form-input
							id="alias"
							placeholder="Enter alias"
							type="text"
							v-model="alias"
						></b-form-input>
					</b-form-group>
					<b-button class="float-right" type="submit" variant="primary">Register
					</b-button>
				</b-form>
			</div>
		</div>

	</div>
</template>

<script>
  import slugify from 'slugify'
  import db from '@/firebase/init'
  import firebase from 'firebase'

  export default {
    name: "Signup",
    data() {
      return {
        password: null,
        email: null,
        alias: null,
        slug: null,
        feedback: null
      }
    },
    methods: {
      signup() {
        if (this.alias && this.email && this.password) {

          // Slugify alias
          this.slug = slugify(this.alias, {
            replacement: '-',
            remove: /[$*_+~.()'"!\-#:@]/g,
            lower: true
          })
          let ref = db.collection('users').doc(this.slug)

          // Check alias existance
          ref.get().then(doc => {
            if (doc.exists) {
              this.feedback = 'this alias already exists, try another one'
            } else {

              firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then((cred) => {

                  //  Register User in firebase ( users )
                  ref.set({
                    email: this.email,
                    alias: this.alias,
                    geolocation: null,
                    user_id: cred.user.uid
                  })
                })
                .then(() => {
                  this.$router.push({name: 'GMap'})
                })
                .catch(e => {
                  this.feedback = e.message
                })
            }
          })
          // this.feedback = null
        } else {
          this.feedback = 'you must enter all fields'
        }
      }
    }
  }
</script>

<style scoped>

</style>