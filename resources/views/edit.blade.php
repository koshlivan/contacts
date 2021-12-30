@extends('app')

@section('content')
<div class="field">
    <div class="card">
        <form class="edit-form" action="/" method="post">
            <div class="head">
                <h2>Create Contact</h2>
                <img src="assets/close_black_24dp.svg" onclick="closeClick()">
            </div>
            <div class="inputs">
                <div class="vert">
                    <div class="row align-items-center justify-content-around ">
                        <label for="name" class="edLabel col-4">Name</label>
                        <input type="text" class="edEdit col-8" name="name" placeholder="Please enter yor name">
                    </div>
                    <div class="row align-items-center justify-content-around ">
                        <label for="email" class="edLabel col-4">Email</label>
                        <input type="text" class="edEdit col-8" name="email" placeholder="test@domain.com">
                    </div>
                    <div class="row align-items-center justify-content-around ">
                        <label for="address" class="edLabel col-4">Address</label>
                        <input type="text" class="edEdit col-8" name="address" placeholder="New Channel Name">
                    </div>
                </div>
                <div class="foto">
                    <img src="assets/none.png" alt="&#9587;">
                </div>
            </div>
            <div class="finish">
                <button id="close" type="button">close</button>
                <button id="save" type="submit"><span class="material-icons-round">
done
</span>save changes</button>
            </div>
        </form>
    </div>

</div>
@endsection
