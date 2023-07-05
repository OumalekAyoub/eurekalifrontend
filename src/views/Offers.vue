<template>
    <section>
        <div class="container mt-4">
            <div class="row justify-content-center">
                <div class="col-md-8 mb-4">
                    <div class="card mb-4">
                        <div class="card-header py-3" style="background-color: black;">
                            <h5 class="mb-0" style="color: white; font-weight: bold;">My Offers</h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <ul class="list-group">

                                        <li class="list-group-item">
                                            <div class="row">

                                                <div class="col-md-3 d-flex  align-items-center">
                                                    <span><b>Pickup date</b></span>
                                                </div>
                                                <div class="col-md-4 d-flex  align-items-center">
                                                    <span><b>Delivery estimate</b></span>
                                                </div>
                                                <div class="col-md-3 d-flex  align-items-center">
                                                    <span><b>Price</b></span>
                                                </div>
                                                <div class="col-md-2 d-flex justify-content-end align-items-center">
                                                    
                                                </div>
                                            </div>
                                        </li>

                                        <li class="list-group-item">
                                            <div class="row">
                                                <div class="col-md-3 d-flex  align-items-center text-center">
                                                    <span>Monday 19 June, 2023 <br> 10:31 Until 19:30</span>
                                                </div>
                                                <div class="col-md-4 d-flex  align-items-center text-center">
                                                    <span>Monday 19 June, 2023 <br> 12:00 Until 18:30</span>
                                                </div>
                                                <div class="col-md-3 d-flex  align-items-center">
                                                    <span class="badge bg-success rounded-pill"> {{ price }} &euro; </span>
                                                </div>
                                                <div class="col-md-2 d-flex justify-content-end align-items-center">
                                                    <button class="btn btn-success"
                                                        @click="setPrice">I order</button>
                                                </div>
                                            </div>
                                        </li>  
                                    </ul>
                                </div>
                            </div>
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
                                        <router-link to="/packages" class="link-secondary"> Package size</router-link>
                                    </li>
                                </template>
                                <template v-if="$store.state.shipment.price">
                                    <li class="list-group-item d-flex  align-items-center border-0 px-0 pb-0">
                                        <router-link to="/offers" class="link-success"><i class="fa fa-check"
                                                aria-hidden="true" style="margin-right: 5px;"></i> Offers</router-link>
                                    </li>
                                </template>
                                <template v-else>
                                    <li class="list-group-item d-flex  align-items-center border-0 px-0 pb-0">
                                        <router-link to="/offers" class="link-secondary"> Offers</router-link>
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
    name: 'Packages',
    data() {
        return {
            new_country: "",
            price: "",
            price_2d: "",
            price_5d: "",
            weight: "",
            VAT: "",
            package_type: "",

        }
    },
    created() {
        if (!this.$store.state.shipment.package_type) {
            this.$router.push('/packages')
        }
    },
    mounted() {
        this.getPrices()
        document.title = 'Services | Eurekali'
        this.new_country = this.$store.state.shipment.country
        this.weight = this.$store.state.shipment.weight
        this.VAT = this.$store.state.shipment.VAT
        this.price = this.$store.state.shipment.price
        this.package_type = this.$store.state.shipment.package_type


    },
    methods: {
        function1() {
            this.price = this.price_2d
            this.shippment_2d = true
        },
        function2() {
            this.price = this.price_5d
            this.shippment_2d = false
        },
        async getPrices() {
            this.$store.commit('setIsLoading', true)


            await axios.get(`/api/v1/shipping/price/${this.$store.state.shipment.weight}/${this.$store.state.shipment.country}`)
                .then(response => {

                    this.price_2d = response.data['price_2d']
                    this.price_5d = response.data['price_5d']
                    this.VAT = response.data['VAT']

                    if (!this.$store.state.shipment.price) {
                        this.price = response.data['price_2d']
                    }

                })
                .catch(error => {
                    console.log(error)
                })



            this.$store.commit('setIsLoading', false)
        },
        setVAT() {
            console.log('setVAT')
            const VAT = this.VAT
            this.$store.commit('setVAT', VAT)
        },
        async setPrice() {
            this.setVAT()
            console.log('setPrice')
            const price = this.price
            this.$store.commit('setPrice', price)
            this.$store.commit('setOldPrice', price)
            const shippment_2d = this.shippment_2d
            this.$store.commit('setshippment_2d', shippment_2d)
            this.$router.push('/shipment-information')
        },
    }
}
</script>


