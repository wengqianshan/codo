

var App = function() {

};

App.prototype = {
    init: function() {
        navigator.splashscreen.hide();

        var myApp = new Framework7();

        var $$ = Dom7;

        var mainView = myApp.addView('.view-main', {
            dynamicNavbar: true
        });
        myApp.showPreloader();
        $.get('http://10.125.196.216:7001/v1/internal/webapp/version_config/get', function(json) {
            myApp.hidePreloader();
            $('#J_config').html(JSON.stringify(json));
        })
        
    }
}

document.addEventListener('deviceready', function() {
    new App().init();
}, false);