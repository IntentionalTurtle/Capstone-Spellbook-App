//THIS IS THE TESTING GROUND FOR THE SERVER PARSING/NAVIGATION

import { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'index', headerName: 'Index', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'url', headerName: 'URL', width: 130 },
];

function Spells() {
    const [data, setData] = useState([]);
    const foo = async () => {
            data.map(item => {
                return (
                    <li>
                        {item.index}
                        {item.name}
                        {item.url}
                    </li>
                        ) 
            })
        }
    const display = foo()

    // const items = data.map(item => {
    //     return <index={data.index}
    // })

    useEffect(() => {
      fetch('https://www.dnd5eapi.co/api/spells')
        .then(response => response.json())
        .then(data => setData(data))
    }, []);
    
    let test = data.results

    // useEffect(() => {
    //     let item = JSON.stringify(data);
    //     localStorage.setItem("item", item);
    //     console.log(item);
    //   }, []);

    return (

        console.log(data)
        // console.log(data.results),
        // console.log({...data}),
        // console.log({...data.results})

        // console.log(Object.values(data))
 
        // <div className="App">
        // <h1>{name.name}</h1>
        //   <h1>{JSON.stringify(data)}</h1>
        // </div>

        // <>
        // {display}
        // </>
    // <>  
    // <div style={{ height: 400, width: '100%' }}>
    //   <DataGrid
    //     rows={rows}
    //     columns={columns}
    //     initialState={{
    //       pagination: {
    //         paginationModel: { page: 0, pageSize: 5 },
    //       },
    //     }}
    //     pageSizeOptions={[5, 10]}
    //     checkboxSelection
    //   />
    // </div>
    // </>
//   )          
          

)
}

export default Spells