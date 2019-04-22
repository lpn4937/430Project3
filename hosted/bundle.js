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

//displays add new song list
var SongFormWindow = function SongFormWindow(props) {
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

//displays change password form
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
            React.createElement("input", { className: "formSubmit btn btn-primary", type: "submit", value: "Change Password" }),
            React.createElement("div", { id: "errorMessage" }),
            React.createElement(
                "a",
                { className: "text-light nav-link active btn btn-danger mt-5", href: "/deleteAccount" },
                "Delete Account"
            )
        )
    );
};

//displays personal song list
var SongListWindow = function SongListWindow(props) {
    if (props.domos.length === 0) {
        return React.createElement(
            "div",
            { className: "songList" },
            React.createElement(
                "h3",
                { className: "emptySong" },
                "No songs yet"
            )
        );
    }

    var songNodes = props.domos.map(function (song) {
        return React.createElement(
            "div",
            { className: "col-lg-2 mt-3" },
            React.createElement(
                "div",
                { className: "card" },
                React.createElement("img", { src: song.art, alt: "card image cap", className: "card-img-top" }),
                React.createElement(
                    "audio",
                    { className: "media", controls: true },
                    React.createElement("source", { src: song.preview, type: "audio/x-m4a" }),
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
                        song.name
                    ),
                    React.createElement(
                        "h5",
                        { className: "songArtist" },
                        "Artist: "
                    ),
                    React.createElement(
                        "p",
                        null,
                        song.artist
                    ),
                    React.createElement(
                        "h5",
                        { className: "songAlbum" },
                        "Album: "
                    ),
                    React.createElement(
                        "p",
                        null,
                        song.album
                    )
                ),
                React.createElement(
                    "form",
                    { className: "text-center", action: "/addToSharedList", name: song.name },
                    React.createElement("input", { className: "d-none", type: "text", name: "name", value: song.name }),
                    React.createElement("input", { className: "d-none", type: "text", name: "album", value: song.album }),
                    React.createElement("input", { className: "d-none", type: "text", name: "art", value: song.art }),
                    React.createElement("input", { className: "d-none", type: "text", name: "artist", value: song.artist }),
                    React.createElement("input", { className: "d-none", type: "text", name: "preview", value: song.preview }),
                    React.createElement(
                        "button",
                        { className: "btn", type: "submit", "aria-label": "Close", name: "name", value: song },
                        "Share"
                    )
                ),
                React.createElement(
                    "form",
                    { className: "close", action: "/deleteSong", name: song.name },
                    React.createElement(
                        "button",
                        { type: "submit", className: "close", "aria-label": "Close", name: "name", value: song.name },
                        React.createElement(
                            "span",
                            { "aria-hidden": "true" },
                            "\xD7"
                        )
                    )
                )
            )
        );
    });

    return React.createElement(
        "div",
        { className: "songList row top-buffer m-3" },
        songNodes
    );
};

