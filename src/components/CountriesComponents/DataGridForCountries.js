import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Button } from '@mui/material';
import "./DataGridForCountries.scss";
import DeleteIcon from '@mui/icons-material/Delete';
import config from '../../config.json';
import { useNavigate } from 'react-router-dom';

function DataGridCountries() {

    const navigate = useNavigate();
    const [countries, setCountries] = useState([]);
    const [currRow, setCurrRow] = useState(null);

    useEffect(() => {
        getCountries();
    }, []);

    useEffect(() => {
        setCurrRow(currRow);
    }, [currRow]);

    const getCountries = async () => {
        await axios.get(config.countriesUrl).then(data => {
            setCountries(data.data);
        })
    }

    const getCurrRow = (grid) => {
        setCurrRow(grid.row);
    };

    const deleteCountry = async () => {
        if (currRow !== null) {
            await axios.delete(`${config.countriesUrl}/${currRow.id}`);
            getCountries();
            setCurrRow(null);
        }
    };

    const navigateToEdit = () => {
        if (currRow !== null) {
            return navigate(`/editCountry/${currRow.id}`);
        }
    }

    const columns = [
        { field: "id", headerName: "ID", width: 90, align: 'center', headerAlign: 'center', },
        { field: "country", headerName: "Country", width: 150, align: 'center', headerAlign: 'center', }
    ];

    const rows = countries.map((row) => ({
        id: row.id,
        country: row.name
    }))

    return (
        <div className='MainContainer'>
            <div className='ContainerHeader'>
                <h1 style={{ fontWeight: '400' }}>Countries</h1>
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
                    Редактировать
                </Button>
                &nbsp;
                <Button
                    variant="contained"
                    color="error"
                    size="large"
                    startIcon={<DeleteIcon />}
                    onClick={deleteCountry}
                >
                    Удалить
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
                    onClick={() => navigate('/addCountry')}
                >
                    Добавить
                </Button>
            </div>
        </div>
    )
}

export default DataGridCountries;