<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);



Route::get('categories', [CategoryController::class, 'index']);
Route::get('categories/{id}', [CategoryController::class, 'show']);
Route::post('categories', [CategoryController::class, 'store']);








Route::get('recipes', [RecipeController::class, 'index']);
Route::get('recipes/{id}', [RecipeController::class, 'show']);
Route::middleware('auth:sanctum')->get('/my-recipes', [RecipeController::class, 'myRecipes']);

Route::get('/recipes/{id}/comments', [CommentController::class, 'index']);
Route::middleware('auth:sanctum')->prefix('recipes')->group(function () {
    Route::post('/comments', [CommentController::class, 'store']);
    Route::post('/', [RecipeController::class, 'store']);
    
    Route::put('/{id}', [RecipeController::class, 'update']);
    Route::delete('/{id}', [RecipeController::class, 'destroy']);
});

