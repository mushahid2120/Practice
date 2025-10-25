
export const apiMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    const BASE_URL = "https://fakestoreapi.com";
    if (action.type === "api/makeCall") {
      next(action);
      const {url,onStart,onSuccess,onError} = action.payload;
      fetch(`${BASE_URL}/${url}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            dispatch({type:onSuccess,payload: data})
        }).catch((error)=>{
            dispatch({type:onError})
        })
    } else next(action);
  };

export const fetchData = (payload) => ({ type: "api/makeCall", payload });
