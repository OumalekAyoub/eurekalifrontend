<template>
    <section>
        <div class="container mt-4">
            <div v-if="isLoading" class="loading-overlay">
      <img src="../assets/loading.png" alt="Loading Animation" />
    </div>
    <div v-else>
            <div class="row justify-content-center">
                <div class="col-md-8 mb-4">
                    <div class="card mb-4">
                        <div class="card-header py-3" style="background-color: black;">
                            <h5 class="mb-0" style="color: white; font-weight: bold;">Bailing Information</h5>
                        </div>
                        <div class="card-body">
                            <div class="form-group mb-1 col-12">
                                <div class="form-group form-switch">
                                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"
                                        v-model="discount_choice">
                                    <label class="form-check-label" for="flexSwitchCheckDefault"
                                        style="margin-left: 12px;">Enter promotion code</label>
                                </div>
                            </div>
                            <template v-if="discount_choice">
                                <div class="form-group mb-3 col-6 mt-4">
                                    <label>Promo Code</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" style="width: auto;" placeholder="Please Enter the promo code"
                                            v-model="promo_code">
                                        <button class="btn btn-success" @click="checkPromoCode">Validate Code</button>
                                    </div>
                                </div>
                            </template>

                            <hr>
                            
                            <div class="notification is-danger mt-4" v-if="errors.length">
                                <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                            </div>
                            
                            <div id="card-element" class="mb-5" style="margin-top: 20px;"></div>
                            <button class="btn btn-success" @click="submitForm">Pay with credit card</button>

                            <hr />
                            <template v-if="shipment.payment_cash">
                            <div class="form-group mb-3 col-6 mt-4">
                                <div class="form-group form-switch">
                                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"
                                        v-model="payment_cash">
                                    <label class="form-check-label" for="flexSwitchCheckDefault"
                                        style="margin-left: 12px;">Pay with Cash</label>
                                </div>
                            </div>

                            <template v-if="payment_cash">
                                <div class="form-group mb-3 col-8 mt-4">
                                    <label>Verification Code</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" style="width: auto;" placeholder="Please Enter the verification code"
                                            v-model="cash_token">
                                    </div>
                                    <button class="btn btn-primary" style="margin-top: 5px;" @click="requestCode">Request Code</button><br/>
                                    <button class="btn btn-success" style="margin-top: 5px;" @click="submitForm3">Validate Payment</button>
                                </div>
                            </template>
                        </template>

                            

                        </div>

                    </div>
                </div>

                <div class="col-md-4 mb-4">
                    <div class="card mb-4">
                        <div class="card-header py-3" style="background-color: black;">
                            <h5 class="mb-0" style="color: white;font-weight: bold;">Summary</h5>
                        </div>
                        <div class="card-body">
                            <ul class="list-group list-group-flush">


                                <li
                                    class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-0">
                                    <div>
                                        <strong>Shipment Price</strong>
                                    </div>
                                    <span><strong> {{ shipment_price }} &euro;</strong></span>
                                </li>
                                <li
                                    class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-0">
                                    <div>
                                        <strong>VAT</strong>
                                    </div>
                                    <span><strong> {{ vat_price }} &euro;</strong></span>
                                </li>

                                <template v-if="discount">
                                    <li
                                        class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-2">
                                        <div>
                                            <strong style="color: red;">Discount</strong>
                                        </div>
                                        <span><strong style="color: red;">- {{ discount }} &euro;</strong></span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-1"
                                        style="margin-top: 20px;">
                                        <div>
                                            <strong>Total amount</strong>
                                        </div>
                                        <span><strong>{{ parseFloat(parseFloat(price) - parseFloat(discount)).toFixed(2) }}
                                                &euro;</strong></span>
                                    </li>
                                </template>
                                <template v-else>
                                    <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-1"
                                        style="margin-top: 20px;">
                                        <div>
                                            <strong>Total amount</strong>
                                        </div>
                                        <span><strong>{{ price }} &euro;</strong></span>
                                    </li>
                                </template>

                            </ul>

                        </div>
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
import moment from 'moment';

