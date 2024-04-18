#!/bin/bash

source $HOME/.bashrc
nvm use 18

# Push to git
git add .
git commit -m "update code"
git push

