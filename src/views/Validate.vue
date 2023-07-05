<template>
    <section>
        <div class="container mt-4">
            <div class="row justify-content-center">

                <div class="col-md-7 mb-1">
                    <div class="card mb-1">
                        <div class="card-header py-3" style="background-color: black;">
                            <h5 class="mb-0" style="color: white; font-weight: bold;">Shipping route</h5>
                        </div>
                        <div class="card-body">
                            <form>
                                <!-- 2 column grid layout with text inputs for the first and last names -->
                                <div class="row mb-1">
                                    <div class="col">
                                        <div class="form-outline">
                                            <label class="form-label" for="form7Example1">Ship from</label>
                                            <input type="text" id="form7Example1" class="form-control"
                                                placeholder="Choose a country" value="Belgium"
                                                style="background-color: gainsboro;" readonly>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-outline">
                                            <label class="form-label" for="form7Example1">Ship to</label>
                                            <input type="text" id="form7Example1" class="form-control"
                                                placeholder="Choose a country" v-model="new_country"
                                                style="background-color: gainsboro;" readonly>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-end">
                                    <router-link to="/new_order" type="button" class="btn btn-secondary"> <i
                                            class="fas fa-pencil-alt"></i>
                                        Edit</router-link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="col-md-5 mb-1">
                    <div class="card mb-1">
                        <div class="card-header py-3" style="background-color: black;">
                            <h5 class="mb-0" style="color: white; font-weight: bold;">Package Size</h5>
                        </div>
                        <div class="card-body">
                            <form>
                                <!-- 2 column grid layout with text inputs for the first and last names -->
                                <div class="row mb-1">
                                    <div class="col">
                                        <div class="form-outline">
                                            <label class="form-label" for="form7Example1">Package type</label>
                                            <input type="text" id="form7Example1" class="form-control"
                                                placeholder="Choose a country" v-model="package_type"
                                                style="background-color: gainsboro;" readonly>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-outline">
                                            <label class="form-label" for="form7Example1">Max weight</label>
                                            <input type="text" id="form7Example1" class="form-control"
                                                placeholder="Choose a country" :value="weight + ' Kg'"
                                                style="background-color: gainsboro;" readonly>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-end">
                                    <router-link to="/packages" type="button" class="btn btn-secondary"> <i
                                            class="fas fa-pencil-alt"></i>
                                        Edit</router-link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="col-md-12 mb-1">
                    <div class="card mb-1">
                        <div class="card-header py-3" style="background-color: black;">
                            <h5 class="mb-0" style="color: white; font-weight: bold;">Shipment Information </h5>
                        </div>
                        <div class="card-body">
                            <form>
                                <!-- 2 column grid layout with text inputs for the first and last names -->
                                <div class="row mb-1">
                                    <div class="row mb-1">
                                        <div class="col-md-6">
                                            <div class="form-group ">
                                                <label>Shipping date</label>
                                                <input type="text" class="form-control" placeholder="Shipping date"
                                                    v-model="selectedDate" style="background-color: gainsboro;" readonly>
                                            </div>
                                            <div class="form-group" style="margin-top: 10px;">
                                                <div class="row mb-1">
                                                    <div class="form-group">
                                                <label>Description</label>
                                                <input type="text" class="form-control"
                                                    placeholder="Description of your package" v-model="description"
                                                    style="background-color: gainsboro;" readonly>
                                            </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Service Point</label>
                                                <input type="text" class="form-control"
                                                    placeholder="Service Point selected" v-model="service_point_name"
                                                    style="background-color: gainsboro;" readonly>
                                            </div>
                                            <div class="form-group form-switch mb-2" style="margin-top: 20px;">
                                                <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"
                                                    v-model="shipment.insure_my_parcel" :disabled="isReadOnly">
                                                <label class="form-check-label" for="flexSwitchCheckDefault"
                                                    style="margin-left: 12px;">Insure my parcel</label>
                                            </div>

                                        </div>
                                    </div>


                                    <template v-if="commercial_value">
                                        <div class="row mb-4">
                                            <div class="col">
                                                <div class="form-outline">
                                                    <label class="form-label">Nature of package</label>
                                                    <input type="text" class="form-control" v-model="item_nature"
                                                        style="background-color: gainsboro;" readonly>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="form-outline">
                                                    <label class="form-label">Description</label>
                                                    <input type="text" class="form-control" v-model="item_description"
                                                        style="background-color: gainsboro;" readonly>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="form-outline">
                                                    <label class="form-label">HS Code</label>
                                                    <input type="text" class="form-control" v-model="item_code"
                                                        style="background-color: gainsboro;" readonly>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="form-outline">
                                                    <label class="form-label">Number of items</label>
                                                    <input type="number" class="form-control" v-model="item_number"
                                                        style="background-color: gainsboro;" readonly>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="form-outline">
                                                    <label class="form-label">Unit price (&euro;)</label>
                                                    <input type="number" class="form-control" v-model="item_price"
                                                        style="background-color: gainsboro;" readonly>
                                                </div>
                                            </div>
                                        </div>
                                    </template>

                                </div>
                                <div class="text-end">
                                    <router-link to="/shipment-information" type="button" class="btn btn-secondary"> <i
                                            class="fas fa-pencil-alt"></i>
                                        Edit</router-link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                

                <div class="col-md-6 mb-1">
                    <div class="card mb-1">
                        <div class="card-header py-3" style="background-color: black;">
                            <h5 class="mb-0" style="color: white; font-weight: bold;">Sender Information</h5>
                        </div>
                        <div class="card-body">
                            <form>
                                <!-- 2 column grid layout with text input style="background-color: gainsboro;" readonlys for the first and last names -->
                                <div class="row mb-1">
                                    <div class="col">
                                        <div class="form-outline">
                                            <label class="form-label">Number</label>
                                            <input style="background-color: gainsboro;" readonly type="text"
                                                id="form7Example1" class="form-control" placeholder="Number"
                                                v-model="sender.number">
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-outline">
                                            <label class="form-label">Street</label>
                                            <input style="background-color: gainsboro;" readonly type="text"
                                                class="form-control" placeholder="Street" v-model="sender.street">
                                        </div>
                                    </div>
                                </div>
                                <div class="row mb-1">
                                    <div class="col">
                                        <div class="form-outline">
                                            <label class="form-label">Postal Code</label>
                                            <input style="background-color: gainsboro;" readonly type="text"
                                                class="form-control" placeholder="Postal Code" v-model="sender.postal_code">
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-outline">
                                            <label class="form-label">City</label>
                                            <input style="background-color: gainsboro;" readonly type="text"
                                                class="form-control" placeholder="City" v-model="sender.city">
                                        </div>
                                    </div>
                                </div>
                                <div class="row mb-1">
                                    <div class="col">
                                        <div class="form-outline">
                                            <label class="form-label">State</label>
                                            <input style="background-color: gainsboro;" readonly type="text"
                                                class="form-control" placeholder="State" v-model="sender.state">
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-outline">
                                            <label class="form-label">Country</label>
                                            <input style="background-color: gainsboro;" readonly type="text"
                                                class="form-control" placeholder="Country" v-model="sender.country">
                                        </div>
                                    </div>
                                </div>
                                <div class="row mb-1">
                                    <div class="col">
                                        <div class="form-outline">
                                            <label class="form-label">Email</label>
                                            <input style="background-color: gainsboro;" readonly type="email"
                                                class="form-control" placeholder="Email" v-model="sender.email">
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-outline">
                                            <label class="form-label">Phone</label>
                                            <input style="background-color: gainsboro;" readonly type="text"
                                                class="form-control" placeholder="Phone" v-model="sender.phone">
                                        </div>
                                    </div>
                                </div>
                                <div class="text-end">
                                    <router-link to="/sender_information" type="button" class="btn btn-secondary"> <i
                                            class="fas fa-pencil-alt"></i>
                                        Edit</router-link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 mb-1">
                    <div class="card mb-1">
                        <div class="card-header py-3" style="background-color: black;">
                            <h5 class="mb-0" style="color: white; font-weight: bold;">Receiver Information</h5>
                        </div>
                        <div class="card-body">
                            <form>
                                <!-- 2 column grid layout with text input style="background-color: gainsboro;" readonlys for the first and last names -->
                                <div class="row mb-1">
                                    <div class="col">
                                        <div class="form-outline">
                                            <label class="form-label">Number</label>
                                            <input style="background-color: gainsboro;" readonly type="text"
                                                id="form7Example1" class="form-control" placeholder="Number"
                                                v-model="receiver.number">
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-outline">
                                            <label class="form-label">Street</label>
                                            <input style="background-color: gainsboro;" readonly type="text"
                                                class="form-control" placeholder="Street" v-model="receiver.street">
                                        </div>
                                    </div>
                                </div>
                                <div class="row mb-1">
                                    <div class="col">
                                        <div class="form-outline">
                                            <label class="form-label">Postal Code</label>
                                            <input style="background-color: gainsboro;" readonly type="text"
                                                class="form-control" placeholder="Postal Code"
                                                v-model="receiver.postal_code">
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-outline">
                                            <label class="form-label">City</label>
                                            <input style="background-color: gainsboro;" readonly type="text"
                                                class="form-control" placeholder="City" v-model="receiver.city">
                                        </div>
                                    </div>
                                </div>
                                <div class="row mb-1">
                                    <div class="col">
                                        <div class="form-outline">
                                            <label class="form-label">State</label>
                                            <input style="background-color: gainsboro;" readonly type="text"
                                                class="form-control" placeholder="State" v-model="receiver.state">
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-outline">
                                            <label class="form-label">Country</label>
                                            <input style="background-color: gainsboro;" readonly type="text"
                                                class="form-control" placeholder="Country" v-model="receiver.country">
                                        </div>
                                    </div>
                                </div>
                                <div class="row mb-1">
                                    <div class="col">
                                        <div class="form-outline">
                                            <label class="form-label">Email</label>
                                            <input style="background-color: gainsboro;" readonly type="email"
                                                class="form-control" placeholder="Email" v-model="receiver.email">
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-outline">
                                            <label class="form-label">Phone</label>
                                            <input style="background-color: gainsboro;" readonly type="text"
                                                class="form-control" placeholder="Phone" v-model="receiver.phone">
                                        </div>
                                    </div>
                                </div>
                                <div class="text-end">
                                    <router-link to="/receiver_information" type="button" class="btn btn-secondary"> <i
                                            class="fas fa-pencil-alt"></i>
                                        Edit</router-link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="col-md-4 mb-4">
                    <div class="card mb-4">
                        <div class="card-body">
                            <template
                                v-if="new_country && price && package_type && weight && selectedDate && description && shipment.service_point_id && sender && receiver">
                                <router-link to="/payment" type="button" class="btn btn-success btn-lg btn-block"
                                    style="width: 100%;">
                                    <i class="fas fa-credit-card"></i> Proceed to Payment
                                </router-link>
                            </template>
                            <template v-else>
                                <button type="button" class="btn btn-secondary btn-lg btn-block"
                                    style="width: 100%; pointer-events: none;">
                                    <i class="fas fa-credit-card"></i> Proceed to Payment
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
            weight: "",
            height: "",
            length: "",
            width: "",
            selectedDate: '',
            description: "",
            promo_code: "",
            discount: "",
            transporter: "",
            service_point_name: "",

            commercial_value: "",
            item_nature: "",
            item_description: "",
            item_code: "",
            item_number: "",
            item_price: "",
            payment_cash: "",

            shipping_option: "",
            assurance: "",
            service: "",

            shipment: {},

            sender: {
                number: "",
                street: "",
                postal_code: "",
                city: "",
                state: "",
                country: "",
                email: "",
                phone: ""
            },
            receiver: {
                number: "",
                street: "",
                postal_code: "",
                city: "",
                state: "",
                country: "",
                email: "",
                phone: ""
            },
        }
    },
    computed: {
        isReadOnly() {
            return true;
        },
    },
    mounted() {
        document.title = 'Validate | Eurekali'

        this.shipment = this.$store.state.shipment


        this.new_country = this.$store.state.shipment.country
        this.price = this.$store.state.shipment.price
        this.package_type = this.$store.state.shipment.package_type

        this.promo_code = this.$store.state.shipment.promo_code
        this.discount = this.$store.state.shipment.discount

        this.transporter = this.$store.state.shipment.transporter

        this.receiver.number = this.$store.state.shipment.receiver.number
        this.receiver.street = this.$store.state.shipment.receiver.street
        this.receiver.postal_code = this.$store.state.shipment.receiver.postal_code
        this.receiver.city = this.$store.state.shipment.receiver.city
        this.receiver.state = this.$store.state.shipment.receiver.state
        this.receiver.country = this.$store.state.shipment.receiver.country
        this.receiver.email = this.$store.state.shipment.receiver.email
        this.receiver.phone = this.$store.state.shipment.receiver.phone

        this.sender.number = this.$store.state.shipment.sender.number
        this.sender.street = this.$store.state.shipment.sender.street
        this.sender.postal_code = this.$store.state.shipment.sender.postal_code
        this.sender.city = this.$store.state.shipment.sender.city
        this.sender.state = this.$store.state.shipment.sender.state
        this.sender.country = this.$store.state.shipment.sender.country
        this.sender.email = this.$store.state.shipment.sender.email
        this.sender.phone = this.$store.state.shipment.sender.phone

        this.item_nature = this.$store.state.shipment.proforma.item_nature
        this.item_description = this.$store.state.shipment.proforma.item_description
        this.item_code = this.$store.state.shipment.proforma.item_code
        this.item_number = this.$store.state.shipment.proforma.item_number
        this.item_price = this.$store.state.shipment.proforma.item_price

        if (this.$store.state.shipment.proforma.item_price) {
            this.commercial_value = true
        } else {
            this.commercial_value = false
        }



        if (this.$store.state.shipment.weight) {
            this.weight = this.$store.state.shipment.weight
        }
        if (this.$store.state.shipment.height) {
            this.height = this.$store.state.shipment.height
        }
        if (this.$store.state.shipment.width) {
            this.width = this.$store.state.shipment.width
        }
        if (this.$store.state.shipment.length) {
            this.length = this.$store.state.shipment.length
        }
        if (this.$store.state.shipment.selectedDate) {
            this.selectedDate = this.$store.state.shipment.selectedDate
        }
        if (this.$store.state.shipment.description) {
            this.description = this.$store.state.shipment.description
        }

        this.getServicePoint()

    },
    methods: {
        async setcashpayment(status) {
            console.log('setcashpayment')
            const statuss = status
            this.$store.commit('setcashpayment', statuss)
        },
        async getServicePoint() {
            this.$store.commit('setIsLoading', true)


            await axios.get(`/api/v1/servicepoints/${this.$store.state.shipment.service_point_id}/`)
                .then(response => {
                    this.service_point_name = response.data['company_name']
                    this.setcashpayment(response.data['cash_payment'])

                })
                .catch(error => {
                    console.log(error)
                })

            this.$store.commit('setIsLoading', false)
        },
    }
}
</script>
  
  
  