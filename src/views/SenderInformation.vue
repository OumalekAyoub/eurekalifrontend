<template>
    <section>
        <div class="container mt-4">
            <div class="row justify-content-center">
                <div class="col-md-8 mb-4">
                    <div class="card mb-4">
                        <div class="card-header py-3" style="background-color: black;">
                            <h5 class="mb-0" style="color: white; font-weight: bold;">Sender Information</h5>
                        </div>
                        <div class="card-body">
                            <form>
                                <!-- 2 column grid layout with text inputs for the first and last names -->
                                <div class="row mb-4">
                                    <div class="col">
                                        <div class="form-outline">
                                            <label class="form-label">First Name</label>
                                            <input type="text" class="form-control" placeholder="First Name"
                                                v-model="first_name">
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-outline">
                                            <label class="form-label">Last Name</label>
                                            <input type="text" class="form-control" placeholder="Last Name"
                                                v-model="last_name">
                                        </div>
                                    </div>
                                </div>
                                <div class="row mb-4">
                                    <div class="col">
                                        <div class="form-outline">
                                            <label class="form-label">Number</label>
                                            <input type="text" class="form-control" placeholder="Number" v-model="number">
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-outline">
                                            <label class="form-label">Street</label>
                                            <input type="text" class="form-control" placeholder="Street" v-model="street">
                                        </div>
                                    </div>
                                </div>
                                <div class="row mb-4">
                                    <div class="col">
                                        <div class="form-outline">
                                            <label class="form-label">Postal Code</label>
                                            <input type="text" class="form-control" placeholder="Postal Code"
                                                v-model="postal_code">
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-outline">
                                            <label class="form-label">City</label>
                                            <input type="text" class="form-control" placeholder="City" v-model="city">
                                        </div>
                                    </div>
                                </div>
                                <div class="row mb-4">
                                    <div class="col">
                                        <div class="form-outline">
                                            <label class="form-label">State</label>
                                            <input type="text" class="form-control" placeholder="State" v-model="state">
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-outline">
                                            <label class="form-label">Country</label>
                                            <input type="text" class="form-control" placeholder="Country" v-model="country"
                                                style="background-color: gainsboro;" readonly>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mb-4">
                                    <div class="col">
                                        <div class="form-outline">
                                            <label class="form-label">Email</label>
                                            <input type="email" class="form-control" placeholder="Email" v-model="email">
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-outline">
                                            <label class="form-label">Phone</label>
                                            <input type="text" class="form-control" placeholder="Phone" v-model="phone">
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
                                        <router-link to="/new_order" class="link-success"><i class="fa fa-check"
                                                aria-hidden="true" style="margin-right: 5px;"></i> Shipping route (To {{
                                                    new_country }})</router-link>
                                    </li>
                                </template>
                                <template v-else>
                                    <li class="list-group-item d-flex  align-items-center border-0 px-0 pb-0">
                                        <router-link to="/new_order" class="link-secondary"> Shipping route</router-link>
                                    </li>
                                </template>
                                <template v-if="$store.state.shipment.package_type">
                                    <li class="list-group-item d-flex  align-items-center border-0 px-0 pb-0">
                                        <router-link to="/packages" class="link-success"><i class="fa fa-check"
                                                aria-hidden="true" style="margin-right: 5px;"></i> Package
                                            size ({{ package_type }}, max {{ weight }}KG)</router-link>
                                    </li>
                                </template>
                                <template v-else>
                                    <li class="list-group-item d-flex  align-items-center border-0 px-0 pb-0">
                                        <router-link to="/packages" class="link-secondary"> Package Size</router-link>
                                    </li>
                                </template>
                                <template v-if="$store.state.shipment.selectedDate && $store.state.shipment.description">
                                    <li class="list-group-item d-flex  align-items-center border-0 px-0 pb-0">
                                        <router-link to="/shipment-information" class="link-success"><i class="fa fa-check"
                                                aria-hidden="true" style="margin-right: 5px;"></i> Shipment
                                            Information</router-link>
                                    </li>
                                </template>
                                <template v-else>
                                    <li class="list-group-item d-flex  align-items-center border-0 px-0 pb-0">
                                        <router-link to="/shipment-information" class="link-secondary"> Shipment
                                            Information</router-link>
                                    </li>
                                </template>
                                <template v-if="$store.state.shipment.sender">
                                    <li class="list-group-item d-flex  align-items-center border-0 px-0 pb-0">
                                        <router-link to="/sender_information" class="link-success"><i class="fa fa-check"
                                                aria-hidden="true" style="margin-right: 5px;"></i> Sender
                                            Information</router-link>
                                    </li>
                                </template>
                                <template v-else>
                                    <li class="list-group-item d-flex  align-items-center border-0 px-0 pb-0">
                                        <router-link to="/sender_information" class="link-secondary"> Sender
                                            Information</router-link>
                                    </li>
                                </template>

                                <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3"
                                    style="margin-top: 20px;">
                                    <div>
                                        <strong>Total amount</strong>
                                        <strong>
                                            <p class="mb-0">(including VAT {{ VAT }}%)</p>
                                        </strong>
                                    </div>
                                    <span><strong>{{ price }} &euro;</strong></span>
                                </li>

                            </ul>

                            <template
                                v-if="number && street && postal_code && city && state && country && email && phone && first_name && last_name">
                                <button type="button" class="btn btn-primary btn-lg btn-block"
                                    style="width: 100%; margin-top: 20px;" @click="checkPostalcode">
                                    Next
                                </button>
                            </template>
                            <template v-else>
                                <button type="button" class="btn btn-secondary btn-lg btn-block"
                                    style="width: 100%; margin-top: 20px;" @click="checkFields">
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
            VAT: "",
            package_type: "",
            number: "",
            street: "",
            postal_code: "",
            city: "",
            state: "",
            country: "",
            email: "",
            phone: "",
            first_name: "",
            last_name: "",
            weight: "",

        }
    },
    mounted() {
        document.title = 'Sender Information | Eurekali'
        this.new_country = this.$store.state.shipment.country
        this.price = this.$store.state.shipment.price
        this.VAT = this.$store.state.shipment.VAT
        this.package_type = this.$store.state.shipment.package_type
        this.weight = this.$store.state.shipment.weight

        this.number = this.$store.state.shipment.sender.number
        this.street = this.$store.state.shipment.sender.street
        this.postal_code = this.$store.state.shipment.sender.postal_code
        this.city = this.$store.state.shipment.sender.city
        this.state = this.$store.state.shipment.sender.state
        this.country = "Belgium"
        this.email = this.$store.state.shipment.sender.email
        this.phone = this.$store.state.shipment.sender.phone
        this.first_name = this.$store.state.shipment.sender.first_name
        this.last_name = this.$store.state.shipment.sender.last_name
    },
    methods: {
        checkFields() {
            if (!this.first_name) {
                toast({
                    message: 'Please fill the First Name',
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                    duration: 2000,
                    position: 'bottom-right',
                })
                return
            }

            if (!this.last_name) {
                toast({
                    message: 'Please fill the last name',
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                    duration: 2000,
                    position: 'bottom-right',
                })
                return
            }

            if (!this.number) {
                toast({
                    message: 'Please fill the number address',
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                    duration: 2000,
                    position: 'bottom-right',
                })
                return
            }

            if (!this.street) {
                toast({
                    message: 'Please fill the street',
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                    duration: 2000,
                    position: 'bottom-right',
                })
                return
            }

            if (!this.postal_code) {
                toast({
                    message: 'Please fill the postal code',
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                    duration: 2000,
                    position: 'bottom-right',
                })
                return
            }

            if (!this.city) {
                toast({
                    message: 'Please fill the city',
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                    duration: 2000,
                    position: 'bottom-right',
                })
                return
            }

            if (!this.state) {
                toast({
                    message: 'Please fill the state',
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                    duration: 2000,
                    position: 'bottom-right',
                })
                return
            }

            if (!this.email) {
                toast({
                    message: 'Please fill the email',
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                    duration: 2000,
                    position: 'bottom-right',
                });
                return;
            } else {
                // Email validation using regex
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(this.email)) {
                    toast({
                        message: 'Please enter a valid email',
                        type: 'is-danger',
                        dismissible: true,
                        pauseOnHover: true,
                        duration: 2000,
                        position: 'bottom-right',
                    });
                    return;
                }
            }

            if (!this.phone) {
                toast({
                    message: 'Please fill the phone',
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                    duration: 2000,
                    position: 'bottom-right',
                })
                return
            }

        },
        async checkPostalcode() {
            if (!this.email) {
                toast({
                    message: 'Please fill the email',
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                    duration: 2000,
                    position: 'bottom-right',
                });
                return;
            } else {
                // Email validation using regex
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(this.email)) {
                    toast({
                        message: 'Please enter a valid email',
                        type: 'is-danger',
                        dismissible: true,
                        pauseOnHover: true,
                        duration: 2000,
                        position: 'bottom-right',
                    });
                    return;
                } else {

                    this.$store.commit('setIsLoading', true)

                    await axios.get(`/api/v1/postal_code/${this.country}/${this.postal_code}`)
                        .then(response => {
                            if (response.data['valide']) {
                                this.setSender()
                            } else {
                                toast({
                                    message: 'Invalid postal code/ZIP for the country selected',
                                    type: 'is-danger',
                                    dismissible: true,
                                    pauseOnHover: true,
                                    duration: 3000,
                                    position: 'bottom-right',
                                })
                            }

                        })
                        .catch(error => {
                            toast({
                                message: 'Invalid postal code/ZIP for the country selected',
                                type: 'is-danger',
                                dismissible: true,
                                pauseOnHover: true,
                                duration: 3000,
                                position: 'bottom-right',
                            })
                        })

                    this.$store.commit('setIsLoading', false)
                }
            }
        },
        setSender() {
            console.log('setSender')

            const number = this.number
            const street = this.street
            const postal_code = this.postal_code
            const city = this.city
            const state = this.state
            const country = this.country
            const email = this.email
            const phone = this.phone
            const first_name = this.first_name
            const last_name = this.last_name

            this.$store.commit('setSender', {
                number: number,
                street: street,
                postal_code: postal_code,
                city: city,
                state: state,
                country: country,
                email: email,
                phone: phone,
                first_name: first_name,
                last_name: last_name
            })

            this.$router.push('/receiver_information')


        }
    }
}
</script>
  
  
  