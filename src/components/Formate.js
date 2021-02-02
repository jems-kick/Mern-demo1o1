import React, { Component } from 'react';
import Info from './Input';
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../components_style/formate.css'

class Formate extends React.Component {
    constructor(props) {
        super(props);

        this.changenameValueHandeler = this.changenameValueHandeler.bind(this);
        this.changetitleValueHandeler = this.changetitleValueHandeler.bind(this);
        this.changesummaryValueHandeler = this.changesummaryValueHandeler.bind(this)

        this.userAddHandeler = this.userAddHandeler.bind(this);

        this.state = {
            name: '',
            title: '',
            summary: ''
        }
    }
    changenameValueHandeler = (event) => {
        this.setState({
            name: event.target.value,
        })
    }

    changetitleValueHandeler = (event) => {
        this.setState({
            title: event.target.value,
        })
    }

    changesummaryValueHandeler = (event) => {
        this.setState({
            summary: event.target.value,
        })
    }

    userAddHandeler(e) {
        e.preventDefault();

        const user = {
            name: this.state.name,
            title: this.state.title,
            summary: this.state.summary
        }
        axios.post('http://localhost:5000/submit', user)
            .then(res => console.log(res.data))

        this.setState({
            name: '',
            title: '',
            summary: ''
        })

        if (user === null) {
            window.location = '/view';
        }
    }

    viewHandeler = () => {
        window.location = '/view'
    }

    render() {
        const name = <Info name={this.state.name}
            outputvalue={this.chnagenameValueHandeler}
            value={this.state.name}></Info>
        return (
            <div className="formate">
                <div className="main">
                    <h1 className="font">Add your summary</h1>
                    <InputGroup size="sm" className="mb-3" type="text" value={this.state.name} onChange={this.changenameValueHandeler} >
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-sm">Name</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                    </InputGroup>
                    <InputGroup size="sm" className="mb-3" type="text" value={this.state.title} onChange={this.changetitleValueHandeler}>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-sm">Title</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                    </InputGroup>
                    <form >
                        <textarea className="summary1" type="text" value={this.state.summary} onChange={this.changesummaryValueHandeler} placeholder="Type your summary here...">
                        </textarea>
                    </form>
                    <button className="button button2" onClick={this.userAddHandeler}>Submit</button><br></br>
                    <button className="button button2" onClick={this.viewHandeler}>View</button>
                </div>
            </div >
        )
    }
}

export default Formate;