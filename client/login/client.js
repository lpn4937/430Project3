const handleLogin = (e) => {
    e.preventDefault();

    $("#domoMessage").animate({width:'hide'},350);

    if($("#user").val() == '' || $("#pass").val() == ''){
        handleError("RAWR! Username or password is empty");
        return false;
    }

    console.log($("input[name=_csrf]").val());

    sendAjax('POST', $("#loginForm").attr("action"),$("#loginForm").serialize(), redirect);

    return false;
}

const handleSignup = (e) => {
    e.preventDefault();

    $("#domoMessage").animate({width:'hide'},350);

    if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == ''){
        handleError("RAWR! All fields are required");
        return false;
    }

    if($("#pass").val() !== $("#pass2").val()){
        handleError("RAWR! Passwords do not match");
        return false;
    }

    sendAjax('POST', $("#signupForm").attr("action"),$("#signupForm").serialize(), redirect);

    return false;
}

const LoginWindow = (props) => {
    return (
        <section className="formFormat">
            <h2>Log in</h2>
            <form className="pageForm" id="loginForm" onSubmit={handleLogin} name="loginForm" action="/login" method="POST" class="mainForm">
            <div className="form-group">
                <label for="username">Username: </label>
                <input className="form-control" id="user" type="text" name="username" placeholder="username"/>
            </div>
            <div className="form-group">
                <label for="pass">Password: </label>
                <input className="form-control" id="pass" type="password" name="pass" placeholder="password"/>
            </div>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit btn btn-primary" type="submit" value="Sign In" />
            </form>
            <div id="errorMessage"></div>
        </section>
    )
};

const SignupWindow = (props) => {
    return (
        <section className="formFormat">
            <h2>Sign Up</h2>
            <form id="signupForm" name="signupForm" onSubmit={handleSignup} action="/signup" method="POST" class="mainForm">
            <div className="form-group">
                <label for="username">Username: </label>
                <input className="form-control" id="user" type="text" name="username" placeholder="Username"/>
            </div>
            <div className="form-group">
                <label for="pass">Password: </label>
                <input className="form-control" id="pass" type="password" name="pass" placeholder="Password"/>
            </div>
            <div className="form-group">
                <label for="pass2">Password: </label>
                <input className="form-control" id="pass2" type="password" name="pass2" placeholder="Retype Password"/>
            </div>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit btn btn-primary" type="submit" value="Sign Up" />
            <div id="errorMessage"></div>
            </form>
        </section>
    )
};

const createLoginWindow = (csrf) => {
    ReactDOM.render(
        <LoginWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};
const createSignupWindow = (csrf) => {
    ReactDOM.render(
        <SignupWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

const setup = (csrf) => {
    const loginButton = document.querySelector("#loginButton");
    const signupButton = document.querySelector("#signupButton");

    signupButton.addEventListener("click",(e) => {
        e.preventDefault();
        createSignupWindow(csrf);
        console.log("signup");
        return false;
    });

    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        createLoginWindow(csrf);
        console.log("login");
        return false;
    });

    createLoginWindow(csrf);
}

const getToken = () => {
    sendAjax('GET','/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function(){
    getToken();
});