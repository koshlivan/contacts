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
          @click="sort('created')">
        <div>
          <h5 class="col-name">Created</h5>
        </div>
        <div class="arrows">
          <span class="material-icons"
                :class="{'arrow-active': isArrowLight('created', -1)}"
                >arrow_drop_up</span>
          <span class="material-icons"
                :class="{'arrow-active': isArrowLight('created', 1)}"
                >arrow_drop_down</span>
        </div>
      </th>
      <th></th>
    </tr>
  </table>
</template>

<script>
//@change="$emit('setAllChecked')"
export default {
  name: "TableHead",
  props: {
    allCheck: Boolean,
    useres: Array,
  },
  emits:[
    'setAllChecked',
    'update:checkAllLines',
    'sortDone'
  ],
  computed:{
    checkAll:{
      get() {
        return this.allCheck
      },
      set(value) {
        this.$emit('update:checkAllLines', value)
      }
    }
  },
  data() {
    return {
      users: [],
      sorting: '',
      sortingVector: 1,
    }
  },
    mounted(){
      axios.get('api/users/')
          .then( response => {this.users=response.data.data});
    },
  methods: {

    /*sort by key and order*/
    sortBy(key, order) {
      return this.users.sort((a, b) => a[key] < b[key] ? -(order) : ((a[key] > b[key]) ? order : 0));
    },

    /*sort by pressing column name*/
    sort(data) {
      this.sorting=data;
      console.log(this.users[0].name);

        if ( isNaN( Date.parse(this.users[0][this.sorting]) ) ) {
          this.sortBy(this.sorting, this.sortingVector);

          (this.sortingVector > 0)? this.sortingVector = -1 : this.sortingVector = 1;
        } else {
          this.sortCreated(this.sortingVector);

          (this.sortingVector > 0)? this.sortingVector = -1 : this.sortingVector = 1;
        }
    },

    /*which arrow will light*/
    isArrowLight(column, order) {
      if (column === this.sorting && order === this.sortingVector) {
        return true;
      }
      return false;
    },

    /*sort by created date asc and desc*/
    // sortCreated(order) {
    //   return this.users.sort( function (a, b) {
    //     let dateOne = Date.parse( a['created'] );
    //     let dateTwo = Date.parse( b['created'] );
    //
    //     if (dateTwo > dateOne) {
    //       return -(order);
    //     }
    //     if ( dateTwo < dateOne) {
    //       return order;
    //     }
    //
    //     return 0;
    //   } )
    // },
      sortCreated(order) {
          return this.users.sort( function (a, b) {
              let dateOne = Date.parse( a['created'] );
              let dateTwo = Date.parse( b['created'] );

              if (dateTwo > dateOne) {
                  return -(order);
              }
              if ( dateTwo < dateOne) {
                  return order;
              }

              return 0;
          } )
      },

    /*on sort has been done*/
    emitSort() {
      this.$emit('sortDone', this.users);
    }
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
