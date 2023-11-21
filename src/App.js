import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import DataGridCountries from './components/CountriesComponents/DataGridForCountries';
import MyProcedures from './components/MyProceduresComponents/MyProcedures';
import DoneProcedures from './components/DoneProceduresComponents/DoneProcedures';
import LogInPage from './components/LogInComponents/LogIn';
import LogInAdminPage from './components/LogInAdminComponents/LogInAdmin';
import ChooseTable from './components/ChooseTablesComponents/ChooseTables';
import AddCountry from './components/CountriesComponents/AddCountry';
import EditCountry from './components/CountriesComponents/EditCountry';
import AddProcedure from './components/AddProcedureComponents/AddProcedure';
import DataGridPatientsTypes from './components/PatientsTypesComponents/PatientsTypes';
import Vaccines from './components/VaccinesComponents/Vaccines';
import VaccinesMakers from './components/VaccinesMakersComponents/VaccinesMakers';
import EditVaccineMaker from './components/VaccinesMakersComponents/EditVaccineMaker';
import AddVaccineMaker from './components/VaccinesMakersComponents/AddVaccineMakers';
import VaccinesTypes from './components/VaccinesTypesComponents/VaccinesTypes';
import EditProcedure from './components/EditProcedureComponents/EditProcedure';
import RegistrationPage from './components/RegistrationComponents/Registration';
import AddDoneProcedure from './components/AddDoneProcedure/AddDoneProcedure';
import AddPatientType from './components/PatientsTypesComponents/AddPatientsTypes';
import EditPatientType from './components/PatientsTypesComponents/EditPatientsTypes';
import EditVaccinesTypes from './components/VaccinesTypesComponents/EditVaccinesTypes';
import AddVaccineType from './components/VaccinesTypesComponents/AddVaccineType';
import AddVaccine from './components/VaccinesComponents/AddVaccine';
import EditVaccine from './components/VaccinesComponents/EditVaccine';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<LogInPage />} />
        <Route path='/countries' element={< DataGridCountries />} />
        <Route path='/addCountry' element={<AddCountry />} />
        <Route path='/editCountry/:id' element={<EditCountry />} />
        <Route path='/patientsTypes' element={<DataGridPatientsTypes />} />
        <Route path='/addPatientType' element={<AddPatientType />} />
        <Route path='/editPatientType/:id/:ptName' element={<EditPatientType />} />
        <Route path='/vaccines' element={<Vaccines />} />
        <Route path='/addVaccine' element={<AddVaccine />} />
        <Route path='/editVaccine/:id/:name/:maker/:type' element={<EditVaccine />} />
        <Route path='/vaccineMakers' element={<VaccinesMakers />} />
        <Route path='/addVaccineMaker' element={<AddVaccineMaker />} />
        <Route path='/editVaccineMaker/:id' element={<EditVaccineMaker />} />
        <Route path='/vaccineTypes' element={<VaccinesTypes />} />
        <Route path='/addVaccineType' element={<AddVaccineType />} />
        <Route path='/editVaccineType/:id/:vtName' element={<EditVaccinesTypes />} />
        <Route path='/chooseTable' element={<ChooseTable />} />
        <Route path='/adminLogin' element={<LogInAdminPage />} />
        <Route path='/registration' element={<RegistrationPage />} />
        <Route path='/procedures/:userName' element={<MyProcedures />} />
        <Route path='/addProcedure/:userName' element={<AddProcedure />} />
        <Route path='/editProcedure/:userName/:id' element={<EditProcedure />} />
        <Route path='/doneProcedures/:userName' element={<DoneProcedures />} />
        <Route path='/addDoneProcedure/:userName/:id' element={<AddDoneProcedure />} />
      </Routes>
    </>
  )
}

export default App;