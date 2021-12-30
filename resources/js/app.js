/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
global.jquery = global.jQuery = global.$ = require('jquery');

window.Vue = require('vue').default;
var VueRouter = require('vue-router');

Vue.use(VueRouter);
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))
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
    data:{
        users: [
            {number: '1'},
            {number: '2'},
            {number: '3'},
            {number: '4'},
            {number: '5'},
        ]
    },
    components: {
        keeper,
        hat,
        holder,
        celly,
        edit,
        tblHead,
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
const Applicat={
    data(){
        return{
            date: '2021-12-30'
        }
    }
}
Vue.createApp(Applicat).mount('#app')
