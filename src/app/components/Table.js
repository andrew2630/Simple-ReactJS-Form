import React from "react";
import PropTypes from 'prop-types';
import { UserTableRow } from "./UserTableRow";
import { PlaceholderRow } from "./PlaceholderRow";

export class Table extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            users: [],
            idAsc: true,
            nameAsc: false,
            emailAsc: false
        };

        this.getRow = this.getRow.bind(this);
        this.userClickHandler = this.userClickHandler.bind(this);
        this.sortByIds = this.sortByIds.bind(this);
        this.sortByNames = this.sortByNames.bind(this);
        this.sortByEmails = this.sortByEmails.bind(this);
        this.compareBy = this.compareBy.bind(this);
        this.sort = this.sort.bind(this);
    }

    sortByIds(e) {
        e.preventDefault();
        if(this.state.idAsc) {
            this.sort("id", 1);
        } else {
            this.sort("id", -1);
        }

        this.setState({idAsc: !this.state.idAsc, sortBy: "id"});
    }

    sortByNames(e) {
        e.preventDefault();
        if(this.state.nameAsc) {
            this.sort("name", 1);
        } else {
            this.sort("name", -1);
        }

        this.setState({nameAsc: !this.state.nameAsc, sortBy: "name"});
    }

    sortByEmails(e) {
        e.preventDefault();
        if(this.state.emailAsc) {
            this.sort("email", 1);
        } else {
            this.sort("email", -1);
        }

        this.setState({emailAsc: !this.state.emailAsc, sortBy: "email"});
    }

    compareBy(key, dir) {
        return (a, b) => {
          if (a[key] < b[key]) return -1 * dir;
          if (a[key] > b[key]) return 1 * dir;
          return 0;
        };
    }

    sort(key, dir) {
        let arrayCopy = [...this.state.users];
        arrayCopy.sort(this.compareBy(key, dir));
        this.setState({users: arrayCopy});
    }

    userClickHandler(id) {
        this.props.remUser();

        var tempUsers = this.state.users.filter((user) => { 
            return (user.id !== id) ? user : null
        });

        for(let i = 0; i < tempUsers.length; i++) {
            tempUsers[i].id = i + 1;
        }

        this.setState({users: tempUsers});
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => {
                this.setState({ users }); 
                var usersLength = (users.length > 10) ? 10 : users.length; 
                this.props.sUsersNo(usersLength);
            })
            .catch(err => console.error(this.props.url, err.toString()));
            
        this.setState({users: this.state.users.map(user => { 
            var newUser = {
                'id': user.id,
                'name': user.name,
                'email': user.email
            };
            return newUser;
        })});

        this.setState({users: this.state.users.slice(10)});
    }

    addUserToTable() {
        if(this.props.haveNUser) {
            var tempUsers = this.state.users;
            var id = tempUsers.length + 1;
            tempUsers.push({id: id, name: this.props.newUName, email: this.props.newUEmail});
            this.setState({users: tempUsers});
            this.props.uAdded();

            var emails = this.state.users.map(user => { 
                var email = {
                    'email': user.email
                };
                return email;
            })
            this.props.getUEmails(emails);
        }
    }

    getRow() {
        if(this.state.users.length) {
            return this.state.users.map((user) => <UserTableRow id={user.id} name={user.name} email={user.email} clickHandler={this.userClickHandler} />);
        } else {
            return <PlaceholderRow />
        }
    }

    render() {
        this.addUserToTable();
        return (
            <div className="row">
                <table className="table table-borderless mb-0">
                    <thead>
                        <tr className="d-flex">
                            <th scope="col" className="col-first pl-4 py-2"><a href="#" onClick={this.sortByIds}>LP</a></th>
                            <th scope="col" className="col-second py-2"><a href="#" onClick={this.sortByNames}>USER</a></th>
                            <th scope="col" className="col py-2"><a href="#" onClick={this.sortByEmails}>E-MAIL</a></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getRow()}
                    </tbody>
                </table>
            </div>
        );
    }
}

Table.propTypes = {
    sUsersNo: PropTypes.func,
    remUser: PropTypes.func,
    haveNUser: PropTypes.bool,
    newUName: PropTypes.string,
    newUEmail: PropTypes.string,
    uAdded: PropTypes.func,
    getUEmails: PropTypes.func
};