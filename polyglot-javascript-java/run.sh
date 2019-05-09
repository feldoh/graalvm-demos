#!/usr/bin/env bash

set -ex

$GRAALVM_HOME/bin/node --jvm --vm.cp=/Users/dexterlowe/code/bulkyneo/target/bulkyneo-1.0.0-SNAPSHOT-jar-with-dependencies.jar server.js
