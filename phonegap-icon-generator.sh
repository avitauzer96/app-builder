#!/bin/bash
# Generate PhoneGap icon and splash screens.
# Copyright 2013 Tom Vincent <http://tlvince.com/contact>

usage() { echo "usage: $0 icon colour [dest_dir]"; exit 1; }

[ "$1" ]

eval mkdir -p "www/res/icon/android"
eval mkdir -p "www/res/icon/ios"
# Show the user some progress by outputing all commands being run.
set -x

# Explicitly set background in case image is transparent (see: #3)

convert="convert -background none"
$convert "$1" -resize 128x128 "www/res/icon.png"
$convert "$1" -resize 36x36 "www/res/icon/android/icon-36-ldpi.png"
$convert "$1" -resize 72x72 "www/res/icon/android/icon-72-hdpi.png"
$convert "$1" -resize 48x48 "www/res/icon/android/icon-48-mdpi.png"
$convert "$1" -resize 96x96 "www/res/icon/android/icon-96-xhdpi.png"
$convert "$1" -resize 29x29 "www/res/icon/ios/icon-29.png"
$convert "$1" -resize 40x40 "www/res/icon/ios/icon-40.png"
$convert "$1" -resize 50x50 "www/res/icon/ios/icon-50.png"
$convert "$1" -resize 57x57 "www/res/icon/ios/icon-57.png"
$convert "$1" -resize 58x58 "www/res/icon/ios/icon-58.png"
$convert "$1" -resize 72x72 "www/res/icon/ios/icon-72.png"
$convert "$1" -resize 76x76 "www/res/icon/ios/icon-76.png"
$convert "$1" -resize 80x80 "www/res/icon/ios/icon-80.png"
$convert "$1" -resize 100x100 "www/res/icon/ios/icon-100.png"
$convert "$1" -resize 144x144 "www/res/icon/ios/icon-144.png"
$convert "$1" -resize 114x114 "www/res/icon/ios/icon-114.png"
$convert "$1" -resize 120x120 "www/res/icon/ios/icon-120.png"
$convert "$1" -resize 152x152 "www/res/icon/ios/icon-152.png"
