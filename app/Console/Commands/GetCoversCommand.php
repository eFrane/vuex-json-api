<?php

namespace App\Console\Commands;

use App\Services\FakeBookstoreService;
use Illuminate\Console\Command;

class GetCoversCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'covers:get';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Get covers';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle(FakeBookstoreService $bookstoreService)
    {
        foreach ($bookstoreService->books as $book) {
            $theme = random_int(0, 16);
            $imageCode = random_int(1, 40);

            $urlParams = [
                'title' => $book['title'],
                'top_text' => $book['subtitle'],
                'author' => $bookstoreService->authors[$book['author']]['name'],
                'theme' => $theme,
                'image_code' =>  $imageCode
            ];

            $url = 'https://orly-appstore.herokuapp.com/generate?';

            $urlWithParams = $url . \http_build_query($urlParams);
            $storagePath = storage_path('app/cover'.$book['id'].'.png');

            if (!file_exists($storagePath)) {
                $this->info('Getting '.$urlWithParams);

                $image = file_get_contents($urlWithParams);

                file_put_contents($storagePath, $image);

                $this->info('Got '.$storagePath);

                $cooldown = random_int(120, 240);

                $this->info('Cooling down for '.number_format($cooldown/60, 2).' minutes');

                sleep($cooldown);
            }

            $this->info('Skipping '.$storagePath);
        }
    }
}
