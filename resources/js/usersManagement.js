import apiService from './apiService';

export default {

    /*NEW. sets all inputs in checked state*/
    allChecked($event, users) {
        let selectedLines = [];
        if ($event === false) {
            return selectedLines;
        }
        if ($event === true) {
            for (let i = 0; i < users.length; i++) {
                selectedLines.push( i );
            }
        }
        return selectedLines;
    },
    /*manages selected rows array*/
    checkLines($event, index, checked) {
        if ($event === true) {
            checked.push(index);
        }
        if ($event === false) {
            let needIndex = checked.indexOf(index);
            checked.splice(needIndex, 1);
        }
        return checked;
    },
    /*empty modal window for adding a new user*/
    showModal(index) {
        if (index<0) {
            this.emptyUser();
            this.isModalEmpty=true;
            this.isShowModal = true;
        }
    },
    /*close modal*/
    modalClose() {
        this.isShowModal = false;
        this.isModalEmpty=false;
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
        this.isModalEmpty=false;
        this.isExisted = true;
        this.sender = this.users[index].id;
        this.senderIndex = index;
        this.nameToSend = this.users[index].name;
        this.emailToSend = this.users[index].email;
        this.addressToSend = this.users[index].address;
        this.photopathToSend = this.users[index].photo;
        this.isShowModal = true;
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
        console.log(this.photopathToSend);
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
    popupEventHandler($event, index, isPopup, popupNow) {
        if (!$event) {
            if (index != popupNow) {
                return true;
            }
            return !isPopup;
        } else {
            return true;
        }
        if (index != popupNow) {
            return true;
        }
    },
    /*delete one row by index*/
    deleteOne(index, singleDelete=true) {
        let id=this.users[index].id;
        //apiService.deleteOne(id);
        axios.delete ('/api/users/' + id)
            .then (() => {
                if (singleDelete) {
                    this.users.splice(index, 1);
                }
                this.isPopUp=false;
            });
    },
    /*delete selected users by pressing one button*/
    remove(deletedItems, users) {
        for (let i = 0; i < deletedItems.length; i++) {
            let deleted = Number.parseInt(deletedItems[i]);

            apiService.deleteOne(users[deleted].id);
        }
    },
    makeSort($event) {
        //this.users = $event;
        console.log($event.sorting+$event.sortOrder+'it is event allready. next will be request');
        axios.get('/api/users/?sorting='+ $event.sorting +'&sortOrder='+ $event.sortOrder)
            // axios.get('/api/users/', {
            //         headers: {
            //           Accept: 'application/x-www-form-urlencoded'
            //         },
            //         sorting : $event.sorting,
            //         sortOrder : $event.sortOrder
            //      })
            .then( response => {
                for(let i=0; i<this.users.length; i++)
                {
                    this.users[i] = response.data.data[i];
                }
                this.users = response.data.data;
            } );
    },
}
