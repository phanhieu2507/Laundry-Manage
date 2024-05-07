<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::all();
        return response()->json($services);
    }

    public function show($id)
    {
        $service = Service::find($id);
        return response()->json($service);
    }

    public function store(Request $request)
    {
        $service = Service::create($request->all());
        return response()->json($service, 201);
    }

    public function update(Request $request, $id)
    {
        $service = Service::find($id);
        $service->update($request->all());
        return response()->json($service, 200);
    }

    public function destroy($id)
    {
        Service::destroy($id);
        return response()->json(null, 204);
    }
}
