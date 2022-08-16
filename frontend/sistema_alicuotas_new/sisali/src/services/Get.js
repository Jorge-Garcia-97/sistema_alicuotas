export const get = async url => {
  try {
    const response = await fetch(`http://18.231.89.19:4000/${url}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const json = response ? await response.json() : undefined;
    return json;
  } catch (error) {
    console.error(error);
  }
};
