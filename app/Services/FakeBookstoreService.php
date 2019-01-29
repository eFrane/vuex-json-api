<?php
/**
 * @copyright 2019
 * @author Stefan "eFrane" Graupner <stefan.graupner@gmail.com>
 */

namespace App\Services;


use Carbon\Carbon;
use Faker\Factory;

class FakeBookstoreService
{
    const BOOKSTORE_STORAGE = 'app/bookstore.json';

    public $genres = [];
    public $authors = [];
    public $books = [];

    public function __construct()
    {
        if (!$this->hasBookstore()) {
            $this->makeBookstore();
        }
    }

    /**
     * @return bool
     */
    protected function hasBookstore(): bool
    {
        return file_exists(storage_path(self::BOOKSTORE_STORAGE)) && $this->loadBookstore();
    }

    protected function loadBookstore()
    {
        $json = json_decode(file_get_contents(storage_path(self::BOOKSTORE_STORAGE)), true);

        $this->authors = $json['authors'];
        $this->books = $json['books'];
        $this->genres = $json['genres'];

        return true;
    }

    protected function makeBookstore()
    {
        $faker = Factory::create();

        $this->genres = collect($faker->words(50))->map(
            function ($genre, $id) {
                return [
                    'id'   => $id,
                    'name' => ucfirst($genre),
                ];
            }
        )->toArray();
        $this->authors = collect(range(0, 10))
            ->map(
                function ($id) use ($faker) {
                    return [
                        'id'       => $id,
                        'name'     => $faker->name,
                        'birthday' => Carbon::instance(
                            $faker->dateTimeThisCentury(Carbon::createFromDate(1999, 12, 31))
                        )->toIso8601String(),
                    ];
                }
            )
            ->toArray();

        $this->books = collect(range(0, 41))
            ->map(
                function ($id) use ($faker) {
                    return [
                        'id'       => $id,
                        'title'    => $faker->realText(15),
                        'abstract' => $faker->realText(400),
                        'isbn'     => $faker->isbn10,
                        'price'    => $faker->randomFloat(null, 0, 20),
                        'author'   => $faker->randomElement(array_keys($this->authors)),
                        'genres'   => $faker->randomElements(array_keys($this->genres), $faker->randomDigitNotNull),
                    ];
                }
            )
            ->toArray();

        $this->saveBookstore();
    }

    protected function saveBookstore()
    {
        $json = [
            'genres'  => $this->genres,
            'books'   => $this->books,
            'authors' => $this->authors,
        ];

        file_put_contents(storage_path(self::BOOKSTORE_STORAGE), json_encode($json));
    }
}