//displays search results
var SearchListWindow = function SearchListWindow(props) {
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
                ),
                React.createElement(
                    "div",
                    { className: "card-footer text-center" },
                    React.createElement(
                        "button",
                        { className: "btn text-center", id: song.trackId, onClick: getInfo, "aria-label": "Close", name: "name", value: song.trackId },
                        "More Info"
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

//displays more info from search results page
var SongInfoWindow = function SongInfoWindow(props) {
    console.log(props);
    if (props.length === 0) {
        return React.createElement(
            "div",
            { className: "searchList" },
            React.createElement(
                "h3",
                { className: "emptySong m-5" },
                "No results"
            )
        );
    }
    var video = void 0;
    if (props.data.videoData) {
        video = React.createElement(
            "video",
            { controls: true, alt: "assets/img/notfound.png" },
            React.createElement("source", { src: props.data.videoData.previewUrl }),
            "Your browser does not support the video tag."
        );
    } else {
        video = React.createElement("div", null);
    }
    var date = props.data.songData.releaseDate.slice(0, 10);
    var ms = props.data.songData.trackTimeMillis;
    var time = (Math.floor(ms / 1000 / 60) << 0) + " : " + Math.floor(ms / 1000 % 60);

    return React.createElement(
        "div",
        { className: "col-lg-10 offset-lg-1 mt-4" },
        React.createElement(
            "div",
            { className: "card center-text" },
            React.createElement(
                "div",
                null,
                video
            ),
            React.createElement(
                "div",
                { className: "card-body" },
                React.createElement(
                    "h4",
                    { className: "card-title" },
                    props.data.songData.trackName
                ),
                React.createElement(
                    "p",
                    { className: "card-text" },
                    React.createElement(
                        "b",
                        null,
                        "Artist: "
                    ),
                    props.data.songData.artistName
                ),
                React.createElement(
                    "p",
                    { className: "card-text" },
                    React.createElement(
                        "b",
                        null,
                        "Album: "
                    ),
                    props.data.songData.collectionName
                ),
                React.createElement(
                    "p",
                    { className: "card-text" },
                    React.createElement(
                        "b",
                        null,
                        "Genre: "
                    ),
                    props.data.songData.primaryGenreName
                ),
                React.createElement(
                    "p",
                    { className: "card-text" },
                    React.createElement(
                        "b",
                        null,
                        "Album Price: "
                    ),
                    "$",
                    props.data.songData.collectionPrice
                ),
                React.createElement(
                    "p",
                    { className: "card-text" },
                    React.createElement(
                        "b",
                        null,
                        "Release Date: "
                    ),
                    date
                ),
                React.createElement(
                    "p",
                    { className: "card-text" },
                    React.createElement(
                        "b",
                        null,
                        "Song Length: "
                    ),
                    time
                ),
                React.createElement(
                    "button",
                    { className: "btn" },
                    React.createElement(
                        "a",
                        { href: props.data.songData.trackViewUrl },
                        "View in iTunes"
                    )
                ),
                React.createElement(
                    "form",
                    { className: "mt-4", action: "/addToList", name: props.data.songData.trackId },
                    React.createElement(
                        "button",
                        { className: "btn btn-primary", type: "submit", "aria-label": "Close", name: "name", value: props.data.songData.trackId },
                        "Add to my list"
                    )
                )
            )
        )
    );
};

//loads songs from the user's personal list
var loadSongsFromServer = function loadSongsFromServer() {
    sendAjax('GET', '/getSongs', null, function (data) {
        ReactDOM.render(React.createElement(SongListWindow, { domos: data.songs }), document.querySelector("#content"));
    });
};

//searches itunes for the given search term
var searchiTunes = function searchiTunes(term) {
    sendAjax('GET', '/searchTunes', term, function (data) {
        ReactDOM.render(React.createElement(SearchListWindow, { songs: data.songs }), document.querySelector("#content"));
    });
};

//searches itunes for more info
var getInfo = function getInfo(e) {
    sendAjax('GET', '/searchTunes', e.target.value, function (data) {
        sendAjax('GET', "https://itunes.apple.com/search?term=" + data.songs[0].trackName + "+" + data.songs[0].artistName + "&entity=musicVideo", null, function (videoData) {
            var propData = { songData: data.songs[0], videoData: videoData.results[0] };
            ReactDOM.render(React.createElement(SongInfoWindow, { data: propData }), document.querySelector("#content"));
        });
    });
};

//sets up initial view and DOM
var setup = function setup(csrf) {
    ReactDOM.render(React.createElement(SongListWindow, { domos: [] }), document.querySelector("#content"));

    loadSongsFromServer();

    //add code for nav buttons
    var addNewButton = document.querySelector("#addNewButton");
    var changePassButton = document.querySelector("#changePassButton");
    var viewSongsButton = document.querySelector("#viewSongsButton");
    var searchForm = document.querySelector("#searchTunesForm");

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
    ReactDOM.render(React.createElement(SongFormWindow, { csrf: csrf }), document.querySelector("#content"));
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
