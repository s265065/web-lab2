<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="history.HistoryQuery" %>
<%@ page import="java.time.format.FormatStyle" %>
<%@ page import="java.time.format.DateTimeFormatter" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/fmt" %>
<jsp:useBean id="history" scope="session" class="history.HistoryBean" />
<%!private final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM);%>
<html>
<head>
    <title>история взлётов и падений</title>

    <style>
        table {
            margin: 0 auto;
            border-collapse: collapse;
        }

        table th, table td {
            padding: 0.5ex 1ch;
            border: 1px solid midnightblue;
            white-space: nowrap;
            text-align: center;
        }

        table td {
            border-top: none;
            border-bottom: none;
        }

        table tr:first-child th {
            border-top: none;
        }

        table tr:last-child th {
            border-bottom: none;
        }

        table th:first-child, table td:first-child {
            border-left: none;
        }

        table th:last-child, table td:last-child {
            border-right: none;
        }
    </style>
</head>
<body>
<table>
    <tr>
        <th>X</th>
        <th>Y</th>
        <th>R</th>
        <th>чего ты добился</th>
        <th>время работыыы</th>
        <th>время начала работы</th>
    </tr>

    <c:forEach var="query" items="${history.queries}">
        <tr>
            <td><f:formatNumber value="${query.x}" maxFractionDigits="6" /></td>
            <td><f:formatNumber value="${query.y}" maxFractionDigits="6" /></td>
            <td><f:formatNumber value="${query.r}" /></td>
            <td>${query.result ? "всё хорошо" : "ты уронил котика("}</td>
            <td><f:formatNumber value="${query.elapsedTime}" maxFractionDigits="8" /> ms</td>
            <td><%=dateTimeFormatter.format(((HistoryQuery) pageContext.getAttribute("query")).getCurrentTime())%></td>
        </tr>
    </c:forEach>
</table>

<script>
    let body = document.body,
        html = document.documentElement;

    const message = {
        history: [],
        height: Math.max(body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight)
    };

    <c:forEach var="query" items="${history.queries.descendingIterator()}">
    message.history.push({
        x: ${query.x},
        y: ${query.y},
        r: ${query.r},
        result: ${query.result}
    });
    </c:forEach>

    <c:if test="${requestScope.containsKey(\"currentQuery\")}">
    <jsp:useBean id="currentQuery" scope="request" type="history.HistoryQuery" />
    message.current = ${currentQuery.result ? 1 : 0};
    </c:if>

    window.parent.postMessage(message, '*');
</script>
</body>
</html>
