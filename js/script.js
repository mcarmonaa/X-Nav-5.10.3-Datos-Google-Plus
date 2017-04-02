  'use strict';

  $('#accordion').accordion({
    collapsible: true
  });

  var onLoadCallback = function() {
    var apiKey = 'AIzaSyDNq3PEgysmt8U3tVPZWFUtxBhDKOZ2LLw';
    gapi.client.setApiKey(apiKey);
    getInfo();
  };

  var getInfo = function() {
    $('#button').click(function() {
      $('#user').empty();
      $('#accordion').empty();
      var user = $('#userid').val();
      if (user === '') {
        return;
      }

      gapi.client.load('plus', 'v1', function() {
        var requestUser = gapi.client.plus.people.get({
          'userId': user
        });

        requestUser.execute(function(resp) {
          $('#user').append('<span><img src="' + resp.image.url + '" /></span>');
          $('#user').append('<span><h1>' + resp.displayName + ' Activities</h1></span>');
        });

        var requestActivities = gapi.client.plus.activities.list({
          'userId': user,
          'collection': 'public',
        });

        requestActivities.execute(function(resp) {
          var numItems = resp.items.length;
          for (var i = 0; i < numItems; i++) {
            var item = resp.items[i];
            $('.activities').append('<h3>' + item.url +'</h3>');
            $('.activities').append('<div>' + JSON.stringify(item) +'</div>');
          }

          $('#accordion').accordion('refresh');
        });

      });

      $('#userid').val('');
    });
  };
