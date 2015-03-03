

var App = function() {
    this.myPhotoBrowser = null;
    this.app = new Framework7();
};

App.prototype = {
    init: function() {
        var _this = this;
        StatusBar.styleBlackTranslucent()
        navigator.splashscreen.hide();

        var mainView = this.app.addView('.view-main', {
            dynamicNavbar: true
        });
        _this.myPhotoBrowser = null;
        this.loadData();
        $('#J_content').on('click', 'img', function() {
            var $img = $(this);
            var index = $('#J_content img').index(this);
            _this.myPhotoBrowser && _this.myPhotoBrowser.open(index); // 打开图片浏览器
        });

        $('.J_camera').on('click', function() {
            navigator.camera.getPicture(function(url) {
                $('#J_camera_img').attr('src', url);
            }, function(msg){
                _this.app.alert(msg);
            }, {quality: 50} );
        });
        $('.J_camera_clean').on('click', function() {
            navigator.camera.cleanup(function() {
                _this.app.alert('摄像机清理干净');
            }, function(msg) {
                _this.app.alert(msg);
            });
        });

    },
    loadData: function() {
        var _this = this;
        this.app.showPreloader();
        $.get('http://api.laiwang.com/v1/internal/webapp/version_config/get', function(json) {
            _this.app.hidePreloader();
            var html = template('J_tmpl_config', json.config);
            $('#J_config').html(html);
        });

        $.ajax({
            url: 'http://api.laiwang.com/v2/internal/event/eventTopById.jsonp',
            dataType: 'jsonp',
            success: function(data) {
                var html = template('J_tmpl_list', {list: data});
                $('#J_content').html(html);

                //
                var result = [];
                $.each($('img'), function(i, item) {
                    result.push(item.src);
                });
                _this.myPhotoBrowser = _this.app.photoBrowser({
                    zoom: 400,
                    photos: result,
                    type: 'popup',
                    theme: 'dark'
                });
            },
            error: function() {

            }
        });
    }
}
var app = new App();
document.addEventListener('deviceready', function() {
    app.init();
}, false);
document.addEventListener('pause', function() {

}, false);
document.addEventListener('resume', function() {
    //app.loadData();
}, false);
