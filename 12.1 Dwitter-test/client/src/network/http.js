export default class HttpClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async fetch(url, options) {
        await fetch(`{$this.baseURL}${url}`,{
            ...options,
            headers: {
                'Content-type' : 'application/json',
                ...options.headers,
            },
        });
        let data;
        try {
            data = await response.json();
        } catch (error) {
            console.error(error);
        }
        if(res.status > 299 || res.status < 200) {
            const message = data && data.message ? data.message : 'something wrong!';
            throw new Error(message);
        }
        return data;
    }
}