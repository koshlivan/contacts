<template>
    <div id="field" :class=" {noned : !isShowModal, flexed : isShowModal}">
        <div class="card">
            <form class="edit-form" @submit.prevent="onSubmit">
                <div class="head">
                    <h2>Create Contact</h2>
                    <h2 class="close-butt" @click="closeModal"><span class="material-icons">clear</span></h2>
                </div>
                <div class="inputs">
                    <div class="vert">
                        <div class="row align-items-center justify-content-around ">
                            <label class="edLabel col-4">Name</label>
                            <input type="text"
                                   class="edEdit col-8"
                                   name="name"
                                   v-model="name"
                                   placeholder="Please enter yor name">
                        </div>
                        <div class="row align-items-center justify-content-around ">
                            <label class="edLabel col-4">Email</label>
                            <input type="email"
                                   class="edEdit col-8"
                                   name="email"
                                   v-model="email"
                                   placeholder="test@domain.com">
                        </div>
                        <div class="row align-items-center justify-content-around ">
                            <label class="edLabel col-4">Address</label>
                            <input type="text"
                                   class="edEdit col-8"
                                   name="address"
                                   v-model="address"
                                   placeholder="Address">
                        </div>
                    </div>
                    <div class="foto">
                        <img :src="photo" alt="&#9587;">
                        <select v-show="!isExisted" v-model="photo">
                            <option value="assets/yoda.jpeg">Yoda</option>
                            <option value="assets/index.jpeg">Girl</option>
                            <option value="assets/portrait.jpg">Dafoe</option>
                        </select>
                    </div>
                </div>
                <div class="finish">
                    <button id="close" type="button" @click="closeModal">close</button>
                    <button id="save" type="submit"><span class="material-icons">check</span>save changes</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import {eventBus} from "../app";
import AppMixin from '../AppMixin';
import apiService from "../apiService";

export default {
    name: "newModal",
    mixins: [AppMixin],
    methods: {
        onSubmit() {/*emits to Users*/
            if (this.isExisted === true) {
                apiService.updateExistedUser(
                    this.makeUser(this.name, this.email, this.address, this.photo), this.actualUserId(this.senderRow))
                    .then(response => eventBus.$emit('updating', {
                        user: response.data.user,
                        sender: this.senderRow
                    }));
            }
            if (this.isExisted !== true) {/*emits to Users*/
                apiService.saveNewUser(this.makeUser(this.name, this.email, this.address, this.photo))
                    .then(response => eventBus.$emit('saveNew', {user: response.data.user}));
            }
            this.closeModal();
        },
        clearModal() {
            this.name = '';
            this.email = '';
            this.address = '';
            this.photo = 'assets/none.png';
            this.isExisted = false;
        },
        closeModal() {
            this.clearModal();
            this.isShowModal = false;
        },
        makeUser(name, email, address, photo) {
            return {
                name: name.toLowerCase(),
                email: email.toLowerCase(),
                address: address.toLowerCase(),
                photo: photo
            };
        },
        actualUserId(index) {
            return this.users[index].id;
        }
    },
    created() {
        /*thrown by Cap*/
        eventBus.$on('showEmptyModal', (value) => {
            this.clearModal();
            this.senderRow = -1;
            this.isShowModal = value;
        });
        /*thrown by Line*/
        eventBus.$on('showFilledModal', ($event) => {
            this.name = $event.name;
            this.email = $event.email;
            this.address = $event.address;
            this.photo = $event.photo;
            this.senderRow = $event.sender;
            this.isExisted = true;
            this.isShowModal = true;
        });
    },
    computed: {
        user: function () {
            return {
                name: this.name,
                email: this.email,
                address: this.address,
                photo: this.photo,
            }
        }
    },
    data() {
        return {
            photo: 'assets/none.png',
            name: '',
            email: '',
            address: '',
            isShowModal: false,
            isExisted: false,
            senderRow: -1
        }
    },
}
</script>

<style scoped>
.head {
    margin-top: 1rem;
}

.foto {
    margin: 0.5rem 0 0.5rem 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
}

.foto img {
    min-height: 80%;
}

.flexed {
    display: flex;
}

.noned {
    display: none;
}

#field {
    min-width: 100%;
    min-height: 100vh;
    background-color: rgba(105, 105, 105, 0.7);
    justify-content: center;
    align-content: center;
    z-index: 4;
    position: fixed;
    top: 0;
    left: 0;
}

.card {
    min-width: 30%;
    max-width: 40%;
    height: 25rem;
    border-radius: 1rem;
    box-shadow: 0 0 5px rgba(10, 10, 10, 0.8);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 100%;
    transition: 500ms;
}

.edit-form {
    display: flex;
    min-height: 100%;
    flex-direction: column;
    justify-content: space-around;
    align-items: stretch;
    opacity: 100%;
}

.edit-form div:nth-child(2n+1) {
    min-height: 20%;
}

.edit-form div:nth-child(2n) {
    min-height: 60%;
}

.head {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    margin-top: 1rem;
    padding-top: 1rem;
}

.head h2 {
    margin: 1rem;
}

.head img {
    max-height: 80%;
    margin-right: 0.5rem;
    margin-top: 0.5rem;
    transition: 300ms;
}

.head img:hover {
    max-height: 85%;
    cursor: pointer;
    box-shadow: 0 0 3px gray;
}

.head img:active {
    max-height: 85%;
    cursor: pointer;
    box-shadow: 0 0 5px red;
}

.close-butt {
    margin-right: 0.5rem;
    margin-top: 0.5rem;
    transition: 300ms;
}

.close-butt span:hover {
    cursor: pointer;
    box-shadow: 0 0 3px gray;
}

.close-butt span:active {
    color: red;
    text-shadow: 0 0 3px orangered;
}

.inputs {
    display: flex;
    justify-content: space-around;
    align-items: stretch;
}

.vert {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    max-width: 60%;
}

.vert label {
    padding-left: 2rem;
}

.vert input {
    border: solid 2px black;
}

.foto {
    display: flex;
    max-width: 40%;
    justify-content: center;
    align-items: center;
}

.foto img {
    max-height: 95%;
    max-width: 95%;
}

.finish {
    display: flex;
    justify-content: flex-end;
    align-items: stretch;
    margin: 2rem 0;
}

.finish button {
    max-height: 2.5rem;
}

.finish button:nth-child(2n) {
    margin-right: 4rem;
    margin-left: 1rem;
}


#save {
    background-color: #0a53be;
    color: white;
    border: solid 2px black;
    font-size: 20px;
    text-transform: uppercase;
}

#save:active {
    background-color: #073880;
}

#save span {
    vertical-align: text-bottom;
}

#close {
    background-color: #808080;
    color: white;
    border: solid 2px black;
    font-size: 20px;
    text-transform: uppercase;
}

#close:active {
    background-color: #606060;
    text-shadow: 0 0 2px white;
}

input[type=file] {
    margin-top: 4px;
    max-width: 90%;
}

.foto select {
    margin-top: 1rem;
}

.foto-shrinked {
    max-height: 30% !important;
    max-width: 50% !important;
}

@media screen and (max-width: 1288px) {
    .card {
        min-width: 80%;
        max-width: 90%;
    }
}
</style>
