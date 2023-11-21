import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Button, MenuItem } from '@mui/material';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import config from '../../config.json';
import "./DoneProcedures.scss";
import exl_ from "./exl_.png";
import question from "./question.png"
import { useNavigate, useParams } from "react-router-dom";
import PopUpDone from "../PopUpDoneComponents/PopUpDone";

function DoneProcedures() {

    var XLSX = require("xlsx");

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
                "Статус": p.fullOrNot,
                "Актуальная дата": p.actualDate
            });
        });
        const ws = XLSX.utils.json_to_sheet(proceduresExport);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Сделанные процедуры");
        let buf = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });
        XLSX.write(wb, { bookType: "xlsx", type: "binary" });
        XLSX.writeFile(wb, "Сделанные процедуры.xlsx");
    }

    const [doneProcedures, setDoneProcedures] = useState([]);
    const [userId, setUserId] = useState(0);
    const navigate = useNavigate();
    const { userName } = useParams();
    const [types, setTypes] = useState([]);
    const [illnesses, setIllnesses] = useState([]);
    const [type, setType] = useState("");
    const [illness, setIllness] = useState("");
    const [popUpActive, setPopUpActive] = useState(false);

    useEffect(() => {
        getUserId();
    }, [userId]);

    const getUserId = async () => {
        await axios.get(`${config.userUrl}/${userName}`).then(data => {
            setUserId(data.data[0].id);
        })
    }

    useEffect(() => {
        getDoneProcedures();
    }, [doneProcedures]);

    const getDoneProcedures = async () => {
        const res = await axios.get(`${config.doneProceduresUrl}/${userId}`);
        if (type === '' && illness === '') { setDoneProcedures(res.data); }
        else {
            if (type !== '' && illness === '') {
                setDoneProcedures(res.data.filter(p => p.procedure.patient.type.name === type));
            }
            else if (type === '' && illness !== '') {
                setDoneProcedures(res.data.filter(p => p.procedure.vaccine.type.name === illness));
            }
            else if (type !== '' && illness !== '') {
                setDoneProcedures(res.data.filter(p => p.procedure.patient.type.name === type && p.procedure.vaccine.type.name === illness));
            }
        }
    }

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

    const typesItems = types.map((type) => {
        return <MenuItem value={type.name} key={type.id}>{type.name}</MenuItem>
    });

    const illnessesItems = illnesses.map((illness) => {
        return <MenuItem value={illness.name} key={illness.id}>{illness.name}</MenuItem>
    });

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

    const resetFilters = () => {
        setType('');
        setIllness('');
    }

    const columns = [
        { field: "id", headerName: "id", width: 0 },
        { field: "surname", headerName: "Фамилия", width: 150, align: 'center', headerAlign: 'center', },
        { field: "name", headerName: "Имя", width: 90, align: 'center', headerAlign: 'center', },
        { field: "patronymic", headerName: "Отчество", width: 150, align: 'center', headerAlign: 'center', },
        { field: "patientType", headerName: "Тип пациента", width: 150, align: 'center', headerAlign: 'center', },
        { field: "vaccine", headerName: "Вакцина", width: 250, align: 'center', headerAlign: 'center', },
        { field: "illness", headerName: "Заболевание", width: 150, align: 'center', headerAlign: 'center', },
        { field: "fullOrNot", headerName: "Статус", width: 90, align: 'center', headerAlign: 'center', },
        { field: "actualDate", headerName: "Актуальная дата", width: 160, align: 'center', headerAlign: 'center', }
    ];

    const rows = doneProcedures.map((row) => ({
        id: row.id,
        surname: row.procedure.patient.surname,
        name: row.procedure.patient.name,
        patronymic: row.procedure.patient.patronymic,
        patientType: row.procedure.patient.type.name,
        vaccine: row.procedure.vaccine.name,
        illness: row.procedure.vaccine.type.name,
        fullOrNot: row.fullOrNot ? 'Полная' : 'Частичная',
        actualDate: row.actualDate.substring(0, 10)
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
                            rows={rows}
                            columns={columns}
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
                <div className="ButtonContainer" style={{ marginTop: "15px", float: "left", marginLeft: "40px" }}>
                    <div className="DoneProcButtonContainer" style={{ marginTop: "5px", marginLeft: "-25px" }}>
                        <Button
                            color="success"
                            variant="outlined"
                            size="large"
                            onClick={() => navigate(`/procedures/${userName}`)}
                        >
                            Предстоящие процедуры
                        </Button>
                    </div>
                    <div className="ExitBtn" style={{ marginTop: "15px", marginLeft: "-30px" }}>
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
            <PopUpDone trigger={popUpActive} setTrigger={setPopUpActive}></PopUpDone>
        </main>
    );
};

export default DoneProcedures;