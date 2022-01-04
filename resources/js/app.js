/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
global.jquery = global.jQuery = global.$ = require('jquery');

window.Vue = require('vue').default;
var VueRouter = require('vue-router');
import App from './components/app.vue'
import Hat from './components/hat.vue'
import Stripe from './components/stripe.vue'
Vue.use(VueRouter);
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */


import cell from './components/celly';
Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('keeper', require('./components/keeper.vue').default);
Vue.component('hat', require('./components/hat.vue').default);
Vue.component('holder', require('./components/holder.vue').default);
Vue.component('celly', require('./components/celly.vue').default);
Vue.component('edit', require('./components/edit.vue').default);
Vue.component('tblHead', require('./components/tblHead.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
const Home = require('./components/keeper');
const Edit = require('./components/edit');

const app = new Vue({
    el: '#app',
    data(){return{
        users: [
            {number: '1', name: 'bob', email: 'bob@mail.ru', address: 'London', created: '12.12.20', photopath: './assets/unnamed.jpg'},
            {number: '2', name: 'bill', email: 'bill@mail.ru', address: 'Paris', created: '23.12.19', photopath: './assets/index.jpeg'},
            {number: '3', name: 'john', email: 'john@mail.ru', address: 'Berlin', created: '09.08.21', photopath: './assets/index.jpeg'},
            {number: '4', name: 'Sean', email: 'sean@mail.ru', address: 'Rome', created: '32.10.21', photopath: './assets/unnamed.jpg'},
            {number: '5', name: 'Harry', email: 'harry@mail.ru', address: 'Madrid', created: '09.11.21', photopath: './assets/prof.jpg'},
            {number: '6', name: 'Chuck', email: 'chuck@mail.ru', address: 'Madrid', created: '09.11.21', photopath: './assets/index.jpeg'},
            {number: '7', name: 'Bruice', email: 'bruice@mail.ru', address: 'Madrid', created: '09.11.21', photopath: './assets/prof.jpg'},
        ]}
    },
    components:{
        App,
        Hat,
        Stripe
    },
    computed:{
        currentDate(){
            return new Date().getDay()+'.'+ new Date().getMonth()+1+'.'+ new Date().getFullYear()
        }
    }
});
// const routes = [
//     { path: '/', component: Home },
//     { path: '/edit', component: Edit },
// ]

// const router=new VueRouter.createRouter({
//     history: VueRouter.createWebHashHistory(),
//     routes,
// });
//
// const app = Vue.createApp({});
// app.use(router);
// app.mount('#app')


function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
//$('#close').click(function(){$('.field').css("display", "none")});
// function closeClick (){console.log('pressed');}
// $('#close').click(function(){console.log('pressed')});
// const Applicat={
//     data(){
//         return{
//             date: '2021-12-30'
//         }
//     }
// }
// Vue.createApp(Applicat).mount('#app')
