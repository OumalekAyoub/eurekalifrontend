<template>
    <section>
        <div class="container mt-4">
            <div class="row justify-content-center">
                <div class="col-md-8 mb-4">
                    <div class="card mb-4">
                        <div class="card-header py-3" style="background-color: black;">
                            <h5 class="mb-0" style="color: white; font-weight: bold;">Shipment Information </h5>
                        </div>
                        <div class="card-body">
                            <form>
                                <!-- 2 column grid layout with text inputs for the first and last names -->
                                <div class="row mb-4">
                                    
                                    <div class="form-group mb-3">
                                            <label class="form-label" for="form7Example2">Selected Service Point</label>

                                            <select class="form-control" v-model="service_point_id">
                                                <option value="" disabled selected>Choose a service point to drop-off your
                                                    parcel</option>
                                                <option v-for="service_point in service_points" :value="service_point.id">{{
                                                    service_point.company_name }}</option>
                                            </select>

                                        </div>

                                    <div class="form-group mb-3 col-3">
                                        <label>Shipping date</label>
                                        <Datepicker v-model="selectedDate" :format="dateFormat"
                                            :disabled-dates="disabledDates" :min-date="today" :max-date="maxDate" />
                                    </div>
                                

                                    <div class="form-group mb-3">
                                        <label>Description</label>
                                        <input type="text" class="form-control" placeholder="Description of your package"
                                            v-model="description">
                                    </div>
                                    

                                    <div class="form-group mb-1 col-12">
                                        <div class="form-group form-switch">
                                            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"
                                                v-model="insure_my_parcel" @click="function99">
                                            <label class="form-check-label" for="flexSwitchCheckDefault"
                                                style="margin-left: 12px;">Insure my parcel</label>
                                        </div>
                                    </div>

                                    <div class="form-group mb-1 col-12">
                                        <div class="form-group form-switch">
                                            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"
                                                v-model="commercial_value">
                                            <label class="form-check-label" for="flexSwitchCheckDefault"
                                                style="margin-left: 12px;">My parcel has a commercial value</label>
                                        </div>
                                    </div>

                                    <template v-if="commercial_value">
                                        <div class="row mb-4">
                                            <div class="col">
                                                <div class="form-outline">
                                                    <label class="form-label">Nature of package</label>
                                                    <select class="form-control" v-model="item_nature">
                                                        <option value="Document">Document</option>
                                                        <option value="Commercial">Commercial</option>
                                                        <option value="Gift">Gift</option>
                                                        <option value="Sample">Sample</option>
                                                        <option value="Personal use">Personal use</option>
                                                        <option value="Personal effects">Personal effects</option>
                                                        <option value="Repair & return">Repair & return</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="form-outline">
                                                    <label class="form-label">Description</label>
                                                    <input type="text" class="form-control" v-model="item_description" placeholder="Description">
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="form-outline">
                                                    <label class="form-label">HS Code</label>
                                                    <input type="text" class="form-control" v-model="item_code" placeholder="HS Code">
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="form-outline">
                                                    <label class="form-label">Number of items</label>
                                                    <input type="number" class="form-control" v-model="item_number" placeholder="N. items">
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="form-outline">
                                                    <label class="form-label">Unit price (&euro;)</label>
                                                    <input type="number" class="form-control" v-model="item_price" placeholder="Unit price">
                                                </div>
                                            </div>
                                        </div>
                                    </template>
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
                            <template v-if="service_point_id && selectedDate && description ">
                                <button type="button" class="btn btn-primary btn-lg btn-block"
                                    style="width: 100%; margin-top: 20px;" @click="setProforma">
                                    Next
                                </button>
                            </template>
                        
                            <template v-else>
                                <button type="button" class="btn btn-secondary btn-lg btn-block"
                                    style="width: 100%; margin-top: 20px;" @click="checkFields2">
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
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { ref } from 'vue';

