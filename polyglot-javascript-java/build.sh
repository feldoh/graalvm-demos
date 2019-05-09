#!/usr/bin/env bash
set -ex

npm install
mvn -f bulkyneo/pom.xml clean package
