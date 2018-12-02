import React, {Component} from 'react';
import {Card, CardImg, CardBody, CardTitle, Button} from "reactstrap";

export default class Student extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            isPresent: props.isPresent,
            changed: false,
        }
    }

    render() {
        return (
            <Card className="student-card">
                <CardImg top width="100%" src={this.props.imageLink} alt={this.props.name}/>
                <CardBody>
                    <CardTitle>{this.props.name}</CardTitle>
                    <Button onClick={this.toggle.bind(this)} color={this.state.changed ? (this.state.isPresent ? 'success' : 'danger') : 'primary'} className="card-button">
                        {this.state.changed ? ('Marked as ' + (this.state.isPresent ? 'Present' : 'Absent')) : (this.state.isPresent ? 'Absent' : 'Present') + '?'}
                    </Button>
                </CardBody>
            </Card>
        );
    }

    toggle() {
        const revert = this.state.changed;
        this.setState({
            isPresent: !this.state.isPresent,
            changed: !this.state.changed,
        });
        this.props.onToggle(this.props.name, this.state.isPresent, revert);
    }
}