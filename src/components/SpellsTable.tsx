import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetData } from '../custom-hooks/FetchData';



const columns: GridColDef[] = [
  { field: 'index', headerName: 'Index', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'url', headerName: 'URL', width: 130 },
];


export default function SpellsTable() {
  const [spellsData, setSpells] = useGetData();


  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={spellsData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}