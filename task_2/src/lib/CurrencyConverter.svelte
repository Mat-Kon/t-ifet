<script lang="ts">
  import { fetchExchangeRate } from "../untils/helperFunctions";
  import InputCurrency from "./InputCurrency.svelte";
  import SelectCurrency from "./SelectCurrency.svelte";

  let baseCurrency: string = "USD";
  let targetCurrency: string = "EUR";
  let baseAmount: number = 0;
  let targetAmount: number = 0;
  let isError = false;
  let errorMessage = "The number cannot be negative.";

  const handleChangeBaseCurrency = (e: Event) => {
    baseCurrency = (e.target as HTMLSelectElement).value;
    handleConvertBaseAmount(baseAmount);
  };

  const handleChangeTargetCurrency = (e: Event) => {
    targetCurrency = (e.target as HTMLSelectElement).value;
    handleConvertTargetAmount(targetAmount);
  };

  const handleConvertBaseAmount = async (baseAmount: number) => {
    const rate = await fetchExchangeRate(baseCurrency, targetCurrency);
    targetAmount = Number((baseAmount * rate).toFixed(2));
  };

  const handleConvertTargetAmount = async (targetAmount: number) => {
    const rate = await fetchExchangeRate(targetCurrency, baseCurrency);
    baseAmount = Number((targetAmount * rate).toFixed(2));
  };

</script>

<div class="converter">
  <InputCurrency
    name="Base Currency:"
    currentValue={baseAmount}
    onChange={handleConvertBaseAmount}
  />

  <InputCurrency
    name="Amount:"
    currentValue={targetAmount}
    onChange={handleConvertTargetAmount}
  />

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
    box-shadow: 0px 0px 50px -20px var(--color-light);
  }
</style>
