package com.dexterlowe.graal.Model;

import java.util.List;
import java.util.Map;

public class Node {
    private final long id;
    private final List<String> labels;
    private final Map<String, Object> props;

    public Node(long id, List<String> labels, Map<String, Object> props) {
        this.id = id;
        this.labels = labels;
        this.props = props;
    }
}