export default {
    name: 'NewOrder',
    components: {
        Datepicker
    },
    computed: {
        maxDate() {
            const maxDate = new Date();
            maxDate.setDate(maxDate.getDate() + 7);
            maxDate.setHours(0, 0, 0, 0);
            return maxDate;
        },
        start_times() {
            return this.generateTimeOptions();
        },
        end_times() {
            return this.generateTimeOptions2();
        }
    },
    setup() {
        const date = ref();
        const dateFormat = 'dd-MM-yyyy'; // Define the desired date format

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set the time to the beginning of the day

        // Check if the current hour is past 18:00
        const currentHour = new Date().getHours();
        const isPast17 = currentHour >= 17;

        if (isPast17) {
            today.setDate(today.getDate() + 1);
        }

        // Calculate the disabled dates (weekends)
        const disabledDates = (date) => {
            const dayOfWeek = date.getDay();
            return dayOfWeek === 0 || dayOfWeek === 6; // Disable Sundays (0) and Saturdays (6)
        };

        return {
            date,
            dateFormat,
            today,
            disabledDates
        };
    },
    data() {
        return {
            new_country: "",
            price: "",
            selectedDate: '',
            ready_time: null,
            close_time: null,
            description: "",
            package_type: "",
            VAT: "",
            weight: "",
            printer: "",
            insure_my_parcel: "",

            commercial_value: "",
            item_nature: "",
            item_description: "",
            item_code: "",
            item_number: "",
            item_price: "",

            service_point_id: "",
            service_points: [],

            assurance_amount: "",
            old_price2: "",


        }
    },
    mounted() {
        document.title = 'Shipment Information | Eurekali'
        this.getAssurance()
        this.new_country = this.$store.state.shipment.country
        this.price = this.$store.state.shipment.price
        this.package_type = this.$store.state.shipment.package_type
        this.weight = this.$store.state.shipment.weight
        this.VAT = this.$store.state.shipment.VAT
        this.ready_time = this.$store.state.shipment.ready_time
        this.close_time = this.$store.state.shipment.close_time
        this.printer = this.$store.state.shipment.printer
        this.insure_my_parcel = this.$store.state.shipment.insure_my_parcel

        this.item_nature = this.$store.state.shipment.proforma.item_nature
        this.item_description = this.$store.state.shipment.proforma.item_description
        this.item_code = this.$store.state.shipment.proforma.item_code
        this.item_number = this.$store.state.shipment.proforma.item_number
        this.item_price = this.$store.state.shipment.proforma.item_price

        this.service_point_id = this.$store.state.shipment.service_point_id

        this.old_price2 = this.$store.state.shipment.old_price2

        axios.get('/api/v1/service-points/')
            .then(response => {
                this.service_points = response.data;
            })
            .catch(error => {
                console.error(error);
            });



        if (this.$store.state.shipment.proforma.item_price) {
            this.commercial_value = true
        } else {
            this.commercial_value = false
        }


        if (this.$store.state.shipment.description) {
            this.description = this.$store.state.shipment.description
        }
    },

    created() {
        if (!this.$store.state.shipment.country) {
            this.$router.push('/new_order')
        }

        if (!this.$store.state.shipment.package_type) {
            this.$router.push('/packages')
        }

        if (!this.$store.state.shipment.price) {
            this.$router.push('/packages')
        }
    },
    methods: {
        async getAssurance(){
            this.$store.commit('setIsLoading', true)


            await axios.get('/api/v1/assurance/latest/')
                .then(response => {

                    this.assurance_amount = response.data['assurance_amount']

                })
                .catch(error => {
                    console.log(error)
                })



            this.$store.commit('setIsLoading', false)
        },
        function99() {
            if(!this.insure_my_parcel){
                this.price = (parseFloat(this.price) + parseFloat(this.assurance_amount)).toFixed(2)
            }else{
                this.price = this.old_price2
            }
            
        },
        generateTimeOptions() {
            const options = [];

            if(new Date().getHours() >17){
                for (let hour = 8 + 2; hour < 18; hour++) {
                    if (hour >= 10) {
                        options.push(`${hour}:00`);
                        options.push(`${hour}:30`);
                    }
                }
            }else{
            if (new Date().getHours() + 2 >= 17) {
                options.push(`${17}:00`);
            } else {
                for (let hour = new Date().getHours() + 2; hour < 18; hour++) {
                    if (hour >= 10) {
                        options.push(`${hour}:00`);
                        if(hour != 17){
                        options.push(`${hour}:30`);
                    }
                    }
                }
            }
        }

            return options;
        },
        generateTimeOptions2() {
            const options = [];

            if (this.ready_time) {
                const selectedHour = parseInt(this.ready_time.split(':')[0]);

                if (selectedHour + 2 >= 17) {
                    options.push(`${17}:30`);
                } else {
                    for (let hour = selectedHour + 2; hour < 18; hour++) {

                        options.push(`${hour}:00`);
                        options.push(`${hour}:30`);

                    }
                }
            }

            return options;
        },
        checkFields2() {
            if (!this.selectedDate) {
                toast({
                    message: 'Please fill the shipping date',
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                    duration: 2000,
                    position: 'bottom-right',
                })
            }

            if (!this.description) {
                toast({
                    message: 'Please fill the descirption of your package',
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                    duration: 2000,
                    position: 'bottom-right',
                })
            }

            if (!this.service_point_id) {
                toast({
                    message: 'Please choose a service point',
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                    duration: 2000,
                    position: 'bottom-right',
                })
            }

        },
        async setProforma() {
            console.log('setProforma')

            if (this.commercial_value) {
                if (this.item_nature && this.item_description && this.item_code && this.item_number && this.item_price) {
                    const item_nature = this.item_nature
                    const item_description = this.item_description
                    const item_code = this.item_code
                    const item_number = this.item_number
                    const item_price = this.item_price

                    this.$store.commit('setProforma', {
                        item_nature: item_nature,
                        item_description: item_description,
                        item_code: item_code,
                        item_number: item_number,
                        item_price: item_price,
                    })

                    this.setDimensions()
                } else {
                    toast({
                        message: 'Please fill the necessary fields for the proforma invoice!',
                        type: 'is-danger',
                        dismissible: true,
                        pauseOnHover: true,
                        duration: 2000,
                        position: 'bottom-right',
                    })
                }
            } else {
                const item_nature = ""
                const item_description = ""
                const item_code = ""
                const item_number = ""
                const item_price = ""

                this.$store.commit('setProforma', {
                    item_nature: item_nature,
                    item_description: item_description,
                    item_code: item_code,
                    item_number: item_number,
                    item_price: item_price,
                })

                await this.setPrice()
                await this.setServicePoint()
                await this.setDimensions()
            }



        },
        async setServicePoint() {
            console.log('setServicePoint')

            const service_point_id = this.service_point_id

            this.$store.commit('setServicePoint', service_point_id)
        },
        async setPrice() {
            console.log('setPrice')
            const price = this.price
            this.$store.commit('setPrice', price)

        },
        async setDimensions() {
            if (this.description) {
                console.log('setDimensions')

                const date = new Date(this.selectedDate);
                const day = date.getDate();
                const month = date.getMonth() + 1; // Months are zero-based, so we add 1
                const year = date.getFullYear();
                const selectedDate = `${year}-${month}-${day}`

                const description = this.description
                const ready_time = this.ready_time
                const close_time = this.close_time
                const printer = this.printer
                const insure_my_parcel = this.insure_my_parcel

                this.$store.commit('setDimensions', {
                    selectedDate: selectedDate,
                    description: description,
                    ready_time: ready_time,
                    close_time: close_time,
                    printer: printer,
                    insure_my_parcel: insure_my_parcel
                })
                this.$router.push('/sender_information')
            } else {
                toast({
                    message: 'Please fill the necessary fields!',
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                    duration: 2000,
                    position: 'bottom-right',
                })
            }
        }
    }
}
</script>
  
  
  