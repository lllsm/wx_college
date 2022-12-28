<?php

return [
    'autoload' => false,
    'hooks' => [
        'app_init' => [
            'crontab',
            'log',
            'qrcode',
        ],
        'config_init' => [
            'cropper',
        ],
        'wipecache_after' => [
            'tinymce',
        ],
        'set_tinymce' => [
            'tinymce',
        ],
    ],
    'route' => [
        '/qrcode$' => 'qrcode/index/index',
        '/qrcode/build$' => 'qrcode/index/build',
    ],
    'priority' => [],
    'domain' => '',
];
