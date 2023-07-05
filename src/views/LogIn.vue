<template>
    <section>

        <div class="container mt-4">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <form class="border p-4" @submit.prevent="submitForm">

                        <div class="form-group mb-3">
                            <input type="email" class="form-control" placeholder="Email" required v-model="email">
                        </div>
                        <div class="form-group mb-3">
                            <input type="password" class="form-control" placeholder="Paasword" required v-model="password">
                        </div>

                        <div class="text-center mt-3">
                            <button type="submit" class="btn btn-primary btn-block mx-auto w-50">Log-In</button><br />

                            <br>
                            <router-link to="/reset_password">Forgot your Password?</router-link>
                            <br/>
                            <router-link to="/signup">You don't have an account? </router-link>

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
    name: 'LogIn',
    data() {
        return {
            email: '',
            password: '',
            errors: []
        }
    },
    mounted() {
        document.title = 'Log In | Eurekali'
    },
    methods: {
        async submitForm() {
            axios.defaults.headers.common["Authorization"] = ""
            localStorage.removeItem("token")
            const formData = {
                email: this.email,
                password: this.password
            }
            await axios
                .post("/api/v1/token/login/", formData)
                .then(response => {
                    const token = response.data.auth_token
                    this.$store.commit('setToken', token)

                    axios.defaults.headers.common["Authorization"] = "Token " + token
                    localStorage.setItem("token", token)
                    const toPath = this.$route.query.to || '/myprofile'
                    this.$router.push(toPath)
                })
                .catch(error => {
                    if (error.response) {
                        for (const property in error.response.data) {
                            this.errors.push(`${property}: ${error.response.data[property]}`)
                        }
                    } else {
                        this.errors.push('Something went wrong. Please try again')

                        console.log(JSON.stringify(error))
                    }
                })
        }
    }
}
</script>


