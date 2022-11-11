
const apiRequest = async (URL: string, method: string, variables: unknown) => {
    const response = await fetch(URL, {
        method: method,
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(variables)
    })

    return await response.json();
}

export default apiRequest;