import React from "react";
import { useState, useEffect } from "react";
import {FilterTable} from "./FilterTable.js"
import wordList from '../words.json'

export function Lookup(){
    return (
        <FilterTable className="rows_like_cells" rows={wordList} headers={["word"]}/>
    )
}