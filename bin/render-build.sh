#!/usr/bin/env bash
# exit on error
set -o errexit

bundle install
# clean
rm -rf public
# build
npm install --force
npm run build

# migrate
bundle exec rake assets:precompile
bundle exec rake assets:clean
bundle exec rake db:migrate
