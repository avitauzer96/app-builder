#!/bin/bash

usage() { echo "usage: $0 icon colour [dest_dir]"; exit 1; }

[ "$1" ]

eval mkdir -p "www/res/screen/android"
eval mkdir -p "www/res/screen/ios"

# Show the user some progress by outputing all commands being run.
set -x

#Android
convert -size 200x320 xc:white "www/res/screen/android/splash-port-ldpi.png"
composite -gravity center $2 "www/res/screen/android/splash-port-ldpi.png" "www/res/screen/android/splash-port-ldpi.png"
composite -gravity south "www/res/water-mark/android/idpi-watermark.png" "www/res/screen/android/splash-port-ldpi.png" "www/res/screen/android/splash-port-ldpi.png"
convert $1 -gravity center -resize 112x112 "resources/112x112.png"
composite -gravity center "resources/112x112.png" "www/res/screen/android/splash-port-ldpi.png" "www/res/screen/android/splash-port-ldpi.png"

convert -size 320x200 xc:white "www/res/screen/android/splash-land-ldpi.png"
composite -gravity center $2 "www/res/screen/android/splash-land-ldpi.png" "www/res/screen/android/splash-land-ldpi.png"
composite -gravity south "www/res/water-mark/android/idpi-watermark.png" "www/res/screen/android/splash-land-ldpi.png" "www/res/screen/android/splash-land-ldpi.png"
composite -gravity center "resources/112x112.png" "www/res/screen/android/splash-land-ldpi.png" "www/res/screen/android/splash-land-ldpi.png"

convert -size 320x480 xc:white "www/res/screen/android/splash-port-mdpi.png"
composite -gravity center $2 "www/res/screen/android/splash-port-mdpi.png" "www/res/screen/android/splash-port-mdpi.png"
composite -gravity south "www/res/water-mark/android/mdpi-watermark.png" "www/res/screen/android/splash-port-mdpi.png" "www/res/screen/android/splash-port-mdpi.png"
convert $1 -gravity center -resize 180x180 "resources/180x180.png"
composite -gravity center "resources/180x180.png" "www/res/screen/android/splash-port-mdpi.png" "www/res/screen/android/splash-port-mdpi.png"

convert -size 480x320 xc:white "www/res/screen/android/splash-land-mdpi.png"
composite -gravity center $2 "www/res/screen/android/splash-land-mdpi.png" "www/res/screen/android/splash-land-mdpi.png"
composite -gravity south "www/res/water-mark/android/mdpi-watermark.png" "www/res/screen/android/splash-land-mdpi.png" "www/res/screen/android/splash-land-mdpi.png"
composite -gravity center "resources/180x180.png" "www/res/screen/android/splash-land-mdpi.png" "www/res/screen/android/splash-land-mdpi.png"

convert -size 480x800 xc:white "www/res/screen/android/splash-port-hdpi.png"
composite -gravity center $2 "www/res/screen/android/splash-port-hdpi.png" "www/res/screen/android/splash-port-hdpi.png"
composite -gravity south "www/res/water-mark/android/hdpi-watermark.png" "www/res/screen/android/splash-port-hdpi.png" "www/res/screen/android/splash-port-hdpi.png"
convert $1 -gravity center -resize 270x270 "resources/270x270.png"
composite -gravity center "resources/270x270.png" "www/res/screen/android/splash-port-hdpi.png" "www/res/screen/android/splash-port-hdpi.png"

convert -size 800x480 xc:white "www/res/screen/android/splash-land-hdpi.png"
composite -gravity center $2 "www/res/screen/android/splash-land-hdpi.png" "www/res/screen/android/splash-land-hdpi.png"
composite -gravity south "www/res/water-mark/android/hdpi-watermark.png" "www/res/screen/android/splash-land-hdpi.png" "www/res/screen/android/splash-land-hdpi.png"
composite -gravity center "resources/270x270.png" "www/res/screen/android/splash-land-hdpi.png" "www/res/screen/android/splash-land-hdpi.png"

convert -size 720x1280 xc:white "www/res/screen/android/splash-port-xhdpi.png"
composite -gravity center $2 "www/res/screen/android/splash-port-xhdpi.png" "www/res/screen/android/splash-port-xhdpi.png"
composite -gravity south "www/res/water-mark/android/xhdpi-watermark.png" "www/res/screen/android/splash-port-xhdpi.png" "www/res/screen/android/splash-port-xhdpi.png"
convert $1 -gravity center -resize 404x404 "resources/404x404.png"
composite -gravity center "resources/404x404.png" "www/res/screen/android/splash-port-xhdpi.png" "www/res/screen/android/splash-port-xhdpi.png"

