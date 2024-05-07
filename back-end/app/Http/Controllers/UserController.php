<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function show($id)
    {
        $user = User::find($id);
        return response()->json($user);
    }

    public function store(Request $request)
    {
        $user = User::create($request->all());
        return response()->json($user, 201);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);
        $user->update($request->all());
        return response()->json($user, 200);
    }

    public function destroy($id)
    {
        User::destroy($id);
        return response()->json(null, 204);
    }

    function login(Request $req)
    {
        $user = User::where('email', $req->email)->first();
        if (!$user || !Hash::check($req->password, $user->password)) {
            return response()->json([
                "status" => "fail",
                "message" => "Email or Password does not matched"
            ]);
        }
        // $role=Role::where('id',$user->role_id);
        return response()->json([
            "status" => "success",
            "message" => "Login success",
            "user" => $user,
            //        "role"=>$role->role_name,


        ]);;
    }

    public function register(Request $request)
{
    // Validate request data
    $validator = Validator::make($request->all(), [
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'phone' => 'required|string|max:255',
        'address' => 'nullable|string|max:255',
        'password' => 'required|string|min:6|confirmed',
    ]);

    // Check if validation fails
    if ($validator->fails()) {
        return response()->json([
            'status' => 'fail',
            'message' => 'Validation errors',
            'errors' => $validator->errors()
        ], 422);
    }

    // Create user if validation passes
    try {
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->address = $request->address;
        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Registration successful',
            'user' => $user
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Registration failed',
            'error' => $e->getMessage()
        ], 500);
    }
}
}
