import React from "react";
import PropTypes from 'prop-types';

export class UserTableRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr className="d-flex">
                <th scope="row" className="col-first pl-4 py-3">
                    <div class="numberCircle">{this.props.id}</div>
                </th>
                <td className="col-second py-3">{this.props.name}</td>
                <td className="col py-3">{this.props.email}<a href="#" onClick={this.props.clickHandler.bind(this, this.props.id)}><ion-icon name="close"></ion-icon></a></td>
            </tr>
        );
    }
}

UserTableRow.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    clickHandler: PropTypes.func
};