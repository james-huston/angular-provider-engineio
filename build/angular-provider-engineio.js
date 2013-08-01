/**
 * Engine.io provider for AngularJS
 * @version v0.1.0-dev-2013-08-01
 */
(function (window, angular, undefined) {

angular.module('angular-providers-engineio', [])
  .provider('engineio', function () {
    this.socketServer = '';

    this.setSocketServer = function (socketServerUrl) {
      this.socketServer = socketServerUrl;
    };

    this.$get = function ($rootScope) {

      if (!this.socketServer) {
        throw new Error('You must specify the socket server for angular-providers-engineio.');
      }

      var socket = io.connect(this.socketServer);

      // return socket;

      var emitFunction = function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          $rootScope.$apply(function () {
            var args = arguments;
            if (callback) {
              callback.apply(socket, args);
            }
          });
        });
      };

      var onFunction = function (eventName, callback) {
        socket.on(eventName, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      };

      var onErrorFunction = function (callback) {
        socket.socket.onError(function () {
          $rootScope.$apply(function() {
            callback.apply(socket, arguements);
          });
        });
      };

      return {
        on: onFunction,
        emit: emitFunction,
        onError: onErrorFunction,
        socket: socket
      };

    };
  });
})(window, window.angular);