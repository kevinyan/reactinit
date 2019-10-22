import React from "react";
import style from "./style.css";

const Header = () => (
    <header class={style.header}>
        <h1>Preact App</h1>
        <nav>
            <a>baidu</a>
            <a>kevin</a>
            <a>emily</a>
        </nav>
    </header>
);

export default Header;
