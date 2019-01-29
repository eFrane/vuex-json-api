<?php

namespace App\Http\Controllers\API;

use App\Http\Transformers\RouteTransformer;
use Illuminate\Routing\Route;
use Illuminate\Routing\Router;

class RouteController extends Controller
{
    public function list(Router $router)
    {
        $routes = collect($router->getRoutes()->getRoutesByName())
            ->filter(
                function (Route $route) {
                    if (!$this->requestInfo->hasFilter('group')) {
                        return true;
                    }

                    return starts_with($route->getName(), $this->requestInfo['group'] . '.');
                }
            )
            ->toArray();

        $collection = $this->resourceService->newCollection(
            $routes,
            RouteTransformer::class
        );

        return $this->render($collection);
    }

    public function get(Router $router, $id)
    {
        $route = $router->getRoutes()->getByName($id);

        $item = $this->resourceService->newItem($route, RouteTransformer::class);

        return $this->render($item);
    }
}
