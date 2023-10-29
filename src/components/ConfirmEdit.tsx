import SpellEditForm from './SpellEditForm'
import { useState } from 'react'
import { Button} from '@mui/material';

type Props = {
    id?: string[],
    open: boolean;
    onClose: () => void;
}

const ConfirmEdit = ( props: Props ) => {
    let [isSure, setIsSure] = useState(false);
    if ( !props.open ) return (<></>)
    if ( props.open && !isSure) return (
        <>
        <h3>Are you sure?</h3>
        <p>This function should only be used in order to edit an existing spell/ability/feat or
            to create a custom spell/ability/feat. Please remember that anything that you edit 
            will not be able to be reproduced if you delete it and if you have 
            selected multiple entries, then only the highest one on the table will be edited.
        </p>
        <Button onClick={() => setIsSure(true)}>I Am Sure</Button>
        <Button>Go Back</Button>
        </>
    )
    return (
        <div 
            onClick={ props.onClose } 
            className='fixed w-full h-full flex overflow-auto z-1 
            justify-center align-middle bg-gray-300 bg-opacity-25'
        
        >
            <div
                className='max-w-600px w-2/5 fixed flex z-1 mt-20 bg-white shadow-xl rounded'
                onClick={(e) => {
                    e.stopPropagation()
                }}
            >
                <div className="w-full flex flex-col">
                    <div className="flex flex-row space-apart">
                        <p className="flex justify-start m-3 bg-slate-300 p-2 rounded hover:bg-slate-800 text-white"
                        onClick={props.onClose}>
                            X
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center mt-3 p-2">
                        <SpellEditForm id={props.id } />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmEdit