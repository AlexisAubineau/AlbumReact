import React, {Component} from 'react'
import Photo from './Photo'

export default class Album extends Component{

    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            title: undefined,
            id: undefined,
            authorId: undefined,
            author: {},
        }
    }

    async fetchPhotos() {
        return (await fetch(`https://jsonplaceholder.typicode.com/albums/${this.state.id}/photos`)).json()
    }

    async fetchAuthor() {
        return (await fetch(`https://jsonplaceholder.typicode.com/users/${this.state.authorId}`)).json()
    }

    async componentDidMount() {
        this.setState({
            title: this.props.location.title,
            authorId: this.props.location.authorId,
            id: this.props.match.params.id,
            photos: await this.fetchPhotos(),
            author: this.fetchAuthor(),
        });
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.match.params.id !== prevState.id) {
            this.setState({
                id: this.props.match.params.id,
                photos: await this.fetchPhotos()
            });
        }
        if (this.props.location.title !== undefined && this.props.location.title !== prevState.title) {
            this.setState({
                title: this.props.location.title
            })
        }
        if (this.props.location.authorId !== undefined && this.props.location.authorId !== prevState.authorId) {
            this.setState({
                authorId: this.props.location.authorId,
                author: await this.fetchAuthor()
            });
        }
    }

    render() {
        return (
            <div className="container">
            <hr/>
                <h1>Album {this.state.id} :</h1>
                <h4>{this.state.title}</h4>
                <ul>
                    <li>Name: {this.state.author.name}</li>
                    <li>Username: {this.state.author.username}</li>
                    <li>Email: {this.state.author.email}</li>
                    <li>Phone: {this.state.author.phone}</li>
                </ul>
                <div className="row">
                    {this.state.photos.map(photo => <Photo key={photo.id} id={photo.id} url={photo.url} thumbnailUrl={photo.thumbnailUrl} title={photo.title} albumId={this.state.id}/>)}
                </div>
            </div>
        );
    }
}