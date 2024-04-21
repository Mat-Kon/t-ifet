<script lang="ts">
  import { onMount } from "svelte";
  export let name: string;
  export let currentValue: number;
  export let onChange: (newValue: number) => void;

  const handleInput = (e: Event) => {
    const newValue = Number((e.target as HTMLInputElement).value);
    onChange(newValue);
  };
</script>

<label class="converter__amount">
  {name}
  <input type="number" min={0} bind:value={currentValue} on:change={handleInput} />
</label>

<style>
  .converter__amount > input {
    padding: 5px;
    border-radius: 5px;
  }
</style>