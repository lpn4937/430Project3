//display shared songs on page
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
                    </form>
                    <form className="close" action="/deleteSharedSong" name={song.name}>
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

//get the songs users have shared
const loadSongsFromServer = () => {
    sendAjax('GET','/getSharedSongs',null,(data)=>{
        ReactDOM.render(
            <SongListWindow domos={data.songs} />, document.querySelector("#content")
        );
    });
};

//set up initial view and DOM
const setup = (csrf) => {
    loadSongsFromServer(csrf);
};

const getToken = () => {
    sendAjax('GET','/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function(){
    getToken();
});