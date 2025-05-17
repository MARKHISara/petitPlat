<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LikeController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);




// // routes/api.php
// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });



Route::get('categories', [CategoryController::class, 'index']);
Route::get('categories/{id}', [CategoryController::class, 'show']);
Route::post('categories', [CategoryController::class, 'store']);


Route::middleware('auth:sanctum')->prefix('recipes')->group(function () {
    Route::post('/comments', [CommentController::class, 'store']);
    Route::post('/', [RecipeController::class, 'store']);
    
    Route::put('/{id}', [RecipeController::class, 'update']);
    Route::delete('/{id}', [RecipeController::class, 'destroy']);
});


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/recipes/{id}/like', [LikeController::class, 'like']);
    Route::delete('/recipes/{id}/unlike', [LikeController::class, 'unlike']);
    Route::get('/my-likes', [LikeController::class, 'myLikes']);
    Route::get('/my-recipes', [RecipeController::class, 'myRecipes']);
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
    Route::get('/recipes/likes-summary', [RecipeController::class, 'likesSummary']);
});

Route::get('/recipes/{id}/comments', [CommentController::class, 'index']);
Route::get('recipes', [RecipeController::class, 'index']);
Route::get('recipes/{id}', [RecipeController::class, 'show']);
