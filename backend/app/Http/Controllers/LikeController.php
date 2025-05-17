<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Like;
use App\Models\Recipe;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    
    public function like(Request $request, $recipeId)
    {
        $user = Auth::user();

        $recipe = Recipe::findOrFail($recipeId);

        $existingLike = Like::where('user_id', $user->id)
                            ->where('recipe_id', $recipe->id)
                            ->first();

        if ($existingLike) {
            return response()->json(['message' => 'Vous avez déjà liké cette recette'], 400);
        }

        Like::create([
            'user_id' => $user->id,
            'recipe_id' => $recipe->id,
        ]);

        return response()->json(['message' => 'Recette likée avec succès'], 201);
    }

    public function unlike(Request $request, $recipeId)
    {
        $user = Auth::user();

        $like = Like::where('user_id', $user->id)
                    ->where('recipe_id', $recipeId)
                    ->first();

        if (!$like) {
            return response()->json(['message' => 'Like non trouvé'], 404);
        }

        $like->delete();

        return response()->json(['message' => 'Like retiré avec succès']);
    }
public function myLikes()
{
    $user = Auth::user();

    // Test simple pour voir si l'auth fonctionne
    return response()->json([
        'user_id' => $user->id,
        'message' => 'auth OK'
    ]);
}

}
