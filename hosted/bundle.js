"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var handleDomo = function handleDomo(e) {
    e.preventDefault();

    $("#domoMessage").animate({ width: 'hide' }, 350);

    if ($("#songName").val() == '' || $("#songArtist").val() == '') {
        handleError("RAWR! All fields are required");
        return false;
    }

    sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function () {
        loadDomosFromServer();
    });

    return false;
};

var DomoForm = function DomoForm(props) {
    var _React$createElement, _React$createElement2, _React$createElement3;

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
                    React.createElement("input", (_React$createElement = { id: "songName", className: "form-control" }, _defineProperty(_React$createElement, "id", "songName"), _defineProperty(_React$createElement, "type", "text"), _defineProperty(_React$createElement, "name", "name"), _defineProperty(_React$createElement, "placeholder", "Song Name"), _React$createElement))
                ),
                React.createElement(
                    "div",
                    { className: "form-group" },
                    React.createElement(
                        "label",
                        { "for": "artist" },
                        "Artist: "
                    ),
                    React.createElement("input", (_React$createElement2 = { id: "songArtist", className: "form-control" }, _defineProperty(_React$createElement2, "id", "songArtist"), _defineProperty(_React$createElement2, "type", "text"), _defineProperty(_React$createElement2, "name", "artist"), _defineProperty(_React$createElement2, "placeholder", "Song Artist"), _React$createElement2))
                ),
                React.createElement(
                    "div",
                    { className: "form-group" },
                    React.createElement(
                        "label",
                        { "for": "album" },
                        "Album: "
                    ),
                    React.createElement("input", (_React$createElement3 = { id: "songAlbum", className: "form-control" }, _defineProperty(_React$createElement3, "id", "songAlbum"), _defineProperty(_React$createElement3, "type", "text"), _defineProperty(_React$createElement3, "name", "album"), _defineProperty(_React$createElement3, "placeholder", "Song Album"), _React$createElement3))
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
        return (
            // <div key={domo._id} className="domo">
            //     <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
            //     <h3 className="domoName">Name: {domo.name}</h3>
            //     <h3 className="domoAge">Age: {domo.age}</h3>
            //     <h3 className="domoPerception">Perception: {domo.perception}</h3>
            // </div>
            React.createElement(
                "div",
                { className: "col-lg-2" },
                React.createElement(
                    "div",
                    { className: "card" },
                    React.createElement("img", { src: domo.art, alt: "card image cap", className: "card-img-top" }),
                    React.createElement(
                        "audio",
                        { className: "media controls" },
                        React.createElement("source", { src: domo.preview, type: "audio/x-m4a" }),
                        "Your browser does not support the audio element."
                    ),
                    React.createElement(
                        "div",
                        { className: "card-body" },
                        React.createElement(
                            "h5",
                            { className: "songName" },
                            "Name: "
                        ),
                        React.createElement(
                            "p",
                            null,
                            domo.name
                        ),
                        React.createElement(
                            "h5",
                            { className: "songArtist" },
                            "Artist: "
                        ),
                        React.createElement(
                            "p",
                            null,
                            domo.artist
                        ),
                        React.createElement(
                            "h5",
                            { className: "songAlbum" },
                            "Album: "
                        ),
                        React.createElement(
                            "p",
                            null,
                            domo.album
                        )
                    ),
                    React.createElement(
                        "form",
                        { className: "close", action: "/deleteSong", name: domo.name },
                        React.createElement(
                            "button",
                            { type: "submit", className: "close", "aria-label": "Close", name: "name", value: domo.name },
                            React.createElement(
                                "span",
                                { "aria-hidden": "true" },
                                "\xD7"
                            )
                        )
                    )
                )
            )
        );
    });

    return React.createElement(
        "div",
        { className: "domoList row" },
        domoNodes
    );
};

var loadDomosFromServer = function loadDomosFromServer() {
    sendAjax('GET', '/getSongs', null, function (data) {
        ReactDOM.render(React.createElement(DomoList, { domos: data.songs }), document.querySelector("#domos"));
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
