<template>
    <div id="hat">
        <div class="hat-first">
            <h3>{{ 'User Management - '+currentDate }}</h3>

            <div id="myDropdown">
                <div class="myDropdown">
                    <span class="material-icons">account_circle</span>
                    <h5>{{ currentName }}</h5>
                    <span class="material-icons">arrow_drop_down</span>
                </div>
                <div class="dropped">
                    <a href="#">one action</a>
                    <a href="#">another action</a>
                    <hr>
                    <a href="#">Exit</a>
                </div>
            </div>
        </div>
        <hr class="under-hat">
    </div>
</template>

<script>
export default {
    name: "hat",
    data(){return {
        users: [
            {number: '1', name: 'bob', email: 'bob@mail.ru', address: 'London', created: '12.12.20', photopath: './assets/unnamed.jpg'},
            {number: '2', name: 'bill', email: 'bill@mail.ru', address: 'Paris', created: '23.12.19', photopath: './assets/index.jpeg'},
            {number: '3', name: 'john', email: 'john@mail.ru', address: 'Berlin', created: '09.08.21', photopath: './assets/index.jpeg'},
            {number: '4', name: 'Sean', email: 'sean@mail.ru', address: 'Rome', created: '32.10.21', photopath: './assets/unnamed.jpg'},
            {number: '5', name: 'Harry', email: 'harry@mail.ru', address: 'Madrid', created: '09.11.21', photopath: './assets/prof.jpg'},
            {number: '6', name: 'Chuck', email: 'chuck@mail.ru', address: 'Madrid', created: '09.11.21', photopath: './assets/index.jpeg'},
            {number: '7', name: 'Bruice', email: 'bruice@mail.ru', address: 'Madrid', created: '09.11.21', photopath: './assets/prof.jpg'},
        ],
        currentName: 'Admin'
    }

    },
    computed: {
        currentDate(){
            return new Date().getDay()+'.'+ new Date().getMonth()+1+'.'+ new Date().getFullYear()
        }
    }
}
</script>

<style scoped>

</style>
