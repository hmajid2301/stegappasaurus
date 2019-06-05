#!/usr/bin/env bash
yarn run --ignore-engines op3-codegen openapi/specification.yml -o web/models
rm -r web/models/angular
mv web/models/schemas.ts web/models/index.ts
perl -pi -e 's/(?<=\binterface\s)(\b)/$&I/g' web/models/index.ts 