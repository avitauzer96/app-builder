#!/bin/bash

usage() { echo "usage: $0 icon colour [dest_dir]"; exit 1; }

[ "$1" ]

eval mkdir -p "www/res/screen/android"
eval mkdir -p "www/res/screen/ios"

# Show the user some progress by outputing all commands being run.
set -x

convert="convert $1 -background $2 -gravity center"

$convert -resize 1024x1024 -extent 1366x2048 "www/res/splash.png"

# Android
$convert -resize 112x112 -extent 200x320 "www/res/screen/android/splash-port-ldpi.png"
composite -gravity south "www/res/water-mark/android/idpi-watermark.png" "www/res/screen/android/splash-port-ldpi.png" "www/res/screen/android/splash-port-ldpi.png"
$convert -resize 112x112 -extent 320x200 "www/res/screen/android/splash-land-ldpi.png"
composite -gravity south "www/res/water-mark/android/idpi-watermark.png" "www/res/screen/android/splash-land-ldpi.png" "www/res/screen/android/splash-land-ldpi.png"
$convert -resize 180x180 -extent 320x480 "www/res/screen/android/splash-port-mdpi.png"
composite -gravity south "www/res/water-mark/android/mdpi-watermark.png" "www/res/screen/android/splash-port-mdpi.png" "www/res/screen/android/splash-port-mdpi.png"
$convert -resize 180x180 -extent 480x320 "www/res/screen/android/splash-land-mdpi.png"
composite -gravity south "www/res/water-mark/android/mdpi-watermark.png" "www/res/screen/android/splash-land-mdpi.png" "www/res/screen/android/splash-land-mdpi.png"
$convert -resize 270x270 -extent 480x800 "www/res/screen/android/splash-port-hdpi.png"
composite -gravity south "www/res/water-mark/android/hdpi-watermark.png" "www/res/screen/android/splash-port-hdpi.png" "www/res/screen/android/splash-port-hdpi.png"
$convert -resize 270x270 -extent 800x480 "www/res/screen/android/splash-land-hdpi.png"
composite -gravity south "www/res/water-mark/android/hdpi-watermark.png" "www/res/screen/android/splash-land-hdpi.png" "www/res/screen/android/splash-land-hdpi.png"
$convert -resize 404x404 -extent 720x1280 "www/res/screen/android/splash-port-xhdpi.png"
composite -gravity south "www/res/water-mark/android/xhdpi-watermark.png" "www/res/screen/android/splash-port-xhdpi.png" "www/res/screen/android/splash-port-xhdpi.png"
$convert -resize 404x404 -extent 1280x720 "www/res/screen/android/splash-land-xhdpi.png"
composite -gravity south "www/res/water-mark/android/xhdpi-watermark.png" "www/res/screen/android/splash-land-xhdpi.png" "www/res/screen/android/splash-land-xhdpi.png"

# iOS
$convert -resize 870x870 -extent 2048x2732 "www/res/screen/ios/Default-Portrait@3x~ipad.png"
composite -gravity south "www/res/water-mark/ios/ipad-pro-watermark.png" "www/res/screen/ios/Default-Portrait@3x~ipad.png" "www/res/screen/ios/Default-Portrait@3x~ipad.png"
$convert -resize 870x870 -extent 2732x2048 "www/res/screen/ios/Default-Landscape@3x~ipad.png"
composite -gravity south "www/res/water-mark/ios/ipad-pro-watermark.png" "www/res/screen/ios/Default-Landscape@3x~ipad.png" "www/res/screen/ios/Default-Landscape@3x~ipad.png"
$convert -resize 652x652 -extent 1536x2048 "www/res/screen/ios/Default-Portrait@2x~ipad.png"
composite -gravity south "www/res/water-mark/ios/ipad-watermark.png" "www/res/screen/ios/Default-Portrait@2x~ipad.png" "www/res/screen/ios/Default-Portrait@2x~ipad.png"
$convert -resize 652x652 -extent 2048x1536 "www/res/screen/ios/Default-Landscape@2x~ipad.png"
composite -gravity south "www/res/water-mark/ios/ipad-watermark.png" "www/res/screen/ios/Default-Landscape@2x~ipad.png" "www/res/screen/ios/Default-Landscape@2x~ipad.png"
$convert -resize 326x326 -extent 768x1024 "www/res/screen/ios/Default-Portrait@1x~ipad.png"
composite -gravity south "www/res/water-mark/ios/ipad-mini-watermark.png" "www/res/screen/ios/Default-Portrait@1x~ipad.png" "www/res/screen/ios/Default-Portrait@1x~ipad.png"
$convert -resize 326x326 -extent 1024x768 "www/res/screen/ios/Default-Landscape@1x~ipad.png"
composite -gravity south "www/res/water-mark/ios/ipad-mini-watermark.png" "www/res/screen/ios/Default-Landscape@1x~ipad.png" "www/res/screen/ios/Default-Landscape@1x~ipad.png"
$convert -resize 360x360 -extent 640x1136 "www/res/screen/ios/Default-568h@2x~iphone.png"
composite -gravity south "www/res/water-mark/ios/iphone-4-5-watermark.png" "www/res/screen/ios/Default-568h@2x~iphone.png" "www/res/screen/ios/Default-568h@2x~iphone.png"
$convert -resize 424x424 -extent 750x1334 "www/res/screen/ios/Default-Portrait-375w-667h@2x~iphone.png"
composite -gravity south "www/res/water-mark/ios/iphone-6-watermark.png" "www/res/screen/ios/Default-Portrait-375w-667h@2x~iphone.png" "www/res/screen/ios/Default-Portrait-375w-667h@2x~iphone.png"
$convert -resize 424x424 -extent 1334x750 "www/res/screen/ios/Default-Landscape-375w-667h@2x~iphone.png"
composite -gravity south "www/res/water-mark/ios/iphone-6-watermark.png" "www/res/screen/ios/Default-Landscape-375w-667h@2x~iphone.png" "www/res/screen/ios/Default-Landscape-375w-667h@2x~iphone.png"
$convert -resize 702x702 -extent 1242x2208 "www/res/screen/ios/Default-414w-736h@3x~iphone.png"
composite -gravity south "www/res/water-mark/ios/iphone-6plus-watermark.png" "www/res/screen/ios/Default-414w-736h@3x~iphone.png" "www/res/screen/ios/Default-414w-736h@3x~iphone.png"
$convert -resize 702x702 -extent 2208x1242 "www/res/screen/ios/Default-Landscape@3x.png"
composite -gravity south "www/res/water-mark/ios/iphone-6plus-watermark.png" "www/res/screen/ios/Default-Landscape@3x.png" "www/res/screen/ios/Default-Landscape@3x.png"