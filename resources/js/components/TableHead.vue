<template>
  <table>
    <tr>
      <th><input type="checkbox"
                 name="selectAll"
                 title="Select All"
                 v-model="checkAll"></th>
      <th>
        <div>
          <h5 class="col-name">Preview</h5>
        </div>

      </th>
      <th class="sortable"
          title="Sort by Name"
          @click="sort('name')">
        <div>
          <h5 class="col-name">Name</h5>
        </div>
        <div class="arrows">
          <span class="material-icons"
                :class="{'arrow-active': isArrowLight('name', -1)}"
                >arrow_drop_up</span>
          <span class="material-icons"
                :class="{'arrow-active': isArrowLight('name', 1)}"
                >arrow_drop_down</span>
        </div>
      </th>
      <th>
        <div>
          <h5 class="col-name">Email</h5>
        </div>
      </th>
      <th class="sortable"
          title="Sort by Address"
          @click="sort('address')">
        <div>
          <h5 class="col-name">Address</h5>
        </div>
        <div class="arrows">
          <span class="material-icons"
                :class="{'arrow-active': isArrowLight('address', -1)}"
                >arrow_drop_up</span>
          <span class="material-icons"
                :class="{'arrow-active': isArrowLight('address', 1)}"
                >arrow_drop_down</span>
        </div>
      </th>
      <th class="sortable"
          title="Sort by Date"
          @click="sort('created_at')">
        <div>
          <h5 class="col-name">Created</h5>
        </div>
        <div class="arrows">
          <span class="material-icons"
                :class="{'arrow-active': isArrowLight('created_at', -1)}"
                >arrow_drop_up</span>
          <span class="material-icons"
                :class="{'arrow-active': isArrowLight('created_at', 1)}"
                >arrow_drop_down</span>
        </div>
      </th>
      <th></th>
    </tr>
  </table>
</template>

<script>
import {eventBus} from "../app";
import apiService from "../apiService";

export default {
  name: "TableHead",
  props: {
    allCheck: Boolean,
  },
  emits:[
    'update:checkAllLines',
    'sortDone'
  ],
  computed:{
    checkAll:{
      get() {
        return this.allCheck;
      },
      set(value) {
        eventBus.$emit('update:checkAllLines', value);
      }
    }
  },
  data() {
    return {
      sorting: '',
      sortingVector: 1,
    }
  },
  methods: {
    /*sort by pressing column name*/
    sort(data) {
      this.sorting=data;
      (this.sortingVector > 0) ? this.sortingVector = -1 : this.sortingVector = 1;

      apiService.makeSort({
          sorting : this.sorting,
          sortOrder : this.sortingVector
      })
        .then( response => {/*emits to Users*/
            eventBus.$emit('sortDone', {users : response.data.data});
        })
    },
    /*which arrow will light*/
    isArrowLight(column, order) {
      if (column === this.sorting && order === this.sortingVector) {
        return true;
      }
      return false;
    },
  }
}
</script>

<style scoped>

.col-name {
  padding-top: 0.5rem;
}

table {
  width: 100%;
}
table tr {
  background-color: rgba(173, 173, 173, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  min-height: 3rem;

}
th{
  min-height: 2rem;
  margin: 0.5rem auto;
  min-width: 14%;
  padding-left: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
}
th h5{
  vertical-align: middle;
}
.sortable:hover{
  cursor: pointer;
  background: linear-gradient(rgba(173, 173, 173, 0.2), white, rgba(173, 173, 173, 0.2));
}
.sortable:active{
  background: linear-gradient(rgba(150, 150, 150, 0.2), rgba(200, 200, 200, 0.6), rgba(150, 150, 150, 0.2));
}
.arrows{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.arrows span{
  margin: 0;
  padding: 0;
  font-size: 20px;
}
.arrows span:nth-child(2n+1){
  vertical-align: text-bottom;

}
.arrows span:nth-child(2n){
  vertical-align: text-top;
}
.arrows span:hover{
  color: red;
  text-shadow: 1px 2px 3px black;
  cursor: pointer;
}
.arrows span:active{
  color: #5e0000;
  text-shadow: 0 0 3px black;
  cursor: pointer;
}

.arrow-active{
  color: #fffdfd;
  text-shadow: 0 0 4px red;
}
</style>
