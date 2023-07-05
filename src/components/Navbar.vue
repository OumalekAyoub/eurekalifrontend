<template>
  <div>

    <section>

      <header class="p-3 text-bg-dark">
        <div class="container">
          <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

            <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li><router-link to="/new_order" class="nav-link px-2 text-white">New Order</router-link></li>
              <li><router-link to="/myorders" class="nav-link px-2 text-white">My Orders</router-link></li>
              <li><router-link to="/track_shipment" class="nav-link px-2 text-white">Track shipment</router-link></li>
            </ul>

            <div class="text-end">
              <template v-if="$store.state.isAuthenticated">
                <router-link to="/myprofile" type="button" class="btn btn-success me-2">My Profile</router-link>
                <button @click="logout()" type="button" class="btn btn-danger">Log out</button>
              </template>

              <template v-else>
                <router-link to="/login" type="button" class="btn btn-primary me-2">Login</router-link>
                <router-link to="/signup" type="button" class="btn btn-warning">Sign-up</router-link>
              </template>
            </div>


          </div>
        </div>
      </header>

    </section>
  </div>
</template>



<script>
import axios from 'axios'

export default {
  data() {
    return {
      orders: []
    }
  },

  methods: {
    logout() {
      axios.defaults.headers.common["Authorization"] = ""
      localStorage.removeItem("token")
      this.$store.commit('removeToken')
      this.$store.commit('clearShipment')
      this.$router.push('/login')
    }
  }
}
</script>