<?php
/**
 * @copyright 2019
 * @author Stefan "eFrane" Graupner <stefan.graupner@gmail.com>
 */

namespace App\Http\Transformers;


use App\Model\Model;
use App\Services\ApiResourceService;
use Carbon\Carbon;
use League\Fractal\TransformerAbstract;

abstract class BaseTransformer extends TransformerAbstract
{
    /**
     * @var string
     */
    protected $type;

    /**
     * @var ApiResourceService
     */
    protected $resourceService;

    public function __construct(ApiResourceService $resourceService)
    {
        $this->resourceService = $resourceService;

        if (!is_string($this->type) || '' === $this->type) {
            throw new \RuntimeException('Transformer has no type');
        }
    }

    /**
     * @param Model $model
     * @return int
     */
    public function formatId(Model $model)
    {
        return intval($model->getKey());
    }

    public function formatDate(\DateTime $dateTime)
    {
        if (!is_a($dateTime, Carbon::class)) {
            $dateTime = Carbon::instance($dateTime);
        }

        /** @var Carbon $dateTime */
        return $dateTime->toIso8601String();
    }

    public function getType(): string
    {
        return $this->type;
    }

    public function setType(string $type): void
    {
        $this->type = $type;
    }
}
