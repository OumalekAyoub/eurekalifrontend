<template>
    <section>

        <div class="container mt-4">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <form class="border p-4" @submit.prevent="submitForm">

                        
                        <div class="form-group mb-3">
                            <input type="password" class="form-control" placeholder="New Paasword" required v-model="new_password">
                        </div>

                        <div class="form-group mb-3">
                            <input type="password" class="form-control" placeholder="Confirm New Paasword" required v-model="re_new_password">
                        </div>

                        <div class="text-center mt-3">
                            <button type="submit" class="btn btn-primary btn-block mx-auto w-50">Reset Password</button><br />

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
            new_password: '',
            re_new_password: '',
            errors: []
        }
    },
    mounted() {
        document.title = 'Reset Password | Eurekali'
    },
    methods: {
        submitForm() {
            const uid = this.$route.params.uid
            const token = this.$route.params.token

            this.errors = []
            if (this.password === '') {
                this.errors.push('The password is too short')
            }
            if (this.password !== this.re_password) {
                this.errors.push('The passwords doesn\'t match')
            }
            if (!this.errors.length) {
                const formData = {
                    uid: uid,
                    token: token,
                    new_password: this.new_password,
                    re_new_password: this.re_new_password
                }
                axios
                    .post("/api/v1/users/reset_password_confirm/", formData)
                    .then(response => {
                        toast({
                            message: 'Password Updated!',
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


