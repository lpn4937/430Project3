const handleDomo = (e) => {
    e.preventDefault();

    $("#domoMessage").animate({width:'hide'},350);
    
    if($("#domoName").val() == '' || $("#domoAge").val() == ''){
        handleError("RAWR! All fields are required");
        return false;
    }

    sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function() {
        loadDomosFromServer();
    });

    return false;
}

const DomoForm = (props) => {
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
        <section className="formFormat">
            <h2>Add a song</h2>
            <form id="songForm" name="songForm" action="/maker" method="POST" class="pageForm">
            <div className="form-group">
            <label for="name">Name: </label>
            <input className="form-control" id="songName" type="text" name="name" placeholder="Song Name"/>
            </div>
            <div className="form-group">
            <label for="artist">Artist: </label>
            <input className="form-control" id="songArtist" type="text" name="artist" placeholder="Song Artist"/>
            </div>
            <div className="form-group">
            <label for="album">Album: </label>
            <input className="form-control" id="songAlbum" type="text" name="album" placeholder="Song Album"/>
            </div>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="btn btn-primary" type="submit" value="Make Song" />
            </form>
            <div id="errorMessage"></div>
        </section>
    );
};

const handleRemoveDomo = (e) => {
    e.preventDefault();
    
    $("#domoMessage").animate({width:'hide'},350);
    
    if($("#domoRemoveName").val() == ''){
        handleError("RAWR! All fields are required");
        return false;
    }

    sendAjax('GET','/removeDomo',$("#removeForm").serialize(),(data)=>{
        loadDomosFromServer();
    });
    loadDomosFromServer();
    return false;
}

const RemoveDomoForm = (props) => {
    return (
        <form id="removeForm" onSubmit={handleRemoveDomo} name="domoForm" action="/maker" method="POST" className = "domoForm">
            <label htmlFor="name">Name: </label>
            <input id="domoRemoveName" type="text" name="name" placeholder="Domo Name" />
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeDomoSubmit" type="submit" value="Remove Domo" />
        </form>
    );
};

const DomoList = function(props) {
    if(props.domos.length === 0) {
        return (
            <div className="domoList">
                <h3 className="emptyDomo">No Domos yet</h3>
            </div>
        );
    }

    const domoNodes = props.domos.map(function(domo){
        return (
            <div key={domo._id} className="domo">
                <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
                <h3 className="domoName">Name: {domo.name}</h3>
                <h3 className="domoAge">Age: {domo.age}</h3>
                <h3 className="domoPerception">Perception: {domo.perception}</h3>
            </div>
        );
    });

    return (
        <div className="domoList">
            {domoNodes}
        </div>
    );
};

const loadDomosFromServer = () => {
    sendAjax('GET','/getDomos',null,(data)=>{
        ReactDOM.render(
            <DomoList domos={data.domos} />, document.querySelector("#domos")
        );
    });
};

const setup = function(csrf) {
    ReactDOM.render(
        <DomoForm csrf={csrf} />, document.querySelector("#makeDomo")
    );
    ReactDOM.render(
        <RemoveDomoForm csrf={csrf} />, document.querySelector("#removeDomo")
    );

    ReactDOM.render(
        <DomoList domos={[]} />, document.querySelector("#domos")
    );

    loadDomosFromServer();
};

const getToken = () => {
    sendAjax('GET','/getToken',null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});