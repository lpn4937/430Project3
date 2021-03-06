const handleDomo = (e) => {
    e.preventDefault();

    $("#domoMessage").animate({width:'hide'},350);
    
    if($("#songName").val() == '' || $("#songArtist").val() == ''){
        handleError("All fields are required");
        return false;
    }

    sendAjax('POST', $("#songForm").attr("action"), $("#songForm").serialize(), function() {
        loadSongsFromServer();
    });

    return false;
}

const handleChangePass = (e) => {
    e.preventDefault();

    $("#domoMessage").animate({width:'hide'},350);

    if($("#pass").val() !== $("#pass2").val()){
        handleError("Passwords do not match");
        return false;
    }

    if($("#current").val() == '' || $("#pass").val() == '' || $("#pass2").val() == ''){
        handleError("All fields are required");
        return false;
    }

    sendAjax('POST', $("#changePasswordForm").attr("action"),$("#changePasswordForm").serialize(), redirect);

    return false;
}

const handleAddSong = (e) => {
    e.preventDefault();

    $("#domoMessage").animate({width:'hide'},350);

    if($("#songName").val() == ''){
        handleError("Song name is required");
        return false;
    }

    sendAjax('POST', $("#songForm").attr("action"),$("#songForm").serialize(), redirect);

    return false;
}

//displays add new song list
const SongFormWindow = (props) => {
    return (
        <section className="formFormat">
            <h2>Add a song</h2>
            <form id="songForm" onSubmit={handleAddSong} name="songForm" action="/maker" method="POST" class="pageForm">
            <div className="form-group">
            <label for="name">Name: </label>
            <input id="songName" className="form-control" id="songName" type="text" name="name" placeholder="Song Name"/>
            </div>
            <div className="form-group">
            <label for="artist">Artist: </label>
            <input id="songArtist" className="form-control" id="songArtist" type="text" name="artist" placeholder="Song Artist"/>
            </div>
            <div className="form-group">
            <label for="album">Album: </label>
            <input id="songAlbum" className="form-control" id="songAlbum" type="text" name="album" placeholder="Song Album"/>
            </div>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="btn btn-primary" type="submit" value="Make Song" />
            </form>
            <div id="errorMessage"></div>
        </section>
    );
};

//displays change password form
const ChangePassForm = (props) => {
    return (
        <section className="formFormat">
            <form className="form" id="changePasswordForm" onSubmit={handleChangePass} name="changePasswordForm" action="/changePassword" method="POST" class="mainForm">
            <div className="form-group">
                <label for="currentPass">Current Password: </label>
                <input className="form-control" id="current" type="password" name="currentPass" placeholder="Current Password"/>
            </div>
            <div className="form-group">
                <label for="pass">New password: </label>
                <input className="form-control" id="pass" type="password" name="pass" placeholder="New Password"/>
            </div>
            <div className="form-group">
                <label for="pass2">New Password: </label>
                <input className="form-control" id="pass2" type="password" name="pass2" placeholder="Retype Password"/>
            </div>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit btn btn-primary" type="submit" value="Change Password" />
            <div id="errorMessage"></div>

            <a className="text-light nav-link active btn btn-danger mt-5" href="/deleteAccount">Delete Account</a>
            </form>
        </section>
    );
};

//displays personal song list
const SongListWindow = function(props) {
    if(props.domos.length === 0) {
        return (
            <div className="songList">
                <h3 className="emptySong">No songs yet</h3>
            </div>
        );
    }

    const songNodes = props.domos.map(function(song){
        return (
            <div className="col-lg-2 mt-3">
                <div className="card"><img src={song.art} alt="card image cap" className="card-img-top"/>
                    <audio className="media" controls>
                        <source src={song.preview} type="audio/x-m4a"></source>
                        Your browser does not support the audio element.
                    </audio>
                    <div className="card-body">
                        <h5 className="songName">Name: </h5><p>{song.name}</p>
                        <h5 className="songArtist">Artist: </h5><p>{song.artist}</p>
                        <h5 className="songAlbum">Album: </h5><p>{song.album}</p>
                    </div>
                    <form className="text-center" action="/addToSharedList" name={song.name}>
                        <input className="d-none" type="text" name="name" value={song.name}></input>
                        <input className="d-none" type="text" name="album" value={song.album}></input>
                        <input className="d-none" type="text" name="art" value={song.art}></input>
                        <input className="d-none" type="text" name="artist" value={song.artist}></input>
                        <input className="d-none" type="text" name="preview" value={song.preview}></input>
                        <button className="btn" type="submit" aria-label="Close" name="name" value={song}>Share</button>
                    </form>
                    <form className="close" action="/deleteSong" name={song.name}>
                        <button type="submit" className="close" aria-label="Close" name="name" value={song.name}>
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </form>
                </div>
            </div>
        );
    });

    return (
        <div className="songList row top-buffer m-3">
            {songNodes}
        </div>
    );
};

