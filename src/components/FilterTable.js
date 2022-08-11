import React from "react";
import {useState} from "react";
import {GenericTable} from "./GenericTable.js"

export function FilterTable(props){

    let rows = props.rows;
    const [filter,setFilter] = useState();

    if (filter){
        rows = rows.filter(r=>r.toLowerCase().includes(filter.toLowerCase()))
    }

    let headers = props.headers;
    let title = props.title;

    function onFilterChange(e){
        let newText = e.target.value;
        setFilter(newText);
    }

    return (
        <div className={props.className}>
        <h3> {title}</h3>
        <input type="text" onChange={onFilterChange} placeholder="Search"/> 
        <GenericTable rows={rows} headers={headers}></GenericTable>
        </div>
    )
}