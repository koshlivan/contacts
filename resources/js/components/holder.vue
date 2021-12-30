<template>
    <div class="holder">
        <div class="cap">
            <h3>Contacts</h3>
            <button type="button" id="addContact"><span class="material-icons">add_circle</span> Add Contact</button>
        </div>
        <div class="data">
            <tblHead></tblHead>
            <cell v-for="user in users" :key="users.number"></cell>
        </div>
    </div>

</template>

<script>
export default {
    name: "holder"
}
</script>

<style scoped>

</style>
