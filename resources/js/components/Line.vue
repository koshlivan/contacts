<template>
    <div class="cell">
      <div><input type="checkbox" v-model="checkedLine" name="selectOne" :checked="thisCheckbox"></div>
      <div class="for-foto"><img class="preview" :src="user.photo" alt="X"></div>
      <div><h6>{{user.name}}</h6></div>
      <div><h6>{{user.email}}</h6></div>
      <div><h6>{{ user.address }}</h6></div>
      <div><h6>{{ displayProperDate(user.created) }}</h6></div>
      <div style="position: relative">
        <h6 id="ellips"
            title="Press to show addition options"
            @click="options">&#x22EE;</h6>
        <div id="options" v-show="isOpened && index==popupNow && showOptions">
          <h6 @click="showModal"><span class="material-icons">menu</span>View</h6>
          <h6 @click="singleDelete"><span class="material-icons basket">delete</span>Delete</h6>
        </div>
      </div>
    </div>
</template>

<script>
import apiService from '../apiService';
import {eventBus} from "../app";
import moment from 'moment';

export default {
  name: "user-row",
  props: [
      'isAllChecked',
      'isOneChecked',
      'isPopUp',
      'user',
      'index',
      'popupNow',
      'chekLine',
      'selectedRows',
  ],
  emits:[
    'showModal',
    'viewPopup',
    'singleCheckBoxSelected',
    'singleCheckBoxUnSelected',
    'singleCheckBoxChanged',
    'showFilledModal',
    'deleteOne',
    'update:checkedLine'
  ],
  computed : {
    thisCheckbox: function() {
        for (let i = 0; i < this.selectedRows.length; i++){
            if (this.index === parseInt(this.selectedRows[i])) {
                return true;
            }
        }
        return false;
    },
    checkedLine : {
      get() {
        return this.isAllChecked;
      },
      set(value) {
        this.$emit('update:checkedLine', value)
      }
    },
      isOpened : {
        get() {
            this.showOptions=true;
            return this.isPopUp;
          },
          set(value) {
            this.showOptions=value;
          }
      }
  },
  methods:{
    options(){
      this.$emit('viewPopup', this.checkedLine);
    },

    optionsShow(param){
     if(param===true){
       this.showOptions=false;
     }
     else{
       this.showOptions=!this.showOptions
     }
    },

      /*convert date to display*/
    displayProperDate(givenDate) {
        if(givenDate) {
            return moment( String(givenDate) ).format('DD.MM.YYYY');
        }
    },

    showModal(){
        console.log('before emit submit');
      eventBus.$emit('showFilledModal', {
          name : this.user.name,
          email : this.user.email,
          address : this.user.address,
          photo : this.user.photo,
      });
        console.log('after emit submit', this.user.name, this.user.email);
      this.isOpened=false;
    },

    checkboxChanged(){
      if(this.checkboxSelect===true){
          this.$emit('singleCheckBoxChanged', 'false');
      }
      else{
        this.$emit('singleCheckBoxChanged', 'true');
      }
      this.checkboxSelect=!this.checkboxSelect;
    },

    singleDelete(){
      apiService.deleteOne(this.user.id);

      this.$emit('deleteOne');
      this.isOpened=false;
    },
  },

  data(){
    return{
      checkboxSelect : this.thisCheckbox,
        showOptions : true
    }
  }
}
</script>

<style scoped>
.cell {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  min-height: 3rem;
  max-height: 4rem;
  text-align-all: left;
  padding-left: 1rem;
  margin: 0;
  box-shadow: 1px 0 3px rgba(128, 128, 128, 0.3);
}

.for-foto img{
  vertical-align: center;
  max-height: 3rem;
  max-width: 4rem;
}

.for-foto{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

input[type=checkbox]{
  vertical-align: center;
  margin-top: 1rem;

}
#options{
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  border: solid 2px black;
  box-shadow: 0 0 5px gray;
  min-width: 8rem;
  max-height: 4rem;
  z-index: 2;
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: white;
  opacity: 100%;
}
#options h6{
  box-sizing: border-box;
  margin: 0;
  font-size: 18px;
  line-height: 1.5rem;
  border-bottom: solid 2px black;
}
#options h6:hover{
  background-color: rgba(173,82,14,0.24);
  cursor: pointer;
}
#options h6:active{
  background-color: rgba(91, 41, 8, 0.24);
  color: white;
  cursor: pointer;
}
#options span{
  vertical-align: text-bottom;
  color: black;
}
#options .basket{
  color: #be0a10;
}
#options h6:active span{
  color: red;
}
#ellips:hover{
  font-size: 20px;
  text-shadow: 1px 2px 3px black;
}

.cell h6{
  text-align: left;
  text-transform: capitalize;
  vertical-align: center;
  line-height: 3rem;
}
.cell>div{
  min-width: 14%;
}
.cell:hover{
  background-color: rgba(173,82,14,0.24);

}

#ellips:hover{
  cursor: pointer;
}
</style>
