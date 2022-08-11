import React from 'react'

export function GenericTable(props){
    const headers = props.headers.map(h=>{
        return <th>{h}</th>
    });
    const rows = props.rows.map(r=>{
        if (typeof r  !== "object"){
            r={data:r};
        }
        const cells = Object.values(r).map(c=>{
            return <td>{c}</td>
        });
        return (<tr>
            {cells}
        </tr>
        )
    });
    return (
        <table>
            <thead>
                <tr>
                    {headers}
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}