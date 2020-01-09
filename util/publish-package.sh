#!/usr/bin/env bash

echo $CI_COMMIT_TAG

if [[ $CI_COMMIT_TAG =~ release\/.* ]]; then
    echo "Release Tag: Promoting Package" 
    cd android && ./gradlew promoteArtifact \
    --from-track beta --promote-track production \
    --release-status completed
elif [[ $CI_COMMIT_TAG =~ test\/.* ]]; then
    echo "Test Tag: Promoting Package" 
    cd android && ./gradlew promoteArtifact \
    --from-track internal --promote-track beta \
    --release-status completed
else
    echo "Dev Tag: Publishing Package" 
    cd android && ./gradlew publishRelease
fi
