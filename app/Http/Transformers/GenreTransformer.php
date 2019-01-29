<?php
/**
 * @copyright 2019
 * @author Stefan "eFrane" Graupner <stefan.graupner@gmail.com>
 */

namespace App\Http\Transformers;


class GenreTransformer extends BaseTransformer
{
    protected $type = 'Genre';

    public function transform(array $genre)
    {
        return [
            'id'   => $genre['id'],
            'name' => $genre['name'],
        ];
    }
}
