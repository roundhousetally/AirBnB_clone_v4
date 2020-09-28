const ch = [];

$(document).ready(function () {
  $('li input').click(function () {
    if ($(this).is(':checked')) {
      const tmp = $(this).attr('data-name');
      ch.push($(this).attr('data-name'));
      $('.amenities h4').text(ch.join(', '));
    } else {
      for (let i = 0; i < ch.length; i++) {
        if (ch[i] === $(this).attr('data-name')) {
          ch.splice(i, 1);
        }
      }
      if (ch !== undefined && ch.length > 0) {
        $('.amenities h4').text(ch.join(', '));
      } else {
        $('.amenities h4').text('\xa0');
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
  $.ajax({
    url: 'http://localhost:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: "{}",
    success: function (result) {
      for (let i in result) {
        $('.places').append('<article>\n<h2>' + result[i].name + '</h2>   <div class="price_by_night"><h3>${i.price_by_night}</h2></div>\n   <div class="information" role="list">\n      <div class="max_guest" title="Number of Guests"><h3>${i.max_guest} Guest{% if i.max_guest != 1 %}s{% endif %}</h3></div>\n      <div class="number_rooms">${i.number_rooms} Bedroom{% if i.number_rooms != 1 %}s{% endif %}</div>\n<div class="number_bathrooms">${i.number_bathrooms} Bathroom{% if place.number_bathrooms != 1 %}s{% endif %}</div>\n   </div>\n   <div class="user"><b>Owner:</b> ${i.user.first_name} ${i.user.last_name}</div>\n   <div class="description">${i.description}</div>\n</article>\n');
   }}});
});
