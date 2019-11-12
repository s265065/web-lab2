<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<jsp:useBean id="fallBean" scope="application" class="history.FallBean" />
<html>
<head>
    <title>лапка</title>
    <meta charset="UTF-8">
    <script type="text/javascript">let jspContextPath = "${pageContext.request.contextPath}";</script>
    <link rel="shortcut icon" href="${pageContext.request.contextPath}/img/paw.png">
    <link rel="stylesheet" href="stylesheets/normal.css" id="styles">
</head>
<body>
<table class="main_table">
    <tr>
        <th class="up-text-wrap">
            <label class="up-text" contenteditable="true" style="display: inline-block; width: 750px;">
                Введи координаты точки и параметр R, чтобы узнать принадлежит ли она области графика.
                Но будь осторожен! Если точка окажется вне графика этот милый котик упадёт.
            </label>
        </th>
    </tr>
    <tr>
        <td>
            <div class="header">
                <div class="head-text" style="position: absolute; top: 0; left: 0; padding: 1ex 1ch;">
                    Бострикова Дарья P3201<br>
                    Вариант 201074
                </div>

                <div id="errors"></div>

                <img src="${pageContext.request.contextPath}/img/not-fallen.jpg"
                     alt="котик" height="530" id="header_image">
            </div>
        </td>
    </tr>
    <tr>
        <td>
            <form id="my_form" action="${pageContext.request.contextPath}/controller"
                  target="result_frame" method="post" style="display: inline-block;">
                <table class="control">
                    <tr>
                        <td>
                            <p class="panel__title"><label class="text">Координата X</label></p>
                            <table style="margin: 0 auto;">
                                <tr>
                                    <td>
                                        <div class="amazing-checkbox">
                                            <label>
                                                <input type="checkbox" name="x" value="-4" onchange="randomPlay();">
                                                <span>-4</span>
                                            </label>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="amazing-checkbox">
                                            <label>
                                                <input type="checkbox" name="x" value="-3" onchange="randomPlay();">
                                                <span>-3</span>
                                            </label>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="amazing-checkbox">
                                            <label>
                                                <input type="checkbox" name="x" value="-2" onchange="randomPlay();">
                                                <span>-2</span>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="amazing-checkbox">
                                            <label>
                                                <input type="checkbox" name="x" value="-1" onchange="randomPlay();">
                                                <span>-1</span>
                                            </label>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="amazing-checkbox">
                                            <label>
                                                <input type="checkbox" name="x" value="0" onchange="randomPlay();">
                                                <span>0</span>
                                            </label>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="amazing-checkbox">
                                            <label>
                                                <input type="checkbox" name="x" value="1" onchange="randomPlay();">
                                                <span>1</span>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="amazing-checkbox">
                                            <label>
                                                <input type="checkbox" name="x" value="2" onchange="randomPlay();">
                                                <span>2</span>
                                            </label>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="amazing-checkbox">
                                            <label>
                                                <input type="checkbox" name="x" value="3" onchange="randomPlay();">
                                                <span>3</span>
                                            </label>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="amazing-checkbox">
                                            <label>
                                                <input type="checkbox" name="x" value="4" onchange="randomPlay();">
                                                <span>4</span>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td>
                            <p class="panel__title"><label class="text" for="y">Координата Y</label></p>
                            <input type="text" name="y" id="y" placeholder="число от -5 до 5">
                        </td>
                        <td>
                            <p class="panel__title"><label class="text">Число R</label></p>

                            <div class="panel_r" id="r-button">
                                <input type="hidden" name="r" value="" id="r">

                                <input class="text" type="button" id="r1" name="r" onclick="clickR(1);" value="1">
                                <input class="text" type="button" id="r2" name="r" onclick="clickR(2);" value="2">
                                <input class="text" type="button" id="r3" name="r" onclick="clickR(3);" value="3">
                                <input class="text" type="button" id="r4" name="r" onclick="clickR(4);" value="4">
                                <input class="text" type="button" id="r5" name="r" onclick="clickR(5);" value="5">
                            </div>
                        </td>
                        <td>
                            <button id="submit" type="submit" class="submit-btn">проверить</button>
                        </td>
                    </tr>
                </table>
            </form>
        </td>
    </tr>
    <tr>
        <td>
            <canvas id="graph" width="500" height="500" class="graph-view"></canvas>
        </td>
    </tr>
    <tr>
        <td>
            <%--suppress HtmlDeprecatedAttribute --%>
            <iframe name="result_frame" id="result_frame" src="${pageContext.request.contextPath}/table.jsp"
                    scrolling="no" allowtransparency></iframe>
        </td>
    </tr>
</table>
<div id="fix" onclick="window.open('https://docs.google.com/spreadsheets/d/1hGx52Q6omjFo7D_0L_FXXhb5FyVR2I6m2bmbOKYdEVA/edit#gid=719057914&range=Q5', '_blank').focus();"></div>
<script src="${pageContext.request.contextPath}/script.js"></script>
<c:if test="${fallBean.fallen}"><script>errorPlay();</script></c:if>
<c:if test="${fallBean.standUp}"><script>startHooker();</script></c:if>
</body>
</html>