export default {
    name: 'NewOrder',
    data() {
        return {
            new_country: "",
            price: "",
            package_type: "",
            eu_country: "",
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
            VAT: "",
            vat_price: "",
            shipment_price: "",
            discount_choice: "",
            discount: 0,
            payment_cash: "",
            cash_token : "",

            shipment: {},
            stripe: {},
            card: {},
            errors: [],

            shipment_id: "",
            sender_id: "",
            receiver_id: "",
            sender: {},
            receiver: {},
            service_point_id: "",
            service_point: {},

            isLoading: false
        }
    },
    created() {
        if (!this.$store.state.shipment.price) {
            this.$router.push('/new_order')
        }
    },
    mounted() {
        document.title = 'Payment | Eurekali'

        this.new_country = this.$store.state.shipment.country
        this.price = this.$store.state.shipment.price
        this.package_type = this.$store.state.shipment.package_type
        this.eu_country = this.$store.state.shipment.eu_country

        this.number = this.$store.state.shipment.sender.number
        this.street = this.$store.state.shipment.sender.street
        this.postal_code = this.$store.state.shipment.sender.postal_code
        this.city = this.$store.state.shipment.sender.city
        this.state = this.$store.state.shipment.sender.state
        this.country = this.$store.state.shipment.sender.country
        this.email = this.$store.state.shipment.sender.email
        this.phone = this.$store.state.shipment.sender.phone
        this.first_name = this.$store.state.shipment.sender.first_name
        this.last_name = this.$store.state.shipment.sender.last_name
        this.choice = false

        this.VAT = this.$store.state.shipment.VAT
        this.shipment_price = parseFloat(parseFloat(this.price) / parseFloat(1 + parseFloat(this.VAT) / 100)).toFixed(2)
        this.vat_price = parseFloat(parseFloat(this.price) - parseFloat(parseFloat(this.price) / parseFloat(1 + parseFloat(this.VAT) / 100))).toFixed(2)


        this.shipment = this.$store.state.shipment
        this.sender = this.$store.state.shipment.sender
        this.receiver = this.$store.state.shipment.receiver
        this.service_point_id = this.$store.state.shipment.service_point_id


        if (this.price) {
            this.stripe = Stripe('pk_test_51MKIROJptvHeBaQ0WDtxbXehxX118MLWmDwbOuBFnJDisnOa10niECJb4KoUIGDidGSmrZqQzeWgyCrjcarAXvMJ00d8wQEleu')
            const elements = this.stripe.elements();
            this.card = elements.create('card', { hidePostalCode: true })
            this.card.mount('#card-element')
        }

    },
    methods: {
        async requestCode() {
            this.$store.commit('setIsLoading', true)
            const data = {
                'servicepoint_id': this.shipment.service_point_id,
                'client': this.shipment.sender.first_name + " " + this.shipment.sender.last_name,
                'price': parseFloat(this.price) - parseFloat(this.discount),
                "shipment_country": this.shipment.country,
                "shipment_package": this.shipment.package_type,
                "shipment_weight": this.shipment.weight,
            };
            try {
                await axios.post('/api/v1/create_cash_order/', data)
                    .then(response => {
                        toast({
                                message: 'The code has been sent to the email of the service point you chose. Please contact them to receive the code!',
                                type: 'is-success',
                                dismissible: true,
                                pauseOnHover: true,
                                duration: 4000,
                                position: 'bottom-right',
                            })
                    })
            } catch (error) {
                this.errors.push('Something went wrong. Client creation');
                console.error(error);
            }

            this.$store.commit('setIsLoading', false);
        },
        async checkPromoCode() {
            this.$store.commit('setIsLoading', true)

            await axios.get(`/api/v1/verify-promo/${this.promo_code}`)
                .then(response => {
                    if (response.data['valid']) {
                        this.discount = response.data['amount']
                        toast({
                            message: 'Promo code is valide, amount : ' + response.data['amount'] + '€',
                            type: 'is-success',
                            dismissible: true,
                            pauseOnHover: true,
                            duration: 2000,
                            position: 'bottom-right',
                        })
                    } else {
                        this.discount = 0

                        toast({
                            message: 'The promo code is not valide!',
                            type: 'is-danger',
                            dismissible: true,
                            pauseOnHover: true,
                            duration: 2000,
                            position: 'bottom-right',
                        })
                    }

                })
                .catch(error => {
                    console.log(error)
                })

            this.$store.commit('setIsLoading', false)
        },
        async getServicePoint() {
            this.$store.commit('setIsLoading', true)

            await axios.get(`/api/v1/servicepoints/${this.service_point_id}`)
                .then(response => {
                    if (response.data) {
                        this.service_point = response.data
                    } else {
                        toast({
                            message: 'Service Point is not valide!',
                            type: 'is-danger',
                            dismissible: true,
                            pauseOnHover: true,
                            duration: 2000,
                            position: 'bottom-right',
                        })
                    }
                })
                .catch(error => {
                    console.log(error)
                })

            this.$store.commit('setIsLoading', false)
        },
        async CreateSenderClient() {
            const data = {
                'first_name': this.sender.first_name,
                'last_name': this.sender.last_name,
                'email': this.sender.email,
                "phone": this.sender.phone,
                "number": this.sender.number,
                "street": this.sender.street,
                "city": this.sender.city,
                "state": this.sender.state,
                "postal_code": this.sender.postal_code,
                "country": this.sender.country,
                "client_type": "sender",
            };
            try {
                await axios.post('/api/v1/clients/create/', data)
                    .then(response => {
                        if (response.data['client_id']) {
                            this.sender_id = response.data['client_id']
                        } else {
                            toast({
                                message: 'Problem in Sender Information!',
                                type: 'is-danger',
                                dismissible: true,
                                pauseOnHover: true,
                                duration: 2000,
                                position: 'bottom-right',
                            })
                        }
                    })
            } catch (error) {
                this.errors.push('Something went wrong. Client creation');
                console.error(error);
            }

            this.$store.commit('setIsLoading', false);
        },
        async CreateReceiverClient() {
            const data = {
                'first_name': this.receiver.first_name,
                'last_name': this.receiver.last_name,
                'email': this.receiver.email,
                "phone": this.receiver.phone,
                "number": this.receiver.number,
                "street": this.receiver.street,
                "city": this.receiver.city,
                "state": this.receiver.state,
                "postal_code": this.receiver.postal_code,
                "country": this.receiver.country,
                "client_type": "receiver",
            };
            try {
                await axios.post('/api/v1/clients/create/', data)
                    .then(response => {
                        if (response.data['client_id']) {
                            this.receiver_id = response.data['client_id']
                        } else {
                            toast({
                                message: 'Problem in Receiver Information!',
                                type: 'is-danger',
                                dismissible: true,
                                pauseOnHover: true,
                                duration: 2000,
                                position: 'bottom-right',
                            })
                        }
                    })
            } catch (error) {
                this.errors.push('Something went wrong. Client creation');
                console.error(error);
            }
            this.$store.commit('setIsLoading', false);
        },
        async CreateShipment_servicePoint() {
            await this.CreateSenderClient()
            await this.CreateReceiverClient()
            await this.getServicePoint()

            const data = {
                'insure_my_parcel': this.shipment.insure_my_parcel,
                'sender': this.sender_id,
                'recipient': this.receiver_id,
                'pickup_number': this.service_point.number,
                "pickup_street": this.service_point.street,
                "pickup_postal_code": this.service_point.postal_code,
                "pickup_city": this.service_point.city,
                "pickup_state": this.service_point.state,
                "pickup_country": this.service_point.country,
                "country": this.shipment.country,
                "package_type": this.shipment.package_type,
                "max_weight": this.shipment.weight,

                "promo_code": this.promo_code,
                "shipping_date": moment(this.shipment.selectedDate, 'YYYY-MM-DD').format('YYYY-MM-DD'),
                "package_description": this.shipment.description,

            }

            try {
                await axios.post('/api/v1/shipments/create/', data)
                    .then(response => {
                        if (response.data['id']) {
                            this.shipment_id = response.data['id']
                        } else {
                            toast({
                                message: 'Problem in creating shipment!',
                                type: 'is-danger',
                                dismissible: true,
                                pauseOnHover: true,
                                duration: 2000,
                                position: 'bottom-right',
                            })
                        }
                    })
            } catch (error) {
                this.errors.push('Something went wrong. shipment creation ',);
                console.error(error);
            }
            this.$store.commit('setIsLoading', false);
        },
        async createServicePointShipment() {
            await axios
                .post(`/api/v1/service-point-shipment/create/${this.shipment.service_point_id}/${this.shipment_id}/`, {

                })
                .then(response => {
                    // Handle the response
                    console.log(response.data); // Process the response as needed
                })
                .catch(error => {
                    console.error(error);
                    // Handle error
                });
        },
        submitForm() {
            this.errors = []
            if (!this.errors.length) {
                this.$store.commit('setIsLoading', true)

                this.stripe.createToken(this.card).then(result => {
                    if (result.error) {
                        this.$store.commit('setIsLoading', false)
                        this.errors.push('Something went wrong with Stripe. Please try again')
                        console.log(result.error.message)
                    } else {
                        this.stripeTokenHandler(result.token)
                    }
                })
            }
        },
        async submitForm3() {
            this.$store.commit('setIsLoading', true)

            await axios.get(`/api/v1/checkcashtoken/${this.cash_token}/`)
                .then(response => {
                    if (response.data['status']) {
                        this.stripeTokenHandler22(this.cash_token)
                    } else {

                        toast({
                            message: 'The verification code is not valide!',
                            type: 'is-danger',
                            dismissible: true,
                            pauseOnHover: true,
                            duration: 2000,
                            position: 'bottom-right',
                        })
                    }

                })
                .catch(error => {
                    console.log(error)
                })

            this.$store.commit('setIsLoading', false)
        },
        async stripeTokenHandler22(cash_token) {
            this.isLoading = true;
            this.$store.commit('setIsLoading', true)
            
            const data = {
                'first_name': this.first_name,
                'last_name': this.last_name,
                'email': this.email,
                "phone": this.phone,
                "number": this.number,
                "street": this.street,
                "city": this.city,
                "state": this.state,
                "postal_code": this.postal_code,
                "country": this.country,
                "paid_amount": parseFloat(this.price) - parseFloat(this.discount),
                'stripe_token': cash_token
            };

            try {
                
                await this.CreateShipment_servicePoint()
                this.createServicePointShipment()


                axios.get(`/api/v1/modify/checkcashtoken/${cash_token}/`);
                await axios.post(`/api/v1/paid-shipment/${this.shipment_id}/`, data);

                
                if (this.shipment.proforma.item_nature) {
                    await this.CreateProforma()
                }

                this.createInvoice()
                await this.createSaleticket()

                toast({
                    message: 'Payment was successful !',
                    position: 'bottom-right',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                    duration: 3000, // milliseconds
                });
                

            } catch (error) {
                
                await axios.post(`/api/v1/shipments/failed/payment/${this.shipment_id}/`);

                this.errors.push('Something went wrong. Please try again');
                console.error(error);
            }

            this.$store.commit('setIsLoading', false);
            this.isLoading = false;
        },
        async stripeTokenHandler(token) {
            this.isLoading = true;
            this.$store.commit('setIsLoading', true)
            
            const data = {
                'first_name': this.first_name,
                'last_name': this.last_name,
                'email': this.email,
                "phone": this.phone,
                "number": this.number,
                "street": this.street,
                "city": this.city,
                "state": this.state,
                "postal_code": this.postal_code,
                "country": this.country,
                "paid_amount": parseFloat(this.price) - parseFloat(this.discount),
                'stripe_token': token.id
            };

            try {
                
                await this.CreateShipment_servicePoint()
                this.createServicePointShipment()


                await axios.post(`/api/v1/checkout/${this.shipment_id}/`, data);
                await axios.post(`/api/v1/paid-shipment/${this.shipment_id}/`, data);

                
                if (this.shipment.proforma.item_nature) {
                    await this.CreateProforma()
                }

                this.createInvoice()
                await this.createSaleticket()

                toast({
                    message: 'Payment was successful !',
                    position: 'bottom-right',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                    duration: 3000, // milliseconds
                });
                

            } catch (error) {
                
                await axios.post(`/api/v1/shipments/failed/payment/${this.shipment_id}/`);

                this.errors.push('Something went wrong. Please try again');
                console.error(error);
            }

            this.$store.commit('setIsLoading', false);
            this.isLoading = false;
        },
        createInvoice() {
                axios
                .post(`/api/v1/invoices/create/${this.shipment_id}/${this.service_point_id}/`, {

                })
                .then(response => {
                    console.log(response.data); // Process the response as needed
                })
                .catch(error => {
                    console.error(error);
                    // Handle error
                });
        },
        async createSaleticket() {
            await axios
                .post(`/api/v1/saleticket/create/${this.shipment_id}/`, {

                })
                .then(response => {
                    const id_sale =  response.data['id']
                    this.$router.push(`/success/${this.shipment_id}/${id_sale}/`)
                    console.log(response.data); // Process the response as needed
                })
                .catch(error => {
                    console.error(error);
                    // Handle error
                });
        },
        async CreateProforma() {

            const data = {
                'shipment': this.shipment_id,
                "nature": this.shipment.proforma.item_nature,
                "description": this.shipment.proforma.item_description,
                "hs_code": this.shipment.proforma.item_code,
                "number_items": this.shipment.proforma.item_number,
                "unit_price": this.shipment.proforma.item_price,
            }

            try {
                await axios.post('/api/v1/proforma-invoice/create/', data)
                    .then(response => {

                    })
            } catch (error) {
                this.errors.push('Something went wrong. Proforma creation ');
                console.error(error);
            }
            this.$store.commit('setIsLoading', false);
        },
        generateSaleTicket() {
            axios
                .get(`/api/v1/generatesaleticket/${this.shipment_id}`, {
                    responseType: 'blob', // Set the response type to blob
                })
                .then(response => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'ticket.pdf');
                    document.body.appendChild(link);
                    link.click();
                })
                .catch(error => {
                    console.error('Error downloading PDF:', error);
                });
        }
    }
}
</script>
  
  
<style>
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Add a semi-transparent background color */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999; /* Set a high z-index value to make it appear on top */
  }
  
  .loading-overlay img {
    width: 500px; /* Adjust the width of the image as needed */
    height: 200px; /* Adjust the height of the image as needed */
    position: relative; /* Make the image position relative */
  }
  
  .loading-overlay::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* Center the spinner */
    border: 4px solid #f3f3f3; /* Spinner color */
    border-top: 4px solid #E5097F; /* Spinner color */
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite; /* Add rotation animation */
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
