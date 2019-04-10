<?php
/**
 * @copyright 2019
 * @author Stefan "eFrane" Graupner <stefan.graupner@gmail.com>
 */

namespace App\Http\Controllers\API;

use App\Http\JsonApiSerializer;
use App\Services\ApiResourceService;
use App\Types\ApiRequestInfo;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller as BaseController;
use League\Fractal\Manager;
use League\Fractal\Resource\ResourceAbstract;

abstract class Controller extends BaseController
{
    /**
     * @var ApiResourceService
     */
    protected $resourceService;

    /**
     * @var ApiRequestInfo
     */
    protected $requestInfo;

    /**
     * @var Manager
     */
    private $fractal;

    /**
     * @var Request
     */
    private $request;

    /**
     * Controller constructor.
     * @param ApiResourceService $resourceService
     */
    public function __construct(ApiResourceService $resourceService)
    {
        $this->request = request();
        $this->resourceService = $resourceService;

        $this->requestInfo = $this->prepareRequestInfo();
        $this->fractal = $this->configureFractalManager();
    }

    /**
     * Get the filters and other stuff from the query
     */
    private function prepareRequestInfo(): ApiRequestInfo
    {
        return ApiRequestInfo::createFromRequest($this->request);
    }

    /**
     * @return Manager
     */
    private function configureFractalManager(): Manager
    {
        $fractal = new Manager();

        $serializer = new JsonApiSerializer();

        if ($this->request->has('include')) {
            $includes = explode(',', $this->request->get('include'));
            $fractal->parseIncludes($includes);
            $serializer->setIncluded($includes);
        }

        $fractal->setSerializer($serializer);

        return $fractal;
    }

    /**
     * @param ResourceAbstract $resource
     * @return Response
     */
    protected function render(ResourceAbstract $resource): Response
    {
        $scope = $this->fractal->createData($resource);

        $data = $scope->toArray();

        $data['jsonapi'] = '1.1';
        $data['links'] = ['self' => $this->request->fullUrl()];

        $jsonEncode = json_encode(
            $data,
            JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_OBJECT_AS_ARRAY
        );

        return response($jsonEncode, 200)
            ->header('Content-type', 'application/vnd.api+json');
    }
}
