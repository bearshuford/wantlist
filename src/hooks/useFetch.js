function useFetch() {
  const options = {
    mode: "cors",
    headers: { "user-agent": "wantlist" },
  };

  function get(url) {
    let promise = fetch(url, options);
    return promise;
  }

  return { get };
}

export default useFetch;
