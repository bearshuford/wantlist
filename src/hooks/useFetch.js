function useFetch() {
  // request hook that has two functions get and post
  const options = {
    headers: { "user-agent": "Grant" },
  };
  function get(url) {
    let promise = fetch(url, options);
    return promise;
  }

  return { get };
}

export default useFetch;
