#!/bin/sh

FIREBASE_API_KEY=$1

cat  << EOF
export default {
  FIREBASE_API_KEY: "${FIREBASE_API_KEY}"
}
EOF