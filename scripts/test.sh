#!/bin/bash

if [ "$1" != "" ]; then
    browserify "$1" -d | jsdom-eval
else
    browserify test/*.test.js -d | jsdom-eval
fi
