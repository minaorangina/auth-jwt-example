// https://philna.sh/blog/2016/06/13/the-surprise-multipart-form-data/
window.addEventListener('load', function () {

  const forms = document.querySelectorAll('form');

  forms.forEach(form => form.addEventListener('submit', submitForm));

  function submitForm (e) {
    e.preventDefault();
    if (window.fetch) {
      sendData(this);
    } else {
      sendDataXHR(this);
    }
  }

  function sendData (form) {
    const data = new FormData(form);
    /*
    See properties of FormData:
    for (var [key, value] of data.entries()) {
      console.log(key, value);
    }
    */
    fetch(form.action, {
      method: form.method,
      body: data
    })
    .then((res) => {
      console.table(res);
    })
    .catch(err => console.error(err));
  }

  function sendDataXHR (form) {
    const XHR = new XMLHttpRequest();
    const data = new FormData(form);

    for (var [key, value] of data.entries()) {
      console.log(key, value);
    }

    XHR.addEventListener('load', (event) => {
      console.log(event.target);
    });
    XHR.addEventListener('error', () => {
      console.error('Whoops...');
    });
    XHR.open('POST', form.action);
    XHR.send(data);
  }
});
