<?php
/**
 * @copyright 2019
 * @author Stefan "eFrane" Graupner <stefan.graupner@gmail.com>
 */

namespace App\Http\Transformers;


class BookTransformer extends BaseTransformer
{
    protected $type = 'Book';

    public function transform(array $book)
    {
        return [
            'id'       => $book['id'],
            'title'    => $book['title'],
            'abstract' => $book['abstract'],
            'isbn'     => $book['isbn'],
            'rating'   => $book['rating'],
        ];
    }
}
