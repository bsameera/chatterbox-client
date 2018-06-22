class App {

  init() {}

  send(message) {
    $.ajax({
      type: 'POST',
      url: 'http://parse.hrsf.hackreactor.com/chatterbox/classes/messages',
      data: JSON.stringify(message),
      contentType: 'application/json'
    });
  }
  
  fetch() {
    $.ajax({
      type: 'GET',
      server: 'http://parse.hrsf.hackreactor.com/chatterbox/classes/messages',
      contentType: 'application/json'
    });
  }
}
const app = new App();




