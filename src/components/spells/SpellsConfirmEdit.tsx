import SpellEditForm from './SpellEditForm'
import { useState } from 'react'
import { Button} from '@mui/material';

type Props = {
    id: string;
    open: boolean;
    onClose: () => void;
}

const SpellsConfirmEdit = ( props: Props ) => {
    let [isSure, setIsSure] = useState(false);
    //TODO confirm and redesign isSure flag modal
    const handleCancel = () => {
        setIsSure(false)
        props.onClose
        setTimeout( () => {window.location.reload()})
    }

    if ( !props.open ) return (<></>)
    if (  props.open && !isSure) return (
        <>
        <h3>Are you sure?</h3>
        <p>This function should only be used in order to edit an existing spell or
            to create a custom spell. Please remember that anything that you edit 
            will not be able to be reproduced if you delete it and if you have 
            selected multiple entries, then only the first one on the table will be edited.
        </p>
        <Button onClick={() => setIsSure(true) }>I Am Sure</Button>
        <Button onClick={handleCancel}>Go Back</Button>
        </>
        
    )
    if ( !props.open ) return (<></>)
    return (
        <div  
            onClick={ handleCancel } 
            className='fixed w-full h-full flex overflow-auto 
            justify-center align-middle bg-gray-300 z-1'
            >
            <div
                className='max-w-600px w-2/5 fixed flex mt-20 bg-white shadow-xl rounded z-1'
                onClick={(e) => {
                    e.stopPropagation()
                }}
            >
                <div className="w-full flex flex-col z-0 opacity-100 bg-white text-black">
                    <div className="flex flex-row space-apart z-1">
                        <p className="flex justify-start m-3 bg-slate-300 p-2 rounded hover:bg-slate-800 text-white"
                        onClick={handleCancel}>
                            X 
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center mt-3 p-2 z-2">
                        <SpellEditForm id = { props.id } />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpellsConfirmEdit