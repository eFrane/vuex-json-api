<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function coverImage($bookId)
    {
        $image = storage_path('app/cover'.$bookId.'.png');

        if (file_exists($image)) {
            return response(file_get_contents($image), 200, ['Content-type' => 'image/png']);
        }

        return response(null, 404, ['Content-type' => 'image/png']);
    }
}
