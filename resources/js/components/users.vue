<template>
    <div class="line">
        <Loading v-show="loading"></Loading>
        <user-row v-for="(user, index) in users"
                  :key="user.id"
                  ref="lineComponent"
                  :is-all-checked="isAllChecked"
                  :is-one-checked="isOneChecked"
                  :selected-rows="selectedLines"
                  @deleteOne="deleteOne(index)"
                  @showFilledModal="showFilledModal(index)"
                  :is-pop-up="isPopUp"
                  :popup-now="popupNow"
                  :index="index"
                  @update:checkedLine="checkLines($event, index)"
                  @viewPopup="popupEventHandler($event, index)"
                  :user="user"></user-row>
    </div>
</template>

<script>
import {eventBus} from "../app";
import userRow from './Line';
import Loading from './Loading';
import apiService from '../apiService';
import usersManagement from '../usersManagement';

export default {
    name: "users",
    props : {},
    data(){
        return {
            users : [],
            isPopUp : false,
            popupNow : -1,
            isAllChecked : false,
            isOneChecked : false,
            item : -1,
            sender : -1,
            senderIndex : -1,
            selectedLines : [],
            loading : true
        }
    },
    components : {
        Loading,
        userRow,
    },
    mounted() {
        this.getUsers();
    },
    created() {
        eventBus.$on('update:checkAllLines', (value)=>{this.allChecked(value);})
        eventBus.$on('deleteSelected', ()=>{this.remove();})

    },
    computed : {
        isChecked: function () {
            return this.isAllChecked && this.isOneChecked;
        }
    },
    methods: {
        getUsers() {
            apiService.getUsers()
                .then(response => this.users = response.data.data)
                .finally(() => this.loading = false)
        },
        /*toggle popup menu*/
        popupEventHandler($event, index) {
            this.isPopUp = usersManagement.popupEventHandler($event, index, this.isPopUp, this.popupNow);
            this.popupNow = index;
        },
        /*delete one row by index*/
        deleteOne(index) {
            this.users.splice(index, 1);
            this.isPopUp = false;
        },
        /*sort by column and order*/
        makeSort($event) {
            apiService.makeSort($event)
                .then(response => {
                    for (let i = 0; i < this.users.length; i++) {
                        this.users[i] = response.data.data[i];
                    }
                    this.users = response.data.data;
                });
        },
        /*NEW. sets all inputs in checked state*/
        allChecked($event) {
            this.selectedLines = usersManagement.allChecked($event, this.users);
            ($event === true) ? this.isAllChecked = true : this.isAllChecked = false;
        },
        /*manages selected rows array*/
        checkLines($event, index) {
            this.selectedLines = usersManagement.checkLines($event, index, this.selectedLines);
        },
        /*delete selected users by pressing one button*/
        remove() {
            for (let i = 0, k = 0; i < this.selectedLines.length; i++, k++) {
                let deleted = Number.parseInt(this.selectedLines[i]) - k;

                apiService.deleteOne(this.users[deleted].id);
                this.deleteOne(deleted);
            }
            this.allChecked(false);
            this.isOneChecked = false;
        },
    }
}
</script>

<style scoped>

</style>
