<script lang="ts">
  import CurrencyConverter from './lib/CurrencyConverter.svelte';
</script>

<main>
  <div class="wrapper">
    <CurrencyConverter />
  </div>
</main>

<style>
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    height: 100vh;
    margin: auto;
    font-size: var(--font-size-content);
  }
</style>
