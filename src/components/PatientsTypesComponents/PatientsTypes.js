import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Button } from '@mui/material';
import "./PatientsTypes.scss";
import DeleteIcon from '@mui/icons-material/Delete';
import config from '../../config.json';
import { useNavigate } from 'react-router-dom';

function DataGridPatientsTypes() {

    const navigate = useNavigate();
    const [patietsTypes, setPatientsTypes] = useState([]);
    const [currRow, setCurrRow] = useState(null);

    useEffect(() => {
        getPatientsTypes();
    }, []);

    const getPatientsTypes = async () => {
        await axios.get(config.patientsTypesUrl).then(data => {
            setPatientsTypes(data.data);
        })
    }

    useEffect(() => {
        setCurrRow(currRow);
    }, [currRow]);

    const getCurrRow = (grid) => {
        setCurrRow(grid.row);
    };

    const deletePatientType = async () => {
        if (currRow !== null) {
            await axios.delete(`${config.patientsTypesUrl}/${currRow.id}`);
            getPatientsTypes();
            setCurrRow(null);
        }
    };

    const columns = [
        { field: "id", headerName: "ID", width: 90, align: 'center', headerAlign: 'center', },
        { field: "type", headerName: "Type", width: 150, align: 'center', headerAlign: 'center', }
    ];

    const rows = patietsTypes.map((row) => ({
        id: row.id,
        type: row.name
    }))

    const navigateToEdit = () => {
        if (currRow !== null) {
            return navigate(`/editPatientType/${currRow.id}/${currRow.type}`);
        }
    }

    return (
        <div className='MainContainer'>
            <div className='ContainerHeader'>
                <h1 style={{ fontWeight: '400' }}>PatientsTypes</h1>
            </div>
            <div className='PTDataGrid'>
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
                    onClick={deletePatientType}
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
                    onClick={() => navigate('/addPatientType')}
                >
                    Add
                </Button>
            </div>
        </div>
    )
}

export default DataGridPatientsTypes;