export const post: RequestHandler<Locals, FormData> = async (request) => {
  // request.locals.userid comes from src/hooks.js
  const response = await api(request, `todos/${request.locals.userid}`);

  if (response.status === 404) {
    // user hasn't created a todo list.
    // start with an empty array
    return { body: [] };
  }

  return response;
};
