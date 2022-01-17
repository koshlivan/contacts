import apiService from "./apiService";
export default {
    data() {
        return {
            users : [],
            senderLine : -1,
            areExisted : false
        }
    },
    created() {
        apiService.getUsers()
            .then(response => this.users = response.data.data)
    },
    computed : {
        // senderRow : {
        //     get() {
        //         return this.senderLine;
        //     },
        //     set(value) {
        //         this.senderLine = value;
        //     }
        // },
        // isExisted : {
        //     get() {
        //         return this.areExisted;
        //     },
        //     set(value) {
        //         this.areExisted = value;
        //     }
        // }
    }
}
