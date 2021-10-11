<script context="module" lang="ts">
  import { enhance } from '$lib/form';
  import type { Load } from '@sveltejs/kit';
  import { API_URL } from 'src/config';

  // see https://kit.svelte.dev/docs#loading
  export const load: Load = async ({ fetch }) => {

    const res = await fetch(`${API_URL}/api/auth/whoami`);

    if (res.ok) {
      const whoami = await res.json();
      if (whoami.isAuthenticated) {
        return {
            redirect: "/",
            status: 302,
        }

      };
    }
    return {};
  };
</script>

<script lang="ts">
  import { scale } from 'svelte/transition';
  import { flip } from 'svelte/animate';

  type Todo = {
    uid: string;
    created_at: Date;
    text: string;
    done: boolean;
    pending_delete: boolean;
  };

  type User = {
    username: string;
  }

  export let todos: Todo[];
  export let me: User;

  async function patch(res: Response) {
    const todo = await res.json();

    todos = todos.map((t) => {
      if (t.uid === todo.uid) return todo;
      return t;
    });
  }
</script>

<svelte:head>
  <title>Authentication</title>
</svelte:head>

<div>
  <h1>Auth</h1>

  <p>
  Hello 
  </p>

  <form
    action="{`${API_URL}/api/auth/login`}"
    method="post"
    use:enhance={{
      result: async (res, form) => {
        const created = await res.json();
        //console.log(res);
        todos = [...todos, created];

        form.reset();
      }
    }}
  >
    <input name="username" aria-label="Username" placeholder="Username" />
    <input name="password" aria-label="Password" placeholder="Password" />
    <input type="submit" aria-label="Submit" />
  </form>

</div>
