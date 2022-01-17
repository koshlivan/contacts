<template>
    <div class="wrapper">
        <Headder title="Contact Manager"></Headder>
        <div class="holder">
            <cap></cap>
            <users-table></users-table>
        </div>
        <new-modal></new-modal>
    </div>
</template>

<script>
import Headder from './Headder';
import Cap from './Cap';
import newModal from './newModal';
import usersTable from './usersTable';


export default {
    name: 'main-container',
    components: {
        Headder,
        Cap,
        newModal,
        usersTable
    },
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
