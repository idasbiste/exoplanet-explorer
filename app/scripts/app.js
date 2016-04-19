(function(document) {
  'use strict';

  var home = null;

  /**
   * Helper function to show the search query.
   * @param {String} response - The unparsed JSON response from get.
   */
  function addSearchHeader(response) {
    try {
      response = JSON.parse(response).query;  // you'll be moving this line out of here in the next quiz!
    } catch (e) {
      // it's 'unknown', so leave it alone
    }
    home.innerHTML = '<h2 class="page-title">query: ' + response + '</h2>';
  }

  /**
   * XHR wrapped in a promise.
   * @param  {String} url - The URL to fetch.
   * @return {Promise}    - A Promise that resolves when the XHR succeeds and fails otherwise.
   */
  function get(url) {
    /*
    This code needs to get wrapped in a Promise!
     */
    return new Promise(function (resolve, reject) {
      var req = new XMLHttpRequest();
      req.open('GET', url);
      req.onload = function() {
        if (req.status === 200) {
          resolve(req.response);
        } else {
          reject(Error(req.statusText));
        }
      };
      req.onerror = function() {
        reject(Error('Network error'));
      };
      req.send();
    });
  }

  window.addEventListener('WebComponentsReady', function() {
    home = document.querySelector('section[data-route="home"]');
    get('data/earth-like-ressults.json')
    .then(function (response) {
      addSearchHeader(response);
    })
    .catch(function (response) {
      console.log(response);
      addSearchHeader('unknown');
    });
  });
})(document);