convert -size 1280x720 xc:white "www/res/screen/android/splash-land-xhdpi.png"
composite -gravity center $2 "www/res/screen/android/splash-land-xhdpi.png" "www/res/screen/android/splash-land-xhdpi.png"
composite -gravity south "www/res/water-mark/android/xhdpi-watermark.png" "www/res/screen/android/splash-land-xhdpi.png" "www/res/screen/android/splash-land-xhdpi.png"
composite -gravity center "resources/404x404.png" "www/res/screen/android/splash-land-xhdpi.png" "www/res/screen/android/splash-land-xhdpi.png"


#IOS
convert -size 2048x2732 xc:white "www/res/screen/ios/Default-Portrait@3x~ipad.png"
composite -gravity center $2 "www/res/screen/ios/Default-Portrait@3x~ipad.png" "www/res/screen/ios/Default-Portrait@3x~ipad.png"
composite -gravity south "www/res/water-mark/ios/ipad-pro-watermark.png" "www/res/screen/ios/Default-Portrait@3x~ipad.png" "www/res/screen/ios/Default-Portrait@3x~ipad.png"
convert $1 -gravity center -resize 870x870 "resources/870x870.png"
composite -gravity center "resources/870x870.png" "www/res/screen/ios/Default-Portrait@3x~ipad.png" "www/res/screen/ios/Default-Portrait@3x~ipad.png"

convert -size 2732x2048 xc:white "www/res/screen/ios/Default-Landscape@3x~ipad.png"
composite -gravity center $2 "www/res/screen/ios/Default-Landscape@3x~ipad.png" "www/res/screen/ios/Default-Landscape@3x~ipad.png"
composite -gravity south "www/res/water-mark/ios/ipad-pro-watermark.png" "www/res/screen/ios/Default-Landscape@3x~ipad.png" "www/res/screen/ios/Default-Landscape@3x~ipad.png"
composite -gravity center "resources/870x870.png" "www/res/screen/ios/Default-Landscape@3x~ipad.png" "www/res/screen/ios/Default-Landscape@3x~ipad.png"

convert -size 1536x2048 xc:white "www/res/screen/ios/Default-Portrait@2x~ipad.png"
composite -gravity center $2 "www/res/screen/ios/Default-Portrait@2x~ipad.png" "www/res/screen/ios/Default-Portrait@2x~ipad.png"
composite -gravity south "www/res/water-mark/ios/ipad-watermark.png" "www/res/screen/ios/Default-Portrait@2x~ipad.png" "www/res/screen/ios/Default-Portrait@2x~ipad.png"
convert $1 -gravity center -resize 652x652 "resources/652x652.png"
composite -gravity center "resources/652x652.png" "www/res/screen/ios/Default-Portrait@2x~ipad.png" "www/res/screen/ios/Default-Portrait@2x~ipad.png"

convert -size 2048x1536 xc:white "www/res/screen/ios/Default-Landscape@2x~ipad.png"
composite -gravity center $2 "www/res/screen/ios/Default-Landscape@2x~ipad.png" "www/res/screen/ios/Default-Landscape@2x~ipad.png"
composite -gravity south "www/res/water-mark/ios/ipad-watermark.png" "www/res/screen/ios/Default-Landscape@2x~ipad.png" "www/res/screen/ios/Default-Landscape@2x~ipad.png"
composite -gravity center "resources/652x652.png" "www/res/screen/ios/Default-Landscape@2x~ipad.png" "www/res/screen/ios/Default-Landscape@2x~ipad.png"

convert -size 768x1024 xc:white "www/res/screen/ios/Default-Portrait@1x~ipad.png"
composite -gravity center $2 "www/res/screen/ios/Default-Portrait@1x~ipad.png" "www/res/screen/ios/Default-Portrait@1x~ipad.png"
composite -gravity south "www/res/water-mark/ios/ipad-mini-watermark.png" "www/res/screen/ios/Default-Portrait@1x~ipad.png" "www/res/screen/ios/Default-Portrait@1x~ipad.png"
convert $1 -gravity center -resize 326x326 "resources/326x326.png"
composite -gravity center "resources/326x326.png" "www/res/screen/ios/Default-Portrait@1x~ipad.png" "www/res/screen/ios/Default-Portrait@1x~ipad.png"

