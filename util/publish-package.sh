#!/usr/bin/env bash

echo $CI_COMMIT_TAG

if [[ $CI_COMMIT_TAG =~ release\/.* ]]; then
    echo "Release Tag: Promoting Package: Production" 
    cd android && ./gradlew promoteArtifact \
    --from-track beta --promote-track production \
    --release-status completed
elif [[ $CI_COMMIT_TAG =~ test\/.* ]]; then
    echo "Test Tag: Promoting Package: Beta" 
    cd android && ./gradlew promoteArtifact \
    --from-track internal --promote-track beta \
    --release-status completed
elif [[ $CI_COMMIT_TAG =~ dev\/.* ]]; then
    echo "Dev Tag: Publishing Package: Alpha" 
    cd android && ./gradlew publish
else
    echo "No Tags: Publishing Package: Internal"
    cd android && ./gradlew publish --track internal
fi
