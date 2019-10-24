import React from "react";

import Header from "./header";
import Item from "@super-fe/item";
import Item02 from "@super-fe/item02";

export default class App extends React.Component {
    handleRoute = e => {
        this.currentUrl = e.url;
    };

    render() {
        return (
            <div id="app">
                <h2>Hello World - Root </h2>
                <Header />
                <Item />
                <Item02 />
            </div>
        );
    }
}
