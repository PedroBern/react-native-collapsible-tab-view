#!/bin/bash

if [ -z "$1" ]; then
  echo "Error: deviceId is not defined."
  exit 1
fi

deviceId="$1"
appId="com.rnctvexample"

echo "Testing $appId"

flashlight test --bundleId $appId \
  --testCommand "maestro --device $deviceId test -e APP_ID=$appId e2e.yaml" \
  --iterationCount 10 \
  --resultsTitle $appId \
  --resultsFilePath $appId.json

adb -s $deviceId shell am force-stop $appId
adb -s $deviceId shell pm clear $appId
sleep 0.2

version_report_files=$(printf " %s.json" "${versions[@]}")
flashlight report$version_report_files
