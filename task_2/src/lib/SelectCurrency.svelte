<script lang="ts">
  export let name: string;
  export let currentValue: string;
  export let handleChange: (e: Event) => void;
</script>

<label class="currency">
  {name}
  <select bind:value={currentValue} on:change={handleChange}>
    <option value="USD">USD</option>
    <option value="EUR">EUR</option>
    <option value="GBP">GBP</option>
  </select>
</label>

<style>
  .currency {
    display: flex;
    align-items: center;
    gap: var(--dec);
  }

  .currency > select {
    padding: 5px;
    border-radius: 5px;
  }
</style>