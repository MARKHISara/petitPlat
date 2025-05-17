<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|string',
            'recipe_id' => 'required|exists:recipes,id',
        ]);

        $comment = Comment::create([
            'content' => $request->content,
            'recipe_id' => $request->recipe_id,
            'user_id' => auth()->id(),
        ]);

        return response()->json([
            'message' => 'Commentaire ajouté avec succès',
            'comment' => $comment->load('user'),
        ], 201);
    }

public function index($recipeId)
{
    $comments = Comment::where('recipe_id', $recipeId)
        ->with('user')
        ->latest()
        ->get()
        ->values(); 

    return response()->json($comments);
}



}
