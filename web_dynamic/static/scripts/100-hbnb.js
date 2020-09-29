const ch = [];
const aIdlist = [];
const stCi = [];
const sIdlist = [];
const cIdlist = [];

$(document).ready(function () {
  $('#amenity_inp').click(function () {
    if ($(this).is(':checked')) {
      ch.push($(this).attr('data-name'));
      aIdlist.push($(this).attr('data-id'));
      $('.amenities h4').text(ch.join(', '));
    } else {
      for (let i = 0; i < ch.length; i++) {
        if (ch[i] === $(this).attr('data-name')) {
          ch.splice(i, 1);
          aIdlist.splice(i, 1);
        }
      }
      if (ch !== undefined && ch.length > 0) {
        $('.amenities h4').text(ch.join(', '));
      } else {
        $('.amenities h4').text('\xa0');
      }
    }
  });
  $('.st_ci').click(function () {
    if ($(this).is(':checked')) {
      stCi.push($(this).attr('data-name'));
      if ($(this).attr('id') === 'state_inp') {
        sIdlist.push($(this).attr('data-id'));
      } else {
        cIdlist.push($(this).attr('data-id'));
      }
      $('.locations h4').text(stCi.join(', '));
    } else {
      for (let i = 0; i < stCi.length; i++) {
        if (ch[i] === $(this).attr('data-name')) {
          stCi.splice(i, 1);
        }
      }
      let l;
      if ($(this).attr('id') === 'state_inp') {
        l = sIdlist;
      } else {
        l = cIdlist;
      }
      for (let i = 0; i < l.length; i++) {
        if (l[i] === $(this).attr('data-id')) {
          l.splice(i, 1);
        }
      }
      if (stCi !== undefined && stCi.length > 0) {
        $('.locations h4').text(stCi.join(', '));
      } else {
        $('.locations h4').text('\xa0');
      }
    }
  });
  $.getJSON('http://localhost:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
  getData();
  $('button').click(function () {
    getData({
      amenities: aIdlist,
      cities: cIdlist,
      states: sIdlist
    });
  });
});
function getData (data = {}) {
  $.ajax({
    url: 'http://localhost:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: function (result) {
      $('.places').empty();
      for (const i in result) {
        const first = '<article>\n<div class="title_box"><h2>' + result[i].name + '</h2>   <div class="price_by_night">' + '$' + result[i].price_by_night + '</div></div>\n   <div class="information" role="list">\n      <div class="max_guest" title="Number of Guests">' + result[i].max_guest + ' Guest';
        let second = '';
        if (result[i].max_guest !== 1) {
          second = second + 's';
        }
        second = second + '</div>\n      <div class="number_rooms">' + result[i].number_rooms + ' Bedroom';
        let third = '';
        if (result[i].number_rooms !== 1) {
          third = third + 's';
        }
        third = third + '</div>\n<div class="number_bathrooms">' + result[i].number_bathrooms + ' Bathroom';
        let fourth = '';
        if (result[i].number_bathrooms !== 1) {
          fourth = fourth + 's';
        }
        fourth = fourth + '</div>\n   </div>\n   <div class="description">' + result[i].description + '</div>\n</article>\n';
        $('.places').append(first + second + third + fourth);
      }
    }
  });
}
