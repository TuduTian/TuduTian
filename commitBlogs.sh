#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
# set -e

git init
git add .
git commit -m 'blogs'

# 如果发布到 https://<USERNAME>.github.io/<REPO>

git push -f https://github.com/TuduTian/blogs.git master:main

sleep 2000
# cd -

