<template>
    <div class="line">
        <div class="cell">
            <div><input type="checkbox" name="selectOne"></div>
            <div><img class="preview" :src="user.photopath" alt="X"></div>
            <div><h6>{{user.name}}</h6></div>
            <div><h6>{{user.email}}</h6></div>
            <div><h6>{{user.address}}</h6></div>
            <div><h6>{{user.created}}</h6></div>
            <div style="position: relative">
                <h6 id="ellips" @click="showWind(index)">&#x22EE;</h6>
                <div id="options" v-show="isShown">
                    <h6 @click="showDialog"><span class="material-icons">menu</span>View</h6>
                    <h6><span class="material-icons">delete</span>Delete</h6>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "stripe"
}
</script>

<style scoped>

</style>
