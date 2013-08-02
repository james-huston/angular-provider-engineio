
describe('angular-providers-engineio provider', function () {

  beforeEach(module('angular-providers-engineio'));

  var eioProvider;

  beforeEach(inject(function (engineio) {
    eioProvider = engineio;
    eioProvider.connect('ws://localhost:7000');
  }));

  describe('when connecting with the client', function () {
    it('should have a socket object', function () {
      var socket = eioProvider.getSocket();
      expect(socket).toEqual(jasmine.any(Object));
      expect(socket.readyState).toEqual('opening');
    });
  });

  describe('when sending a message to our echo server', function () {
    var returnData;
    it('should echo back', function () {
      eioProvider.on('message', function (data) {
        returnData = data;
      });

      runs(function () {
        eioProvider.send(JSON.stringify({message: 'blarg!'}));
      });

      waitsFor(function () {
        if (returnData) {
          return true;
        }
      }, "we should get data", 500);

      runs(function () {
        expect(returnData).toEqual(jasmine.any(String));
        var response = JSON.parse(returnData);
        expect(response.message).toEqual('blarg!');
      });

    });
  });

  

});