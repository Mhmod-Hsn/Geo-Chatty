<template>
	<div class="view-profile container">
		<h2 class="mt-3" v-if="profile">{{profile.alias}}'s Wall</h2>
		<b-card class="chat shadow rounded-0">
			<div class="messages">

				<b-card :class="{self: comment.from===user.id}" :key="comment.id"
				        class="message mb-1" v-for="comment in comments">
					<b-media>
					<span :class="{'text-danger': comment.from===user.id}"
					      class="name text-success font-weight-bold mr-1">{{comment
						.from}}</span>
						<!--						@<span class="time small lead">{{comment.timestamp}}</span>-->
						<p class="mb-0">{{comment.content}}</p>
					</b-media>
				</b-card>

			</div>

			<div class="new-message">
				<form @submit.prevent="addComment">
					<b-input-group class="mb-2 position-relative">
						<b-form-input autocomplete="false"
						              class="new-message-input"
						              placeholder="+ Comment"
						              v-model="newComment">
						</b-form-input>
					</b-input-group>

					<b-alert :show="!!feedback" class="text-danger" variant="white">
						<b-icon icon="exclamation-triangle"></b-icon>
						{{feedback
						}}
					</b-alert>

				</form>
			</div>
		</b-card>

	</div>
</template>

<script>
  import db from '@/firebase/init';
  import firebase from 'firebase'


  export default {
    name: "ViewProfile",
    data() {
      return {
        profile: null,
        newComment: null,
        feedback: null,
        user: null,
        comments: []
      }
    },
    methods: {
      addComment() {
        if (this.newComment) {
          this.feedback = null

          db.collection('comments').add({
            to: this.$route.params.id,
            from: this.user.id,
            content: this.newComment,
            time: Date.now()
          }).then(() => {
            this.newComment = ''
          })

        } else {
          this.feedback = 'you must enter comment!'
        }
      }
    },
    created() {
      let ref = db.collection('users')

      // get current user
      ref.where('user_id', '==', firebase.auth().currentUser.uid).get()
        .then(snapShot => {
          snapShot.forEach(doc => {
            this.user = doc.data()
            this.user.id = doc.id
          })
        })

      // profile data
      ref.doc(this.$route.params.id).get()
        .then(user => {
          this.profile = user.data()
        })


      //comments
      db.collection('comments').where('to', '==', this.$route.params.id)
        .onSnapshot((snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type == 'added') {
              this.comments.unshift({
                from: change.doc.data().from,
                content: change.doc.data().content,
                timestamp: change.doc.data().time
              })
            }
          })
        }))
    }
  }
</script>

<style scoped>
	.messages {
		max-height: 400px;
		margin-bottom: 10px;
		overflow-y: scroll;
		scrollbar-color: #888 #aaa;
		scrollbar-width: thin;
	}

	::-webkit-scrollbar {
		width: 3px;
	}

	::-webkit-scrollbar-track {
		background: #ddd;
	}

	::-webkit-scrollbar-thumb {
		background: #aaa;
	}

	.message .card-body {
		padding: 5px 10px;
		background: rgba(115, 255, 130, 0.2);
	}

	.message {
		max-width: calc(90% - 150px);
		width: fit-content;
		min-width: 200px;
		width: -moz-fit-content;
		clear: both;

		/* Required for text-overflow to do anything */
		overflow-x: hidden;
	}

	.message.self {
		background: rgba(255, 137, 137, 0.49);
		float: right;
		text-align: right;

	}

</style>