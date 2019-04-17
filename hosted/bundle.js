"use strict";

var handleDomo = function handleDomo(e) {
    e.preventDefault();

    $("#domoMessage").animate({ width: 'hide' }, 350);

    if ($("#domoName").val() == '' || $("#domoAge").val() == '') {
        handleError("RAWR! All fields are required");
        return false;
    }

    sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function () {
        loadDomosFromServer();
    });

    return false;
};

var DomoForm = function DomoForm(props) {
    return (
        // <form id="domoForm" onSubmit={handleDomo} name="domoForm" action="/maker" method="POST" className = "domoForm">
        //     <label htmlFor="name">Name: </label>
        //     <input id="domoName" type="text" name="name" placeholder="Domo Name" />
        //     <label htmlFor="age">Age: </label>
        //     <input id="domoAge" type="text" name="age" placeholder="Domo Age" />
        //     <label htmlFor="perception">Perception: </label>
        //     <input id="domoPerception" type="text" name="perception" placeholder="Domo Percpetion" />
        //     <input type="hidden" name="_csrf" value={props.csrf} />
        //     <input className="makeDomoSubmit" type="submit" value="Make Domo" />
        // </form>
        React.createElement(
            "section",
            { className: "formFormat" },
            React.createElement(
                "h2",
                null,
                "Add a song"
            ),
            React.createElement(
                "form",
                { id: "songForm", name: "songForm", action: "/maker", method: "POST", "class": "pageForm" },
                React.createElement(
                    "div",
                    { className: "form-group" },
                    React.createElement(
                        "label",
                        { "for": "name" },
                        "Name: "
                    ),
                    React.createElement("input", { className: "form-control", id: "songName", type: "text", name: "name", placeholder: "Song Name" })
                ),
                React.createElement(
                    "div",
                    { className: "form-group" },
                    React.createElement(
                        "label",
                        { "for": "artist" },
                        "Artist: "
                    ),
                    React.createElement("input", { className: "form-control", id: "songArtist", type: "text", name: "artist", placeholder: "Song Artist" })
                ),
                React.createElement(
                    "div",
                    { className: "form-group" },
                    React.createElement(
                        "label",
                        { "for": "album" },
                        "Album: "
                    ),
                    React.createElement("input", { className: "form-control", id: "songAlbum", type: "text", name: "album", placeholder: "Song Album" })
                ),
                React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
                React.createElement("input", { className: "btn btn-primary", type: "submit", value: "Make Song" })
            ),
            React.createElement("div", { id: "errorMessage" })
        )
    );
};

var handleRemoveDomo = function handleRemoveDomo(e) {
    e.preventDefault();

    $("#domoMessage").animate({ width: 'hide' }, 350);

    if ($("#domoRemoveName").val() == '') {
        handleError("RAWR! All fields are required");
        return false;
    }

    sendAjax('GET', '/removeDomo', $("#removeForm").serialize(), function (data) {
        loadDomosFromServer();
    });
    loadDomosFromServer();
    return false;
};

var RemoveDomoForm = function RemoveDomoForm(props) {
    return React.createElement(
        "form",
        { id: "removeForm", onSubmit: handleRemoveDomo, name: "domoForm", action: "/maker", method: "POST", className: "domoForm" },
        React.createElement(
            "label",
            { htmlFor: "name" },
            "Name: "
        ),
        React.createElement("input", { id: "domoRemoveName", type: "text", name: "name", placeholder: "Domo Name" }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "makeDomoSubmit", type: "submit", value: "Remove Domo" })
    );
};

var DomoList = function DomoList(props) {
    if (props.domos.length === 0) {
        return React.createElement(
            "div",
            { className: "domoList" },
            React.createElement(
                "h3",
                { className: "emptyDomo" },
                "No Domos yet"
            )
        );
    }

    var domoNodes = props.domos.map(function (domo) {
        return React.createElement(
            "div",
            { key: domo._id, className: "domo" },
            React.createElement("img", { src: "/assets/img/domoface.jpeg", alt: "domo face", className: "domoFace" }),
            React.createElement(
                "h3",
                { className: "domoName" },
                "Name: ",
                domo.name
            ),
            React.createElement(
                "h3",
                { className: "domoAge" },
                "Age: ",
                domo.age
            ),
            React.createElement(
                "h3",
                { className: "domoPerception" },
                "Perception: ",
                domo.perception
            )
        );
    });

    return React.createElement(
        "div",
        { className: "domoList" },
        domoNodes
    );
};

var loadDomosFromServer = function loadDomosFromServer() {
    sendAjax('GET', '/getDomos', null, function (data) {
        ReactDOM.render(React.createElement(DomoList, { domos: data.domos }), document.querySelector("#domos"));
    });
};

var setup = function setup(csrf) {
    ReactDOM.render(React.createElement(DomoForm, { csrf: csrf }), document.querySelector("#makeDomo"));
    ReactDOM.render(React.createElement(RemoveDomoForm, { csrf: csrf }), document.querySelector("#removeDomo"));

    ReactDOM.render(React.createElement(DomoList, { domos: [] }), document.querySelector("#domos"));

    loadDomosFromServer();
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
