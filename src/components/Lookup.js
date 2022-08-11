import React from "react";
import { useState, useEffect } from "react";
import {FilterTable} from "./FilterTable.js"
import wordList from '../words.json'

export function Lookup(){
    return (
        <FilterTable className="word_table" rows={wordList} headers={["word"]}/>
    )
}