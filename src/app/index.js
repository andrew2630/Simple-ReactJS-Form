import React from "react";
import { render } from "react-dom";

import { Header } from "./components/Header";
import { Form } from "./components/Form";
import { Table } from "./components/Table";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            haveNewUser: false,
            newUserName: "",
            newUserEmail: "",
            usersNo: 0,
            emails: []
        };

        this.addUser = this.addUser.bind(this);
        this.removeUser = this.removeUser.bind(this);
        this.setUsersNo = this.setUsersNo.bind(this);
        this.getUserEmails = this.getUserEmails.bind(this);
        this.userAdded = this.userAdded.bind(this);
        this.doesEmailExist = this.doesEmailExist.bind(this);
    }

    addUser(name, email) {
        this.setState({haveNewUser: true, newUserName: name, newUserEmail: email});
        this.setState({usersNo: ++this.state.usersNo});
    }

    removeUser() {
        this.setState({usersNo: --this.state.usersNo});
    }

    userAdded() {
        this.setState({haveNewUser: false});
    }

    setUsersNo(no) {
        this.setState({usersNo: no});
    }

    doesEmailExist(email) {
        return this.state.emails.find(one => one.email === email);
    }

    getUserEmails(emailsArray) {
        this.setState({emails: emailsArray});
    }

    render() {
        return ( 
            <div className="container px-0 small mb-5">
                <Header/>
                <div className="container px-3 py-0 shadow-sm bg-white">
                    <Form usersNo = {this.state.usersNo} 
                            aUser = {this.addUser} 
                            doesEExist = {this.doesEmailExist} />
                    <Table sUsersNo = {this.setUsersNo} 
                            remUser = {this.removeUser} 
                            newUName = {this.state.newUserName} 
                            newUEmail = {this.state.newUserEmail} 
                            haveNUser = {this.state.haveNewUser}
                            uAdded = {this.userAdded}
                            getUEmails = {this.getUserEmails} />
                </div>
            </div>
        );
    }
}

render(<App/>, window.document.getElementById("app"));