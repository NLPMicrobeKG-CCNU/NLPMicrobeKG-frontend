const Fetch = (url, method) => {
  const preHttp = "http://115.29.195.229:1203/api/v1/";
    return fetch(
      preHttp + url,
      {
        headers: {
          "content-type": "application/json",
        },
        credentials: "same-origin",
        method
      },
      
    )
      .then((response) => response.json())
      .then((response) => {
        switch (response.status) {
          case 200:
            return response.data;
          case 401:
            throw new Error("Unauthorized");
          case 500:
            throw new Error("Internal Server Error");
          default:
            return response.data;
        }
      });
  };
  export default Fetch;