<script>
  export let data;
  console.log(data);
  import { onMount } from "svelte";

  let days = null;
  onMount(async () => {
    const rep = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${data.date}`
    );
    days = await rep.json();
  });
</script>

<div class="container">
  {#if !days}
    <p class="load">Chargement en cours...</p>
  {:else}
    <img src={days.hdurl} alt="pic days" />
    <div class="explain">
      <a href="/">Accueil</a>
      <h1>{days.title}</h1>
      <p class="date">{days.date}</p>
      <p class="description">{days.explanation}</p>
    </div>
  {/if}
</div>

<style>
  .container {
    background: black;
    position: relative;
    color: white;
    height: 100vh;
    width: 100vw;
    display: flex;
  }

  img {
    position: absolute;
    height: 100vh;
    width: 100vw;
    object-fit: cover;
    z-index: 1;
  }

  .explain {
    z-index: 2;
    font-family: Arial, Helvetica, sans-serif;
  }

  .explain {
    padding: 30px;
    max-width: 600px;
  }

  .explain h1 {
    text-transform: uppercase;
  }

  .explain .date,
  .explain .description {
    opacity: 80%;
    transition: all 0.3s ease;
    text-align: justify;
  }

  .explain .date {
    font-size: 15px;
  }

  .explain .date:hover,
  .explain .description:hover {
    opacity: 100%;
  }

  .explain a {
    opacity: 80%;
    display: block;
    color: white;
    font-size: 12px;
    margin-top: 40px;
    margin-bottom: -10px;
  }

  .load {
    margin: 0;
    padding: 0;
    text-align: center;
    font-size: 20px;
    text-transform: uppercase;
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 100;
  }
</style>
