const fetchExchangeRate = async (base: string, target: string): Promise<number> =>  {
  const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${base}`);
  const data = await response.json();
  return data.rates[target];
}

export { fetchExchangeRate }