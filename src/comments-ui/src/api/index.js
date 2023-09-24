export const Api = {
  call(url, method, body = {}) {
    const data = {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    };
    if ( body != null && Object.keys(body).length > 0) {
      data.body = JSON.stringify(body);
    }
    return fetch(url, data).then(response => {
      return response;
    }).catch(error => {
      console.log("Error in Fetch ", error)
    });
  },

  get(url) {
    return this.call(url, 'get');
  },

  post(url, body = {}) {
    return this.call(url, 'post', body);
  },

  delete(url) {
    return this.call(url, 'delete');
  },
};