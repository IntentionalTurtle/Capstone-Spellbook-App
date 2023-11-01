//THIS IS THE TESTING GROUND FOR THE SERVER PARSING/NAVIGATION
import { server_calls1, server_calls2 } from '../api/dndserver';
import { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button} from '@mui/material';
import { book_server_calls } from '../api/book_server';
import { useDispatch, useStore } from 'react-redux';
import { chooseSpellID, chooseSpellURL, chooseSpellName, chooseSpellLevel, chooseSpellCastingTime, chooseSpellDuration, chooseSpellClasses } from "../redux/slices/SpellSlices"



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

function Spells() {
  const [ spellsData, setSpellsData ] = useState<any>([]);
  const [ selectionModel, setSelectionModel ] = useState('')
  const dispatch = useDispatch();
  const store = useStore()


  const transferSpell = async (id:string) => {
    const new_id = id.toString()
    const url = '/api/spells/' + new_id
    console.log(url)
    const spell = await handleSpellFetch(url)
    console.log(spell[0])
    dispatch(chooseSpellID(spell[0].id));
    dispatch(chooseSpellURL(spell[0].url));
    dispatch(chooseSpellName(spell[0].name));
    dispatch(chooseSpellLevel(spell[0].level));
    dispatch(chooseSpellCastingTime(spell[0].casting_time));
    dispatch(chooseSpellDuration(spell[0].duration));
    dispatch(chooseSpellClasses(spell[0].classes));
    console.log(store.getState())
    book_server_calls.create(store.getState()) 
  }


  async function handleSpellFetch(url = 'default') {
    var rows = []
  
    //for the server call to prepare a single spell for addition to the book
    if (url != 'default'){
    const i = await server_calls2.get(url)
    var classes = ''
    for (const j of i.classes){
        classes += j.name + ' '
      }
      rows.push({'id': i.index, 'url': i.url, 'name': i.name, 'level': i.level, 'casting_time': i.casting_time,  
      'duration': i.duration, 'classes': classes, 'desc': i.desc })
    }
    //For the server call for the full spells list
    else {
    const result = await server_calls1.get()
    for (const i of result.results)
    {
      const more = await server_calls2.get(i.url)
      
      var classes = ''
      for (const j of more.classes){
        classes += j.name + ' '
      }
      rows.push({'id': i.index, 'url': i.url, 'name': i.name, 'level': more.level, 'casting_time': more.casting_time,  
      'duration': more.duration, 'classes': classes, 'desc': more.desc })
      }
    }
    return rows
  }

  useEffect( () => {
    (async () => {
      const rows = await handleSpellFetch();
      setSpellsData(rows);
    })()
    return () => {}
  }, [])
  
    return (
      <> 
      { selectionModel != '' ?
        <Button variant='contained' onClick={() => transferSpell(selectionModel)}>Add to My Book</Button> 
        :
        <Button disabled>Add to My Book</Button>
      }
         
      <div style={{ height: 800, width: '100%' }}>
        <DataGrid
          autoHeight {...spellsData}
          rows={spellsData}
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
          onRowSelectionModelChange={ (id: string) => 
            setSelectionModel(id)
           
          }
        />
      </div>
      </>

  )          
          
}

export default Spells