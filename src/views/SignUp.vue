<template>
    <section>

        <div class="container mt-4">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <form class="border p-4" @submit.prevent="submitForm">
                        <div class="form-group mb-3">
                            <div class="row">
                                <div class="col">
                                    <select class="form-control" v-model="title">
                                        <option value="Mr">Mr</option>
                                        <option value="Mrs">Mrs</option>
                                        <option value="Ms">Ms</option>
                                    </select>
                                </div>
                                <div class="col">
                                    <input type="text" class="form-control" placeholder="First Name" required
                                        v-model="first_name">
                                </div>
                                <div class="col">
                                    <input type="text" class="form-control" placeholder="Last Name" required
                                        v-model="last_name">
                                </div>
                            </div>
                        </div>

                        <div class="form-group mb-3">
                            <input type="email" class="form-control" placeholder="Email" required v-model="email">
                        </div>
                        <div class="form-group mb-3">
                            <input type="text" class="form-control" placeholder="Phone" v-model="phone">
                        </div>
                        <div class="form-group mb-3">
                            <div class="row">
                                <div class="col">
                                    <input type="text" class="form-control" placeholder="Number" v-model="number">
                                </div>
                                <div class="col">
                                    <input type="text" class="form-control" placeholder="Street" v-model="street">
                                </div>

                            </div>
                        </div>

                        <div class="form-group mb-3">
                            <div class="row">
                                <div class="col">
                                    <input type="text" class="form-control" placeholder="Postal code" v-model="postal_code">
                                </div>
                                <div class="col">
                                    <input type="text" class="form-control" placeholder="City" v-model="city">
                                </div>

                            </div>
                        </div>

                        <div class="form-group mb-3">
                            <div class="row">
                                <div class="col">
                                    <input type="text" class="form-control" placeholder="State" v-model="state">
                                </div>
                                <div class="col">
                                    <input type="text" class="form-control" placeholder="Country" v-model="country">
                                </div>

                            </div>
                        </div>

                        <div class="form-group mb-3">
                            <div class="row">
                                <div class="col">
                                    <input type="password" class="form-control" placeholder="Password" required
                                        v-model="password">
                                </div>
                                <div class="col">
                                    <input type="password" class="form-control" placeholder="Confirm Password" required
                                        v-model="re_password">
                                </div>

                            </div>
                        </div>

                        <div class="text-center mt-3">
                            <button type="submit" class="btn btn-primary btn-block mx-auto w-50">Sign-UP</button><br />

                            <br>
                            <router-link to="/login">Already have an account?</router-link>

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
    name: 'SignUp',
    data() {
        return {
            email: '',
            first_name: '',
            last_name: '',
            phone: '',
            street: '',
            postal_code: '',
            state: '',
            number: '',
            city: '',
            title: 'Mr',
            country: '',
            password: '',
            re_password: '',
            errors: []
        }
    },
    mounted() {
        document.title = 'Sign UP | Eurekali'
    },
    methods: {
        submitForm() {
            this.errors = []
            if (this.email === '') {
                this.errors.push('The Email is missing')
            }
            if (this.password === '') {
                this.errors.push('The password is too short')
            }
            if (this.password !== this.re_password) {
                this.errors.push('The passwords doesn\'t match')
            }
            if (!this.errors.length) {
                const formData = {
                    email: this.email,
                    first_name: this.first_name,
                    last_name: this.last_name,
                    phone: this.phone,
                    street: this.street,
                    postal_code: this.postal_code,
                    state: this.state,
                    number: this.number,
                    city: this.city,
                    country: this.country,
                    title: this.title,
                    password: this.password,
                    re_password: this.re_password
                }
                axios
                    .post("/api/v1/users/", formData)
                    .then(response => {
                        toast({
                            message: 'Account created, please log in!',
                            type: 'is-success',
                            dismissible: true,
                            pauseOnHover: true,
                            duration: 3000,
                            position: 'bottom-right',
                        })
                        this.$router.push('/login')
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
}
</script>

