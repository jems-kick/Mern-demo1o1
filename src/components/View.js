import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = (props) => (
    <tr>
        <td>{props.view.name}</td>
        <td>{props.view.name}</td>
        <td>{props.view.title}</td>
        <td>{props.view.summary}</td>
        <td>
            <a href="#" onClick={() => { props.deleteExercise(props.view._id) }}>delete</a>
        </td>
    </tr>
)

class View extends React.Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this)

        this.state = {
            views: [],
        }
    }

    componentDidMount() {
        axios.get('https://express-server-demo1o1.herokuapp.com/view')
            .then(response => {
                this.setState({ views: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteExercise(id) {
        axios.delete('https://express-server-demo1o1.herokuapp.com/delete/'+id)
          .then(response => { console.log(response.data)});
    
        this.setState({
          views: this.state.views.filter(el => el._id !== id)
        })
      }

    exerciseList() {
        return this.state.views.map(currentexercise => {
            return <Exercise view={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} />;
        })
    }

    viewHandeler = () => {
        window.location = '/submit'
    }

    render() {
        return (
            <div>
                <h3>All Summary</h3>
                <button className="button button2" onClick={this.viewHandeler}>Add your Summary</button>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>UserName</th>
                            <th>Title</th>
                            <th>Summary</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default View;