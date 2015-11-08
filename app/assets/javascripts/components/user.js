function createUser() {
  var deferred = $.Deferred();
  var url = '/users';

  $.post(url, function (result) {

    if (!result || !result['uuid']) {
      return;
    }

    deferred.resolve(result['uuid']);
  });

  return deferred.promise();
}

var getUserUUID = function () {
  var deferred = $.Deferred();
  var uuid = $.cookie('user_uuid');

  if (typeof uuid == 'undefined') {
    createUser().done(function (data) {
      $.cookie('user_uuid', data);
      deferred.resolve(data);
    })
  }
  else {
    getUserName(uuid).done(function (data) {
      deferred.resolve(uuid);
    }).fail( function(data) {
      createUser().done(function (data) {
        $.cookie('user_uuid', data);
        deferred.resolve(data);
      })
    });

  }

  return deferred.promise();
};


var getUserName = function (uuid) {
  var deferred = $.Deferred();
  var url = '/users?uuid=' + uuid;

  $.getJSON(url, function (result) {
    deferred.resolve(result['name']);
  }).fail(function() {
    deferred.reject(null);
  });

  return deferred.promise();
};


var setUserName = function (uuid, name) {
  $.ajax({
    url: '/users',
    method: 'PUT',
    data: {
      uuid: uuid,
      name: name
    }
  });
};