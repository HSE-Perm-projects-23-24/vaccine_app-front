import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function ChooseTable() {

    const navigate = useNavigate();

    return (
        <div className="MainContainer">
            <div className="HeaderContainer">
                <h1 style={{ fontWeight: "400" }}>Выберите таблицу</h1>
            </div>
            <div className="buttonsChoice"
                style={{
                    alignContent: "center",
                    justifyContent: "center",
                    display: "flex"
                }}
            >
                <Button
                    color="secondary"
                    variant="contained"
                    size="medium"
                    onClick={() => navigate('/countries')}
                >
                    Countries
                </Button>
                &nbsp;
                <Button
                    color="secondary"
                    variant="contained"
                    size="medium"
                    onClick={() => navigate('/patientsTypes')}
                >
                    PatientsTypes
                </Button>
                &nbsp;
                <Button
                    color="secondary"
                    variant="contained"
                    size="medium"
                    onClick={() => navigate('/vaccines')}
                >
                    Vaccines
                </Button>
                &nbsp;
                <Button
                    color="secondary"
                    variant="contained"
                    size="medium"
                    onClick={() => navigate('/vaccineMakers')}
                >
                    VaccinesMakers
                </Button>
                &nbsp;
                <Button
                    color="secondary"
                    variant="contained"
                    size="medium"
                    onClick={() => navigate('/vaccineTypes')}
                >
                    VaccinesTypes
                </Button>
            </div>
            <div className="ExitBtn" style={{ marginTop: "15px", alignItems: "center", justifyContent: "center", display: "flex" }}>
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
    )
}

export default ChooseTable