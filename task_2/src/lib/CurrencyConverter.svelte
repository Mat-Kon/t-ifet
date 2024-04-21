<script lang="ts">
  import { fetchExchangeRate } from "../until/helperFunctions";

  let baseCurrency: string = "USD";
  let targetCurrency: string = "EUR";
  let baseAmount: number = 0;
  let targetAmount: number = 0;

  const handleConvertBaseAmount = async () => {
    const rate = await fetchExchangeRate(baseCurrency, targetCurrency);
    if (baseAmount < 0) {
      baseAmount = 0;
      targetAmount = Number((baseAmount * rate).toFixed(2));
    } else {
      targetAmount = Number((baseAmount * rate).toFixed(2));
    }
  };

  const handleConvertTargetAmount = async () => {
    const rate = await fetchExchangeRate(targetCurrency, baseCurrency);
    if (targetAmount < 0) {
      targetAmount = 0;
      baseAmount = Number((baseAmount * rate).toFixed(2));
    } else {
      baseAmount = Number((targetAmount * rate).toFixed(2));
    }
  };

  const handleChangeBaseCurrency = (e: Event) => {
    const newValue = (e.target as HTMLSelectElement).value;
    baseCurrency = newValue;
    handleConvertBaseAmount();
  };

  const handleChangeTargetCurrency = (e: Event) => {
    const newValue = (e.target as HTMLSelectElement).value;
    targetCurrency = newValue;
    handleConvertTargetAmount();
  };
</script>

<div class="converter">
  <label class="converter__amount">
    Base Currency:
    <input
      type="number"
      min={0}
      bind:value={baseAmount}
      on:change={handleConvertBaseAmount}
    />
  </label>

  <label class="converter__amount">
    Amount:
    <input
      type="number"
      min={0}
      bind:value={targetAmount}
      on:change={handleConvertTargetAmount}
    />
  </label>

  <label class="converter__currency">
    Base Currency:
    <select bind:value={baseCurrency} on:change={handleChangeBaseCurrency}>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="GBP">GBP</option>
    </select>
  </label>

  <label class="converter__currency">
    Target Currency:
    <select bind:value={targetCurrency} on:change={handleChangeTargetCurrency}>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="GBP">GBP</option>
    </select>
  </label>
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
    box-shadow: 0px 0px 50px -20px var(--color-light);
  }

  .converter__amount > input, .converter__currency > select{
    border-radius: 5px;
    padding: 5px;
  }
</style>
