<template>
    <div id="hat">
        <div class="hat-first">
            <h3>{{ userName }} - {{ currentDate }}</h3>

            <div id="myDropdown">
                <div class="myDropdown">
                    <span class="material-icons">account_circle</span>
                    <h5>Your Name</h5>
                    <span class="material-icons">arrow_drop_down</span>
                </div>
                <div class="dropped">
                    <a href="#">some text</a>
                    <a href="#">some text</a>
                    <hr>
                    <a href="#">Exit</a>
                </div>
            </div>
        </div>
        <hr class="under-hat">
    </div>
</template>

<script>
export default {
    name: "hat"
}
</script>

<style scoped>

</style>
