import React from "react";

export class Header extends React.Component {
    render() {
        return (
            <header className="row header">
                    <div className="col px-0 logo"></div>
                    <div className="col px-0 align-self-end link"><a href="https://unamo.com/">www.unamo.com</a></div>
            </header>
        );
    }
}