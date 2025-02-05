// helpFetch.js
const baseUrl = import.meta.env.VITE_BACKEND_URL; // Asegúrate de que esta variable esté configurada correctamente

export const helpFetch = () => {
  const handleErrors = (response) => {
    if (!response.ok) {
      return Promise.reject({
        err: true,
        status: response.status || '00',
        statusText: response.statusText || 'error'
      });
    }
    return response.json();
  };

  const customFetch = async (url, options = {}) => {
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    const controller = new AbortController();
    options.signal = controller.signal;
    options.method = options.method || 'GET'; // Asignar 'GET' si no se proporciona un método

    const token = localStorage.getItem('token');
    if (token) {
      options.headers = {
        ...defaultHeaders,
        "Authorization": `Bearer ${token}` // Usar comillas invertidas para la plantilla literal
      };
    } else {
      options.headers = defaultHeaders;
    }

    if (options.body) {
      options.body = JSON.stringify(options.body);
    }

    const timeout = options.timeout || 5000; // Asignar 5000 si no se proporciona un timeout
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${baseUrl}${url}`, options);
      clearTimeout(timeoutId);
      return await handleErrors(response);
    } catch (err) {
      if (err.name === 'AbortError') {
        return { err: true, status: '408', statusText: 'Request timed out' };
      }
      return { err: true, status: '500', statusText: 'Internal Server Error' };
    }
  };

  // Métodos para hacer solicitudes
  const get = (endpoint) => customFetch(endpoint, { method: 'GET' });
  const post = (endpoint, body) => customFetch(endpoint, { method: 'POST', body });
  const put = (endpoint, body, id) => customFetch(`${endpoint}/${id}`, { method: 'PUT', body });
  const del = (endpoint, id) => customFetch(`${endpoint}/${id}`, { method: 'DELETE' });

  return { get, post, put, del, customFetch };
};