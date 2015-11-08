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
    deferred.resolve(uuid);
  }

  return deferred.promise();
};


var getUserName = function (uuid) {
  var deferred = $.Deferred();
  var url = '/users?uuid=' + uuid;

  $.getJSON(url, function (result) {

    if (!result || !result['name']) {
      return;
    }

    deferred.resolve(result['name']);
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