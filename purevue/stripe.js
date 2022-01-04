app.component('stripe',{
    template:
    /*html*/
    `
    <div class="line">
        <div class="cell">
            <input type="checkbox" name="selectOne">
            <img class="preview" :src="photopath" alt="X">
            <h4>{{user.name}}</h4>
            <h4>{{user.email}}</h4>
            <h4>{{user.address}}</h4>
            <h4>{{user.created}}</h4>
        </div>
    </div>
    `
})
