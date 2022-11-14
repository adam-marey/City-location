/*  JavaScript 6th Edition
    Chapter 10
    Hands-on Project 10-5

    Author: Sulaiman Marey
    Date:   Nov/13/2022

    Filename: script.js
*/

'use strict';

// global variables
//1. Create a variable, waitForUser, that will be used to track whether or not the user wants to permit location tracking
var waitForUser;

function setUpPage() {
  var buttons = document.querySelectorAll('#cities div');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', createMap, false);
  }
}

function geoTest() {
  //2. Give the user 10 seconds, and if no choice made for allowing location tracking, call "fail" function
  //alert(1);
  waitForUser = setTimeout(fail, 10000);
  //alert(waitForUser);

  //1st arg: default behavior
  //2nd arg: milliseconds

  if (navigator.geolocation) {
    //3. Call createMap on success:
    //navigator.geolocation.getCurrentPosition(success[, error[, options]])
    //alert(2);

    navigator.geolocation.getCurrentPosition(createMap, fail, {
      timeout: 10000,
    });
  } else {
    //alert(3);

    fail();
  }
}

function createMap(position) {
  var Lat;
  var Lng;
  //4. Clear the timeout set in the calling function (which is geoTest)
  clearTimeout(waitForUser);
  //alert(4);

  if (position.coords) {
    Lat = position.coords.latitude;
    Lng = position.coords.longitude;
  } else {
    var city = this.innerHTML;
    //5. Set city coordinates
    if (city == 'Beijing') {
      Lat = '39.912729';
      Lng = '116.395985';
    } else if (city == 'Paris') {
      Lat = '48.8565';
      Lng = '2.3954';
    } else if (city == 'Rio de Janeiro') {
      Lat = '-22.9133';
      Lng = '-43.2007';
    } else if (city == 'London') {
      Lat = '51.5';
      Lng = '0';
    } else if (city == 'Phoenix') {
      Lat = '33.448376';
      Lng = '-112.074036';
    }

    document.getElementById('caption').innerHTML = city;
  }
  var mapOptions = {
    center: new google.maps.LatLng(Lat, Lng),
    zoom: 10,
  };
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

function fail() {
  //alert(10000);
  document.getElementById('map').innerHTML =
    'Unable to access your current location.';
}

// run setUpPage() function when page finishes loading
if (window.addEventListener) {
  window.addEventListener('load', setUpPage, false);
}
