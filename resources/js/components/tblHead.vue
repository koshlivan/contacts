<template>
    <div class="tbl-dome">
        <input type="checkbox">
        <img src="" alt="   ">
        <h4>Name</h4>
        <h4>Email</h4>
        <h4>Address</h4>
        <h4>Created</h4>
        <h4></h4>
    </div>
</template>

<script>
export default {
    name: "tblHead"
}
</script>

<style scoped>
.tbl-dome{
    background-color: #e0dcdc;
    border-top:solid 1px gray;
    border-bottom:solid 1px gray;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
}

</style>
