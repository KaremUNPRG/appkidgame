<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use App\Models\Credencial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function redirectToGoogle()
    {
        // dd('s');
        return Socialite::driver('google')->redirect();
    }
        
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function handleGoogleCallback()
    {
        try {
      
            $user = Socialite::driver('google')->user();
            // dd($user);
            $finduser = User::where('IdGoogle', $user->id)->first();
            
            if($finduser){
                Auth::login($finduser);
            }else{
                $newUser = User::create([
                    'Nombre'    => $user->user['given_name'],
                    'Apellido'  => $user->user['family_name'],
                    'Email'     => $user->user['email'],
                    'IdGoogle'  => $user->id,
                    'Avatar'    => $user->user['picture']
                ]);
                Auth::login($newUser);
            }
            $newCredencial = Credencial::create([
                'CodigoUsuario' => Auth::user()->Codigo,
                'AccessToken'   => $user->token,
                'RefreshToken'  => $user->refreshToken,
                'ExpiresIn'     => $user->expiresIn
            ]);
            return redirect('/')->with( 'accessToken', $user->token);
        } catch (Exception $e) {
            dd($e->getMessage());
        }
    }
}
