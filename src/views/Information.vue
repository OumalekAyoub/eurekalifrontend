<template>
    <h5> Country {{ new_country }}</h5>
    <h5> Package type : {{ package_type }}</h5>
    <h5> Package weight : {{ weight }}</h5>
    <h5> Price : {{ price }}</h5>
    <h5> VAT : {{ VAT }}</h5>
    <h5>Shipping date : {{ selectedDate }}</h5>
    <h5>Description : {{ description }}</h5>
    <h5>ready_time : {{ ready_time }}</h5>
    <h5>close_time : {{ close_time }}</h5>
    <h5>insure_my_parcel : {{ insure_my_parcel }}</h5>
    <h5>Service point id : {{ service_point_id }}</h5>
    <h5>Sender : {{ sender }}</h5>
    <h5>Receiver : {{ receiver }}</h5>
   
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
            VAT: "",
            selectedDate: "",
            description: "",
            ready_time: "",
            close_time: "",
            printer: "",
            insure_my_parcel: "",
            sender: "",
            receiver: "",
            service_point_id: ""
            
        }
    },
    mounted() {
        document.title = 'New Order | Eurekali'
        this.new_country = this.$store.state.shipment.country
        this.package_type = this.$store.state.shipment.package_type
        this.weight = this.$store.state.shipment.weight
        this.price = this.$store.state.shipment.price
        this.VAT = this.$store.state.shipment.VAT
        this.selectedDate = this.$store.state.shipment.selectedDate
        this.description = this.$store.state.shipment.description
        this.ready_time = this.$store.state.shipment.ready_time
        this.close_time = this.$store.state.shipment.close_time
        this.printer = this.$store.state.shipment.printer
        this.insure_my_parcel = this.$store.state.shipment.insure_my_parcel
        this.sender = this.$store.state.shipment.sender
        this.receiver = this.$store.state.shipment.receiver
        this.service_point_id = this.$store.state.shipment.service_point_id
        

    }
}
</script>


