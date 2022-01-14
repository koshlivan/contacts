export default{
    getUsers() {
        return axios.get('/api/users')
            .catch(error => {
                console.log(error)
            })
    },

    saveNewUser(user) {
        return axios.post('/api/users', {
            name: user.name,
            email: user.email,
            address: user.address,
            photo: user.photopath
        });
    },

    updateExistedUser(user, userId) {
        return axios.put('/api/users/' + userId, {
            name: user.name,
            email: user.email,
            address: user.address,
        });
    },

    deleteOne(id) {
        return axios.delete('/api/users/' + id);
    },

    getSingleUser(id) {
        return axios.get('/api/users/' + id);
    },

    makeSort($event) {
        return axios.get('/api/users/?sorting=' + $event.sorting + '&sortOrder=' + $event.sortOrder);
        // return axios.get('/api/users/', {
        //         headers: {
        //           Accept: 'application/x-www-form-urlencoded'
        //         },
        //         sorting : $event.sorting,
        //         sortOrder : $event.sortOrder
        //      });
    }

}
