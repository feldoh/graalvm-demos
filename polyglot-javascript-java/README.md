# GraalVM demos: Mixed JavaScript Java application

This repository contains the code for a demo application for [GraalVM](graalvm.org).

It uses Javascript to interact with a pure Java low-level bulk insert Neo4J API.

This should allow building relatively large graphs non-transactionally in JS.
This allows for far greater insert speed albeit after some startup overhead.
The resultant Graph folder can be targeted by a Neo4J instance by setting `dbms.directories.data=$outputDir` in its config.

## Prerequisites
* [GraalVM](http://graalvm.org)
* [Maven](http://maven.apache.org)
* [Neo4J](https://neo4j.com)

## Preparation

Download or clone the repository and navigate into the `polyglot-javascript-java` directory:

```
git clone https://github.com/shelajev/graalvm-demos
cd graalvm-demos/polyglot-javascript-java
```

Build the benchmark. You can manually execute `npm install` and `mvn package`, but there's also a `build.sh` script included for your convenience.

Execute:
```
./build.sh
```

Now you're all set to run the polyglot JavaScript, Java, application.

Export the GraalVM home directory as the `$GRAALVM_HOME` and add `$GRAALVM_HOME/bin` to the path. Here's what I have in my `~/.bashrc` on my MacBook, note that your paths are likely to be different depending on the download location.

```
GRAALVM_VERSION=1.0.0-rc11
export GRAALVM_HOME=/Users/${current_user}/repo/graal-releases/graalvm-$GRAALVM_VERSION/Contents/Home
```

## Running the application

To run the application, you need to execute the `server.js` file. You can run it with the following command (or run the `run.sh` script):

```
$GRAALVM_HOME/bin/node --jvm --vm.cp=./bulkyneo/target/bulkyneo-1.0.0-SNAPSHOT-jar-with-dependencies.jar server.js
```

If you'd like to run the benchmark on a different instance of Node, you can run it with whatever `node` you have. However, usually the polyglot capability won't be supported and the app won't run successfully.

Open [localhost:3000](localhost:3000) and enjoy the output of the polyglot app. Play with the source code and restart the application to see what else can you do with the mix of JavaScript and Java.

If you change the Java don't forget to run `mvn clean package` or re-run the build script.

## Debugging polyglot applications

GraalVM supports debugging polyglot applications too, add the `--inspect` parameter to the command line, open the url the application prints at the startup in Chrome browser and you can debug, set breakpoints, evaluate expressions in this app in the JavaScript code.

## A note about the application

This app does not include any non-library java code. But simply adding some classes would be enough to use these from JavaScript.
