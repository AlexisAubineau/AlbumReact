import React, {Component} from 'react'

export default class Photo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: undefined,
            url: undefined,
            title: undefined,
            thumbnailUrl: undefined,
        }
    }

    componentDidMount() {
        this.setState({
            id: this.props.id,
            url: this.props.url,
            title: this.props.title,
            thumbnailUrl: this.props.thumbnailUrl,
            albumId: this.props.albumId
        })
    }

    render() {
        return (
            <div className="col-2 photo-body">
                <table>
                    <tbody>
                        <tr>
                            <td> </td>
                            <td>
                                <img src={this.state.thumbnailUrl} alt={this.state.title}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}