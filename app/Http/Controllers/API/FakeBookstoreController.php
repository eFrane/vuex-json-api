<?php
/**
 * @copyright 2019
 * @author Stefan "eFrane" Graupner <stefan.graupner@gmail.com>
 */

namespace App\Http\Controllers\API;


use App\Http\Transformers\AuthorTransformer;
use App\Http\Transformers\BookTransformer;
use App\Http\Transformers\GenreTransformer;
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
        $item = $this->resourceService->newItem($this->bookstore->books[$id], BookTransformer::class);

        return $this->render($item);
    }

    public function listAuthors()
    {
        $collection = $this->resourceService->newCollection($this->bookstore->authors, AuthorTransformer::class);

        return $this->render($collection);
    }

    public function getAuthor($id)
    {
        $item = $this->resourceService->newItem($this->bookstore->authors[$id], AuthorTransformer::class);

        return $this->render($item);
    }

    public function listGenres()
    {
        $collection = $this->resourceService->newCollection($this->bookstore->genres, GenreTransformer::class);

        return $this->render($collection);
    }

    public function getGenre($id)
    {
        $item = $this->resourceService->newItem($this->bookstore->genres[$id], GenreTransformer::class);

        return $this->render($item);
    }
}
