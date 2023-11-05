import { book_server_calls } from "../api/book_server"
import { useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetMySpellsData } from '../custom-hooks/FetchData';
import ConfirmEdit from "./ConfirmEdit";
import { Button } from "@mui/material";


const columns: GridColDef[] = [
    { field: 'id', headerName: 'Index', flex: 1 },
    { field: 'url', headerName: 'URL', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'level', headerName: 'Spell Level', flex: 1 },
    { field: 'casting_time', headerName: 'Casting Time', flex: 1 },
    { field: 'duration', headerName: 'Duration', flex: 1 },
    { field: 'classes', headerName: 'Classes', flex: 1 },
    { field: 'desc', headerName: 'Spell Description', flex: 8},
  ];


function SpellBookTable() {
    let [ open, setOpen ] = useState(false);
    const { mySpellsData, setSpellsData } = useGetMySpellsData();
    const [ selectionModel, setSelectionModel ] = useState<string[]>([])

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }


    const deleteData = () => {
        book_server_calls.delete(selectionModel[0])
        setSpellsData();
        console.log(`Selection model: ${selectionModel}`)
        setTimeout( () => {window.location.reload()}, 500)
    }


  return (
    <>
        <ConfirmEdit 
            id={selectionModel.toString()}
            open={open}
            onClose={handleClose} 
        />
        
        <div className="flex flex-row">
            <Button onClick={handleOpen} className="p-3 bg-slate-300 rounded m-3 hover:bg-slate-800 hover:text-white" >Update</Button>
            <Button onClick={deleteData} className="p-3 bg-slate-300 rounded m-3 hover:bg-slate-800 hover:text-white" >Delete</Button>
        </div>

        { !open ?
        <div style={{ height: 800, width: '100%' }}>

        <DataGrid
          autoHeight {...mySpellsData}
          rows={mySpellsData}
          columns={columns}
          getRowHeight={() => 'auto'}
          initialState={{
            columns: {columnVisibilityModel: {id: false, url: false}},
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 25, 50]}
          checkboxSelection = {true}
          onRowSelectionModelChange={ (item: any) => 
            setSelectionModel(item)
          }
        />
        </div>
        :
          <></>
        }
      
    </>
  )
}


export default SpellBookTable