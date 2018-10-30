import React, {Component} from 'react';
import {Link} from "react-router-dom";
import queryString from 'query-string'
import Page from './Pagination'

export default class AlbumList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            albums: [],
            page: queryString.parse(this.props.location.search).page || 1,
            limit: 12,
        };
    }

    async fetchAlbums() {
        return (await fetch(`https://jsonplaceholder.typicode.com/albums?_page=${this.state.page}&_limit=${this.state.limit}`)).json()
    }

    async componentDidMount() {
        this.setState({
            albums: await this.fetchAlbums()
        });
    }

    async componentDidUpdate(prevState) {
        const page = queryString.parse(this.props.location.pathname.split('?')[1]).page || 1;
        if (page !== prevState.page) {
            this.setState({
                page,
                albums: await this.fetchAlbums()
            });
        }
    }

    render() {
        this.pageNbr = (100 / this.state.limit | 0) + 1;

        return (
            <div className="container">
                <h1>Albums</h1>
                <div className="row">
                    {this.state.albums.map(album => <div className="col-3 card-container" key={album.id}> 
                                                    <div className="card"> 
                                                        <div>
                                                            <div className="card-body">
                                                                <p className="card-title">{album.title}</p>
                                                            </div>
                                                            <div className="card-footer">
                                                                <Link to={{
                                                                pathname: `/albums/${album.id}`,
                                                                title: album.title,
                                                                authorId: album.userId,
                                                            }}>Afficher</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>)}
                </div>
                <Page max={this.pageNbr} baseUrl="/albums"/>
            </div>
        )
    }
}