function createUser() {
  var deferred = $.Deferred();
  var url = '/users?name=#{name}';

  $.post(url, function (result) {

    if (!result || !result['uuid']) {
      return;
    }

    deferred.resolve(result['uuid']);
  });

  return deferred.promise();
}

var getUserUUID = function() {
  var uuid = $.cookie('user_uuid');
  if (typeof uuid == 'undefined') {
    createUser().done( function(data) {
      $.cookie('user_uuid', data);
      uuid = data;
    })
  }
  return uuid;
};