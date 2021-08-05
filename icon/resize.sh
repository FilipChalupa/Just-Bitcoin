#!/bin/bash

directory="$(dirname "$BASH_SOURCE")/"
icon="favicon.svg"
iconMaskable="maskable.svg"
sizes=(36 48 72 96 128 144 192 256 384 512 1024 2048)

echo "Create favicon.ico"
rsvg-convert -w 32 -h 32 "$directory$icon" -o "$directory""../favicon.ico"

for i in "${sizes[@]}"; do
	echo Resizing $i

	name=$i"x"$i".png"
	rsvg-convert -w $i -h $i "$directory$icon" -o "$directory$name"

	name=$i"x"$i"-maskable.png"
	rsvg-convert -w $i -h $i "$directory$iconMaskable" -o "$directory$name"
done

echo "Resize USD"
in="shortcut-usd.svg"
out="shortcut-usd.png"
rsvg-convert -w 96 -h 96 "$directory$in" -o "$directory$out"

echo "Resize EUR"
in="shortcut-eur.svg"
out="shortcut-eur.png"
rsvg-convert -w 96 -h 96 "$directory$in" -o "$directory$out"

echo "Resize GBP"
in="shortcut-gbp.svg"
out="shortcut-gbp.png"
rsvg-convert -w 96 -h 96 "$directory$in" -o "$directory$out"

echo Done
