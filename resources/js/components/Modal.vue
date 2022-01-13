<template>
  <div id="field">
    <div class="card">
      <form class="edit-form" @submit.prevent="onSubmit" >
        <div class="head">
          <h2>Create Contact</h2>
          <h2 class="close-butt" @click="$emit('modal-close')"><span class="material-icons">clear</span></h2>
        </div>
        <div class="inputs">
          <div class="vert">
            <div class="row align-items-center justify-content-around ">
              <label class="edLabel col-4">Name</label>
              <input type="text"
                     class="edEdit col-8"
                     name="name"
                     v-model="name"
                     placeholder="Please enter yor name" >
            </div>
            <div class="row align-items-center justify-content-around ">
              <label class="edLabel col-4">Email</label>
              <input type="email"
                     class="edEdit col-8"
                     name="email"
                     v-model="email"
                     placeholder="test@domain.com" >
            </div>
            <div class="row align-items-center justify-content-around ">
              <label class="edLabel col-4">Address</label>
              <input type="text"
                     class="edEdit col-8"
                     name="address"
                     v-model="address"
                     placeholder="Address" >
            </div>
          </div>
          <div class="foto">
            <img :src="photoPresence" alt="&#9587;" :class="{'foto-shrinked': isEmptyModal}">
<!--              <file-input v-model="YourModel" v-show="isEmptyModal"></file-input>-->
<!--              <input type="file" v-show="isEmptyModal" @change="onFileChange">-->
          </div>
        </div>
        <div class="finish">
          <button id="close" type="button" @click="$emit('modal-close')">close</button>
          <button id="save" type="submit"><span class="material-icons">check</span>save changes</button>
        </div>
      </form>
    </div>

  </div>
</template>

<script>
//import FileInput from 'vue3-simple-file-input'
export default {
  name: "Modal",

  props: [
      'modelName',
      'modelEmail',
      'modelAddress',
      'takeName',
      'takeAddress',
      'takeEmail',
      'takePhotopath',
      'isModalEmpty'
  ],

  emits: [
      'update:modelName',
      'update:modelEmail',
      'update:modelAddress',
      'update:modelPhoto',
    'submitted',
    'modal-close'
  ],

  methods:{
    onSubmit(){
      this.$emit('submitted',{
        name: this.name,
        email: this.email,
        address: this.address,
        photo: this.photo,
      });
    },
      onFileChange(e){
          var files = e.target.files || e.dataTransfer.files;
          if (!files.length) {
              return;
          }
          this.createImage(files[0]);
      },
      createImage(file) {
          var image = new Image();
          var reader = new FileReader();
          var vm = this;

          reader.onload = (e) => {
              vm.image = e.target.result;
          };
          reader.readAsDataURL(file);
      },
  },

  computed : {
      name : {
        get(){
          return this.takeName
        },
        set(newValue){
          this.$emit('update:modelName', newValue)
        }
      },
    email : {
        get(){
          return this.takeEmail
        },
        set(newValue){
          this.$emit('update:modelEmail', newValue)
        }
    },
    address : {
        get() {
          return this.takeAddress
        },
        set(newValue) {
          this.$emit('update:modelAddress', newValue)
        }

    },
    // photo : {
    //     get() {
    //         return this.photoPresence;
    //     },
    //     set(newValue) {
    //         this.$emit('update:modelPhoto', newValue)
    //     }
   // },
    isEmptyModal: function() {
      return this.isModalEmpty;
    },
    sentPhotopath:function(){
      return this.takePhotopath
    },
    photoPresence: function(){
        if(this.sentPhotopath==''){
          return 'assets/none.png'
        }
        return this.sentPhotopath
    }
  },

  data(){
    return{
      // name: this.sentName,
      // email: this.sentEmail,
      // address: this.sentAddress,
      photo: this.photoPresence,
    }
  },
    // components: {
    //     FileInput
    // }
}
</script>

<style scoped>
.head {
  margin-top: 1rem;
}
.foto{
  margin: 0.5rem 0 0.5rem 1.5rem;
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
}
.foto img{
  min-height: 80%;
}
#field {
  min-width: 100%;
  min-height: 100vh;
  background-color: rgba(105, 105, 105, 0.7);
  display: flex;
  justify-content: center;
  align-content: center;
  z-index: 4;
  position: absolute;
  top: 0;

}
.card {
  min-width: 30%;
  max-width: 40%;
  height: 25rem;
  border-radius: 1rem;
  box-shadow: 0 0 5px rgba(10, 10, 10, 0.8);
  position: absolute;
  top: 50%;
  left:  50%;
  transform: translate(-50%, -50%);
  opacity: 100%;
    transition: 500ms;
}
.edit-form {
  display: flex;
  min-height: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: stretch;
  opacity: 100%;
}
.edit-form div:nth-child(2n+1){
  min-height: 20%;
}
.edit-form div:nth-child(2n){
  min-height: 60%;
}

.head{
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  margin-top: 1rem;
  padding-top: 1rem;
}
.head h2 {
  margin: 1rem;
}
.head img{
  max-height: 80%;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
  transition: 300ms;
}
.head img:hover{
  max-height: 85%;
  cursor: pointer;
  box-shadow: 0 0 3px gray;
}
.head img:active{
  max-height: 85%;
  cursor: pointer;
  box-shadow: 0 0 5px red;
}
.close-butt{
  margin-right: 0.5rem;
  margin-top: 0.5rem;
  transition: 300ms;
}
.close-butt span:hover{
  cursor: pointer;
  box-shadow: 0 0 3px gray;
}

.inputs {
  display: flex;
  justify-content: space-around;
  align-items: stretch;
}

.vert {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  max-width: 60%;
}
.vert label {
  padding-left: 2rem;
}
.vert input {
  border: solid 2px black;
}

.foto{
  display: flex;
  max-width: 40%;
  justify-content: center;
  align-items: center;
}

.foto img{
  max-height: 95%;
  max-width: 95%;
}

.finish {
  display: flex;
  justify-content: flex-end;
  align-items: stretch;
  margin: 2rem 0;
}

.finish button{
  max-height: 2.5rem;
}

.finish button:nth-child(2n){
  margin-right: 4rem;
  margin-left: 1rem;
}


#save {
  background-color: #0a53be;
  color: white;
  border: solid 2px black;
  font-size: 20px;
  text-transform: uppercase;
}
#save span{
  vertical-align: text-bottom;
}
#close {
  background-color: #808080;
  color: white;
  border: solid 2px black;
  font-size: 20px;
  text-transform: uppercase;
}

input[type=file] {
    margin-top: 4px;
    max-width: 90%;
}

.foto-shrinked {
    max-height: 30% !important;
    max-width: 50% !important;
}

@media screen and (max-width: 1100px){
    .card {
        min-width: 80%;
        max-width: 90%;
    }
}
</style>
