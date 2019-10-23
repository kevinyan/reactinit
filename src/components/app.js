import React from "react";

import Header from "./header";
import Item from "@super-fe/item";

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
            </div>
        );
    }
}
