import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Button } from '@mui/material';
import "./VaccinesTypes.scss";
import DeleteIcon from '@mui/icons-material/Delete';
import config from '../../config.json';
import { useNavigate } from 'react-router-dom';

function VaccinesTypes() {

    const navigate = useNavigate();
    const [vaccinesTypes, setVaccinesTypes] = useState([]);
    const [currRow, setCurrRow] = useState(null);

    useEffect(() => {
        getVaccinesTypes();
    }, []);

    useEffect(() => {
        setCurrRow(currRow);
    }, [currRow]);

    const getVaccinesTypes = async () => {
        await axios.get(config.vaccinesTypesUrl).then(data => {
            setVaccinesTypes(data.data);
        })
    }

    const getCurrRow = (grid) => {
        setCurrRow(grid.row);
    };

    const deleteVaccineType = async () => {
        if (currRow !== null) {
            await axios.delete(`${config.vaccinesTypesUrl}/${currRow.id}`);
            getVaccinesTypes();
            setCurrRow(null);
        }
    };

    const columns = [
        { field: "id", headerName: "ID", width: 90, align: 'center', headerAlign: 'center', },
        { field: "type", headerName: "Type", width: 250, align: 'center', headerAlign: 'center', }
    ];

    const rows = vaccinesTypes.map((row) => ({
        id: row.id,
        type: row.name
    }))

    const navigateToEdit = () => {
        if (currRow !== null) {
            return navigate(`/editVaccineType/${currRow.id}/${currRow.type}`);
        }
    }

    return (
        <div className='MainContainer'>
            <div className='ContainerHeader'>
                <h1 style={{ fontWeight: '400' }}>VaccinesTypes</h1>
            </div>
            <div className='VaccineTypesDataGrid'>
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
                    onClick={deleteVaccineType}
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
                    onClick={() => navigate('/addVaccineType')}
                >
                    Add
                </Button>
            </div>
        </div>
    )
}

export default VaccinesTypes;