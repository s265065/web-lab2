package servlets;

import history.HistoryBean;
import history.HistoryQuery;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

public class AreaCheckServlet extends HttpServlet {

    private final static String HISTORY_BEAN_NAME = "history";

    private final static int MAX_Y = 5;
    private final static int MIN_Y = -5;
    private final static List<String> AVALIBALE_X = Arrays.asList("-4", "-3", "-2", "-1", "0", "1", "2", "3", "4");
    private final static List<String> AVALIBALE_R = Arrays.asList("1", "2", "3", "4", "5");

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ControllerServlet.forwardToIndex(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Double x = (Double) req.getAttribute("x");
        Double y = (Double) req.getAttribute("y");
        Integer r = (Integer) req.getAttribute("r");
        Long startingTimeNanos = (Long) req.getAttribute("startingTimeNanos");

        if (x != null && y != null && r != null && startingTimeNanos != null) {
            HistoryQuery query = doCheck(x, y, r, startingTimeNanos, getHistoryBean(req.getSession()));

            req.setAttribute("currentQuery", query);
            getServletContext().getRequestDispatcher("/table.jsp").forward(req, resp);
            return;
        }

        ControllerServlet.forward(req, resp);
    }

    private HistoryQuery doCheck(double x, double y, int r, long startingTimeNanos, HistoryBean history) {
        boolean result = (x >= 0 && y >= 0 && y <= -x / 2. + r / 2.) // First quarter
                || (x >= 0 && y <= 0 && x * x + y * y <= r * r) // Second quarter
                || (x <= 0 && y <= 0 && x >= -r && y >= -r); // Third quarter

        HistoryQuery query = new HistoryQuery(x, y, r, result,
                (System.nanoTime() - startingTimeNanos) / 1_000_000.,
                LocalDateTime.now());

        history.getQueries().addFirst(query);
        return query;
    }

    private HistoryBean getHistoryBean(HttpSession session) {
        HistoryBean historyBean;

        try {
            historyBean = (HistoryBean) session.getAttribute(HISTORY_BEAN_NAME);
        } catch (ClassCastException e) {
            e.printStackTrace();
            historyBean = null;
        }

        if (historyBean == null) {
            historyBean = new HistoryBean();
            session.setAttribute(HISTORY_BEAN_NAME, historyBean);
        }

        return historyBean;
    }

    static Double parseX(String str, boolean fromCanvas) {
        try {
            if (AVALIBALE_X.contains(str) || fromCanvas) {
                return Double.parseDouble(str);
            }
        } catch (Throwable e) {
            // e.printStackTrace();
        }

        return null;
    }

    static Double parseY(String str, boolean fromCanvas) {
        try {
            double y = Double.parseDouble(str.trim()
                    .replace(" ", "")
                    .replace(',', '.'));

            if (y > MIN_Y && y < MAX_Y || fromCanvas) {
                return y;
            }
        } catch (Throwable e) {
            // e.printStackTrace();
        }

        return null;
    }

    static Integer parseR(String str) {
        try {
            if (AVALIBALE_R.contains(str)) {
                return Integer.parseInt(str);
            }
        } catch (Throwable e) {
            // e.printStackTrace();
        }

        return null;
    }

    static void forward(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getServletContext().getRequestDispatcher("/check").forward(request, response);
    }
}
