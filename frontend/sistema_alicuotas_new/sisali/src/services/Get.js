export const get = async url => {
  try {
    const response = await fetch(`http://localhost:4000/${url}`, {
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
