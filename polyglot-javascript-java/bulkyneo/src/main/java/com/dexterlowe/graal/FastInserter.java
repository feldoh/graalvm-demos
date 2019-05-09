package com.dexterlowe.graal;

import org.neo4j.graphdb.Label;
import org.neo4j.graphdb.RelationshipType;
import org.neo4j.unsafe.batchinsert.BatchInserter;
import org.neo4j.unsafe.batchinsert.BatchInserters;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class FastInserter {
    private BatchInserter inserter;
    public FastInserter(String neoPath) throws IOException {
        inserter = BatchInserters.inserter(new File(neoPath + "/graph.db"));
    }

    public static BatchInserter create(String neoPath) {
        try {
            return new FastInserter(neoPath).getInserter();
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    public void batchInsert(Map<Long, Map<String, Object>> nodes, Map<Long, Long> rels) throws Exception {
        //Getting Object of BatchInserter.
        //Should be called only once for Batch of statements
        // "/graph.db" should be replaced with the path of your Neo4j Database.
        //Neo4j Database should be located at following path <$NEO4J_HOME>/data/graph.db
        BatchInserter inserter = BatchInserters.inserter(new File("/graph.db"));

        try{
            //Create a Label for a com.dexterlowe.graal.Model.Node
            Label personLabel = Label.label( "Cinestars" );

            //Enabling Index for a Label and Property
            inserter.createDeferredSchemaIndex(personLabel).on( "name" ).create();
            //Creating Properties and the com.dexterlowe.graal.Model.Node
            //"<>" or generics are available with Java>=1.5
            // But it is recommended to use Java>=1.7 with Neo4j API's
            Map<String, Object> properties = new HashMap<>();
            properties.put( "Name", "Cate Blanchett" );
            long cateNode = inserter.createNode( properties, personLabel );

            //Creating Properties and the com.dexterlowe.graal.Model.Node
            properties.put( "Name", "Russell Crowe " );
            long russellNode = inserter.createNode( properties, personLabel );

            //Creating Relationship
            RelationshipType knows = RelationshipType.withName( "KNOWS" );

            // To set properties on the relationship, use a properties map
            // instead of null as the last parameter.
            inserter.createRelationship(cateNode, russellNode, knows, null );
        } catch (Exception e) {
            //Print Exception on Console and shutdown the Inserter
            e.printStackTrace();
            //Shutdown the Inserter, so that your database is not corrupted.
            inserter.shutdown();
        }
        //Should be called only once for Batch of statements
        inserter.shutdown();
    }

    public BatchInserter getInserter() {
        return inserter;
    }

    public static void main(String[] args) {
        try {
            new FastInserter("/Users/dexterlowe/neo");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}