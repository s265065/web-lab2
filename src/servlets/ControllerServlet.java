package servlets;

import history.FallBean;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ControllerServlet extends HttpServlet {

    private static final String FALL_BEAN_NAME = "fallBean";

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        forwardToIndex(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setAttribute("startingTimeNanos", System.nanoTime());

        if (Boolean.parseBoolean(req.getParameter("isFallen"))) {
            resp.getWriter().println(getFallBean(req.getServletContext()).isFallen());
            return;
        }

        boolean fromCanvas = Boolean.parseBoolean(req.getParameter("fromCanvas"));
        boolean trolling = Boolean.parseBoolean(req.getParameter("trolling"));
        Double x = AreaCheckServlet.parseX(req.getParameter("x"), fromCanvas);
        Double y = AreaCheckServlet.parseY(req.getParameter("y"), fromCanvas);
        Integer r = AreaCheckServlet.parseR(req.getParameter("r"));

        if (x != null && y != null && r != null) {
            req.setAttribute("x", x);
            req.setAttribute("y", y);
            req.setAttribute("r", r);

            AreaCheckServlet.forward(req, resp);
            return;
        } else if (trolling || fromCanvas && (
                x == null && req.getParameter("x") != null ||
                y == null && req.getParameter("y") != null ||
                r == null && req.getParameter("r") != null
        )) {
            getFallBean(req.getServletContext()).setFallen(true);
        }

        forwardToIndex(req, resp);
    }

    private FallBean getFallBean(ServletContext context) {
        FallBean fallBean;

        try {
            fallBean = (FallBean) context.getAttribute(FALL_BEAN_NAME);
        } catch (ClassCastException e) {
            e.printStackTrace();
            fallBean = null;
        }

        if (fallBean == null) {
            fallBean = new FallBean();
            context.setAttribute(FALL_BEAN_NAME, fallBean);
        }

        return fallBean;
    }

    static void forwardToIndex(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
    }

    static void forward(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getServletContext().getRequestDispatcher("/controller").forward(request, response);
    }
}
