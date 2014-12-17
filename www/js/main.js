

var App = function() {

};

App.prototype = {
    init: function() {
        StatusBar.styleBlackTranslucent()
        navigator.splashscreen.hide();

        var myApp = new Framework7();

        var $$ = Dom7;

        var mainView = myApp.addView('.view-main', {
            dynamicNavbar: true
        });
        myApp.showPreloader();
        $.get('http://api.laiwang.com/v1/internal/webapp/version_config/get', function(json) {
            myApp.hidePreloader();
            var html = template('J_tmpl_config', json.config);
            $('#J_config').html(html);
        });

        $.ajax({
            url: 'http://api.laiwang.com/v2/internal/event/eventTopById.jsonp',
            dataType: 'jsonp',
            success: function(data) {
                var html = template('J_tmpl_list', {list: data});
                $('#J_content').html(html);
            },
            error: function() {

            }
        });

        $('#J_content').on('click', 'img', function() {
            var result = [];
            $.each($('img'), function(i, item) {
                result.push(item.src);
            });
            var myPhotoBrowser = myApp.photoBrowser({
                zoom: 400,
                photos: result,
                type: 'popup',
                theme: 'dark'
            });   
            myPhotoBrowser.open(); // 打开图片浏览器
        });
        
    }
}
document.addEventListener('deviceready', function() {
    new App().init();
}, false);