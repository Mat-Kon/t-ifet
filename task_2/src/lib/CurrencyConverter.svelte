<script lang="ts">
  import SelectCurrency from "./SelectCurrency.svelte";

  let baseCurrency: string = 'USD';
  let targetCurrency: string = 'EUR';
  let baseAmount: number = 0;
  let targetAmount: number = 0;

  async function fetchExchangeRate(base: string, target: string): Promise<number> {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${base}`);
    const data = await response.json();
    return data.rates[target];
  }

  async function convertCurrency() {
    const rate = await fetchExchangeRate(baseCurrency, targetCurrency);
    targetAmount = Number((baseAmount * rate).toFixed(2));
  }

  const handleChangeBaseCurrency = (e: Event) => {
    baseCurrency = (e.target as HTMLSelectElement).value;
    convertCurrency();
  };

  const handleChangeTargetCurrency = (e: Event) => {
    targetCurrency = (e.target as HTMLSelectElement).value;
    convertCurrency();
  };

  const handleConvertBaseAmount = async () => {
    const rate = await fetchExchangeRate(baseCurrency, targetCurrency);
    targetAmount = Number((baseAmount * rate).toFixed(2));
  }

  const handleConvertTargetAmount = async () => {
    const rate = await fetchExchangeRate(targetCurrency, baseCurrency);
    baseAmount = Number((targetAmount * rate).toFixed(2));
  }
</script>

<div class="converter">
  <label class="converter__amount">
    Base Currency:
    <input type="number" bind:value={baseAmount} on:input={handleConvertBaseAmount}/>
    Amount:
    <input type="number" bind:value={targetAmount} on:input={handleConvertTargetAmount}/>
  </label>

  <SelectCurrency
    name="Base Currency:"
    currentValue={baseCurrency}
    handleChange={handleChangeBaseCurrency}
  />

  <SelectCurrency
    name="Target Currency:"
    currentValue={targetCurrency}
    handleChange={handleChangeTargetCurrency}
  />
</div>

<style>
  .converter {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: var(--dec);
    height: fit-content;
    padding: 10px;
    border-radius: 15px;
    background-color: var(--color-light);
    box-shadow: 0px 0px 50px -20px var(--color-light)
  }

  .converter__amount > input {
    padding: 5px;
    border-radius: 5px;
  }
</style>
