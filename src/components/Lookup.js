import React from "react";
import { useState, useEffect } from "react";
import {FilterTable} from "./FilterTable.js"
import wordList from '../words.json'

export function Lookup(){
    return (
        <FilterTable rows={wordList} headers={["word"]}/>
    )
}