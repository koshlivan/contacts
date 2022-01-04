const app=Vue.createApp({
    data(){
        return{
            users: [
                {number: '1', name: 'bob', email: 'bob@mail.ru', address: 'London', created: '12.12.20', photopath: './photo/unnamed.jpg'},
                {number: '2', name: 'bill', email: 'bill@mail.ru', address: 'Paris', created: '23.12.19', photopath: './photo/index.jpeg'},
                {number: '3', name: 'john', email: 'john@mail.ru', address: 'Berlin', created: '09.08.21', photopath: './photo/index.jpeg'},
                {number: '4', name: 'Sean', email: 'sean@mail.ru', address: 'Rome', created: '32.10.21', photopath: './photo/unnamed.jpg'},
                {number: '5', name: 'Harry', email: 'harry@mail.ru', address: 'Madrid', created: '09.11.21', photopath: './photo/prof.jpg'},
                {number: '6', name: 'Chuck', email: 'chuck@mail.ru', address: 'Madrid', created: '09.11.21', photopath: './photo/index.jpeg'},
                {number: '7', name: 'Bruice', email: 'bruice@mail.ru', address: 'Madrid', created: '09.11.21', photopath: './photo/prof.jpg'},
            ],
            isShown: false,
            isAllChecked: false,
            selectedRow: 0,
            name: '',
            email: '',
            address: '',
            photo: ''
        }
        },
    computed: {
        currentDate(){
            return new Date().getDay()+'.'+ new Date().getMonth()+1+'.'+ new Date().getFullYear()
        }

    },
    methods:{
        showDialog(index){
            if(index<0){
                this.name= '';
                this.email= '';
                this.address= '';
                this.photo= '';
            }
            else{
                this.name= this.users[index].name;
                this.email= this.users[index].email;
                this.address= this.users[index].address;
                this.photo= this.users[index].photopath;
            }
            document.querySelector('#field').style.display="flex"
        },
        closeClick(){
            document.querySelector('#field').style.display="none";
            this.isShown=false;
        },
        showWind(index){
            this.isShown=!this.isShown;
            this.selectedRow=index;
        },
        remove(index){

        },
        onSubmit(){
            let newUser={
                name: this.name,
                email: this.email,
                address: this.address,
            };
            this.$emit('user-submitted', newUser);
            this.users.push(newUser);
            this.name=''
            this.email=''
            this.address=''

            this.closeClick();
        },
        setAllChecked(){
            this.isAllChecked=!this.isAllChecked;
        }
    }

})

