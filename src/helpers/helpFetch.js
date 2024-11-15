export const helpFetch = (baseUrl) => {

    const customFetch = async (url, method, body = null) => {
        try {
            const options = {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            if (body) {
                options.body = JSON.stringify(body);
            }

            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }

    // Métodos 
    const get = (endpoint) => customFetch(`${baseUrl}${endpoint}`, 'GET');

    const post = (endpoint, body) => customFetch(`${baseUrl}${endpoint}`, 'POST', body);

    const put = (endpoint, body, id) => customFetch(`${baseUrl}${endpoint}/${id}`, 'PUT', body);

    const del = (endpoint, id) => customFetch(`${baseUrl}${endpoint}/${id}`, 'DELETE');

    return { get, post, put, del };
}