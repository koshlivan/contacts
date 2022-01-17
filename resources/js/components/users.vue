<template>
    <div class="line">
        <Loading v-show="loading"></Loading>
        <user-row
            v-for="(user, index) in users"
            :key="user.id"
            :is-all-checked="isAllChecked"
            :is-one-checked="isOneChecked"
            :selected-rows="selectedLines"
            @deleteOne="deleteOne(index)"
            :is-pop-up="isPopUp"
            :popup-now="popupNow"
            :index="index"
            @update:checkedLine="checkLines($event, index)"
            @viewPopup="popupEventHandler($event, index)"
            :user="user"
        ></user-row>
    </div>
</template>

<script>
import {eventBus} from "../app";
import userRow from './Line';
import Loading from './Loading';
import usersManagement from '../usersManagement';
import AppMixin from '../AppMixin';

export default {
    name: "users",
    mixins: [AppMixin],
    components: {
        Loading,
        userRow,
    },
    data() {
        return {
            isPopUp: false,
            popupNow: -1,
            isAllChecked: false,
            isOneChecked: false,
            item: -1,
            sender: -1,
            senderIndex: -1,
            selectedLines: [],
            loading: true
        }
    },
    computed: {
        isChecked: function () {
            return this.isAllChecked && this.isOneChecked;
        }
    },
    mounted() {
        this.getUsers();
    },
    created() {
        eventBus.$on('update:checkAllLines', (value) => {
            this.allChecked(value);
        })
        eventBus.$on('deleteSelected', () => this.remove())
        eventBus.$on('saveNew', (response) => {
            this.users.push(response.user);
        })
        eventBus.$on('updating', (userUpdate) => {
            this.users.splice(userUpdate.sender, 1, userUpdate.user)
        })
        eventBus.$on('sortDone', (response) => {
            this.users = response.users
        })
    },

    methods: {
        getUsers() {
            this.loading = false;
        },
        /*toggle popup menu*/
        popupEventHandler($event, index) {
            this.isPopUp = usersManagement.popupEventHandler($event, index, this.isPopUp, this.popupNow);
            this.popupNow = index;
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
        /*delete one row by index*/
        deleteOne(index) {
            this.users.splice(index, 1);
            this.isPopUp = false;
        },
        /*delete selected users by pressing one button*/
        remove() {
            usersManagement.remove(this.selectedLines, this.users);
            for (let i = 0, k = 0; i < this.selectedLines.length; i++, k++) {
                let deleted = Number.parseInt(this.selectedLines[i]) - k;
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
