<?php
/**
 * @copyright 2019
 * @author Stefan "eFrane" Graupner <stefan.graupner@gmail.com>
 */

namespace App\Http\Transformers;


class AuthorTransformer extends BaseTransformer
{
    protected $type = 'Author';

    public function transform(array $author)
    {
        return [
            'id'       => $author['id'],
            'birthday' => $author['birthday'],
            'name'     => $author['name'],
        ];
    }
}
