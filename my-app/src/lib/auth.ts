import { API_URL } from 'src/config';

function getCookie(name: string): string | null {
    let cookieValue: string | null = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


export async function getCSRFToken(): string | null {
    let token = getCookie("csrftoken");
    if (token == null) {
        await fetch(`${API_URL}/api/auth/set_csrf_token`, {method: "POST"});
        token = getCookie("csrftoken");
    }
    return token;
}
