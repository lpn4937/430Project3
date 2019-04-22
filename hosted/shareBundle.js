"use strict";

//display shared songs on page
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
                    React.createElement("input", { className: "d-none", type: "text", name: "preview", value: song.preview })
                ),
                React.createElement(
                    "form",
                    { className: "close", action: "/deleteSharedSong", name: song.name },
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

//get the songs users have shared
var loadSongsFromServer = function loadSongsFromServer() {
    sendAjax('GET', '/getSharedSongs', null, function (data) {
        ReactDOM.render(React.createElement(SongListWindow, { domos: data.songs }), document.querySelector("#content"));
    });
};

//set up initial view and DOM
var setup = function setup(csrf) {
    loadSongsFromServer(csrf);
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
            console.log(xhr.responseText);
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};
