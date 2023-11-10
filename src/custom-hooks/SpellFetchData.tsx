import { useState, useEffect } from 'react'
import { spell_book_server_calls } from '../api/book_server'

export const useGetMySpellsData = () => {
    const [ mySpellsData, setSpellsData ] = useState<[]>([])

    async function handleDataFetch(){
        const result = await spell_book_server_calls.get();
        setSpellsData(result)
        console.log(mySpellsData)
    }

    
    useEffect( () => {
        handleDataFetch();
    }, []) 
    //Syntax is odd for useEffect. If no '[]' then useEffect will happen on every change
    //If '[]' is used, then will activate on 'mount' (when the component comes into being)
    //If '[componentName]' then it will watch for changes on just the named component and then refresh/activate

    return { mySpellsData, setSpellsData:handleDataFetch}
}