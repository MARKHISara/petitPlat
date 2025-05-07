<?php

namespace App\Http\Controllers;

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        return response()->json(Category::all());
    }

    public function show($id)
    {
        return response()->json(Category::findOrFail($id));
    }
    public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|unique:categories,name',
    ]);

    $category = Category::create([
        'name' => $request->name
    ]);

    return response()->json($category, 201);
}

}
