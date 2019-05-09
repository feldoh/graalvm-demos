/*
 * Copyright (c) 2014, Oracle and/or its affiliates. All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * The Universal Permissive License (UPL), Version 1.0
 *
 * Subject to the condition set forth below, permission is hereby granted to any
 * person obtaining a copy of this software, associated documentation and/or
 * data (collectively the "Software"), free of charge and under any and all
 * copyright rights in the Software, and any and all patent rights owned or
 * freely licensable by each licensor hereunder covering either (i) the
 * unmodified Software as contributed to or provided by such licensor, or (ii)
 * the Larger Works (as defined below), to deal in both
 *
 * (a) the Software, and
 *
 * (b) any piece of software and/or hardware listed in the lrgrwrks.txt file if
 * one is included with the Software each a "Larger Work" to which the Software
 * is contributed by such licensors),
 *
 * without restriction, including without limitation the rights to copy, create
 * derivative works of, display, perform, and distribute the Software and make,
 * use, sell, offer for sale, import, export, have made, and have sold the
 * Software and the Larger Work(s), and to sublicense the foregoing rights on
 * either these or other terms.
 *
 * This license is subject to the following condition:
 *
 * The above copyright notice and either this complete permission notice or at a
 * minimum a reference to the UPL must be included in all copies or substantial
 * portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const express = require('express')
const app = express()

const Label = Java.type('org.neo4j.graphdb.Label');
const FileType = Java.type('java.io.File');
const RelationshipType = Java.type('org.neo4j.graphdb.RelationshipType');
const BatchInserter = Java.type('org.neo4j.unsafe.batchinsert.BatchInserter');
const BatchInserters = Java.type('org.neo4j.unsafe.batchinsert.BatchInserters');
const FastInserter = Java.type('com.dexterlowe.graal.FastInserter');
const HashMap = Java.type('java.util.HashMap');
const path = "/Users/dexterlowe/neo"

app.get('/', function (req, res) {
  var text = 'Hello World from Graal.js!<br> '
  res.send(text)
})

console.log('Importing')
// Graph
var file = new FileType(path + "/databases/graph.db")
var inserter = BatchInserters.inserter(file);

// Labels
var langLabel = Label.label("Language")
var appLabel = Label.label("App")

// Rels
var createdWith = RelationshipType.withName("CREATED_WITH")

//Enabling Index for a Label and Property
// inserter.createDeferredSchemaIndex(app).on( "name" ).create();

var neoLoaderProps = new HashMap();
neoLoaderProps.put("name", "NeoLoader");
neoLoaderProps.put("date", '2019-05-09');

var drinkieProps = new HashMap();
drinkieProps.put("name", "DrinkieMcDrinkface");
drinkieProps.put("date", '2017-07-01');

var javaProps = new HashMap();
javaProps.put("name", "Java");

var jsProps = new HashMap();
jsProps.put("name", "JavaScript");

//Creating Properties
var neoLoader = inserter.createNode( neoLoaderProps, appLabel );
var drinkie = inserter.createNode( drinkieProps, appLabel );

var java = inserter.createNode( javaProps, langLabel );
var js = inserter.createNode( jsProps, langLabel );

// To set properties on the relationship, use a properties map
// instead of null as the last parameter.
inserter.createRelationship(neoLoader, java, createdWith, null );
inserter.createRelationship(neoLoader, js, createdWith, null );
inserter.createRelationship(drinkie, java, createdWith, null );

inserter.shutdown()
console.log('Written')
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
