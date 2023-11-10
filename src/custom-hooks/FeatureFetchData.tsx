import { useState, useEffect } from 'react'
import { feature_book_server_calls } from '../api/book_server'

export const useGetMyFeaturesData = () => {
    const [ myFeaturesData, setFeaturesData ] = useState<[]>([])

    async function handleDataFetch(){
        const result = await feature_book_server_calls.get();
        setFeaturesData(result)
        console.log(myFeaturesData)
    }

    
    useEffect( () => {
        handleDataFetch();
    }, []) 
    //Syntax is odd for useEffect. If no '[]' then useEffect will happen on every change
    //If '[]' is used, then will activate on 'mount' (when the component comes into being)
    //If '[componentName]' then it will watch for changes on just the named component and then refresh/activate

    return { myFeaturesData, setFeaturesData:handleDataFetch}
}