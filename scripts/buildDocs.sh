#!/bin/bash

rm -rf docs
yarn build:storybook
mv storybook-build docs
touch docs/.nojekyll
trigen-scripts build:docs --out ./docs/docs
