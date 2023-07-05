import { createRouter, createWebHistory } from 'vue-router'
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'
import MyProfile from '../views/MyProfile.vue'
import ResetPassword from '../views/ResetPassword.vue'
import PasswordConfirm from '../views/PasswordConfirm.vue'
import NewOrder from '../views/NewOrder.vue'
import Packages from '../views/Packages.vue'
import SenderInformation from '../views/SenderInformation.vue'
import ReceiverInformation from '../views/ReceiverInformation.vue'
import Information from '../views/Information.vue'
import Validate from '../views/Validate.vue'
import Offers from '../views/Offers.vue'
import ShipmentInformation from '../views/ShipmentInformation.vue'
import Payment from '../views/Payment.vue'
import Success from '../views/Success.vue'
import store from '../store'
import Datepicker from '../views/Datepicker.vue'


const routes = [
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/date',
    name: 'Datepicker',
    component: Datepicker
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/myprofile/',
    name: 'MyProfile',
    component: MyProfile,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/reset_password',
    name: 'ResetPassword',
    component: ResetPassword
  },
  {
    path: '/password/reset/confirm/:uid/:token/',
    name: 'PasswordConfirm',
    component: PasswordConfirm
  },
  {
    path: '/new_order',
    name: 'NewOrder',
    component: NewOrder
  },
  {
    path: '/packages',
    name: 'Packages',
    component: Packages
  },
  {
    path: '/information',
    name: 'Information',
    component: Information
  },
  {
    path: '/sender_information',
    name: 'SenderInformation',
    component: SenderInformation
  },
  {
    path: '/receiver_information',
    name: 'ReceiverInformation',
    component: ReceiverInformation
  },
  {
    path: '/validate',
    name: 'Validate',
    component: Validate
  },
  {
    path: '/offers',
    name: 'Offers',
    component: Offers
  },
  {
    path: '/shipment-information',
    name: 'ShipmentInformation',
    component: ShipmentInformation
  },
  {
    path: '/payment',
    name: 'Payment',
    component: Payment
  },
  {
    path: '/success/:shipment_id/:saleticket_id/',
    name: 'Success',
    component: Success
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next({ name: 'LogIn', query: { to: to.path } });
  } else {
    next()
  }
})

export default router
