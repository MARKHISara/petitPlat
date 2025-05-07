<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('recipes', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Titre de la recette
            $table->text('ingredients'); // Ingrédients de la recette
            $table->text('steps'); // Étapes de la préparation
            $table->integer('duration'); // Durée de préparation en minutes
            $table->string('difficulty'); // Niveau de difficulté
            $table->integer('portions'); // Nombre de portions
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Lien avec l'utilisateur
            $table->foreignId('category_id')->constrained()->onDelete('cascade'); // Lien avec la catégorie
            $table->timestamps();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('recipes');
    }
    
};
