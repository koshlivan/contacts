<template>
    <div class="data">
        <TableHead :all-check="isAllChecked"
                   ></TableHead>
        <users></users>
    </div>
</template>

<script>
//@sortDone="makeSort($event)"
import TableHead from './TableHead';
import Modal from './Modal';
import users from './users';
import apiService from '../apiService';

export default {
    name : "usersTable",
    props : {},
    data(){
      return {
          isShowModal: false,
          isAllChecked: false
      }
    },
    components : {
        TableHead,
        Modal,
        users
    },
}
</script>

<style scoped>

</style>
