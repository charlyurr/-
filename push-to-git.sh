#!/bin/bash

source $HOME/.bashrc
nvm use 18

# Push to git
# git add .
# git commit -m "update code"
# git push

# git remote add <name> <url>
# gh repo clone charlyurr/webgis-cct-parks
git remote add origin charlyurr/webgis-cct-parks.git
git remote add webgis-cct-parks charlyurr/webgis-cct-parks.git

git remote add main.js charlyurr/webgis-cct-parks.git

# and then push using the remote name
# git push <name>
git push main.js


git remote add origin <remote_repository_URL>
git remote add origin https://github.com/charlyurr/

