<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'ingredients', 'steps', 'duration', 'difficulty', 'portions','image', 'user_id', 'category_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function comments()
{
    return $this->hasMany(Comment::class);
}

public function likes()
{
    return $this->hasMany(Like::class);
}

public function getLikesCountAttribute()
{
    return $this->likes()->count();
}

    
}
