var App = function() {
    this.myPhotoBrowser = null;
    this.app = new Framework7({
        pushState: true,
        swipeBackPage: false
    });
    this.mainView = this.app.addView('.view-main', {
        dynamicNavbar: true
    });

    this.logined = false;
};

App.prototype = {
    init: function() {
        var _this = this;
        //StatusBar.styleBlackTranslucent()
        //navigator.splashscreen.hide();
        var $$ = Dom7;
        $$(document).on('pageInit', function(e) {
            // Page Data contains all required information about loaded and initialized page 
            var page = e.detail.page;
            var name = page.name;
            var $$container = page.container;
            var $$navbarContainer = page.navbarInnerContainer;
            console.log('pageInit', page)
            switch (name) {
                case 'truck-update':
                    $$('.right .link', page.navbarInnerContainer).on('click', function() {
                        _this.app.alert('提交成功', '', function(){
                            _this.mainView.router.back();
                        });
                        
                    });
                    break;
                case 'list':
                    $$('.pull-to-refresh-content', page.container).on('refresh', function() {
                        console.log('lalala')
                        setTimeout(function() {
                            _this.app.pullToRefreshDone();
                        }, 2000)
                    });
                    break;
                case 'setting':
                    $$('.J_version', $$container).on('click', function() {
                        _this.app.showPreloader('检查新版本...');
                        setTimeout(function() {
                            _this.app.hidePreloader();
                        }, 2000)
                    });
                    break;
            }
        });
        if (!this.logined) {
            this.app.loginScreen();
            $('.login-screen').on('opened', function(e) {
                var $modal = $(e.target);
                $('.button').on('click', $modal, function(e) {
                    e.preventDefault();
                    _this.app.closeModal($modal);
                    _this.loadList();
                })
            });
        } else {
            //可以加载url
            this.loadList();
        }
    },
    loadList: function() {
        var _this = this;
        this.app.showPreloader('加载中...');
        setTimeout(function() {
            _this.app.hidePreloader();
            _this.mainView.router.load({
                url: 'pages/pub/list.html',
                query: {
                    refresh: true,
                    id: 123
                },
                pushState: false,
                animatePages: false,
                reload: true,
                //force: true
            });
        }, 2000)
        
    },
    //重置客户端
    reset: function() {

    }
}
var app = new App();
//app.logined = true;
app.init();
document.addEventListener('deviceready', function() {
    app.init();
}, false);
document.addEventListener('pause', function() {

}, false);
document.addEventListener('resume', function() {
    //app.loadData();
}, false);