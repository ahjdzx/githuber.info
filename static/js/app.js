var App = angular.module('App', ['ngRoute']);
var db = new LocalDB("githuber.info")
var collection = db.collection("userInfo")

function updateLocalDB() {
    collection.drop()
    collection.insert(window.config)
}
collection.find().then(function(data) {
    if (data.length) {
        window.config = data[0]
    } else {
        window.config = {}
    }
})

function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}

function b64_to_utf8(str) {
    return decodeURIComponent(escape(window.atob(str)));
}
App.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/index', {
        templateUrl: '/static/tpl/index.html'
    }).
    when('/about', {
        templateUrl: '/static/tpl/about.html'
    }).
    when('/donate', {
        templateUrl: '/static/tpl/donate.html'
    }).
    when('/search/:targetUser', {
        controller: 'searchCtl',
        templateUrl: 'static/tpl/search.html'
    }).
    otherwise({
        redirectTo: '/index'
    });
}]);