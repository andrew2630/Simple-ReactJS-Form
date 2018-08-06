import React from "react";
import PropTypes from 'prop-types';

export class Form extends React.Component {
    emptyName = true;
    emptyEmail = true;

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: ""
        };
        
        this.nameChange = this.nameChange.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showUserAddedMsg = this.showUserAddedMsg.bind(this);
    }

    extract = (str, pattern) => (str.match(pattern) || []).pop() || '';

    nameChange(event) {
        var extractAlpha = this.extract(event.target.value, "[a-zA-Z]+");
        var newTxt =  extractAlpha.substring(0, 20);
        event.target.value = newTxt;

        if(event.target.value.length) {
            document.getElementById("formMsg").style.display = "inline-block";
            this.emptyName = false;
        } else if(this.emptyEmail) {
            document.getElementById("formMsg").style.display = "none";
        } else if(event.target.value.length == 0) {
            this.emptyName = true;
        }

        this.setState({name: event.target.value});
    }

    emailChange(event) {
        event.target.value = this.extract(event.target.value, "[a-zA-Z0-9@.]+");
        
        if(event.target.value.length) {
            document.getElementById("formMsg").style.display = "inline-block";
            this.emptyEmail = false;
        } else if(this.emptyName) {
            document.getElementById("formMsg").style.display = "none";
        } else {
            this.emptyEmail = true;
        }

        this.setState({email: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        var name = this.state.name;
        var email = this.state.email;
        
        if(email.match(/\S+@\S+\.\S+/) && !this.props.doesEExist(email)) {
            this.props.aUser(name, email);
            this.handleReset();
            this.showUserAddedMsg();
        }
    }

    showUserAddedMsg() {
        this.hideForm();
    }

    handleReset() {
        document.getElementById("formInputName").value = "";
        document.getElementById("formInputEmail").value = "";
        document.getElementById("formMsg").style.display = "none";
    }

    showForm() {
        document.getElementById("form").style.display = "block";
        document.getElementById("formInputName").focus();
        document.getElementById("addUserBtn").style.display = "none";
        document.getElementById("addUserMsg").style.display = "none";
        document.getElementById("formMsg").style.display = "none";
    }

    hideForm() {
        document.getElementById("form").style.display = "none";
        document.getElementById("addUserBtn").style.display = "block";
        document.getElementById("addUserMsg").style.display = "block";
    }

    render() {
        return (
            <div className="row px-4 py-2">
                <button className="btn btn-outline-success mx-2 my-2" disabled={this.props.usersNo >= 10} onClick={this.showForm} id="addUserBtn">
                    <ion-icon name="add-circle"></ion-icon>
                    <span className="pl-2">Add user</span>
                </button>
                <p className="mx-2 my-2" id="addUserMsg"><ion-icon name="checkmark"></ion-icon><span>You have successfully added an user.</span></p>
                    <form className="form-inline my-2" id="form" onSubmit={this.handleSubmit}>
                        <label class="sr-only" for="formInputName">Name</label>
                        <input type="text" class="form-control my-0 mx-3" id="formInputName" placeholder="Name..." onChange={this.nameChange}></input>
                        <label class="sr-only" for="formInputEmail">E-mail</label>
                        <input type="text" class="form-control my-0 mx-3" id="formInputEmail" placeholder="E-mail..." onChange={this.emailChange}></input>
                        <button type="submit" className="btn btn-success mx-3">Submit</button>
                        <button className="btn btn-link my-0 ml-3" id="formMsg" onClick={this.handleReset}>Reset fields</button>
                    </form>
            </div>
        );
    }
}

Form.propTypes = {
    usersNo: PropTypes.number,
    aUser: PropTypes.func,
    doesEExist: PropTypes.func
};