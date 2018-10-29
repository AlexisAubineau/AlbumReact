import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import queryString from 'query-string'

export default class PageRange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            max: props.max,
            baseUrl: props.baseUrl,
        }
    }

    render() {
        const range = [];
        for (let i=1; i<=this.state.max; i++) {
            range.push(i)
        }
        const getParams = queryString.parse(window.location.search);
        return (
            <div aria-label="..." className="center">
                <ul className="pagination pagination-lg">
                    {range.map((i) => {
                            getParams.page = i;
                            return <li className="page-item" key={i}><Link to={{pathname: this.state.baseUrl + '?' + queryString.stringify(getParams)}} className="page-link">{i}</Link></li>
                    })}
                </ul>
            </div>
        );
    }

}