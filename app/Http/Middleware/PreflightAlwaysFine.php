<?php
/**
 * @copyright 2019
 * @author Stefan "eFrane" Graupner <stefan.graupner@gmail.com>
 */

namespace App\Http\Middleware;


use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PreflightAlwaysFine
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->isMethod('OPTIONS')) {
            return response(null, Response::HTTP_NO_CONTENT)
                ->header('Access-Control-Allow-Origin', '*')
                ->header('Access-Control-Allow-Methods', 'GET, HEAD, POST, DELETE, PATCH')
                ->header('Access-Control-Max-Age', 86400)
                ->header('Access-Control-Allow-Headers', 'X-Requested-With, Content-type');
        }

        return $next($request);
    }
}
