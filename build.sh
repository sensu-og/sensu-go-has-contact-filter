#!/usr/bin/env bash

ARCHIVE=has_contact.tar.gz

rm -rf build
mkdir -p build
tar -c --exclude $ARCHIVE . > "build/$ARCHIVE"
echo "sha512sum: $(shasum -a 512 build/$ARCHIVE)"