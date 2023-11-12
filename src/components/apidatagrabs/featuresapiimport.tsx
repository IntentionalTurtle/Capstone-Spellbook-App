//Calls the bulk feature data to the Features page
import { server_calls1, server_calls2 } from '../../api/dndfeatureserver';
import { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button} from '@mui/material';
import { feature_book_server_calls } from '../../api/book_server';
import { useDispatch, useStore } from 'react-redux';
import { chooseID, chooseURL, chooseName, chooseLevel, chooseClasses, chooseDescription } from "../../redux/slices/Slices"



const columns: GridColDef[] = [
  { field: 'id', headerName: 'Index', flex: 1 },
  { field: 'url', headerName: 'URL', flex: 1 },
  { field: 'name', headerName: 'Name', flex: 2 },
  { field: 'level', headerName: 'Level Gained', flex: 2 },
  { field: 'casting_time', headerName: 'Casting Time', flex: 1 },
  { field: 'duration', headerName: 'Duration', flex: 1 },
  { field: 'classes', headerName: 'Class', flex: 1 },
  { field: 'desc', headerName: 'Class Feature Description', flex: 8},
];

function FeaturesAPIImport() {
  const [ featuresData, setFeaturesData ] = useState<any>([]);
  const [ selectionModel, setSelectionModel ] = useState('')
  const [ isLoading, setLoading ] = useState(false)
  const dispatch = useDispatch();
  const store = useStore()


  const transferFeature = async (id:string) => {
    const new_id = id.toString()
    const url = '/api/features/' + new_id
    console.log(url)
    const feature = await handleFeatureFetch(url)
    console.log(feature[0])
    console.log(feature[0].name)
    const desc = feature[0].desc.join(' ')
    console.log(desc) 
    dispatch(chooseID(feature[0].id));
    dispatch(chooseURL(feature[0].url));
    dispatch(chooseName(feature[0].name));
    dispatch(chooseLevel(feature[0].level));
    dispatch(chooseClasses(feature[0].classes));
    dispatch(chooseDescription(desc));
    console.log(store.getState())
    try{
    await feature_book_server_calls.create(store.getState())
    window.alert("The class feature was successfully added to your CharacterBook!")
    } catch (exception) {
      window.alert("There has been an error! Most common cause is that the feature is already added. Please try again.")
    }finally{
      // window.location.reload()
    }

  }


  async function handleFeatureFetch(url = 'default') {
    var rows = []
  
    //for the server call to prepare a single feature for addition to the book
    if (url != 'default'){
    const i = await server_calls2.get(url)
    rows.push({'id': i.index, 'url': i.url, 'name': i.name, 'level': i.level, 'classes': i.class.name, 'desc': i.desc })
    }
    //For the server call for the full feature list
    else {
    const result = await server_calls1.get()
    // console.log(result)
    for (const i of result.results){
    const more = await server_calls2.get(i.url)
      rows.push({'id': i.index, 'url': i.url, 'name': i.name, 'level': more.level, 'classes': more.class.name, 'desc': more.desc })
      }
    }
    return rows
  }

  useEffect( () => {
    (async () => {
      setLoading(true); 
      const rows = await handleFeatureFetch()
      .finally(() => setLoading(false));
      setFeaturesData(rows);
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
      { selectionModel != '' ?
        <Button variant='contained' onClick={() => transferFeature(selectionModel)}>Add to My Book</Button> 
        :
        <Button disabled>Add to My Book</Button>
      }
         
      <div style={{ height: 800, width: '100%', padding: 50 }}>
        <DataGrid
          autoHeight {...featuresData}
          rows={featuresData}
          columns={columns}
          getRowHeight={() => 'auto'}
          initialState={{
            columns: {columnVisibilityModel: {id: false, url: false, casting_time: false, duration: false}},
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

export default FeaturesAPIImport