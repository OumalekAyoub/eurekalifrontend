<template>
    <section>

        <div class="container mt-4">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <form class="border p-4" @submit.prevent="submitForm">


                        <div class="form-group mb-3">
                            <input type="email" class="form-control" placeholder="Email" required v-model="email">
                        </div>

                        <div class="text-center mt-3">
                            <button type="submit" class="btn btn-primary btn-block mx-auto w-50">Send Email</button><br />

                            <br>
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
    name: 'ResetPassword',
    data() {
        return {
            email: '',
            errors: []
        }
    },
    mounted() {
        document.title = 'Reset Password | Eurekali'
    },
    methods: {
        submitForm() {
            this.errors = []
            if (this.email === '') {
                this.errors.push('The Email is missing')
            }
            if (!this.errors.length) {
                const formData = {
                    email: this.email
                }
                axios
                    .post("/api/v1/users/reset_password/", formData)
                    .then(response => {
                        toast({
                            message: 'Email Reset Password sent!',
                            type: 'is-success',
                            dismissible: true,
                            pauseOnHover: true,
                            duration: 3000,
                            position: 'bottom-right',
                        })
                        //this.$router.push('/password/reset/confirm/:uid/:token')
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



