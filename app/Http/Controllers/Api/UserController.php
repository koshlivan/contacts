<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserStoreRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        $query = User::query();

        if ( isset( $request -> sorting ) ) {
            $users = [];
            $sortingOrder=(int)$request -> sortOrder;
            if ( $sortingOrder === -1 ) {
            $users = $query -> get() -> sortBy( $request -> sorting );
            }
            if ( $sortingOrder === 1 ) {
                $users = $query -> get() -> sortByDesc( $request -> sorting );
            }
           return UserResource::collection( $users );
        }
       return UserResource::collection( $query->get() );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return UserResource
     */
    public function store(Request $request)
    {

        $new_user = User::create($request->all());

        return new UserResource($new_user);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return UserResource
     */
    public function show($id)
    {
        return new UserResource(User::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return UserResource
     */
    public function update(Request $request, $id)
    {
        $user=User::findOrFail($id);
        if($request->name!='') {
            $user->name = $request->name;
        }
        if($request->address!='') {
            $user->address = $request->address;
        }
        if($request->email!='') {
            $user->email = $request->email;
        }

        $user->update();

        return new UserResource(User::find($id));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        User::find($id)->delete();

        return response(null, '204');
    }
}
