//Calls the bulk spell data to the Spells page
import { server_calls1, server_calls2 } from '../../api/dndspellserver';
import { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button} from '@mui/material';
import { spell_book_server_calls } from '../../api/book_server';
import { useDispatch, useStore } from 'react-redux';
import { chooseID, chooseURL, chooseName, chooseLevel, chooseCastingTime, chooseDuration, chooseClasses, chooseDescription } from "../../redux/slices/Slices"



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

function SpellsAPIImport() {
  const [ spellsData, setSpellsData ] = useState<any>([]);
  const [ selectionModel, setSelectionModel ] = useState('')
  const [ isLoading, setLoading ] = useState(false)
  const dispatch = useDispatch();
  const store = useStore()


  const transferSpell = async (id:string) => {
    const new_id = id.toString()
    const url = '/api/spells/' + new_id
    console.log(url)
    const spell = await handleSpellFetch(url)
    console.log(spell[0])
    console.log(spell[0].name)
    const desc = spell[0].desc.join(' ')
    console.log(desc)
    dispatch(chooseID(spell[0].id));
    dispatch(chooseURL(spell[0].url));
    dispatch(chooseName(spell[0].name));
    dispatch(chooseLevel(spell[0].level));
    dispatch(chooseCastingTime(spell[0].casting_time));
    dispatch(chooseDuration(spell[0].duration));
    dispatch(chooseClasses(spell[0].classes));
    dispatch(chooseDescription(desc));
    console.log(store.getState())
    try{
    await spell_book_server_calls.create(store.getState())
    window.alert("The spell was successfully added to your CharacterBook!")
    }catch (exception) {
      window.alert("There has been an error! Most common cause is that your spell is already added. Please try again.")
    }finally{
      // window.location.reload()
    }
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
      setLoading(true); 
      const rows = await handleSpellFetch()
      .finally(() => setLoading(false));
      setSpellsData(rows);
    })()
    return () => {}
  }, [])


    if (isLoading) {
      return (
        <span>Loading...</span>
      )
    }

    return (
      <> 
      <div className='h-6 bg-gradient-to-t from-sky-100 via-sky-200 to-purple-600'></div>
      <div className='flex flex-col pl-16 bg-sky-100 text-black p-6'>
        <h2 className='text-2xl font-bold'>Spells</h2>
        <h3 className='text-m pl-8'>Recommended to filter by class and then sort by level</h3> 
      </div>   
      <div className='h-2 bg-gradient-to-t from-white via-sky-50 to-sky-100'></div>
      <div className='px-16'>
        <div className='p-6 left-5'></div>
      { selectionModel != '' ?
        <Button variant='contained' onClick={() => transferSpell(selectionModel)}>Add to My Book</Button> 
        :
        <Button disabled>Add to My Book</Button>
      }
        <DataGrid
          autoHeight {...spellsData}
          rows={spellsData}
          columns={columns}
          getRowHeight={() => 'auto'}
          initialState={{
            columns: {columnVisibilityModel: {id: false, url: false}},
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
            
          }}
          pageSizeOptions={[5, 10, 25, 50]}
          // checkboxSelection = {true}
          onRowSelectionModelChange={ (id: string) => 
            setSelectionModel(id)
           
          }
        />
      </div>
      </>

  )          
          
}

export default SpellsAPIImport