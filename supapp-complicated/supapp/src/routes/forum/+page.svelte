<script>
  let forums = [];
  let newTitle = "";
  let newComment = "";
  let selectedForum = null;
  let loading_f = false;

  // Charger les forums
  async function loadForums() {
    loading_f = true;
    const res = await fetch("http://localhost:4444/api/forums");
    forums = await res.json();
    loading_f = false;
  }

  // Créer un forum
  async function createForum() {
    if (!newTitle) return;
    await fetch("http://localhost:4444/api/forums", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle }),
    });
    newTitle = "";
    loadForums();
  }

  // Ajouter un commentaire
  async function addComment(forumId) {
    if (!newComment) return;
    await fetch(`http://localhost:4444/api/forums/${forumId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newComment }),
    });
    newComment = "";
    loadForums();
  }

  // Charger les forums au démarrage
  loadForums();
</script>

<a href="/">Accueil</a>
{#if loading_f}
  <p class="loading">Chargement des forums</p>
{:else}
  <div class="container">
    <h1>💬 Mini Forum</h1>

    <input bind:value={newTitle} placeholder="New topic..." />
    <button on:click={createForum}>Create Topic</button>

    {#each forums as forum}
      <div
        class="forum"
        on:click={() =>
          (selectedForum = selectedForum === forum.id ? null : forum.id)}
      >
        <h3>{forum.title}</h3>

        {#if selectedForum === forum.id}
          <div class="forum-content">
            <input
              bind:value={newComment}
              placeholder="Write a comment..."
              on:click|stopPropagation
            />
            <button on:click|stopPropagation={(e) => addComment(forum.id)}
              >Comment</button
            >

            {#each forum.comments as comment}
              <div class="comment">{comment.content}</div>
            {/each}
          </div>
        {/if}
      </div>
    {/each}
  </div>
{/if}

<style>
  :root {
    --background: #121212;
    --card-bg: #1e1e1e;
    --text-color: #e0e0e0;
    --accent: #c7c7c7;
    --border-color: #333;
  }

  :global(body) {
    font-family: "Arial", sans-serif;
    background-color: var(--background);
    color: var(--text-color);
  }

  h1 {
    text-align: center;
    color: var(--accent);
  }

  .container {
    max-width: 600px;
    margin: auto;
  }

  input {
    width: calc(100% - 22px);
    padding: 10px;
    border: 1px solid var(--border-color);
    background-color: var(--card-bg);
    color: var(--text-color);
    border-radius: 5px;
    margin-bottom: 10px;
  }

  button {
    width: 100%;
    padding: 10px;
    background-color: var(--accent);
    color: black;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
  }

  button:hover {
    background-color: var(--accent);
  }

  a {
    color: white;
    padding: 10px;
    margin: 10px;
    display: block;
  }

  .forum {
    background: var(--card-bg);
    padding: 15px;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    margin-top: 15px;
    cursor: pointer;
  }

  .forum h3 {
    margin: 0;
    color: var(--accent);
  }

  .forum-content {
    margin-top: 10px;
    padding: 10px;
    border-top: 1px solid var(--border-color);
  }

  .comment {
    background: rgba(255, 255, 255, 0.1);
    padding: 8px;
    border-radius: 5px;
    margin-top: 5px;
    font-size: 0.9em;
  }

  loading {
    text-align: center;
    color: white;
    font-weight: bold;
    font-size: 20px;
  }
</style>
