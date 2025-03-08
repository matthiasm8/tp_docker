<script>
  import { onMount } from "svelte";

  let picDays = null;
  const curr_date = new Date().toJSON().slice(0, 10);
  onMount(async () => {
    const rep = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${curr_date}`
    );
    const data = await rep.json();
    picDays = data.url;
  });
</script>

<div class="container">
  <img src="/logo/nasa.png" alt="logo nasa" class="nasa" />
  <h1>Welcome <span>to</span> <span>space</span></h1>
  <a class="mars" href="/planets/mars">
    <h3>MARS</h3>
    <img src="/mars/marsfull.png" alt="mars" class="marsimg" />
  </a>
  <a href="/days/{curr_date}" class="picdays">
    {#if picDays}
      <img src={picDays} alt="ss" class="picdaysimg" />
    {:else}
      <p>Image du jour...</p>
    {/if}
  </a>
</div>

<style>
  .container {
    width: 100vw;
    height: 100vh;
    background: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .picdays {
    position: absolute;
    height: 100px;
    width: 200px;
    object-fit: cover;
    bottom: 20px;
    right: 20px;
    border: 1px solid white;
    border-radius: 10px;
    overflow: hidden;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .picdays p {
    font-size: 13px;
    color: white;
  }

  .picdays:hover {
    height: 200px;
    width: 400px;
  }

  .picdaysimg {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  img.nasa {
    height: 50px;
    margin-bottom: -10px;
  }

  .mars {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 300px;
    width: 300px;
    border-radius: 5px;
    overflow: hidden;
    margin: 15px;
    margin-top: 100px;
    text-decoration: none;
  }

  img.marsimg {
    height: 300px;
    transform: translateY(50px);
  }

  h1,
  h3 {
    text-transform: uppercase;
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 100;
  }

  .mars h3 {
    margin-bottom: -30px;
    font-weight: 800;
  }

  span {
    transition: all 0.3s ease;
  }

  span:hover {
    display: inline-block;
    transform: translate(-5px) scale(101%);
  }
</style>
