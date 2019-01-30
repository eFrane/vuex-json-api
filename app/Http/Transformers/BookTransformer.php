<?php
/**
 * @copyright 2019
 * @author Stefan "eFrane" Graupner <stefan.graupner@gmail.com>
 */

namespace App\Http\Transformers;


use App\Services\FakeBookstoreService;

class BookTransformer extends BaseTransformer
{
    protected $type = 'Book';

    protected $availableIncludes = ['author', 'genres'];

    /** @var FakeBookstoreService */
    private $bookstore;

    public function transform(array $book)
    {
        $this->bookstore = app(FakeBookstoreService::class);

        return [
            'id'       => $book['id'],
            'title'    => $book['title'],
            'subtitle' => $book['subtitle'],
            'teaser'   => $book['teaser'],
            'abstract' => $book['abstract'],
            'isbn'     => $book['isbn'],
            'price'    => number_format($book['price'], 2),
        ];
    }

    public function includeAuthor(array $book)
    {
        return $this->resourceService->newItem(
            $this->bookstore->authors[$book['author']],
            AuthorTransformer::class
        );
    }

    public function includeGenres(array $book)
    {
        $genres = array_filter(
            $this->bookstore->genres,
            function ($genre) use ($book) {
                return in_array($genre['id'], $book['genres']);
            }
        );

        return $this->resourceService->newCollection($genres, GenreTransformer::class);
    }
}
