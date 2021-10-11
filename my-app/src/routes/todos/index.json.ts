import { api } from './_api';
import type { RequestHandler } from '@sveltejs/kit';
import type { Locals } from '$lib/types';

// GET /todos.json
export const get: RequestHandler<Locals> = async (request) => {
  // request.locals.userid comes from src/hooks.js
  const response = await api(request, `todos/${request.locals.userid}`);

  if (response.status === 404) {
    // user hasn't created a todo list.
    // start with an empty array
    return { body: [] };
  }

  return response;
};

// POST /todos.json
export const post: RequestHandler<Locals, {}> = async (request) => {
  console.log(JSON.parse(request.body));
  const response = await api(request, `todos/${request.locals.userid}`, {
    text: JSON.parse(request.body).text
  });

  return response;
};
