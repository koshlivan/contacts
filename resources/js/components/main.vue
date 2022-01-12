<template>
  <div class="wrapper">
    <Headder title="Contact Manager"></Headder>
    <div class="holder">
      <cap @showModal="showModal(-1)"
           @deleteSelected="remove"></cap>
      <div class="data">
          <TableHead :all-check="isAllChecked"
                     :useres="users"
                     @update:checkAllLines="allChecked($event)"
                     @sortDone="makeSort($event)"></TableHead>
          <div class="line">
            <Loading v-show="loading"></Loading>
            <user-row v-for="(user, index) in users"
                  :key="user.number"
                  ref="lineComponent"
                  :is-checked="isAllChecked"
                  @deleteOne="deleteOne(index)"
                  @showFilledModal="showFilledModal(index)"
                  :is-pop-up="isPopUp"
                  :popup-now="popupNow"
                  :index="index"
                  @update:checkedLine="checkLines($event, index)"
                  @viewPopup="popupEventHandler($event, index)"
                  @singleCheckBoxChanged="lineSelectCheckboxEventHandler(index, $event)"
                  :user="user"></user-row>
          </div>
      </div>
    </div>
  <Modal v-show="isShowModal"
         @modal-close="modalClose"
         @submitted="submitModal"
         :modelName="nameToSend"
         :modelEmail="emailToSend"
         :modelAddress="addressToSend"
         @update:modelName="nameToSend=$event"
         @update:modelEmail="emailToSend=$event"
         @update:modelAddress="addressToSend=$event"
         :take-name="nameToSend"
         :take-email="emailToSend"
         :take-address="addressToSend"
         :take-photopath="photopathToSend"
          ></Modal>
  </div>
</template>

<script>
import Headder from './Headder';
import Cap from './Cap';
import TableHead from './TableHead';
import userRow from './Line';
import Modal from './Modal';
import Loading from './Loading';

export default {
  name: 'main-container',
  props: {
  },
  data(){
    return{
      users: [],
      user:{
        name:'',
        email:'',
        address:'',
        created:'',
        photopath:''
      },

      isPopUp :false,
      popupNow :-1,
      nameToSend :'',
      emailToSend :'',
      addressToSend :'',
      photopathToSend :'',
      isAllChecked : false,
      isShowModal : false,
      item : -1,
      isExisted : false,
      sender : -1,
      senderIndex: -1,
      selectedLines : [],
      loading : true
    }
  },

  components:{
    Loading,
    Headder,
    Cap,
    TableHead,
    userRow,
    Modal
  },

  emits: [
    'setAllChecked',
    'showModal',
      'setAllSelect',
      'allChecked'
  ],

  computed:{
    thisDate: function() {
      return new Date().getFullYear()+'-'+new Date().getMonth()+'-'+new Date().getDate();
    },

  },

  mounted() {
        axios.get('/api/users')
      .then(response => {
          this.users = response.data.data;
      })
      .catch(error => {
          console.log(error)
      })
      .finally( () => {
          this.loading=false;
      })
      },

    methods:{


    /*NEW. sets all inputs in checked state*/
    allChecked($event) {
      if ($event === true) {
        this.isAllChecked = true;
        this.selectedLines = [];
        console.log(this.users.length);

        for (let i = 0; i < this.users.length; i++) {
          this.selectedLines.push( i );
        }
          console.log(this.selectedLines);
      }
      if ($event === false) {
        this.selectedLines = [];
        this.isAllChecked = false;
          console.log(this.selectedLines);
      }
    },

    /*manages selected rows array*/
    checkLines($event, index) {
      if ($event === true) {
      this.selectedLines.push(index);
      console.log('was added', this.selectedLines);
      }
      if ($event === false) {
        let needIndex = this.selectedLines.indexOf(index);
        this.selectedLines.splice(needIndex, 1);
          console.log('was removeded', this.selectedLines);
      }
    },

    /*empty modal window for adding a new user*/
    showModal(index) {
      if (index<0) {
        this.emptyUser();
        this.isShowModal = true;
      }
    },

    /*close modal*/
    modalClose() {
      this.isShowModal = false;
      this.isPopUp = false;
      this.emptyUser();
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

    /*opens modal window with filled inputs with information of user*/
    showFilledModal(index) {
      this.isExisted = true;
      this.sender = this.users[index].id;
      this.senderIndex = index;
      this.nameToSend = this.users[index].name;
      this.emailToSend = this.users[index].email;
      this.addressToSend = this.users[index].address;
      this.photopathToSend = this.users[index].photo;
      this.isShowModal = true;
      console.log(this.isExisted, this.sender, this.senderIndex, this.nameToSend, this.emailToSend, this.addressToSend, this.photopathToSend);
    },

    /*save user from modal window*/
    submitModal(data) {
      let newUser = {
        name : data.name,
        email : data.email,
        address : data.address,
        photopath : 'assets/none.png'
      }
      if (this.isExisted === true) {
            let user={};
            user.name = newUser.name;
            user.email = newUser.email;
            user.address = newUser.address;
            this.updateExistedUser(user, this.sender, this.senderIndex);
          } else {
          this.saveNewUser(newUser);
          }
      this.modalClose();
    },

    /*save new user to database*/
    saveNewUser(user) {
      axios.post('/api/users', {
          name : user.name,
          email : user.email,
          address : user.address,
          photo : user.photopath
      }).then( response => { this.users.push(response.data.user) } );
    },

    /*get one user by id*/
    getSingleUser(id) {
        axios.get('/api/users/'+id)
              .then(response => {return response.data.user});

    },

    /*update existed user in database*/
    updateExistedUser(user, userId, lineIndex) {
        axios.put('/api/users/' + userId, {
            name : user.name,
            email : user.email,
            address : user.address,
        }).then( response => {
            let updatedUser= {};
            console.log(updatedUser, this.senderIndex);
            updatedUser.name = response.data.user.name;
            updatedUser.email = response.data.user.email;
            updatedUser.address = response.data.user.address;
            updatedUser.created = response.data.user.created;
            updatedUser.photo = response.data.user.photo;
            this.users.splice(lineIndex, 1, updatedUser);
        });
    },

    /*toggle popup menu*/
    popupEventHandler($event, index) {
      if (!$event) {
        this.isPopUp = !this.isPopUp;
      } else {
        this.isPopUp = true;
      }
      if (index != this.popupNow) {
        this.isPopUp = true;
      }
      this.popupNow = index;
    },

    /*delete one row by index*/
    deleteOne(index, singleDelete=true) {
        let id=this.users[index].id;
        axios.delete ('/api/users/' + id)
            .then (response => {
                if (singleDelete) {
                    this.users.splice(index, 1);
                }
                this.isPopUp=false;
            });
    },

    /*delete selected users by pressing one button*/
    remove() {
      for (let i=0, k=0; i < this.selectedLines.length; i++, k++) {
        let deleted = Number.parseInt(this.selectedLines[i])-k;
        console.log(deleted, this.selectedLines);

        this.deleteOne(deleted, false);
          this.users.splice(deleted, 1);
      }
      this.selectedLines = [];
      this.isAllChecked=false;
      console.log(this.isAllChecked);
    },

    makeSort($event) {
      this.users = $event;
    },
  }
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

.holder h3{
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
