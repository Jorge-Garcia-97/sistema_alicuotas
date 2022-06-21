export const get = async(url) => {
  try {
    const response = await fetch(`http://3.134.76.83:5001/${url}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

// export const getLocal = async(url) => {
//   try {
//     const response = await fetch(`http://localhost:5001/${url}`, {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//     });
//     console.log(response);
//     const json = await response.json();
//     return json;
//   } catch (error) {
//     console.error(error);
//   }
// }