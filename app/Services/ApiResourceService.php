<?php
/**
 * @copyright 2019
 * @author Stefan "eFrane" Graupner <stefan.graupner@gmail.com>
 */

namespace App\Services;


use App\Http\Transformers\BaseTransformer;
use League\Fractal\Resource\Collection;
use League\Fractal\Resource\Item;

class ApiResourceService
{
    public function newCollection(iterable $data, string $transformerClass): Collection
    {
        $transformer = $this->createTransformer($transformerClass);

        return new Collection($data, $transformer, $transformer->getType());
    }

    public function createTransformer(string $transformerClass): BaseTransformer
    {
        try {
            /** @var BaseTransformer $transformer */
            $transformer = (new \ReflectionClass($transformerClass))->newInstance($this);

            return $transformer;
        } catch (\ReflectionException $e) {
            throw new \LogicException('Transformer not found');
        }
    }

    public function newItem($data, string $transformerClass): Item
    {
        $transformer = $this->createTransformer($transformerClass);

        return new Item($data, $transformer, $transformer->getType());
    }
}
