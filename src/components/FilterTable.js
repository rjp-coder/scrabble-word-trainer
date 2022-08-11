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

    function onFilterChange(e){
        let newText = e.target.value;
        setFilter(newText);
    }

    return (
        <div>
        <input type="text" value={filter} onChange={onFilterChange} placeholder="Search"/> 
        <GenericTable rows={rows} headers={headers}></GenericTable>
        </div>
    )
}