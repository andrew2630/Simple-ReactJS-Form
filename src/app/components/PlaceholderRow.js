import React from "react";
import PropTypes from 'prop-types';

export class PlaceholderRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr className="d-flex">
                <th scope="row" className="col-first pl-4 py-3">
                    <div class="numberCircle">0</div>
                </th>
                <td className="col-second py-3">(Name...)</td>
                <td className="col py-3">(Email...)</td>
            </tr>
        );
    }
}