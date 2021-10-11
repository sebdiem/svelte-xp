import cookie from 'cookie';
import { v4 as uuid } from '@lukeed/uuid';
import type { Handle } from '@sveltejs/kit';

import { API_LOCAL_URL, API_URL } from './config';

export const handle: Handle = async ({ request, resolve }) => {
  const cookies = cookie.parse(request.headers.cookie || '');
  request.locals.userid = cookies.userid || uuid();

  // TODO https://github.com/sveltejs/kit/issues/1046
  if (request.query.has('_method')) {
    request.method = request.query.get('_method').toUpperCase();
  }

  const response = await resolve(request);

  if (!cookies.userid) {
    // if this is the first time the user has visited this app,
    // set a cookie so that we recognise them when they return
    response.headers['set-cookie'] = cookie.serialize('userid', request.locals.userid, {
      path: '/',
      httpOnly: true
    });
  }

  return response;
};

export async function externalFetch(request) {
  if (request.url.startsWith(API_URL)) {
    console.log("external");
    // clone the original request, but change the URL
    request = new Request(
      request.url.replace(API_URL, API_LOCAL_URL),
      request
    );
  }

  return fetch(request);
}
