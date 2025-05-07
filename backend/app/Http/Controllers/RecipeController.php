<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class RecipeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->only(['store', 'update', 'destroy']);
    }

    public function index()
    {
        $recipes = Recipe::with('category', 'user')->get();
    
        // Convertir les ingrédients en tableau pour chaque recette
        foreach ($recipes as $recipe) {
            $recipe->ingredients = preg_split("/\r\n|\n|\r/", $recipe->ingredients);
    
            // Ajouter l'URL de l'image
            if ($recipe->image) {
                $recipe->image_url = asset('storage/' . $recipe->image);
            }
        }
    
        return response()->json($recipes);
    }
    public function myRecipes(Request $request)
{
    $user = $request->user();

    $recipes = $user->recipes()->with('category')->get();

    foreach ($recipes as $recipe) {
        $recipe->ingredients = preg_split("/\r\n|\n|\r/", $recipe->ingredients);
        if ($recipe->image) {
            $recipe->image_url = asset('storage/' . $recipe->image);
        }
    }

    return response()->json($recipes);
}

    
public function show($id)
    {
        $recipe = Recipe::with('category', 'user')->findOrFail($id);

        // Convertir les ingrédients en tableau
        $recipe->ingredients = preg_split("/\r\n|\n|\r/", $recipe->ingredients);

        // Ajouter l'URL de l'image
        if ($recipe->image) {
            $recipe->image_url = asset('storage/' . $recipe->image);
        }

        return response()->json($recipe);
    }

    

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'ingredients' => 'required|string',
            'steps' => 'required|string',
            'duration' => 'required|integer',
            'difficulty' => 'required|string',
            'portions' => 'required|integer',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->only([
            'title', 'ingredients', 'steps', 'duration', 'difficulty', 'portions', 'category_id'
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('recipes', 'public');
        }

        $recipe = $request->user()->recipes()->create($data);

        return response()->json($recipe, 201);
    }

    public function update(Request $request, $id)
    {
        $recipe = Recipe::findOrFail($id);

        $request->validate([
            'title' => 'sometimes|required|string',
            'ingredients' => 'sometimes|required|string',
            'steps' => 'sometimes|required|string',
            'duration' => 'sometimes|required|integer',
            'difficulty' => 'sometimes|required|string',
            'portions' => 'sometimes|required|integer',
            'category_id' => 'sometimes|required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->only([
            'title', 'ingredients', 'steps', 'duration', 'difficulty', 'portions', 'category_id'
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('recipes', 'public');
        }

        $recipe->update($data);

        return response()->json($recipe);
    }

    public function destroy($id)
    {
        $recipe = Recipe::findOrFail($id);
        $recipe->delete();

        return response()->json(null, 204);
    }
}
