/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    log: function(text) {
        $('#app').append('<p>' + text + '</p>')
    },
    onDeviceReady: function() {
        //navigator.splashscreen.show();
        //navigator.splashscreen.hide();
        //app.receivedEvent('deviceready');
        //var root = cordova.file.applicationDirectory;
        var root = cordova.file.dataDirectory;
        root = root + 'www/';
        //var root = cordova.file.documentsDirectory;
        app.log(root);
        var fileTransfer = new FileTransfer();
        var localData = JSON.parse(localStorage.getItem('localData'));
        //var version = localData ? localData.config.version : '';
        var version = '';
        app.log(version);
        $.get('http://10.125.196.216:7001/v1/internal/webapp/version_config/get?version=' + version, function(data) {
            app.log(JSON.stringify(data));
            if(data.hasNewVersion === false) {
                app.log('内容没有更新');
                //location.href = root + 'app.test/index.html';
                //var url = root + 'app.test/index.html';
                /*$.get(url, function(text) {
                    var html = text.replace(/[\s\S]*<body>([\s\S]*)/, '$1');
                    alert(html);
                    alert($('<div>' + text + '</div>').find('.apis').html())
                })*/
                //return;
            }
            //TODO: 遍历文件变化
            var apps = data.config.webapps;
            var appLen = apps.length;
            apps.forEach(function(item) {
                var name = item.name;
                var len = item.files.length;
                item.files.forEach(function(file) {
                    var url = encodeURI(file.url);
                    var fileUrl = root + name + '/' + file.path;
                    fileTransfer.download(url, fileUrl, function(entry) {
                        //alert(entry.toURL() + '下载完成');
                        app.log(entry.toURL() + '下载完成');
                        len --;
                        if(len === 0) {
                            appLen --;
                            app.log('下载完成' + item.name)
                            if(appLen === 0) {
                                app.log('全部下载完成');
                                navigator.notification.alert('全部下载完成', null, '提示');
                                navigator.splashscreen.hide();
                                //localStorage.setItem('localData', JSON.stringify(data));
                                location.href = root + 'app.test/index.html';
                            }
                        }
                    }, function(err) {
                        app.log('下载失败' + JSON.stringify(err));
                    })
                });
            });
        });
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
