<script>
  let city = "";
  let weather = null;
  let error = null;

  async function getWeather() {
    if (!city) return;
    error = null;

    try {
      const res = await fetch(`http://localhost:44444/api/weather/${city}`);
      console.log(res);
      if (!res.ok) throw new Error("City not found");

      weather = await res.json();
    } catch (err) {
      error = err.message;
      weather = null;
    }
  }
</script>

<div class="container">
  <h1>Terre</h1>

  <p></p>

  <input bind:value={city} placeholder="Enter city..." />
  <button on:click={getWeather}>Get Weather</button>

  {#if error}
    <p style="color: red;">{error}</p>
  {/if}

  {#if weather}
    <div class="weather-card">
      <h2>{weather.city}</h2>
      <img src={weather.icon} alt="Weather Icon" />
      <p>{weather.description}</p>
      <h3>{weather.temperature}°C</h3>
    </div>
  {/if}
</div>

<style>
  .container {
    color: white;
    min-height: 100vh;
    background: url("/terre/background.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    padding: 40px;
  }

  a {
    color: white;
  }

  h1 {
    text-transform: uppercase;
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 800;
    font-size: 80px;
    margin: 0;
  }
</style>
