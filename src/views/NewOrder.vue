<template>
  <section>
    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-md-8 mb-4">
          <div class="card mb-4">
            <div class="card-header py-3" style="background-color: black;">
              <h5 class="mb-0" style="color: white; font-weight: bold;">Shipping route</h5>
            </div>
            <div class="card-body">
              <form>
                <!-- 2 column grid layout with text inputs for the first and last names -->
                <div class="row mb-4">
                  <div class="col">
                    <div class="form-outline">
                      <label class="form-label" for="form7Example1">Ship from</label>
                      <input type="text" id="form7Example1" class="form-control" placeholder="Choose a country"
                        value="Belgium" readonly>
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-outline">
                      <label class="form-label" for="form7Example2">Ship to</label>

                      <select class="form-control" v-model="new_country">
                        <option value="" disabled selected>Choose a country</option>
                        <option v-for="country in countries" :value="country">{{ country }}</option>
                      </select>

                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="col-md-4 mb-4">
          <div class="card mb-4">
            <div class="card-header py-3" style="background-color: black;">
              <h5 class="mb-0" style="color: white;font-weight: bold;">Your shipment details</h5>
            </div>
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <template v-if="$store.state.shipment.country">
                  <li class="list-group-item d-flex  align-items-center border-0 px-0 pb-0">
                    <router-link to="/new_order" class="link-success"><i class="fa fa-check" aria-hidden="true"
                        style="margin-right: 5px;"></i> Shipping route (To {{ new_country }})</router-link>
                  </li>
                </template>
                <template v-else>
                  <li class="list-group-item d-flex  align-items-center border-0 px-0 pb-0">
                    <router-link to="/new_order" class="link-secondary"> Shipping route</router-link>
                  </li>
                </template>
              </ul>

              <template v-if="new_country">
                <button type="button" class="btn btn-primary btn-lg btn-block" style="width: 100%; margin-top: 20px;"
                  @click="setCountry">
                  Next
                </button>
              </template>
              <template v-else>
                <button type="button" class="btn btn-secondary btn-lg btn-block"
                  style="width: 100%; margin-top: 20px; pointer-events: none;">
                  Next
                </button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>



<script>
import axios from 'axios'
import { toast } from 'bulma-toast'


export default {
  name: 'NewOrder',
  data() {
    return {
      new_country: "",
      price: "",
      package_type: "",
      countries: []
    }
  },
  mounted() {
    document.title = 'New Order | Eurekali'
    this.new_country = this.$store.state.shipment.country
    this.price = this.$store.state.shipment.price
    this.package_type = this.$store.state.shipment.package_type

    axios.get('/api/v1/countries/')
      .then(response => {
        this.countries = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  },
  methods: {
    setCountry() {
      console.log('setCountry')

      const new_country = this.new_country

      this.$store.commit('setCountry', new_country)

      this.$router.push('/packages')
    }
  }
}
</script>


