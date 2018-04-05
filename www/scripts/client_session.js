
jQuery(document).ready(function () {

    $('#show-p8').on('click', function () {
        $('.pane').hide();  /* hide all screens */
        $('#menu').toggleClass('ui-panel-open ui-panel-closed');
        $.jStorage.deleteKey('session');
        makeUserLogin();
    });

    var session = $.jStorage.get('session', ''); // syntax: $.jStorage.get(keyname, "default value")

    //$('#debug').html(session);


    if (session) { // if  there is already a session *then* redirect to landing pane

        showApp();

    } else {// if there is no session *then* redirect to the login pane

        makeUserLogin();

    }

});

function logMeOut() {
    $('.pane').hide();  /* hide all screens */
    $('#menu').removeClass('ui-panel-open');
    $('#menu').addClass('ui-panel-closed');
    $.jStorage.deleteKey('session');
    makeUserLogin();
}

function showApp() {
    $('#pane-p0').show(); /* show home screen */
    $('#system-message').hide();
    $('#pane-p8').hide();  /* hide login screen*/
    $('#menu_btn').removeClass('hidden'); /* show menu button so user can see rest of app */
    $('.topbar button').removeClass('hidden');
}

function makeUserLogin() {

    $('#btn_login').click(function () {
        console.log('click event for login_button');

        var username = $('#username').val();
        var password = $('#password').val();

        postCredentials(username, password, createSession);

    });

    $('#menu_btn').addClass('hidden');  /* hide menu button so user cannot see rest of app */
    $('.topbar button').addClass('hidden');
    $('#pane-p0').hide();  /* hide home screen */
    $('#pane-p8').show(); /* show login screen */
}

function postCredentials(username, password, callback) {
    if ((username.length && password.length) && (username !== '' && password != '')) {

        var url = '<your_moodle_instance>/local/obu_login/token.php';
        $.post(url, {
            username: username,
            password: password,
            service: 'brookesid_ws'
        }).done(function (data) {
            token = data.token;
            dataString = JSON.stringify(data);
            if (dataString.indexOf('error') > 0) {
                showErrorDialog('<p class="error">Invalid user credentials, please try again</p>');
            }
            else {
                showLoading();
                createSession(token);
            }

        }).fail(function () {
            showErrorDialog('<p class="error">Login failed</p>');
        });

    } else {
        showErrorDialog('<p class="error">Please enter a username and password</p>');
    }
}

function createSession(token) {

    // syntax:  $.jStorage.set('keyname', 'keyvalue', {TTL: milliseconds}); // {TTL... is optional time, in milliseconds, until key/value pair expires}
    $.jStorage.set('session', token, { TTL: 28800000 });
    // redirect to whatever page you need after a successful login
    showApp();
}

function showErrorDialog(errorMsg) {
    $('#system-message').html(errorMsg);
    $('#system-message').fadeIn();
}

function showLoading() {
    $('#app-loading').append('<i class="fa fa-spinner fa-pulse fa-3"></i>');
    showApp();
}
