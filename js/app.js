"use strict";

angular
  .module("wdinstagram", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .factory("InstaFactory", [
    "$resource",
    InstaFactoryFunction
  ])
  .controller("wdiIndexCtrl", [
    "InstaFactory",
    wdinstagramIndexController
  ])
  .controller("wdiNewCtrl", [
    "InstaFactory",
    "$state",
    wdinstagramNewController
  ])
  .controller("wdiShowCtrl", [
    "InstaFactory",
    "$stateParams",
    wdinstagramShowController
])
  .controller("wdiEditCtrl", [
    "InstaFactory",
    "$stateParams",
    "$state",
    wdinstagramEditController
  ])

function RouterFunction( $stateProvider ){
  $stateProvider
  .state("wdiIndex", {
    url: "/instas",
    templateUrl: "js/ng-views/index.html",
    controller: "wdiIndexCtrl",
    controllerAs: "vm"
  })
  .state("wdiNew", {
    url: "/instas/new",
    templateUrl: "js/ng-views/new.html",
    controller: "wdiNewCtrl",
    controllerAs: "vm"
  })
  .state("wdiShow", {
    url: "/instas/:id",
    templateUrl: "js/ng-views/show.html",
    controller: "wdiShowCtrl",
    controllerAs: "vm"
  })
  .state("wdiEdit", {
    url: "/instas/:id/edit",
    templateUrl: "js/ng-views/edit.html",
    controller: "wdiEditCtrl",
    controllerAs: "vm"
  })
}

function InstaFactoryFunction( $resource ){
  return $resource("http://localhost:3000/entries/:id", {}, {  update: { method: "Put" }
  })
}

function wdinstagramIndexController( InstaFactory ){
  this.instas = InstaFactory.query()
}

function wdinstagramNewController( InstaFactory, $state ){
  this.insta = new InstaFactory()
  this.create = function(){
    this.insta.$save(function(insta) {
      $state.go("wdiShow", {id: insta.id})
    })
  }
}

function wdinstagramShowController(InstaFactory, $stateParams){
  this.insta = InstaFactory.get({id: $stateParams.id})
}

function wdinstagramEditController( InstaFactory, $stateParams, $state ){
  this.insta = InstaFactory.get({id: $stateParams.id})
  this.update = function(){
    this.insta.$update({id: $stateParams.id }, function(insta) {
      $state.go("wdiShow", {id: insta.id})
    })
  }
  this.destroy = function(){
    this.insta.$delete({id: $stateParams.id}, function(insta) {
      $state.go("wdiIndex")
    })
  }
}
// let data = [
//   {author: "Ick", body: "This is first instagram body.", photo_url: "http://www.thephoblographer.com/wp-content/uploads/2016/09/instagram-770x433.jpg", id: 0},
//   {author: "Hyun", body: "This is second instagram body.", photo_url: "http://www.thephoblographer.com/wp-content/uploads/2016/09/instagram-770x433.jpg", id: 1},
//   {author: "Kwon", body: "This is third instagram body.", photo_url: "http://www.thephoblographer.com/wp-content/uploads/2016/09/instagram-770x433.jpg", id: 2}
// ]
