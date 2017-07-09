<?php

return array(
  'imagerSystemPath' => $_SERVER['DOCUMENT_ROOT'] . '/imager/',
  'imagerUrl' => '/imager/',
  'cacheEnabled' => true,
  'cacheDuration' => 15768000, // 6 months
  'cacheDurationRemoteFiles' => 1209600, // 14 days
  'jpegQuality' => 85,
  'pngCompressionLevel' => 2,
  'webpQuality' => 85,
  'webpImagickOptions' => array(), // additional options you want to pass to Imagick via '$instance->setOption('webp:option', 'value')'.
  'useCwebp' => false,
  'cwebpPath' => '/usr/bin/cwebp',
  'cwebpOptions' => '', // additional options you want to pass to cwebp. Quality is set automatically.
  'interlace' => false, // false, true ('line'), 'none', 'line', 'plane', 'partition'
  'allowUpscale' => true,
  'resizeFilter' => 'lanczos',
  'smartResizeEnabled' => true,
  'removeMetadata' => false,
  'bgColor' => '',
  'position' => '50% 50%',
  'letterbox' => array('color'=>'#000', 'opacity'=>0),
  'hashFilename' => 'postfix', // true, false, or 'postfix' (meaning only the generated part of the filename is hashed)
  'hashPath' => false, 
  'hashRemoteUrl' => false, // true, false, or 'host' (meaning only the host part of the url is hashed) 
  'useRemoteUrlQueryString' => false,
  'instanceReuseEnabled' => false,
  'noop' => false,
  'suppressExceptions' => false,
  'convertToRGB' => false, // Should images be converted to RGB?
    
  'fillTransforms' => false,
  'fillAttribute' => 'width', // this could be any attribute that is numeric
  'fillInterval' => '200',
  
  'jpegoptimEnabled' => true,
  'jpegoptimPath' => '/usr/bin/jpegoptim',
  'jpegoptimOptionString' => '-s',
  'jpegtranEnabled' => false,
  'jpegtranPath' => '/usr/bin/jpegtran',
  'jpegtranOptionString' => '-optimize -copy none',
  'mozjpegEnabled' => false,
  'mozjpegPath' => '/usr/bin/mozjpeg',
  'mozjpegOptionString' => '-optimize -copy none',
  'optipngEnabled' => true,
  'optipngPath' => '/usr/bin/optipng',
  'optipngOptionString' => '-o5',
  'pngquantEnabled' => false,
  'pngquantPath' => '/usr/bin/pngquant',
  'pngquantOptionString' => '--strip --skip-if-larger',
  'gifsicleEnabled' => false,
  'gifsiclePath' => '/usr/bin/gifsicle',
  'gifsicleOptionString' => '--optimize=3 --colors 256',
  'tinyPngEnabled' => false,
  'tinyPngApiKey' => '',
  'optimizeType' => 'runtime',
  'skipExecutableExistCheck' => false,
  'logOptimizations' => false,
  
  'awsEnabled' => false,
  'awsAccessKey' => '',
  'awsSecretAccessKey' => '',
  'awsBucket' => '',
  'awsFolder' => '',
  'awsCacheDuration' => 1209600, // 14 days
  'awsRequestHeaders' => array(),
  'awsStorageType' => 'standard', // 'standard' or 'rrs' (reduced redundancy storage),

  'gcsEnabled' => false,
  'gcsAccessKey' => '',
  'gcsSecretAccessKey' => '',
  'gcsBucket' => '',
  'gcsFolder' => '',
  'gcsCacheDuration' => 1209600, // 14 days

  'cloudfrontInvalidateEnabled' => false,
  'cloudfrontDistributionId' => '',
    
  'curlOptions' => array(),
  'runTasksImmediatelyOnAjaxRequests' => true,
  'clearKey' => '', // Key that should be passed to the clear controller action. Empty string means clearing is disabled.
);
