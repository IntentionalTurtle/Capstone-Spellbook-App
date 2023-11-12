import FeatureEditForm from './FeatureEditForm';
import { useState } from 'react'
import { Button} from '@mui/material';

type Props = {
    id: string;
    open: boolean;
    onClose: () => void;
}

const FeatureConfirmEdit = ( props: Props ) => {
    let [isSure, setIsSure] = useState(false);
    //TODO confirm and redesign isSure flag modal
    const handleCancel = () => {
        setIsSure(false)
        props.onClose
        setTimeout( () => {window.location.reload()})
    }

    if ( !props.open ) return (<></>)
    if ( props.open && !isSure) return (
        <>
        <h3>Are you sure?</h3>
        <p>This function should only be used in order to edit an existing feature or
            to create a custom feature. Please remember that anything that you edit 
            will not be able to be reproduced if you delete it and if you have 
            selected multiple entries, then only the first one on the table will be edited.
        </p>
        <Button onClick={() => setIsSure(true)}>I Am Sure</Button>
        <Button onClick={handleCancel}>Go Back</Button>
        </>
    )
    return (
        <div 
            onClick={ handleCancel } 
            className='fixed w-full h-full flex overflow-auto focus:z-10 
            justify-center align-middle bg-gray-300'
        
        >
            <div
                className='max-w-600px w-2/5 fixed flex z-10 mt-20 bg-white shadow-xl rounded'
                onClick={(e) => {
                    e.stopPropagation()
                }}
            >
                
                <div className="w-full flex flex-col z-50 bg-opacity-100 bg-white text-black"> 
                    <div className="flex flex-row space-apart">
                        <p className="flex justify-start m-3 z-10 bg-slate-300 p-2 rounded hover:bg-slate-800 text-black"
                        onClick={handleCancel}>
                            X 
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center mt-3 p-2 z-10">
                        <FeatureEditForm id = { props.id } />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeatureConfirmEdit