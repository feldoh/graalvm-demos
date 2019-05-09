package com.dexterlowe.graal.Model;

import java.util.Map;

public class Rel {
    private final long id;
    private final String type;
    private final Map<String, Object> props;

    public Rel(long id, String type, Map<String, Object> props) {
        this.id = id;
        this.type = type;
        this.props = props;
    }
}
