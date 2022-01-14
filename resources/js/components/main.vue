<template>
    <div class="wrapper">
        <Headder title="Contact Manager"></Headder>
        <div class="holder">
            <cap @showModal="showEmptyModal"></cap>
            <users-table></users-table>
        </div>
        <new-modal
               @modal-close="modalClose"
               :is-modal-empty="isModalEmpty"
        ></new-modal>
    </div>
</template>

<script>
import Headder from './Headder';
import Cap from './Cap';
import newModal from './newModal';
import usersTable from './usersTable';
import apiService from '../apiService';
import {eventBus} from "../app";

export default {
    name: 'main-container',
    props: {},
    data() {
        return {
            isShowModal: false,
            isModalEmpty: false,
            isExisted: false,
        }
    },
    components: {
        Headder,
        Cap,
        newModal,
        usersTable
    },
    created() {
        eventBus.$on('showEmptyModal', (value) => {
            this.isShowModal=value;
        })
    },
    methods: {
        /*empty modal window for adding a new user*/
        showEmptyModal() {
                this.isShowModal = true;
        },

        /*close modal*/
        modalClose() {
            this.isShowModal = false;
            this.isPopUp = false;
            this.emptyUser();
        },

        /*empty properties of user*/
        // emptyUser() {
        //     this.isExisted = false;
        //     this.sender = -1;
        //     this.senderIndex = -1;
        // },

        /*opens modal window with filled inputs with information of user*/
        // showFilledModal(index) {
        //     this.isModalEmpty = false;
        //     this.isExisted = true;
        //     this.sender = this.users[index].id;
        //     this.senderIndex = index;
        //     this.nameToSend = this.users[index].name;
        //     this.emailToSend = this.users[index].email;
        //     this.addressToSend = this.users[index].address;
        //     this.photopathToSend = this.users[index].photo;
        //     this.isShowModal = true;
        // },

        /*save user from modal window*/
        // submitModal(data) {
        //     let newUser = {
        //         name: data.name,
        //         email: data.email,
        //         address: data.address,
        //         photopath: 'assets/none.png'
        //     }
        //     if (this.isExisted === true) {
        //         let user = {};
        //         user.name = newUser.name;
        //         user.email = newUser.email;
        //         user.address = newUser.address;
        //         this.updateExistedUser(user, this.sender, this.senderIndex);
        //     } else {
        //         this.saveNewUser(newUser);
        //     }
        //     this.modalClose();
        // },

        /*save new user to database*/
        saveNewUser(user) {
            apiService.saveNewUser(user)
                .then(response => {
                this.users.push(response.data.user)
            });
        },

        /*get one user by id*/
        // getSingleUser(id) {
        //     apiService.getSingleUser(id)
        //         .then(response => {
        //             return response.data.user
        //         });
        // },

        /*update existed user in database*/
        updateExistedUser(user, userId, lineIndex) {
            apiService.updateExistedUser(user, userId)
                .then(response => {
                let updatedUser = {};
                updatedUser.name = response.data.user.name;
                updatedUser.email = response.data.user.email;
                updatedUser.address = response.data.user.address;
                updatedUser.created = response.data.user.created;
                updatedUser.photo = response.data.user.photo;
                this.users.splice(lineIndex, 1, updatedUser);
            });
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
    max-width: 100%;
}

.holder {
    max-width: 90%;
    margin: 3rem auto;
    border: solid 2px black;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
}

.holder h3 {
    margin-left: 1rem;
    line-height: 3rem;
    vertical-align: middle;
}

h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
