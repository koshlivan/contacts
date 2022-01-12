<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name'=>$this->name,
            'email'=>$this->email,
            'address'=>$this->address,
            'created'=>$this->created_at,
            'photo'=>$this->photo,
        ];
    }
    /**
     * Обертка «данных», которую следует применить.
     *
     * @var string
     */
    public static $wrap = 'user';
}
