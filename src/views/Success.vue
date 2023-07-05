<template>
    <section>

        <div class="container mt-4">
            <div class="row justify-content-center">
                <div class="col-md-12">
                    <div class="dd">
                        <p>Please click here to print your sale ticket <button class="btn btn-primary"
                                @click="printsaleticket">Sale Ticket</button></p>
                        <br />
                        <p>We will now proceed to generate the shipping label for your parcel. Once ready, we will send it
                            to the agent where you deposited your package. &#128521</p>
                        <br />
                        <p>If you have any questions or need further assistance, please don't hesitate to contact our
                            customer support team.</p>
                        <br />
                        <p>Thank you for choosing our shipping service! We will keep you updated on the progress of your
                            shipment. &#128522“ </p>
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
    name: 'Success',
    data() {
        return {
            errors: []
        }
    },
    mounted() {
        document.title = 'Success | Eurekali'
        this.sendemail()
    },
    created() {
        if (!this.$store.state.shipment.price) {
            this.$router.push('/new_order')
        }
    },
    methods: {
        async sendemail() {
            if (this.$store.state.shipment.price) {
                const shipment_id = this.$route.params.shipment_id
                const saleticket_id = this.$route.params.saleticket_id

                await axios.post(`/api/v1/order/emailsend/${shipment_id}/${saleticket_id}/`);

                this.$store.commit('clearShipment')
            }
        },
        async printsaleticket() {

            const shipment_id = this.$route.params.shipment_id
            const saleticket_id = this.$route.params.saleticket_id

            const url = `http://localhost:8000/api/v1/saleticket/print/${shipment_id}/${saleticket_id}/`;
            window.open(url, '_blank');
        },

    }
}
</script>



<style>
.dd {
    border: 2px solid black;
    padding: 20px;

    justify-content: center;
    align-items: center;
    height: auto;
    width: auto;
}</style>
  