convert -size 1024x768 xc:white "www/res/screen/ios/Default-Landscape@1x~ipad.png"
composite -gravity center $2 "www/res/screen/ios/Default-Landscape@1x~ipad.png" "www/res/screen/ios/Default-Landscape@1x~ipad.png"
composite -gravity south "www/res/water-mark/ios/ipad-mini-watermark.png" "www/res/screen/ios/Default-Landscape@1x~ipad.png" "www/res/screen/ios/Default-Landscape@1x~ipad.png"
composite -gravity center "resources/326x326.png" "www/res/screen/ios/Default-Landscape@1x~ipad.png" "www/res/screen/ios/Default-Landscape@1x~ipad.png"

convert -size 640x1136 xc:white "www/res/screen/ios/Default-568h@2x~iphone.png"
composite -gravity center $2 "www/res/screen/ios/Default-568h@2x~iphone.png" "www/res/screen/ios/Default-568h@2x~iphone.png"
composite -gravity south "www/res/water-mark/ios/iphone-4-5-watermark.png" "www/res/screen/ios/Default-568h@2x~iphone.png" "www/res/screen/ios/Default-568h@2x~iphone.png"
convert $1 -gravity center -resize 360x360 "resources/360x360.png"
composite -gravity center "resources/360x360.png" "www/res/screen/ios/Default-568h@2x~iphone.png" "www/res/screen/ios/Default-568h@2x~iphone.png"

convert -size 750x1334 xc:white "www/res/screen/ios/Default-Portrait-375w-667h@2x~iphone.png"
composite -gravity center $2 "www/res/screen/ios/Default-Portrait-375w-667h@2x~iphone.png" "www/res/screen/ios/Default-Portrait-375w-667h@2x~iphone.png"
composite -gravity south "www/res/water-mark/ios/iphone-6-watermark.png" "www/res/screen/ios/Default-Portrait-375w-667h@2x~iphone.png" "www/res/screen/ios/Default-Portrait-375w-667h@2x~iphone.png"
convert $1 -gravity center -resize 424x424 "resources/424x424.png"
composite -gravity center "resources/424x424.png" "www/res/screen/ios/Default-Portrait-375w-667h@2x~iphone.png" "www/res/screen/ios/Default-Portrait-375w-667h@2x~iphone.png"

convert -size 1334x750 xc:white "www/res/screen/ios/Default-Landscape-375w-667h@2x~iphone.png"
composite -gravity center $2 "www/res/screen/ios/Default-Landscape-375w-667h@2x~iphone.png" "www/res/screen/ios/Default-Landscape-375w-667h@2x~iphone.png"
composite -gravity south "www/res/water-mark/ios/iphone-6-watermark.png" "www/res/screen/ios/Default-Landscape-375w-667h@2x~iphone.png" "www/res/screen/ios/Default-Landscape-375w-667h@2x~iphone.png"
composite -gravity center "resources/424x424.png" "www/res/screen/ios/Default-Landscape-375w-667h@2x~iphone.png" "www/res/screen/ios/Default-Landscape-375w-667h@2x~iphone.png"

convert -size 1242x2208 xc:white "www/res/screen/ios/Default-414w-736h@3x~iphone.png"
composite -gravity center $2 "www/res/screen/ios/Default-414w-736h@3x~iphone.png" "www/res/screen/ios/Default-414w-736h@3x~iphone.png"
composite -gravity south "www/res/water-mark/ios/iphone-6plus-watermark.png" "www/res/screen/ios/Default-414w-736h@3x~iphone.png" "www/res/screen/ios/Default-414w-736h@3x~iphone.png"
convert $1 -gravity center -resize 702x702 "resources/702x702.png"
composite -gravity center "resources/702x702.png" "www/res/screen/ios/Default-414w-736h@3x~iphone.png" "www/res/screen/ios/Default-414w-736h@3x~iphone.png"

convert -size 2208x1242 xc:white "www/res/screen/ios/Default-Landscape@3x.png"
composite -gravity center $2 "www/res/screen/ios/Default-Landscape@3x.png" "www/res/screen/ios/Default-Landscape@3x.png"
composite -gravity south "www/res/water-mark/ios/iphone-6plus-watermark.png" "www/res/screen/ios/Default-Landscape@3x.png" "www/res/screen/ios/Default-Landscape@3x.png"
composite -gravity center "resources/702x702.png" "www/res/screen/ios/Default-Landscape@3x.png" "www/res/screen/ios/Default-Landscape@3x.png"

