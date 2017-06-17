#/bin/bash

VERSION="$(node -p "require('./package.json').version")"
CURRENT_VERSION="$(npm info . version)"
COMMENT=

git add . || exit 1
git status

echo "Comment (${VERSION}): "
read COMMENT

git commit -m "${COMMENT}" || exit 1
git tag "v${VERSION}" || exit 1
git push origin master --tags || exit 1

if [ "{$VERSION}" != "${CURRENT_VERSION}" ]; then
  echo "${CURRENT_VERSION} -> ${VERSION}"
  npm publish --access=public
else
  echo "Versions are the same, not publishing"
fi