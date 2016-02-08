#!/bin/bash

usage() { echo "usage: $0 icon colour [dest_dir]"; exit 1; }

[ "$1" ]

eval mkdir -p "www/res/water-mark/ios"
eval mkdir -p "www/res/water-mark/android"

# Show the user some progress by outputing all commands being run.
set -x

convert="convert $1"

#iOS
$convert -resize 870x172\! "www/res/water-mark/ios/ipad-pro-watermark.png"
$convert -resize 652x129\! "www/res/water-mark/ios/ipad-watermark.png"
$convert -resize 326x64\! "www/res/water-mark/ios/ipad-mini-watermark.png"
$convert -resize 702x139\! "www/res/water-mark/ios/iphone-6plus-watermark.png"
$convert -resize 424x84\! "www/res/water-mark/ios/iphone-6-watermark.png"
$convert -resize 360x71\! "www/res/water-mark/ios/iphone-4-5-watermark.png"

#Android
$convert -resize 404x80\! "www/res/water-mark/android/xhdpi-watermark.png"
$convert -resize 270x53\! "www/res/water-mark/android/hdpi-watermark.png"
$convert -resize 180x36\! "www/res/water-mark/android/mdpi-watermark.png"
$convert -resize 112x22\! "www/res/water-mark/android/idpi-watermark.png"
