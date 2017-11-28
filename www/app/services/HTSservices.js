angular.module('htsApp.services', [])

  .factory("HTSServices", ['$http','APP_SERVER', function($http,APP_SERVER) {
  var AppBase = APP_SERVER.url;
  var service = {};
  service.HezecomGetInfo = function(durl,pagingInfo){
    return $http.get(AppBase +durl,{ params: pagingInfo });
  };
  service.HezecomGetOne = function(durl){
    return $http.get(AppBase +durl);
  };
  service.HezecomPostInfo = function (durl) {
    return $http.post(AppBase +durl).then(function (results) {
      return results;
    });
  };

  service.HezecomPostNewInfo = function (durl,pdata) {
    return ($http({
      method  : 'POST',
      url     : AppBase +durl,
      data    : pdata,
      headers : {'Content-Type': 'application/x-www-form-urlencoded'}
    }))

  };

  service.HezecomUpdateInfo = function (durl) {
    return $http.put(AppBase +durl);
  };

 service.UsersAuth = function () {
   return localStorage.getItem("mytoken");

  };

  service.HezecomDeleteInfo = function (durl) {
    return $http.get(AppBase + durl);
  };

  service.htsDeleteMSG = function ($ionicPopup) {
    return $ionicPopup.confirm({
      title: 'Confirm Action',
      template: 'Are you sure you want to delete this?'
    });
  };

  service.htsConfirm = function ($ionicPopup) {
    return $ionicPopup.confirm({
      title: 'Confirm Action',
      template: 'Please confirm this action.'
    });
  };

  return service;
}]);

app.service('FeedList', function ($rootScope, FeedLoader, $q){
  this.get = function(feedSourceUrl) {
    var response = $q.defer();
    //num is the number of results to pull form the source
    FeedLoader.fetch({q: feedSourceUrl, num: 20}, {}, function (data){
      response.resolve(data.responseData);
    });
    return response.promise;
  };
});

// BOOKMARKS FUNCTIONS
app.service('BookMarkService', function (_, $rootScope){

  this.bookmarkFeedPost = function(bookmark_post){

    var user_bookmarks = !_.isUndefined(window.localStorage.ionFullApp_feed_bookmarks) ?
        JSON.parse(window.localStorage.ionFullApp_feed_bookmarks) : [];

    //check if this post is already saved

    var existing_post = _.find(user_bookmarks, function(post){ return post.link == bookmark_post.link; });

    if(!existing_post){
      user_bookmarks.push({
        link: bookmark_post.link,
        title : bookmark_post.title,
        date: bookmark_post.publishedDate,
        excerpt: bookmark_post.contentSnippet
      });
    }

    window.localStorage.ionFullApp_feed_bookmarks = JSON.stringify(user_bookmarks);
    $rootScope.$broadcast("new-bookmark");
  };

  this.bookmarkWordpressPost = function(bookmark_post){

    var user_bookmarks = !_.isUndefined(window.localStorage.ionFullApp_wordpress_bookmarks) ?
        JSON.parse(window.localStorage.ionFullApp_wordpress_bookmarks) : [];

    //check if this post is already saved

    var existing_post = _.find(user_bookmarks, function(post){ return post.id == bookmark_post.id; });

    if(!existing_post){
      user_bookmarks.push({
        id: bookmark_post.id,
        title : bookmark_post.title,
        date: bookmark_post.date,
        excerpt: bookmark_post.excerpt
      });
    }

    window.localStorage.ionFullApp_wordpress_bookmarks = JSON.stringify(user_bookmarks);
    $rootScope.$broadcast("new-bookmark");
  };

  this.getBookmarks = function(){
    return {
      feeds : JSON.parse(window.localStorage.ionFullApp_feed_bookmarks || '[]'),
      wordpress: JSON.parse(window.localStorage.ionFullApp_wordpress_bookmarks || '[]')
    };
  };
});

app.filter('htstogo', function() {
  return function(millseconds) {
    var oneSecond = 1; //or millsecon=1000
    var oneMinute = oneSecond * 60;
    var oneHour = oneMinute * 60;
    var oneDay = oneHour * 24;

    var seconds = Math.floor((millseconds % oneMinute) / oneSecond);
    var minutes = Math.floor((millseconds % oneHour) / oneMinute);
    var hours = Math.floor((millseconds % oneDay) / oneHour);
    var days = Math.floor(millseconds / oneDay);

    var timeString = '';
    if (days !== 0) {
      timeString += (days !== 1) ? (days + ' days ') : (days + ' day ');
    }
    if (hours !== 0) {
      timeString += (hours !== 1) ? (hours + ' hours ') : (hours + ' hour ');
    }
    if (minutes !== 0) {
      timeString += (minutes !== 1) ? (minutes + ' minutes ') : (minutes + ' minute ');
    }
    /*if (seconds !== 0 || millseconds < 1000) {
      timeString += (seconds !== 1) ? (seconds + ' seconds ') : (seconds + ' second ');
    }*/

    return timeString;
  };
});
