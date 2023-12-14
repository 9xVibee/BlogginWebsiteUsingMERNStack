import axios from "axios";

//   create_new_arr will basically remove previous data and get new result
//   if we put it as false it will add the new search data in the previous data
//   basically duplicate data will be showned to the client side!
export const filterPaginationData = async ({
  create_new_arr = false,
  prevState,
  data,
  page,
  countRoute,
  data_to_send = {},
}) => {
  let obj;

  if (prevState.length !== 0 && !create_new_arr) {
    obj = {
      ...prevState,
      results: [...prevState.results, ...data],
      page: page,
    };
  } else {
    await axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/blog" + countRoute, {
        data_to_send,
      })
      .then(({ data: { totalDocs } }) => {
        obj = { results: data, page: 1, totalDocs };
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return obj;
};
