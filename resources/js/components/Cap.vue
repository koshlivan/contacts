<template>
  <div class="cap">
    <h3>Contacts</h3>
    <div>
      <button type="button" id="delContact" @click="deleteSelected"><span class="material-icons">remove_circle</span> Remove Selected</button>
      <button type="button"
              id="addContact"
              title="Add new contact"
              @click="showDialog"><span class="material-icons">add_circle</span> Add Contact</button>
    </div>
  </div>

</template>

<script>
import {eventBus} from "../app";
import apiService from '../apiService';

export default {
  name: "Cap",
  emits:[
    'showEmptyModal',
    'deleteSelected'
  ],
    methods:{
    showDialog(){
      //this.$emit('showEmptyModal');
        console.log(this.isModalEmpty, this.isShowModal);
      eventBus.$emit('showEmptyModal', true);
    },
    deleteSelected(){
        eventBus.$emit('deleteSelected', true);
    },

      /*empty modal window for adding a new user*/
      showModal(index) {
          if (index < 0) {
              this.emptyUser();
              console.log(this.isModalEmpty, this.isShowModal)
              this.isModalEmpty = true;
              this.isShowModal = true;
          }
      },
      /*empty properties of user*/
      emptyUser() {
          this.isExisted = false;
          this.sender = -1;
          this.senderIndex = -1;
          this.nameToSend = '';
          this.emailToSend = '';
          this.addressToSend = '';
          this.photopathToSend = '';
      },
  }
}
</script>

<style scoped>
.cap{
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  border-top:solid 1px gray;
  border-bottom:solid 1px gray;
}
.cap h3{
  margin-left: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

#addContact {
  background-color: #0a53be;
  color: white;
  border: solid 2px black;
  margin-right: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 0.7rem;
  font-size: 20px;
  transition: 300ms;
}
#addContact:hover{
  background-color: #2b68c0;
  box-shadow: 0 4px 5px gray;
}
#addContact:active{
  background-color: #063272;
  box-shadow: 0 1px 2px gray;
  color: #ad9799;
}
#addContact span{
  vertical-align: text-bottom;
}

#delContact{
  background-color: #be0a10;
  color: white;
  border: solid 2px black;
  margin-right: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 0.7rem;
  font-size: 20px;
  transition: 300ms;
}
#delContact span{
  vertical-align: text-bottom;
  color: white;
}
#delContact:hover{
  background-color: #bd151b;
  box-shadow: 0 4px 5px gray;
}
#delContact:active{
  background-color: #880f13;
  box-shadow: 0 1px 2px gray;
  color: #ad9799;
}
</style>
