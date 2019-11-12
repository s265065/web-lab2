package history;

import java.io.Serializable;
import java.time.LocalDateTime;

public class HistoryQuery implements Serializable {

    private final double x;
    private final double y;
    private final int r;
    private final boolean result;
    private final double elapsedTime;
    private final LocalDateTime currentTime;

    public HistoryQuery(
            double x,
            double y,
            int r,
            boolean result,
            double elapsedTime,
            LocalDateTime currentTime
    ) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.result = result;
        this.elapsedTime = elapsedTime;
        this.currentTime = currentTime;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public int getR() {
        return r;
    }

    public boolean isResult() {
        return result;
    }

    public double getElapsedTime() {
        return elapsedTime;
    }

    public LocalDateTime getCurrentTime() {
        return currentTime;
    }
}
