<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Http\Request;

class RateLimiterServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        // Ici, tu peux enregistrer des services, mais pour le rate limiter, on ne fait rien ici.
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // Définir un rate limiter pour l'API
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60); // Limite de 60 requêtes par minute
        });
    }
}
