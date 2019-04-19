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
        loadSongsFromServer();
    });

    return false;
};

var SongForm = function SongForm(props) {
    var _React$createElement, _React$createElement2, _React$createElement3;

    return React.createElement(
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
    );
};

var ChangePassForm = function ChangePassForm(props) {
    return React.createElement(
        "section",
        { className: "formFormat" },
        React.createElement(
            "form",
            { className: "form", id: "changePasswordForm", name: "changePasswordForm", action: "/changePassword", method: "POST", "class": "mainForm" },
            React.createElement(
                "div",
                { className: "form-group" },
                React.createElement(
                    "label",
                    { "for": "currentPass" },
                    "Current Password: "
                ),
                React.createElement("input", { className: "form-control", id: "current", type: "password", name: "currentPass", placeholder: "Current Password" })
            ),
            React.createElement(
                "div",
                { className: "form-group" },
                React.createElement(
                    "label",
                    { "for": "pass" },
                    "New password: "
                ),
                React.createElement("input", { className: "form-control", id: "pass", type: "password", name: "pass", placeholder: "New Password" })
            ),
            React.createElement(
                "div",
                { className: "form-group" },
                React.createElement(
                    "label",
                    { "for": "pass2" },
                    "New Password: "
                ),
                React.createElement("input", { className: "form-control", id: "pass2", type: "password", name: "pass2", placeholder: "Retype Password" })
            ),
            React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
            React.createElement("input", { className: "formSubmit btn btn-primary", type: "submit", value: "Sign Up" }),
            React.createElement("div", { id: "errorMessage" }),
            React.createElement(
                "a",
                { className: "text-light nav-link active btn btn-danger mt-5", href: "/deleteAccount" },
                "Delete Account"
            )
        )
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

    var songNodes = props.domos.map(function (domo) {
        return React.createElement(
            "div",
            { className: "col-lg-2" },
            React.createElement(
                "div",
                { className: "card" },
                React.createElement("img", { src: domo.art, alt: "card image cap", className: "card-img-top" }),
                React.createElement(
                    "audio",
                    { className: "media", controls: true },
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
                ),
                React.createElement(
                    "form",
                    { className: "text-center", action: "/addToList", name: domo.name },
                    React.createElement(
                        "button",
                        { className: "btn btn-primary", type: "submit", "aria-label": "Close", name: "name", value: domo.name },
                        "Add to my list"
                    )
                )
            )
        );
    });

    return React.createElement(
        "div",
        { className: "domoList row top-buffer m-3" },
        songNodes
    );
};

var SearchList = function SearchList(props) {
    if (props.length === 0) {
        return React.createElement(
            "div",
            { className: "searchList" },
            React.createElement(
                "h3",
                { className: "emptySong" },
                "No results"
            )
        );
    }

    var songNodes = props.songs.map(function (song) {
        return React.createElement(
            "div",
            { className: "col-lg-2" },
            React.createElement(
                "div",
                { className: "card" },
                React.createElement("img", { src: song.artworkUrl100, alt: "card image cap", className: "card-img-top" }),
                React.createElement(
                    "audio",
                    { className: "media", controls: true },
                    React.createElement("source", { src: song.previewUrl, type: "audio/x-m4a" }),
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
                        song.trackName
                    ),
                    React.createElement(
                        "h5",
                        { className: "songArtist" },
                        "Artist: "
                    ),
                    React.createElement(
                        "p",
                        null,
                        song.artistName
                    ),
                    React.createElement(
                        "h5",
                        { className: "songAlbum" },
                        "Album: "
                    ),
                    React.createElement(
                        "p",
                        null,
                        song.collectionName
                    )
                ),
                React.createElement(
                    "form",
                    { className: "text-center", action: "/addToList", name: song.trackId },
                    React.createElement(
                        "button",
                        { className: "btn btn-primary", type: "submit", "aria-label": "Close", name: "name", value: song.trackId },
                        "Add to my list"
                    )
                )
            )
        );
    });

    return React.createElement(
        "div",
        { className: "domoList row top-buffer m-3" },
        songNodes
    );
};

var loadSongsFromServer = function loadSongsFromServer() {
    sendAjax('GET', '/getSongs', null, function (data) {
        ReactDOM.render(React.createElement(DomoList, { domos: data.songs }), document.querySelector("#content"));
    });
};

var searchiTunes = function searchiTunes(term) {
    sendAjax('GET', '/searchTunes', term, function (data) {
        ReactDOM.render(React.createElement(SearchList, { songs: data.songs }), document.querySelector("#content"));
    });
};

var setup = function setup(csrf) {
    ReactDOM.render(React.createElement(DomoList, { domos: [] }), document.querySelector("#content"));

    loadSongsFromServer();

    //add code for nav buttons
    var addNewButton = document.querySelector("#addNewButton");
    var changePassButton = document.querySelector("#changePassButton");
    var shareButton = document.querySelector("#shareButton");
    var viewSongsButton = document.querySelector("#viewSongsButton");
    var searchForm = document.querySelector("#searchTunesForm");
    var test = document.querySelector("#testButton");

    test.addEventListener("click", function (e) {
        e.preventDefault();

        console.log("addNewSong");
        return false;
    });
    addNewButton.addEventListener("click", function (e) {
        e.preventDefault();
        createSongForm(csrf);
        console.log("addNewSong");
        return false;
    });
    changePassButton.addEventListener("click", function (e) {
        e.preventDefault();
        changePass(csrf);
        console.log("changePass");
        return false;
    });
    viewSongsButton.addEventListener("click", function (e) {
        e.preventDefault();
        loadSongsFromServer();
        console.log("viewSongs");
        return false;
    });
    searchForm.addEventListener("submit", function (e) {
        e.preventDefault();
        searchiTunes(e.target[0].value);
        console.log("searchiTunes");
        return false;
    });
};

var createSongForm = function createSongForm(csrf) {
    ReactDOM.render(React.createElement(SongForm, { csrf: csrf }), document.querySelector("#content"));
};
var changePass = function changePass(csrf) {
    ReactDOM.render(React.createElement(ChangePassForm, { csrf: csrf }), document.querySelector("#content"));
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
