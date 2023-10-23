const serverURL = 'https://www.dnd5eapi.co/api/spells'

export const server_calls = {
    get: async () => { 
        const response = await fetch(serverURL);

        if (!response.ok){
            throw new Error('Failed to fetch data from the server')
        }

        return await response.json(),
        console.log(response),
        console.log(response.json())
    },
}