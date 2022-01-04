<template>
    <div class="holder">
        <div class="cap">
            <h3>Contacts</h3>
            <button type="button" id="addContact" @click="showDialog"><span class="material-icons">add_circle</span> Add Contact</button>
        </div>
        <div class="data">
            <table>
                <tr>
                    <th><input type="checkbox" name="selectAll"></th>
                    <th>Preview</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Created</th>
                    <th></th>
                </tr>
            </table>
            <stripe v-for="(user, index) in users"></stripe>
        </div>
    </div>
</template>
<script>
const default_layout = "default";


export default {
    computed: {},
    data() {
        return {
            users: [
                {number: '1', name: 'bob', email: 'bob@mail.ru', address: 'London', created: '12.12.20', photopath: './assets/unnamed.jpg'},
                {number: '2', name: 'bill', email: 'bill@mail.ru', address: 'Paris', created: '23.12.19', photopath: './assets/index.jpeg'},
                {number: '3', name: 'john', email: 'john@mail.ru', address: 'Berlin', created: '09.08.21', photopath: './assets/index.jpeg'},
                {number: '4', name: 'Sean', email: 'sean@mail.ru', address: 'Rome', created: '32.10.21', photopath: './assets/unnamed.jpg'},
                {number: '5', name: 'Harry', email: 'harry@mail.ru', address: 'Madrid', created: '09.11.21', photopath: './assets/prof.jpg'},
                {number: '6', name: 'Chuck', email: 'chuck@mail.ru', address: 'Madrid', created: '09.11.21', photopath: './assets/index.jpeg'},
                {number: '7', name: 'Bruice', email: 'bruice@mail.ru', address: 'Madrid', created: '09.11.21', photopath: './assets/prof.jpg'},
            ]
        }
    },

};
</script>