//displays search results
const SearchListWindow = function(props) {
    if(props.length === 0) {
        return (
            <div className="searchList">
                <h3 className="emptySong">No results</h3>
            </div>
        );
    }

    const songNodes = props.songs.map(function(song){
        return (
            <div className="col-lg-2">
                <div className="card"><img src={song.artworkUrl100} alt="card image cap" className="card-img-top"/>
                    <audio className="media" controls>
                        <source src={song.previewUrl} type="audio/x-m4a"></source>
                        Your browser does not support the audio element.
                    </audio>
                    <div className="card-body">
                        <h5 className="songName">Name: </h5><p>{song.trackName}</p>
                        <h5 className="songArtist">Artist: </h5><p>{song.artistName}</p>
                        <h5 className="songAlbum">Album: </h5><p>{song.collectionName}</p>
                    </div>
                    <form className="text-center" action="/addToList" name={song.trackId}>
                        <button className="btn btn-primary" type="submit" aria-label="Close" name="name" value={song.trackId}>Add to my list</button>
                    </form>
                    <div className="card-footer text-center">
                        <button className="btn text-center" id={song.trackId} onClick={getInfo} aria-label="Close" name="name" value={song.trackId}>More Info</button>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className="domoList row top-buffer m-3">
            {songNodes}
        </div>
    );

};

//displays more info from search results page
const SongInfoWindow = function(props) {
    if(props.length === 0) {
        return (
            <div className="searchList">
                <h3 className="emptySong m-5">No results</h3>
            </div>
        );
    }
    let video;
    if(props.data.videoData){
        video = <video controls alt="assets/img/notfound.png">
                    <source src={props.data.videoData.previewUrl}></source>
                    Your browser does not support the video tag.
                </video>
    }
    else{
        video = <div></div>
    }
    let date = props.data.songData.releaseDate.slice(0,10);
    let ms = props.data.songData.trackTimeMillis;
    let time = `${Math.floor((ms/1000)/60) << 0} : ${Math.floor((ms/1000)%60)}`;

    return(
        <div className="col-lg-10 offset-lg-1 mt-4">
            <div className="card center-text">
                <div>{video}</div>
                <div className="card-body">
                    <h4 className="card-title">{props.data.songData.trackName}</h4>
                    <p className="card-text"><b>Artist: </b>{props.data.songData.artistName}</p>
                    <p className="card-text"><b>Album: </b>{props.data.songData.collectionName}</p>
                    <p className="card-text"><b>Genre: </b>{props.data.songData.primaryGenreName}</p>
                    <p className="card-text"><b>Album Price: </b>${props.data.songData.collectionPrice}</p>
                    <p className="card-text"><b>Release Date: </b>{date}</p>
                    <p className="card-text"><b>Song Length: </b>{time}</p>
                    <button className="btn"><a href={props.data.songData.trackViewUrl}>View in iTunes</a></button>
                    <form className="mt-4" action="/addToList" name={props.data.songData.trackId}>
                        <button className="btn btn-primary" type="submit" aria-label="Close" name="name" value={props.data.songData.trackId}>Add to my list</button>
                    </form>
                </div>
            </div>
        </div> 
    );
}

//loads songs from the user's personal list
const loadSongsFromServer = () => {
    sendAjax('GET','/getSongs',null,(data)=>{
        ReactDOM.render(
            <SongListWindow domos={data.songs} />, document.querySelector("#content")
        );
    });
};

//searches itunes for the given search term
const searchiTunes = (term) =>{
    sendAjax('GET','/searchTunes',term,(data)=>{
        ReactDOM.render(
            <SearchListWindow songs={data.songs} />, document.querySelector("#content")
        );
    });
};

//searches itunes for more info
const getInfo = (e) => {
    sendAjax('GET','/searchTunes',e.target.value,(data)=>{
        sendAjax(
            'GET',
            `https://itunes.apple.com/search?term=${data.songs[0].trackName}+${data.songs[0].artistName}&entity=musicVideo`,
            null,
            (videoData)=>{
            let propData = {songData: data.songs[0], videoData: videoData.results[0]}
            ReactDOM.render(
                <SongInfoWindow data={propData}  />, document.querySelector("#content")
            );
        });
    });
}

//sets up initial view and DOM
const setup = function(csrf) {
    ReactDOM.render(
        <SongListWindow domos={[]} />, document.querySelector("#content")
    );

    loadSongsFromServer();
    

    //add code for nav buttons
    const addNewButton = document.querySelector("#addNewButton");
    const changePassButton = document.querySelector("#changePassButton");
    const viewSongsButton = document.querySelector("#viewSongsButton");
    const searchForm = document.querySelector("#searchTunesForm");

    addNewButton.addEventListener("click",(e) => {
        e.preventDefault();
        createSongForm(csrf);
        return false;
    });
    changePassButton.addEventListener("click",(e) => {
        e.preventDefault();
        changePass(csrf);
        return false;
    });
    viewSongsButton.addEventListener("click",(e) => {
        e.preventDefault();
        loadSongsFromServer();
        return false;
    });
    searchForm.addEventListener("submit",(e) => {
        e.preventDefault();
        searchiTunes(e.target[0].value);
        return false;
    });
};

const createSongForm = (csrf) => {
    ReactDOM.render(
        <SongFormWindow csrf={csrf} />, document.querySelector("#content")
    );
};
const changePass = (csrf) => {
    ReactDOM.render(
        <ChangePassForm csrf={csrf} />, document.querySelector("#content")
    );
};



const getToken = () => {
    sendAjax('GET','/getToken',null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});