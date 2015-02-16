#!/bin/bash

if [ "$1" != "" ]; then
    browserify "$1" -t reactify -d | jsdom-eval
else
    browserify test/*.test.js -t reactify -d | jsdom-eval
fi
