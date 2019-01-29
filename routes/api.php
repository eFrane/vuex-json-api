<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['as' => 'api.'], function () {
    Route::get('route')
        ->name('route.list')
        ->uses('API\RouteController@list');

    Route::get('route/{id}')
        ->name('route.get')
        ->uses('API\RouteController@get');

    Route::get('book')
        ->name('book.list')
        ->uses('API\FakeBookstoreController@listBooks');

    Route::get('book/{id}')
        ->name('book.get')
        ->uses('API\FakeBookstoreController@getBook');

    Route::get('author')
        ->name('author.list')
        ->uses('API\FakeBookstoreController@listAuthors');

    Route::get('author/{id}')
        ->name('author.get')
        ->uses('API\FakeBookstoreController@getAuthor');

    Route::get('genre')
        ->name('genre.list')
        ->uses('API\FakeBookstoreController@listGenres');

    Route::get('genre/{id}')
        ->name('genre.get')
        ->uses('API\FakeBookstoreController@getGenre');
});
