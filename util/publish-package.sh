#!/usr/bin/env bash

echo $CI_COMMIT_TAG

if [[ $CI_COMMIT_TAG == *"alpha"* ]]; then
    echo "Publishing Package: Alpha" 
    cd android && ./gradlew publish --track alpha
elif [[ $CI_COMMIT_TAG == *"beta"* ]]; then
    echo "Publishing Package: Beta" 
    cd android && ./gradlew publish --track beta
elif [[ $CI_COMMIT_TAG == *"release"* ]]; then
    echo "Publishing Package: Production" 
    cd android && ./gradlew publish --track production
else
    echo "Publishing Package: Internal"
    cd android && ./gradlew publish --track internal
fi
