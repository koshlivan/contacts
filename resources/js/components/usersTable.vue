<template>
    <div class="data">
        <TableHead :all-check="isAllChecked"></TableHead>
        <users></users>
    </div>
</template>

<script>
import TableHead from './TableHead';
import users from './users';

export default {
    name : "usersTable",
    data(){
      return {
          isAllChecked: false
      }
    },
    components : {
        TableHead,
        users
    },
}
</script>

<style scoped>

</style>
