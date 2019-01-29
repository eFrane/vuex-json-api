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
});
