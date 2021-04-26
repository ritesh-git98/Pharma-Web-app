import Topbar from "../Topbar/Topbar";
import { forwardRef } from 'react';
import React from 'react';
import { useState } from "react";

import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
var columns = [
    { title: "id", field: "id", hidden: true },
    { title: "First name", field: "firstName" },
    { title: "Last name", field: "lastName" },
    { title: "Date of birth", field: "dob", type: "date" },
    { title: "Gender", field: "gender" },
    { title: "Experience Years", field: "expYrs", type: "number" }
]
const Users = (props) => {
    let log = window.localStorage.getItem('userType');
    if(log===null){
        props.history.push('/')
    }
    if(log === "salesexecutive"){
        props.history.push('/orders')
    }
    let userData = window.localStorage.getItem('userData');
    if(userData == null){
        userData = [{ "id": 0, "firstName": "null", "lastName": "null", "dob": "null", "Gender": "null", "expYrs": "null" }];
    }
    const [dataForDisplay, setDataForDisplay] = useState(userData);
    const handleRowAdd = (newData, resolve) => {
        newData.id = new Date().getTime();
        if (newData.firstName === undefined || newData.lastName === undefined || newData.dob === undefined || newData.gender === undefined || newData.expYrs === undefined) {
            alert("Please enter all details")
            resolve();
        }
        else {
            let userData = window.localStorage.getItem('userData')
            if (userData === null) {
                userData = []
                userData.push(newData)
                window.localStorage.setItem('userData', JSON.stringify(userData))
            }
            else {
                userData = JSON.parse(window.localStorage.getItem('userData'))
                userData.push(newData)
                window.localStorage.setItem('userData', JSON.stringify(userData))
            }
            setDataForDisplay(userData);
            resolve()
        }
    }

    const handleRowDelete = (oldData, resolve) => {
        let id = oldData.id;
        let userData = window.localStorage.getItem('userData')
        userData = JSON.parse(userData);
        var newData = userData.filter(function (value) {
            return value.id != id;
        });
        if(newData === null){
            newData = [{ "id": 0, "firstName": "null", "lastName": "null", "dob": "null", "Gender": "null", "expYrs": "null" }];
        }
        setDataForDisplay(newData)
        window.localStorage.setItem('userData', JSON.stringify(newData))
        resolve();
    }
    const handleRowUpdate = (newData, oldData, resolve) => {
        if (newData.firstName === undefined || newData.lastName === undefined || newData.dob === undefined || newData.gender === undefined || newData.expYrs === undefined) {
            alert("Please enter all details")
            resolve();
        }
        let id = oldData.id;
        let userData = window.localStorage.getItem('userData')
        userData = JSON.parse(userData);
        var data1 = userData.filter(function (value) {
            return value.id != id;
        });
        newData.id = new Date().getTime();
        data1.push(newData);
        setDataForDisplay(data1)
        window.localStorage.removeItem('userData');
        window.localStorage.setItem('userData', JSON.stringify(data1))
        resolve()
    }
    return (
        <>
            <Topbar />
            <div className="outer-wrapper">
                <MaterialTable
                    title="User data"
                    columns={columns}
                    data={dataForDisplay}
                    icons={tableIcons}
                    editable={{
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve) => {
                                handleRowUpdate(newData, oldData, resolve);
                            }),
                        onRowAdd: (newData) =>
                            new Promise((resolve) => {
                                handleRowAdd(newData, resolve)
                            }),
                        onRowDelete: (oldData) =>
                            new Promise((resolve) => {
                                handleRowDelete(oldData, resolve)
                            })
                    }
                    }
                />
            </div>

        </>
    );
}

export default Users;