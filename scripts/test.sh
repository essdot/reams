#!/bin/bash

browserify "$1" -t reactify -d | jsdom-eval