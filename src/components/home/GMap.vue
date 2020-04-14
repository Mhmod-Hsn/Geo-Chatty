<template>
	<div class="map">
		<div class="google-map" id="map">

		</div>
	</div>
</template>

<script>
  import firebase from 'firebase'
  import db from '@/firebase/init'

  export default {
    name: "GMap",
    data() {
      return {
        lat: 39.042238,
        lng: 35.384496,
      }
    },
    methods: {
      renderMap() {
        const map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: this.lat, lng: this.lng},
          zoom: 6,
          maxZoom: 15,
          minZoom: 3,
          streetViewControl: false
        });
      }
    },
    mounted() {

      // get user geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.lat = position.coords.latitude
          this.lng = position.coords.longitude
          this.renderMap()

          // find user rrecord and update coordinate
          let user = firebase.auth().currentUser
          db.collection('users').where('user_id', '==', user.uid).get()
            .then(snapshot => {
              snapshot.forEach((doc) => {
                db.collection('users').doc(doc.id).update({
                  geolocation: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                  }
                })
              })
            })
            .then(() => {
              this.renderMap()
            })
        }, (error) => {
          console.log(error)
          this.renderMap()
        }, {
          maximumAge: 60000,
          timeout: 5000
        })
      } else {
        // position center as a default value
        this.renderMap()
      }


    }

  }
</script>

<style lang="scss" scoped>
	.google-map {
		width: 100%;
		height: 100%;
		margin: 0 auto;
		background: #fff;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
	}
</style>