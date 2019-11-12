package history;

import java.io.Serializable;
import java.util.Deque;
import java.util.LinkedList;

public class HistoryBean implements Serializable {

    private final Deque<HistoryQuery> queries;

    public HistoryBean() {
        queries = new LinkedList<>();
    }

    public HistoryBean(Deque<HistoryQuery> queries) {
        this.queries = queries;
    }

    public Deque<HistoryQuery> getQueries() {
        return queries;
    }
}
