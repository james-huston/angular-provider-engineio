/**
 * Angular-Provider-EngineIo
 *
 * Provider for connecting to and working with Engine.io
 * from your angular app.
 *
 * @author James Huston <jhuston@redventures.com>
 * @since 2013-08-02
 */
angular.module('angular-provider-engineio', [])
  .provider('engineio', function () {
    this.socketServer = null;

    this.setSocketServer = function (socketServerUrl) {
      this.socketServer = socketServerUrl;
    };

    this.$get = function ($rootScope) {
      var self = this;
      var socket;

      var connect = function connect(socketServerUrl) {
        socketServerUrl = socketServerUrl || null;
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
