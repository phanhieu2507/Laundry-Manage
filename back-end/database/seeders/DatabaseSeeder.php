<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        DB::table('users')->insert([
            'name' => 'Phan Công Hiếu',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'address' => 'Admin Address',
            'phone' => '123456789',
            'email_verified_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Seed regular user
        DB::table('users')->insert([
            'name' => 'Phạm Vân Anh',
            'email' => 'fastandclean2507@example.com',
            'password' => Hash::make('password'),
            'role' => 'user',
            'address' => '108 Trương Định, Hai Bà Trưng, Hà Nội',
            'phone' => '987654321',
            'email_verified_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
