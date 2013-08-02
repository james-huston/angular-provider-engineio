/**
 * Engine.io provider for AngularJS
 * @version v0.1.0-dev-2013-08-02
 */
(function (window, angular, undefined) {

angular.module('angular-providers-engineio', [])
  .provider('engineio', function () {
    this.socketServer = '';

    this.setSocketServer = function (socketServerUrl) {
      this.socketServer = socketServerUrl;
    };

    this.$get = function ($rootScope) {
      var self = this;
      var socket;

      var connect = function connect(socketServerUrl) {
        if (!socketServerUrl) {
          throw new Error('You must specify the socket server for angular-providers-engineio.');
        }

        self.setSocketServer(socketServerUrl);

        socket = new eio.Socket(self.socketServer);
      };

      function getSocket() {
        return socket;
      }

      function onFunction(type, callback) {
        socket.on(type, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        });
      }

      function sendFunction(message) {
        socket.send(message);
      }

      return {
        connect: connect,
        getSocket: getSocket,
        on: onFunction,
        send: sendFunction
      };

    };
  });
})(window, window.angular);