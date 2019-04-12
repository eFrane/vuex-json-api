<?php
/**
 * @copyright 2019
 * @author Stefan "eFrane" Graupner <stefan.graupner@gmail.com>
 */

namespace App\Http;


class JsonApiSerializer extends \League\Fractal\Serializer\JsonApiSerializer
{
    protected $included = [];

    public function setIncluded(array $included)
    {
        $this->included = $included;
    }

    public function meta(array $meta)
    {
        if (0 < count($this->included)) {
            $meta['included'] = $this->included;
        }

        return parent::meta($meta);
    }
}
