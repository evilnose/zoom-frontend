import React, {Component} from 'react';
import {Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import Attendance from "./Attendance";
import classnames from 'classnames';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
        };
    }

    render() {
        return (
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({active: this.state.activeTab === '1'})}
                            onClick={() => {
                                this.toggle('1');
                            }}>
                            Take attendance
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({active: this.state.activeTab === '2'})}
                            onClick={() => {
                                this.toggle('2');
                            }}>
                            Manage students
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Container>
                            <Row>
                                <Col sm="12">
                                    <Attendance/>
                                </Col>
                            </Row>
                        </Container>
                    </TabPane>
                    <TabPane tabId="2">
                        <Container>
                            <Row>
                                <Col sm="12">
                                    <h4>Tab 2 Contents</h4>
                                </Col>
                            </Row>
                        </Container>
                    </TabPane>
                </TabContent>
            </div>
        )
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
}