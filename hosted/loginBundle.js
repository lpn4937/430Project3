"use strict";

var handleLogin = function handleLogin(e) {
    e.preventDefault();

    $("#domoMessage").animate({ width: 'hide' }, 350);

    if ($("#user").val() == '' || $("#pass").val() == '') {
        handleError("Username or password is empty");
        return false;
    }

    console.log($("input[name=_csrf]").val());

    sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);

    return false;
};

var handleSignup = function handleSignup(e) {
    e.preventDefault();

    $("#domoMessage").animate({ width: 'hide' }, 350);

    if ($("#pass").val() !== $("#pass2").val()) {
        handleError("Passwords do not match");
        return false;
    }

    if ($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
        handleError("All fields are required");
        return false;
    }

    sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);

    return false;
};

var LoginWindow = function LoginWindow(props) {
    return React.createElement(
        "section",
        { className: "formFormat" },
        React.createElement(
            "h2",
            null,
            "Log in"
        ),
        React.createElement(
            "form",
            { className: "pageForm", id: "loginForm", onSubmit: handleLogin, name: "loginForm", action: "/login", method: "POST", "class": "mainForm" },
            React.createElement(
                "div",
                { className: "form-group" },
                React.createElement(
                    "label",
                    { "for": "username" },
                    "Username: "
                ),
                React.createElement("input", { className: "form-control", id: "user", type: "text", name: "username", placeholder: "username" })
            ),
            React.createElement(
                "div",
                { className: "form-group" },
                React.createElement(
                    "label",
                    { "for": "pass" },
                    "Password: "
                ),
                React.createElement("input", { className: "form-control", id: "pass", type: "password", name: "pass", placeholder: "password" })
            ),
            React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
            React.createElement("input", { className: "formSubmit btn btn-primary", type: "submit", value: "Sign In" })
        ),
        React.createElement("div", { id: "errorMessage" })
    );
};

var SignupWindow = function SignupWindow(props) {
    return React.createElement(
        "section",
        { className: "formFormat" },
        React.createElement(
            "h2",
            null,
            "Sign Up"
        ),
        React.createElement(
            "form",
            { id: "signupForm", name: "signupForm", onSubmit: handleSignup, action: "/signup", method: "POST", "class": "mainForm" },
            React.createElement(
                "div",
                { className: "form-group" },
                React.createElement(
                    "label",
                    { "for": "username" },
                    "Username: "
                ),
                React.createElement("input", { className: "form-control", id: "user", type: "text", name: "username", placeholder: "Username" })
            ),
            React.createElement(
                "div",
                { className: "form-group" },
                React.createElement(
                    "label",
                    { "for": "pass" },
                    "Password: "
                ),
                React.createElement("input", { className: "form-control", id: "pass", type: "password", name: "pass", placeholder: "Password" })
            ),
            React.createElement(
                "div",
                { className: "form-group" },
                React.createElement(
                    "label",
                    { "for": "pass2" },
                    "Password: "
                ),
                React.createElement("input", { className: "form-control", id: "pass2", type: "password", name: "pass2", placeholder: "Retype Password" })
            ),
            React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
            React.createElement("input", { className: "formSubmit btn btn-primary", type: "submit", value: "Sign Up" }),
            React.createElement("div", { id: "errorMessage" })
        )
    );
};

var createLoginWindow = function createLoginWindow(csrf) {
    ReactDOM.render(React.createElement(LoginWindow, { csrf: csrf }), document.querySelector("#content"));
};
var createSignupWindow = function createSignupWindow(csrf) {
    ReactDOM.render(React.createElement(SignupWindow, { csrf: csrf }), document.querySelector("#content"));
};

var setup = function setup(csrf) {
    var loginButton = document.querySelector("#loginButton");
    var signupButton = document.querySelector("#signupButton");

    signupButton.addEventListener("click", function (e) {
        e.preventDefault();
        createSignupWindow(csrf);
        console.log("signup");
        return false;
    });

    loginButton.addEventListener("click", function (e) {
        e.preventDefault();
        createLoginWindow(csrf);
        console.log("login");
        return false;
    });

    createLoginWindow(csrf);
};

var getToken = function getToken() {
    sendAjax('GET', '/getToken', null, function (result) {
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});
"use strict";

var handleError = function handleError(message) {
    $("#errorMessage").text(message);
    $("#domoMessage").animate({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
    $("#domoMessage").animate({ width: 'hide' }, 350);
    window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: function error(xhr, status, _error) {
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};
