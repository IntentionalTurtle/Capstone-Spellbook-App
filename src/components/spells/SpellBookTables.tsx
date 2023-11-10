import { spell_book_server_calls } from "../../api/book_server"
import { useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetMySpellsData } from '../../custom-hooks/SpellFetchData';
import SpellsConfirmEdit from "./SpellsConfirmEdit";


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
        spell_book_server_calls.delete(selectionModel[0])
        setSpellsData();
        console.log(`Selection model: ${selectionModel}`)
        setTimeout( () => {window.location.reload()}, 500)
    }


  return (
    <>
        <SpellsConfirmEdit 
            id={selectionModel.toString()}
            open={open}
            onClose={handleClose} 
        />

        { !open ?
        <div style={{ width: '100%', padding: 50 }}>
          <button onClick={handleOpen} className="p-3 border-black text-white   bg-purple-600 rounded m-3 hover:ring-4" >Update</button>
          <button onClick={deleteData} className="p-3 border-black text-white   bg-purple-700 rounded m-3 hover:ring-4" >Delete</button>
        <DataGrid
          autoHeight {...mySpellsData}
          rows={mySpellsData}
          columns={columns}
          getRowHeight={() => 'auto'}
          initialState={{
            columns: {columnVisibilityModel: {id: false, url: false}},
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 25, 50]}
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