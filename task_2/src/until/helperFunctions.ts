const fetchExchangeRate = async (base: string, target: string) => {
  try {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${base}`);

    if (!response.ok) {
      throw new Error(`${response.statusText}`);
    }
    const data = await response.json();
    return data.rates[target];
  } catch(e) {
    throw new Error(`Error in get rate: ${e}`);
  }
}

export { fetchExchangeRate }