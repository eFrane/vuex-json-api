<?php
/**
 * @copyright 2019
 * @author Stefan "eFrane" Graupner <stefan.graupner@gmail.com>
 */

namespace App\Types;


use Illuminate\Http\Request;

class ApiRequestInfo implements \ArrayAccess
{
    /**
     * @var int
     */
    protected $page;

    /**
     * @var int
     */
    protected $limit;

    /**
     * @var array
     */
    protected $filters = [];

    public static function createFromRequest(Request $request): ApiRequestInfo
    {
        $requestInfo = new self();

        if ($request->has('page')) {
            $pageInfo = $request->get('page');

            if (array_key_exists('page', $pageInfo)) {
                $requestInfo->setPage(intval($pageInfo['offset']));
            }

            if (array_key_exists('limit', $pageInfo)) {
                $requestInfo->setLimit(intval($pageInfo['limit']));
            }
        }

        if ($request->has('filter')) {
            $requestInfo->setFilters($request->get('filter'));
        }

        return $requestInfo;
    }

    /**
     * @return int
     */
    public function getPage(): int
    {
        return $this->page;
    }

    /**
     * @param int $page
     */
    public function setPage(int $page): void
    {
        $this->page = $page;
    }

    /**
     * @return int
     */
    public function getLimit(): int
    {
        return $this->limit;
    }

    /**
     * @param int $limit
     */
    public function setLimit(int $limit): void
    {
        $this->limit = $limit;
    }

    /**
     * @return array
     */
    public function getFilters(): array
    {
        return $this->filters;
    }

    /**
     * @param array $filters
     */
    public function setFilters(array $filters): void
    {
        $this->filters = $filters;
    }

    public function hasFilter($filter)
    {
        return array_key_exists($filter, $this->filters);
    }

    public function offsetExists($offset)
    {
        return $this->hasFilter($offset);
    }

    public function offsetGet($offset)
    {
        return $this->filters[$offset];
    }

    public function offsetSet($offset, $value)
    {
        throw new \LogicException('Filters are read-only');
    }

    public function offsetUnset($offset)
    {
        throw new \LogicException('Filters are read-only');
    }
}
