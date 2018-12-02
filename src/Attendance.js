import React, {Component} from 'react';
import './Dashboard.css';
import './bootswatch.css';
import Student from "./Student";
import $ from 'jquery';

export default class Attendance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            students: null,
            toUpdate: {},
            changed: false,
            renderedImgLink: null,
        };
    }

    render() {
        if (!this.state.ready || !this.state.students || !this.state.students.present)
            return <span>Loading...</span>;
        const presentList = this.state.students.present.map((student, index) => this.studentCard(student, index, true));
        const absentList = this.state.students.absent.map((student, index) => this.studentCard(student, index, false));
        return (
            <div>
                <br/>
                {this.state.renderedImgLink ? <img src={this.state.renderedImgLink} alt="rendered bounding boxes"/> : null}
                <h2>Automatic Attendance</h2>
                <form action="#" id="myForm">
                    <input type="file" accept="image/*" name="mFile" />
                    <input type="button" className="btn btn-primary" value="Submit" onClick={this.autoUpdate.bind(this)}/>
                </form>
                <h3 className="mt-3">Absent</h3>
                <div className="d-flex flex-wrap">
                    {absentList}
                </div>
                <h3 className="mt-3">Present</h3>
                <div className="d-flex flex-wrap">
                    {presentList}
                </div>
                {this.state.changed ? <button className="update-btn btn btn-lg btn-success">Submit changes</button>: null}
            </div>
        );
    }

    autoUpdate() {
        $.ajax({
            method: 'POST',
            type: "POST",
            url: 'http://172.20.10.3:7777/auto-update',
            data: new FormData($('#myForm')[0]),
            processData: false,
            contentType: false,
            success: (data) => {
                this.setState({students: JSON.parse(data)});
            },
            crossDomain: true,
        });
    }

    componentDidMount() {
        this.fetchData();
    }

    studentCard(student, index, isPresent) {
        return <Student imageLink={student.imageLink} name={student.name} isPresent={isPresent} key={index}
                        onToggle={this.onStudentUpdate.bind(this)}/>;
    }

    onStudentUpdate(name, isPresent, revert) {
        const toUpdateNew = Object.assign({}, this.state.toUpdate);
        if (revert) {
            delete toUpdateNew[name];
        } else {
            toUpdateNew[name] = isPresent;
        }
        this.setState({
            toUpdate: toUpdateNew,
            changed: !$.isEmptyObject(toUpdateNew),
        });
    }

    fetchData() {
        this.setState({ready: false});
        $.ajax({
            method: 'get',
            dataType: 'jsonp',
            crossDomain: true,
            url: 'http://172.20.10.3:7777/attendance',
            success: (data) => {
                console.log(data);
                this.setState({students: JSON.parse(data), ready: true});
            },
        });
    }
}