import React from 'react'

export function GenericTable(props){
    const headers = props.headers.map((h,i)=>{
        return <th key={i}>{h}</th>
    });
    const key = props.key;
    const rows = props.rows.map((r,i)=>{
        if (typeof r  !== "object"){
            r={data:r};
        }
        const cells = Object.values(r).map((c,i)=>{
            return <td key={i}>{c}</td>
        });
        return (<tr key={(r[key]||i)}>
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