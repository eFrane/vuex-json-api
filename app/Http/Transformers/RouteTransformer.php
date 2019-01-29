<?php
/**
 * @copyright 2019
 * @author Stefan "eFrane" Graupner <stefan.graupner@gmail.com>
 */

namespace App\Http\Transformers;


use Illuminate\Routing\Route;

class RouteTransformer extends BaseTransformer
{
    protected $type = 'Route';

    public function transform(Route $route)
    {
        return [
            'id'         => $route->getName(),
            'parameters' => $route->parameterNames(),
            'url'        => $route->uri(),
        ];
    }
}
