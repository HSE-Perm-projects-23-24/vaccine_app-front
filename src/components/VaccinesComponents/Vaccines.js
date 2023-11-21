import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Button } from '@mui/material';
import "./Vaccines.scss";
import DeleteIcon from '@mui/icons-material/Delete';
import config from '../../config.json';
import { useNavigate } from 'react-router-dom';

function Vaccines() {

    const navigate = useNavigate();
    const [vaccines, setVaccines] = useState([]);
    const [currRow, setCurrRow] = useState(null);

    useEffect(() => {
        getVaccines();
    }, []);

    useEffect(() => {
        setCurrRow(currRow);
    }, [currRow]);

    const getVaccines = async () => {
        await axios.get(config.vaccinesUrl).then(data => {
            setVaccines(data.data);
        })
    }

    const getCurrRow = (grid) => {
        setCurrRow(grid.row);
    };

    const deleteVaccine = async () => {
        if (currRow !== null) {
            await axios.delete(`${config.vaccinesUrl}/${currRow.id}`);
            getVaccines();
            setCurrRow(null);
        }
    };

    const columns = [
        { field: "id", headerName: "ID", width: 90, align: 'center', headerAlign: 'center', },
        { field: "name", headerName: "Name", width: 400, align: 'center', headerAlign: 'center', },
        { field: "maker", headerName: "Maker", width: 400, align: 'center', headerAlign: 'center', },
        { field: "type", headerName: "Type", width: 200, align: 'center', headerAlign: 'center', }
    ];

    const rows = vaccines.map((row) => ({
        id: row.id,
        name: row.name,
        maker: row.maker.name,
        type: row.type.name
    }))

    const navigateToEdit = () => {
        if (currRow !== null) {
            return navigate(`/editVaccine/${currRow.id}/${currRow.name}/${currRow.maker}/${currRow.type}`);
        }
    }

    return (
        <div className='MainContainer'>
            <div className='ContainerHeader'>
                <h1 style={{ fontWeight: '400' }}>Vaccines</h1>
            </div>
            <div className='CountriesDataGrid'>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    sx={{
                        '.MuiDataGrid-columnHeaderTitle': {
                            fontWeight: 'bold !important',
                            overflow: 'visible !important'
                        }
                    }}
                    onRowClick={getCurrRow}
                />
            </div>
            <div className='ButtonsContainer'>
                <Button
                    variant="contained"
                    size="large"
                    onClick={navigateToEdit}
                >
                    Edit
                </Button>
                &nbsp;
                <Button
                    variant="contained"
                    color="error"
                    size="large"
                    startIcon={<DeleteIcon />}
                    onClick={deleteVaccine}
                >
                    Delete
                </Button>
            </div>
            <div className='BackButton'>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate('/chooseTable')}
                >
                    Назад
                </Button>
            </div>
            <div className='AddContainer'>
                <Button
                    variant="contained"
                    color="success"
                    size="large"
                    onClick={() => navigate('/addVaccine')}
                >
                    Add
                </Button>
            </div>
        </div>
    )
}

export default Vaccines;