import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import config from '../../config.json';
import "./MyProcedures.scss";
import exl_ from "./exl_.png";
import question from "./question.png"
import { useNavigate, useParams } from "react-router-dom";
import PopUp from "../PopUpComponents/PopUp";

function MyProcedures() {

    var XLSX = require("xlsx");

    const { userName } = useParams();
    const [procedures, setProcedures] = useState([]);
    const [userId, setUserId] = useState(0);
    const [types, setTypes] = useState([]);
    const [illnesses, setIllnesses] = useState([]);
    const [type, setType] = useState("");
    const [illness, setIllness] = useState("");
    const [currRow, setCurrRow] = useState(null);
    const navigate = useNavigate();
    const [popUpActive, setPopUpActive] = useState(false);

    const exportExcel = () => {
        let proceduresExport = [];
        rows.forEach(p => {
            proceduresExport.push({
                "Фамилия": p.surname,
                "Имя": p.name,
                "Отчество": p.patronymic,
                "Тип пациента": p.patientType,
                "Вакцина": p.vaccine,
                "Заболевание": p.illness,
                "Дата": p.date
            });
        });
        const ws = XLSX.utils.json_to_sheet(proceduresExport);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Мои процедуры");
        let buf = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });
        XLSX.write(wb, { bookType: "xlsx", type: "binary" });
        XLSX.writeFile(wb, "Мои процедуры.xlsx");
    }

    useEffect(() => {
        setCurrRow(currRow);
    }, [currRow]);

    const getCurrRow = (grid) => {
        setCurrRow(grid.row);
    };

    const deleteProcedure = async () => {
        if (currRow !== null) {
            await axios.delete(`${config.proceduresUrl}/${currRow.id}`);
            getProcedures();
            setCurrRow(null);
        }
    };

    useEffect(() => {
        getTypes();
    }, []);

    const getTypes = async () => {
        await axios.get(config.patientsTypesUrl).then(data => {
            setTypes(data.data);
        })
    }

    useEffect(() => {
        getIllnesses();
    }, []);

    const getIllnesses = async () => {
        await axios.get(config.vaccinesTypesUrl).then(data => {
            setIllnesses(data.data);
        })
    }

    useEffect(() => {
        getUserId();
        console.log(userId);
    }, [userId]);

    const getUserId = async () => {
        await axios.get(`${config.userUrl}/${userName}`).then(data => {
            setUserId(data.data[0].id);
        })
    }

    const getProcedures = async () => {
        const res = await axios.get(`${config.proceduresUrl}/${userId}`);
        if (type === '' && illness === '') { setProcedures(res.data); }
        else {
            if (type !== '' && illness === '') {
                setProcedures(res.data.filter(p => p.patient.type.name === type));
            }
            else if (type === '' && illness !== '') {
                setProcedures(res.data.filter(p => p.vaccine.type.name === illness));
            }
            else if (type !== '' && illness !== '') {
                setProcedures(res.data.filter(p => p.patient.type.name === type && p.vaccine.type.name === illness));
            }
        }
    };

    useEffect(() => {
        getProcedures();
    }, [procedures]);

    useEffect(() => {
        setIllness(illness);
    }, [illness]);

    useEffect(() => {
        setType(type);
    }, [type]);

    const handleSelectIllnessChange = (e) => {
        setIllness(e.target.value);
    };

    const handleSelectTypeChange = (e) => {
        setType(e.target.value);
    };

    const typesItems = types.map((type) => {
        return <MenuItem value={type.name} key={type.id}>{type.name}</MenuItem>
    });

    const illnessesItems = illnesses.map((illness) => {
        return <MenuItem value={illness.name} key={illness.id}>{illness.name}</MenuItem>
    });

    const resetFilters = () => {
        setType('');
        setIllness('');
    }

    const navigateToEdit = () => {
        if (currRow !== null) {
            return navigate(`/editProcedure/${userName}/${currRow.id}`);
        }
    }

    const navigateToAddDoneProcedure = () => {
        if (currRow !== null) {
            return navigate(`/addDoneProcedure/${userName}/${currRow.id}`);
        }
    }

    const columns = [
        { field: "id", headerName: "id", width: 0 },
        { field: "surname", headerName: "Фамилия", width: 150, align: 'center', headerAlign: 'center', },
        { field: "name", headerName: "Имя", width: 90, align: 'center', headerAlign: 'center', },
        { field: "patronymic", headerName: "Отчество", width: 150, align: 'center', headerAlign: 'center', },
        { field: "patientType", headerName: "Тип пациента", width: 150, align: 'center', headerAlign: 'center', },
        { field: "vaccine", headerName: "Вакцина", width: 300, align: 'center', headerAlign: 'center', },
        { field: "illness", headerName: "Заболевание", width: 150, align: 'center', headerAlign: 'center', },
        { field: "date", headerName: "Дата", width: 150, align: 'center', headerAlign: 'center', }
    ];

    const rows = procedures.map((row) => ({
        id: row.id,
        surname: row.patient.surname,
        name: row.patient.name,
        patronymic: row.patient.patronymic,
        patientType: row.patient.type.name,
        vaccine: row.vaccine.name,
        illness: row.vaccine.type.name,
        date: row.date.substring(0, 10)
    }))

    return (
        <main>
            <div className="MainContainer">
                <div className="FiltersContainer" style={{ float: "left", flexDirection: "row" }}>
                    <div className="ButtonContainer" style={{ marginLeft: "50px", flexDirection: "columns" }}>
                        <h3 style={{ marginBottom: "10px" }}>
                            Фильтрация
                        </h3>
                        <div style={{ marginBottom: "25px" }}>
                            <Button
                                onClick={resetFilters}
                                size="small"
                                variant="outlined"
                                color="info"
                            >
                                Сбросить фильтры
                            </Button>
                        </div>
                    </div>
                    <div className="PatientTypesFilter">
                        <FormControl sx={{ marginLeft: 10, minWidth: 250 }}>
                            <InputLabel>Тип пациента</InputLabel>
                            <Select
                                label="Тип пациента"
                                sx={{ minWidth: "250px" }}
                                onChange={handleSelectTypeChange}
                                value={type}
                            >
                                {typesItems}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="IllnessFilter">
                        <FormControl sx={{ marginLeft: 5, minWidth: 250 }}>
                            <InputLabel>Заболевание</InputLabel>
                            <Select
                                label="Заболевание"
                                sx={{ minWidth: "250px" }}
                                onChange={handleSelectIllnessChange}
                                value={illness}
                            >
                                {illnessesItems}
                            </Select>
                        </FormControl>
                    </div>
                    <div style={{ marginLeft: "220px" }}>
                        <button
                            style={{
                                border: "none",
                                outline: "none",
                                backgroundColor: "white"
                            }}
                            onClick={exportExcel}
                        >
                            <img src={exl_}
                                width="50px"
                            />
                        </button>
                    </div>
                    &nbsp;
                    &nbsp;
                    <div>
                        <button
                            style={{
                                border: "none",
                                outline: "none",
                                backgroundColor: "white"
                            }}
                            onClick={() => { setPopUpActive(true) }}
                        >
                            <img src={question}
                                width="50px"
                            />
                        </button>
                    </div>
                </div>
                <div className="DataGridContainer">
                    <div className="ProceduresDataGrid">
                        <DataGrid
                            id="proceduresData"
                            rows={rows}
                            columns={columns}
                            onRowClick={getCurrRow}
                            sx={{
                                '.MuiDataGrid-columnHeaderTitle': {
                                    fontWeight: 'bold !important',
                                    overflow: 'visible !important'
                                }
                            }}
                            initialState={{
                                columns: {
                                    columnVisibilityModel: {
                                        id: false
                                    },
                                },
                            }}
                        >
                        </DataGrid>
                    </div>
                </div>
                <div className="ButtonsContainer" style={{ marginTop: "15px", float: "left", marginLeft: "40px" }}>
                    <div className="crudButtonsContainer" style={{ float: "left" }}>
                        <Button
                            variant="contained"
                            color="success"
                            size="large"
                            onClick={() => navigate(`/addProcedure/${userName}`)}
                        >
                            Добавить
                        </Button>
                        &nbsp;
                        <Button
                            variant="contained"
                            color="error"
                            size="large"
                            startIcon={<DeleteIcon />}
                            onClick={deleteProcedure}
                        >
                            Удалить
                        </Button>
                        &nbsp;
                        <Button
                            variant="contained"
                            size="large"
                            onClick={navigateToEdit}
                        >
                            Редактировать
                        </Button>
                        <div className="DoneProcButtonContainer" style={{ marginTop: "15px" }}>
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={() => navigate(`/doneProcedures/${userName}`)}
                            >
                                Сделанные процедуры
                            </Button>
                        </div>
                        <div className="ExitBtn" style={{ marginTop: "15px" }}>
                            <Button
                                variant="text"
                                size="medium"
                                color="error"
                                onClick={() => navigate(`/`)}
                            >
                                Выйти из системы
                            </Button>
                        </div>
                    </div>
                </div>
                <div style={{ float: "right", marginRight: "40px" }}>
                    <div style={{ marginTop: "15px" }}>
                        <Button
                            variant="outlined"
                            color="success"
                            size="large"
                            onClick={navigateToAddDoneProcedure}
                        >
                            Процедура сделана
                        </Button>
                    </div>
                </div>
            </div>
            <PopUp trigger={popUpActive} setTrigger={setPopUpActive}></PopUp>
        </main>
    );
};

export default MyProcedures;