<template>
    <section>
        <div class="container mt-4">
            <div class="row justify-content-center">
                <div class="col-md-8 mb-4">
                    <div class="card mb-4">
                        <div class="card-header py-3" style="background-color: black;">
                            <h5 class="mb-0" style="color: white; font-weight: bold;">Packages</h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <ul class="list-group">

                                        <li class="list-group-item">
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <img src="../assets/envelope.png" class="img-fluid" style="width: 30%;">
                                                </div>
                                                <div class="col-md-2 d-flex  align-items-center">
                                                    <span><b>Envelope</b></span>
                                                </div>
                                                <div class="col-md-2 d-flex  align-items-center">
                                                    <span style="font-size: 14px">Max 0.5 kg</span>
                                                </div>
                                                <div class="col-md-3 d-flex  align-items-center">
                                                    <span style="font-size: 14px">L x W x H = 962.5 cm<sup>3</sup></span>
                                                </div>
                                                <div class="col-md-2 d-flex justify-content-end align-items-center">
                                                    <button class="btn btn-success"
                                                        @click="setPackage('Envelope')">Select</button>
                                                </div>
                                            </div>
                                        </li>

                                        <li class="list-group-item">
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <img src="../assets/package.png" class="img-fluid" style="width: 30%;">
                                                </div>
                                                <div class="col-md-2 d-flex  align-items-center">
                                                    <span><b>Extra small</b></span>
                                                </div>
                                                <div class="col-md-2 d-flex  align-items-center">
                                                    <span style="font-size: 14px">Max 1.0 kg</span>
                                                </div>
                                                <div class="col-md-3 d-flex  align-items-center">
                                                    <span style="font-size: 14px">L x W x H = 6133.4 cm<sup>3</sup></span>
                                                </div>
                                                <div class="col-md-2 d-flex justify-content-end align-items-center">
                                                    <button class="btn btn-success"
                                                        @click="setPackage('Extra small')">Select</button>
                                                </div>
                                            </div>
                                        </li>

                                        <li class="list-group-item">
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <img src="../assets/package.png" class="img-fluid" style="width: 35%;">
                                                </div>
                                                <div class="col-md-2 d-flex  align-items-center">
                                                    <span><b>Small</b></span>
                                                </div>
                                                <div class="col-md-2 d-flex  align-items-center">
                                                    <span style="font-size: 14px">Max 2.0 kg</span>
                                                </div>
                                                <div class="col-md-3 d-flex  align-items-center">
                                                    <span style="font-size: 14px">L x W x H = 10851.4 cm<sup>3</sup></span>
                                                </div>
                                                <div class="col-md-2 d-flex justify-content-end align-items-center">
                                                    <button class="btn btn-success"
                                                        @click="setPackage('Small')">Select</button>
                                                </div>
                                            </div>
                                        </li>

                                        <li class="list-group-item">
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <img src="../assets/package.png" class="img-fluid" style="width: 40%;">
                                                </div>
                                                <div class="col-md-2 d-flex  align-items-center">
                                                    <span><b>Medium</b></span>
                                                </div>
                                                <div class="col-md-2 d-flex  align-items-center">
                                                    <span style="font-size: 14px">Max 5.0 kg</span>
                                                </div>
                                                <div class="col-md-3 d-flex  align-items-center">
                                                    <span style="font-size: 14px">L x W x H = 19532.52 cm<sup>3</sup></span>
                                                </div>
                                                <div class="col-md-2 d-flex justify-content-end align-items-center">
                                                    <button class="btn btn-success"
                                                        @click="setPackage('Medium')">Select</button>
                                                </div>
                                            </div>
                                        </li>

                                        <li class="list-group-item">
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <img src="../assets/package.png" class="img-fluid" style="width: 45%;">
                                                </div>
                                                <div class="col-md-2 d-flex  align-items-center">
                                                    <span><b>Large</b></span>
                                                </div>
                                                <div class="col-md-2 d-flex  align-items-center">
                                                    <span style="font-size: 14px">Max 10.0 kg</span>
                                                </div>
                                                <div class="col-md-3 d-flex  align-items-center">
                                                    <span style="font-size: 14px">L x W x H = 37437.33 cm<sup>3</sup></span>
                                                </div>
                                                <div class="col-md-2 d-flex justify-content-end align-items-center">
                                                    <button class="btn btn-success"
                                                        @click="setPackage('Large')">Select</button>
                                                </div>
                                            </div>
                                        </li>

                                        <li class="list-group-item">
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <img src="../assets/package.png" class="img-fluid" style="width: 50%;">
                                                </div>
                                                <div class="col-md-2 d-flex  align-items-center">
                                                    <span><b>Extra large</b></span>
                                                </div>
                                                <div class="col-md-2 d-flex  align-items-center">
                                                    <span style="font-size: 14px">Max 20.0 kg</span>
                                                </div>
                                                <div class="col-md-3 d-flex  align-items-center">
                                                    <span style="font-size: 14px">L x W x H = 75592.036
                                                        cm<sup>3</sup></span>
                                                </div>
                                                <div class="col-md-2 d-flex justify-content-end align-items-center">
                                                    <button class="btn btn-success"
                                                        @click="setPackage('Extra large')">Select</button>
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
            package_type: "",
            weight: "",
            price: "",
        }
    },
    mounted() {
        document.title = 'Package size | Eurekali'
        this.new_country = this.$store.state.shipment.country
        this.weight = this.$store.state.shipment.weight
        this.package_type = this.$store.state.shipment.package_type
    },
    created() {
        if (!this.$store.state.shipment.country) {
            this.$router.push('/new_order')
        }
    },
    methods: {
        async setPackage(package_type) {
            this.weight = 0

            if (package_type == "Envelope") {
                this.weight = 0.5
                this.package_type = "Envelope"
            }

            if (package_type == "Extra small") {
                this.weight = 1.0
                this.package_type = "Extra small"
            }

            if (package_type == "Small") {
                this.weight = 2.0
                this.package_type = "Small"
            }

            if (package_type == "Medium") {
                this.weight = 5.0
                this.package_type = "Medium"
            }

            if (package_type == "Large") {
                this.weight = 10.0
                this.package_type = "Large"
            }

            if (package_type == "Extra large") {
                this.weight = 20.0
                this.package_type = "Extra large"
            }

            const weight = this.weight
            const package_type2 = this.package_type

            this.$store.commit('setPackage', {
                weight: weight,
                package_type: package_type2
            })

            await this.getPrices()
            await this.setPrice()
            this.$router.push('/shipment-information')

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
        async setOldPrice() {
            console.log('setOldPrice')
            const old_price2 = this.price
            this.$store.commit('setOldPrice', old_price2)
        },
        setVAT() {
            console.log('setVAT')
            const VAT = this.VAT
            this.$store.commit('setVAT', VAT)
        },
        async setPrice() {
            this.setVAT()
            this.setOldPrice()
            console.log('setPrice')
            const price = this.price
            this.$store.commit('setPrice', price)
            this.$router.push('/shipment-information')
        },
    }
}
</script>


