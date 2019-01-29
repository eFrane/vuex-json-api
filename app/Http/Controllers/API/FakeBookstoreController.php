<?php
/**
 * @copyright 2019
 * @author Stefan "eFrane" Graupner <stefan.graupner@gmail.com>
 */

namespace App\Http\Controllers\API;


use App\Http\Transformers\BookTransformer;
use App\Services\ApiResourceService;
use App\Services\FakeBookstoreService;

class FakeBookstoreController extends Controller
{
    /**
     * @var FakeBookstoreService
     */
    protected $bookstore;

    public function __construct(ApiResourceService $resourceService, FakeBookstoreService $bookstore)
    {
        parent::__construct($resourceService);

        $this->bookstore = $bookstore;
    }


    public function listBooks()
    {
        $collection = $this->resourceService->newCollection($this->bookstore->books, BookTransformer::class);

        return $this->render($collection);
    }

    public function getBook($id)
    {

    }
}
