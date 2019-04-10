<?php
/**
 * @copyright 2019
 * @author Stefan "eFrane" Graupner <stefan.graupner@gmail.com>
 */

namespace App\Http;


class JsonApiSerializer extends \League\Fractal\Serializer\JsonApiSerializer
{
    protected $included = [];
    protected $availableIncludes = [];

    public function setIncluded(array $included)
    {
        $this->included = $included;
    }

    public function meta(array $meta)
    {
        if (0 < count($this->included)) {
            $meta['included'] = $this->included;
        }

        if (0 < count($this->availableIncludes)) {
            $meta['availableIncludes'] = $this->availableIncludes;
        }

        return parent::meta($meta);
    }
}
