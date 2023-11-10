const serverURL1 = 'https://www.dnd5eapi.co/api/features'
const serverURL2 = 'https://www.dnd5eapi.co'

export const server_calls1 = {
    get: async () => { 
        const response = await fetch(serverURL1);

        if (!response.ok){
            throw new Error('Failed to fetch data from the server')
        }

        return await response.json()
    },
}
//calls info from the deeper indexed api data
export const server_calls2 = {
    get: async (prop: string) => { 
        const response = await fetch(serverURL2 + prop);

        if (!response.ok){
            throw new Error('Failed to fetch data from the server')
        }

        return await response.json()
    },
}


export default server_calls1; server_calls2