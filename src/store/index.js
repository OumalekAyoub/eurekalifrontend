import { createStore } from 'vuex'

export default createStore({
  state: {
    shipment: {
      country: "",
      package_type: "",
      selectedDate: "",
      weight: "",
      description: "",
      ready_time: "",
      close_time: "",
      insure_my_parcel: false,
      printer: false,
      payment_cash: false,
      price: "",
      old_price2: "",
      VAT: "",
      service_point_id: "",
      
      billing: {
        number: "",
        street: "",
        postal_code: "",
        city: "",
        state: "",
        country: "",
        email: "",
        phone: ""
      },
      sender: {
        number: "",
        street: "",
        postal_code: "",
        city: "",
        state: "",
        country: "",
        email: "",
        phone: "",
        first_name: "",
        last_name: ""
      },
      receiver: {
        number: "",
        street: "",
        postal_code: "",
        city: "",
        state: "",
        country: "",
        email: "",
        phone: "",
        first_name: "",
        last_name: ""
      },
      proforma: {
        item_nature: "",
        item_description: "",
        item_code: "",
        item_number: "",
        item_price: "",
      },
    },
    isAuthenticated: false,
    token: '',
    isLoading: false
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem('shipment')) {
        state.shipment = JSON.parse(localStorage.getItem('shipment'))
      } else {
        localStorage.setItem('shipment', JSON.stringify(state.shipment))
      }

      if (localStorage.getItem('token')) {
        state.token = localStorage.getItem('token')
        state.isAuthenticated = true
      } else {
        state.token = ''
        state.isAuthenticated = false
      }
    },
    setIsLoading(state, status) {
      state.isLoading = status
    },
    setToken(state, token) {
      state.token = token
      state.isAuthenticated = true
    },
    removeToken(state) {
      state.token = ''
      state.isAuthenticated = false
    },
    setCountry(state, new_country) {
      state.shipment.package_type = "",
      state.shipment.selectedDate = "",
      state.shipment.weight = "",
      state.shipment.description = "",
      state.shipment.ready_time = "",
      state.shipment.close_time = "",
      state.shipment.insure_my_parcel = false,
      state.shipment.printer = false,
      state.shipment.price = "",
      state.shipment.old_price2 = "",
      state.shipment.VAT = "",
      state.shipment.country = new_country
      
      localStorage.setItem('shipment', JSON.stringify(state.shipment))
    },
    setPackage(state, payload) {
      state.shipment.selectedDate = "",
      state.shipment.description = "",
      state.shipment.ready_time = "",
      state.shipment.close_time = "",
      state.shipment.insure_my_parcel = false,
      state.shipment.printer = false,
      state.shipment.price = "",
      state.shipment.old_price2 = "",
      state.shipment.VAT = "",
      state.shipment.weight = payload.weight
      state.shipment.package_type = payload.package_type
      localStorage.setItem('shipment', JSON.stringify(state.shipment))
    },
    setDimensions(state, payload) {
      state.shipment.selectedDate = payload.selectedDate
      state.shipment.description = payload.description
      state.shipment.ready_time = payload.ready_time
      state.shipment.close_time = payload.close_time
      state.shipment.printer = payload.printer
      state.shipment.insure_my_parcel = payload.insure_my_parcel
      localStorage.setItem('shipment', JSON.stringify(state.shipment))
    },
    setPrice(state, price) {
      state.shipment.price = price
      localStorage.setItem('shipment', JSON.stringify(state.shipment))
    },
    setOldPrice(state, old_price2) {
      state.shipment.old_price2 = old_price2
      localStorage.setItem('shipment', JSON.stringify(state.shipment))
    },
    setVAT(state, VAT) {
      state.shipment.VAT = VAT
      localStorage.setItem('shipment', JSON.stringify(state.shipment))
    },
    setBilling(state, payload) {
      state.shipment.billing = {
        number: payload.number,
        street: payload.street,
        postal_code: payload.postal_code,
        city: payload.city,
        state: payload.state,
        country: payload.country,
        email: payload.email,
        phone: payload.phone
      };
      localStorage.setItem('shipment', JSON.stringify(state.shipment));
    },
    setSender(state, payload) {
      state.shipment.sender = {
        number: payload.number,
        street: payload.street,
        postal_code: payload.postal_code,
        city: payload.city,
        state: payload.state,
        country: payload.country,
        email: payload.email,
        phone: payload.phone,
        first_name: payload.first_name,
        last_name: payload.last_name
      };
      localStorage.setItem('shipment', JSON.stringify(state.shipment));
    },
    setReceiver(state, payload) {
      state.shipment.receiver = {
        number: payload.number,
        street: payload.street,
        postal_code: payload.postal_code,
        city: payload.city,
        state: payload.state,
        country: payload.country,
        email: payload.email,
        phone: payload.phone,
        first_name: payload.first_name,
        last_name: payload.last_name
      };
      localStorage.setItem('shipment', JSON.stringify(state.shipment));
    },
    setProforma(state, payload) {
      state.shipment.proforma = {
        item_nature: payload.item_nature,
        item_description: payload.item_description,
        item_code: payload.item_code,
        item_number: payload.item_number,
        item_price: payload.item_price
      };
      localStorage.setItem('shipment', JSON.stringify(state.shipment));
    },
    setServicePoint(state, service_point_id) {
      state.shipment.service_point_id = service_point_id
      state.shipment.payment_cash = false
      localStorage.setItem('shipment', JSON.stringify(state.shipment))
    },
    setcashpayment(state, status){
      state.shipment.payment_cash = status
      localStorage.setItem('shipment', JSON.stringify(state.shipment))
    },
    clearShipment(state) {
      state.shipment = {
        country: "",
        package_type: "",
        selectedDate: "",
        weight: "",
        description: "",
        ready_time: "",
        close_time: "",
        insure_my_parcel: false,
        printer: false,
        price: "",
        old_price2: "",
        VAT: "",
        service_point_id: "",
        payment_cash: false,
        billing: "",
        sender: "",
        receiver: "",
        proforma: "",
      }

      localStorage.setItem('shipment', JSON.stringify(state.shipment))
    },
  },
  actions: {
  },
  modules: {
  }
})