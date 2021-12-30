<?php


namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

class UserManagement extends BaseController {

        public function saveUser(Request $request){
            $user=new User();
            $user->name=$request->name;
            $user->email=$request->email;
            $user->password=md5($request->password);
            $user->address=$request->address;
            $user->created=time();

            $user->save();
        }

        public function updateUser(Request $request){
            $user=User::find($request->userId);
            $user->name=$request->name;
            $user->email=$request->email;
            $user->address=$request->address;

            $user->save();
        }

        public function deleteUser($id){
            $user=User::find($id);
            $user->delete();
        }
}
