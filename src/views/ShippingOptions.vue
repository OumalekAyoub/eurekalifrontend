<template>
    <section>
        <div class="container mt-4">
            <div class="row justify-content-center">
                <div class="col-md-8 mb-4">
                    <div class="card mb-4">
                        <div class="card-header py-3" style="background-color: black;">
                            <h5 class="mb-0" style="color: white; font-weight: bold;">Shipping options</h5>
                        </div>
                        <div class="card-body">
                            <template v-if="price">
                                <ul class="list-group">
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        <div style="width: 100%; cursor: pointer;" @click="function1">
                                            <div class="form-check d-flex">
                                                <div class="form-check-label flex-grow-1" style="text-align: left;">
                                                    <input class="form-check-input" type="radio" name="flexRadioDefault"
                                                        id="flexRadioDefault2" :checked="drop_off">
                                                    I will drop it off at a Eurekali drop-off point
                                                </div>
                                                <label class="form-check-label" for="flexRadioDefault2"
                                                    style="text-align: right;">
                                                    <span class="badge bg-success rounded-pill">

                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        <div style="width: 100%; cursor: pointer;" @click="function2">
                                            <div class="form-check d-flex">
                                                <div class="form-check-label flex-grow-1" style="text-align: left;">
                                                    <input class="form-check-input" type="radio" name="flexRadioDefault"
                                                        id="flexRadioDefault1" :checked="!drop_off">
                                                    Collect the parcel from me
                                                </div>
                                                <label class="form-check-label" for="flexRadioDefault1"
                                                    style="text-align: right;">
                                                    <span class="badge bg-primary rounded-pill">
                                                        +{{ collection_charges }} &euro;
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </template>
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
                                <template v-if="$store.state.shipment.price">
                                    <li class="list-group-item d-flex  align-items-center border-0 px-0 pb-0">
                                        <router-link to="/services" class="link-success"><i class="fa fa-check"
                                                aria-hidden="true" style="margin-right: 5px;"></i> Services</router-link>
                                    </li>
                                </template>
                                <template v-else>
                                    <li class="list-group-item d-flex  align-items-center border-0 px-0 pb-0">
                                        <router-link to="/services" class="link-secondary"> Services</router-link>
                                    </li>
                                </template>

                                <template v-if="$store.state.shipment.price">
                                    <li class="list-group-item d-flex  align-items-center border-0 px-0 pb-0">
                                        <router-link to="/shipping_options" class="link-success"><i class="fa fa-check"
                                                aria-hidden="true" style="margin-right: 5px;"></i> Shipping
                                            options</router-link>
                                    </li>
                                </template>
                                <template v-else>
                                    <li class="list-group-item d-flex  align-items-center border-0 px-0 pb-0">
                                        <router-link to="/shipping_options" class="link-secondary"> Shipping
                                            options</router-link>
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

                            <template v-if="price">
                                <button type="button" class="btn btn-primary btn-lg btn-block"
                                    style="width: 100%; margin-top: 20px;" @click="setPrice">
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
    name: 'Packages',
    data() {
        return {
            new_country: "",
            price: "",
            old_price: "",
            VAT: "",
            package_type: "",
            drop_off: "",
            weight: "",
            collection_charges: "",

        }
    },
    computed: {
        discount() {
            return this.$store.state.shipment.discount;
        }
    },
    created() {
        if (!this.$store.state.shipment.price) {
            this.$router.push('/services')
        }
    },
    mounted() {
        document.title = 'Shipping options | Eurekali'
        this.getCollectionCharges()
        this.new_country = this.$store.state.shipment.country
        this.VAT = this.$store.state.shipment.VAT
        this.price = this.$store.state.shipment.price
        this.package_type = this.$store.state.shipment.package_type
        this.old_price = this.$store.state.shipment.old_price
        this.drop_off = this.$store.state.shipment.features.drop_off
        this.weight = this.$store.state.shipment.weight

    },
    methods: {
        async getCollectionCharges(){
            this.$store.commit('setIsLoading', true)


            await axios.get('/api/v1/collectioncharges/latest/')
                .then(response => {

                    this.collection_charges = response.data['charges_amount']

                })
                .catch(error => {
                    console.log(error)
                })



            this.$store.commit('setIsLoading', false)
        },
        function1() {
            this.price = this.old_price
            this.drop_off = true
        },
        function2() {
            this.price = parseFloat(this.old_price) + parseFloat(this.collection_charges)
            this.drop_off = false
        },
        setShipping() {
            console.log('setShipping');
            let drop_shipping;
            if (this.price !== this.old_price) {
                drop_shipping = false;
            } else {
                drop_shipping = true;
            }

            this.$store.commit('setShipping', drop_shipping);
        },
        setPrice() {
            this.setShipping()
            console.log('setPrice')
            const price = this.price
            this.$store.commit('setPrice', price)
            this.$store.commit('setOldPrice2', price)
            this.$store.commit('setdrop_off', this.drop_off)

            this.$router.push('/parcel-protection')

        },
    },
}
</script>


