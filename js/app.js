"use strict";

angular
  .module("wdinsta", [
    "ui.router"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .controller("indexController", [
    "$stateParams",
    wdinstagramIndexController
  ])
  .controller("newController", [
    "$stateParams",
    wdinstagramNewController
  ])
  .controller("showController", [
    "$stateParams",
    wdinstagramShowController
  ])

function RouterFunction($stateProvider){
  $stateProvider
  .state("wdiIndex", {
    url: "/instas",
    templateUrl: "js/ng-views/index.html",
    controller: "indexController",
    controllAs: "vm"
  })
  .state("wdiNew", {
    url: "/instas/new",
    templateUrl: "js/ng-views/new.html",
    controller: "newController",
    controllAs: "vm"
  })
  .state("wdiShow", {
    url: "/instas/:id",
    templateUrl: "js/ng-views/show.html",
    controller: "showController",
    controllAs: "vm"
  })
}

function wdinstagramIndexController() {
  this.instas = data
}

function wdinstagramNewController($stateParams) {
  this.create = function() {
    this.insta.save(function(insta){
      $state.go("wdiShow", {id: insta.id})
    })
  }
}

function wdinstagramShowController($stateParams){
  this.insta = data[$stateParams.id]
}

let data = [
  {author: "Ick", body: "This is first instagram body.", photo_url: "http://www.thephoblographer.com/wp-content/uploads/2016/09/instagram-770x433.jpg", id: 0},
  {author: "Hyun", body: "This is second instagram body.", photo_url: "http://www.thephoblographer.com/wp-content/uploads/2016/09/instagram-770x433.jpg", id: 1},
  {author: "Kwon", body: "This is third instagram body.", photo_url: "http://www.thephoblographer.com/wp-content/uploads/2016/09/instagram-770x433.jpg", id: 2}
]
