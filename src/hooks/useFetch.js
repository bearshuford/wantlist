function useFetch() {
  const options = {
    headers: { "user-agent": "wantlist //v0.1" },
  };

  function get(url) {
    let promise = fetch(url, options);
    return promise;
  }

  return { get };
}

export default useFetch;
