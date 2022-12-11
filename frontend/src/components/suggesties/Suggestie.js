import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

class Suggestie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestie: "",
            positie: [0, 0],
        }
        
        this.submitForm = this.submitForm.bind(this);
    }
    
    async submitForm(e) {
        event.preventDefault();
        this.setState({
            suggestie: await (await fetch("suggestie/" + this.state.positie[0] + "/" + this.state.positie[1])).text(),
        })
    }

    render() {
       return (
            <div className="main-form">
                Vul hier je huidige positie in om een suggestie te krijgen van een
                attractie.
                <Form
                    onSubmit={this.submitForm}
                >
                    <Form.Group controlId="x">
                        <Form.Label>X</Form.Label>
                        <Form.Control
                            className="input-control"
                            type="number"
                            name="x"
                            value={this.state.positie[0]}
                            onChange={(e) =>
                                this.setState({
                                    positie: [e.target.value, this.state.positie[1]],
                                })
                            }
                        />
                    </Form.Group>
                    <Form.Group controlId="y">
                        <Form.Label>Y</Form.Label>
                        <Form.Control
                            className="input-control"
                            type="number"
                            name="y"
                            value={this.state.positie[1]}
                            onChange={(e) =>
                                this.setState({
                                    positie: [this.state.positie[0], e.target.value],
                                })
                            }
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="submit-btn">
                        Geef een suggestie!
                    </Button>
                </Form>
                <p id="suggestie">{this.state.suggestie}</p>
            </div>
        );
    }
}

export default Suggestie;