<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    // Lister tous les utilisateurs
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    // Afficher un seul utilisateur
    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }

        return response()->json($user);
    }

public function update(Request $request, $id)
{
    $user = User::find($id);

    if (!$user) {
        return response()->json(['message' => 'Utilisateur non trouvé'], 404);
    }

    $request->validate([
        'name' => 'sometimes|string',
        'email' => [
            'sometimes',
            'string',
            'email',
            Rule::unique('users')->ignore($user->id),
        ],
        'password' => 'sometimes|string|confirmed',
        'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // ✅ validation image
        'bio' => 'nullable|string',
    ]);

    $user->name = $request->input('name', $user->name);
    $user->email = $request->input('email', $user->email);

    if ($request->filled('password')) {
        $user->password = Hash::make($request->password);
    }

    // ✅ Traitement de l'image
    if ($request->hasFile('avatar')) {
        $avatarPath = $request->file('avatar')->store('avatars', 'public');
        $user->avatar = '/storage/' . $avatarPath;
    }

    $user->bio = $request->input('bio', $user->bio);

    $user->save();

    return response()->json([
        'message' => 'Utilisateur mis à jour avec succès',
        'user' => $user
    ]);
}

    // Supprimer un utilisateur (facultatif)
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'Utilisateur supprimé avec succès']);
    }
}
