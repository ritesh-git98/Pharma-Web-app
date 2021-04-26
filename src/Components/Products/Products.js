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
    { title: "Customer Name", field: "customerName" },
    { title: "Customer Contact Number", field: "contact" },
    { title: "Products", field: "productName"},
    { title: "Quantity", field: "quantity", type: "number" },
    { title: "Total Amount (in Rs.)", field: "price", type: "number" }
]
const Orders = (props) => {
    let log = window.localStorage.getItem('userType');
    if(log===null){
        props.history.push('/')
    }
    let ordersData = JSON.parse(window.localStorage.getItem('ordersData'))
    if(ordersData == null){
        ordersData = [{"id":0,"customerName":"null","contact":"null","productName":"null","quantity":"null","price":"null"}];
    }
    var auth=false;
    if(log === "salesexecutive"){
        auth=true;
    }
    if(log === "storemanager"){
        auth=false;
    }
    const [dataForDisplay,setDataForDisplay] = useState(ordersData);
    const handleRowAdd = (newData, resolve) => {
        newData.id = new Date().getTime();
        if (newData.customerName === undefined || newData.contact === undefined || newData.productName === undefined || newData.quantity === undefined || newData.price === undefined) {
            alert("Please enter all details")
            resolve();
        }
        else {
            let ordersData = window.localStorage.getItem('ordersData')
            if (ordersData === null) {
                ordersData = []
                ordersData.push(newData)
                window.localStorage.setItem('ordersData', JSON.stringify(ordersData))
            }
            else {
                ordersData = JSON.parse(window.localStorage.getItem('ordersData'))
                ordersData.push(newData)
                window.localStorage.setItem('ordersData', JSON.stringify(ordersData))
            }
            setDataForDisplay(ordersData);
            resolve()
        }
    }

    const handleRowDelete = (oldData, resolve) => {
        let id = oldData.id;
        let ordersData = window.localStorage.getItem('ordersData')
        ordersData = JSON.parse(ordersData);
        var newData = ordersData.filter(function (value) {
            return value.id != id;
        });
        if(newData === null){
            newData = [{"id":0,"name":"null","brand":"null","price":"null","stock":"null","discount":"null"}];
        }
        setDataForDisplay(newData)
        window.localStorage.setItem('ordersData', JSON.stringify(newData))
        resolve();
    }
    const handleRowUpdate = (newData, oldData, resolve) => {
        if (newData.firstName === undefined || newData.lastName === undefined || newData.dob === undefined || newData.gender === undefined || newData.expYrs === undefined) {
            alert("Please enter all details")
            resolve();
        }
        let id = oldData.id;
        let ordersData = window.localStorage.getItem('ordersData')
        ordersData = JSON.parse(ordersData);
        var data1 = ordersData.filter(function (value) {
            return value.id != id;
        });
        newData.id = new Date().getTime();
        data1.push(newData);
        setDataForDisplay(data1)
        window.localStorage.removeItem('ordersData');
        window.localStorage.setItem('ordersData', JSON.stringify(data1))
        resolve()
    }
    const edits =auth ? '':{
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
    };
    return (
        <>
            <Topbar />
            <div className="outer-wrapper">
                <MaterialTable
                    title="Orders data"
                    columns={columns}
                    data={dataForDisplay}
                    icons={tableIcons}
                    editable={edits}
                />
            </div>
            </>
    )
}
 
export default Orders;
