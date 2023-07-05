
<template>
    <section>

        <div class="container mt-4">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <form class="border p-4" @submit.prevent="updateUser">
                        <div class="form-group mb-3">
                            <div class="row">
                                <div class="col">
                                    <label>Title</label>
                                    <select class="form-control" v-model="user.title">
                                        <option value="Mr">Mr</option>
                                        <option value="Mrs">Mrs</option>
                                        <option value="Ms">Ms</option>
                                    </select>
                                </div>
                                <div class="col">
                                    <label>First Name</label>
                                    <input type="text" class="form-control" placeholder="First Name" required
                                        v-model="user.first_name">
                                </div>
                                <div class="col">
                                    <label>Last Name</label>
                                    <input type="text" class="form-control" placeholder="Last Name" required
                                        v-model="user.last_name">
                                </div>
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <div class="row">
                                <div class="col">
                                    <label>Email</label>
                                    <input type="email" class="form-control" placeholder="Email" required
                                        v-model="user.email" readonly style="background-color: gainsboro;">
                                </div>
                                <div class="col">
                                    <label>Last Login</label>
                                    <input type="text" class="form-control" placeholder="Street"
                                        v-model="lastLoginFormatted" readonly style="background-color: gainsboro;">
                                </div>

                            </div>
                        </div>
                        <template v-if="user.is_agent">
                            <div class="form-group mb-3">
                                <label>Company Name</label>
                                <input type="text" class="form-control" placeholder="Company Name"
                                    v-model="user.company_name">
                            </div>
                        </template>
                        <div class="form-group mb-3">
                            <label>Phone</label>
                            <input type="text" class="form-control" placeholder="Phone" v-model="user.phone">
                        </div>
                        <div class="form-group mb-3">
                            <div class="row">
                                <div class="col">
                                    <label>Number</label>
                                    <input type="text" class="form-control" placeholder="Number" v-model="user.number">
                                </div>
                                <div class="col">
                                    <label>Street</label>
                                    <input type="text" class="form-control" placeholder="Street" v-model="user.street">
                                </div>

                            </div>
                        </div>

                        <div class="form-group mb-3">
                            <div class="row">
                                <div class="col">
                                    <label>Postal Code</label>
                                    <input type="text" class="form-control" placeholder="Postal code"
                                        v-model="user.postal_code">
                                </div>
                                <div class="col">
                                    <label>City</label>
                                    <input type="text" class="form-control" placeholder="City" v-model="user.city">
                                </div>

                            </div>
                        </div>

                        <div class="form-group mb-3">
                            <div class="row">
                                <div class="col">
                                    <label>State</label>
                                    <input type="text" class="form-control" placeholder="State" v-model="user.state">
                                </div>
                                <div class="col">
                                    <label>Country</label>
                                    <input type="text" class="form-control" placeholder="Country" v-model="user.country">
                                </div>

                            </div>
                        </div>

                        <div class="text-center mt-3">
                            <button type="submit" class="btn btn-primary btn-block mx-auto w-50">Update</button><br />

                            <div class="notification is-danger" v-if="errors.length">
                                <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>



<script>
import axios from 'axios'
import { toast } from 'bulma-toast'

export default {
    data() {
        return {
            user: {},
            errors: []
        }
    },
    computed: {
        lastLoginFormatted() {
            if (this.user.last_login) {
                const date = new Date(this.user.last_login);
                return date.toLocaleString();
            }
            return "";
        },
    },
    created() {
        axios.get('/api/v1/users/me/')
            .then(response => {
                this.user = response.data

                toast({
                        message: 'ff '+this.user.is_particular,
                        type: 'is-success',
                        dismissible: true,
                        pauseOnHover: true,
                        duration: 2000,
                        position: 'bottom-right',
                    })
            })
            .catch(error => {
                console.log(error)
            })
    },
    methods: {
        updateUser() {
            axios.put('/api/v1/users/me/', this.user)
                .then(response => {
                    toast({
                        message: 'Updated successfully!',
                        type: 'is-success',
                        dismissible: true,
                        pauseOnHover: true,
                        duration: 2000,
                        position: 'bottom-right',
                    })
                })
                .catch(error => {
                    if (error.response) {
                        for (const property in error.response.data) {
                            this.errors.push(`${property}: ${error.response.data[property]}`)
                        }
                        console.log(JSON.stringify(error.response.data))
                    } else if (error.message) {
                        this.errors.push('Something went wrong. Please try again')

                        console.log(JSON.stringify(error))
                    }
                })
        }
    }
}
</script>
  