import React from 'react';

import Header from './header';
import Item from '@super-fe/components1';
import Item02 from '@super-fe/components2';

export default class App extends React.Component {
    handleRoute = e => {
        this.currentUrl = e.url;
    };

    render() {
        // alert.log(aaa);

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
