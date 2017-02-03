import React from 'react';
import axios from 'axios';
import {getAllLogs} from './helper/auth.js'
import {LogEntry} from './LogEntry.jsx';
import {Link} from 'react-router';

class ViewLogs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logs: []
    };
  }

  componentWillMount() {
    getAllLogs()
    .then((resp) => {
      if (this.props.student_id === '') {
        this.setState({
          logs: resp.data.filter((log) => {return log.types === 3}),
        });
      } else {
        this.setState({
          logs: resp.data.filter((log) => {return log.types === 3 && log.student_id === this.props.student_id}),
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render () {
    return (
      <div id="wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
                <h1 className="alignleft">View Updates / Logs</h1>
                <h3 className="alignright"><Link to="/createlog"><img src="add.png" height="25px" />Log</Link></h3>
                  <table className="table table-hover" >
                    <thead>
                      <tr>
                        <th className="col-md-4">Student</th>
                        <th className="col-md-4">Log</th>
                        <th className="col-md-4">Author</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.logs.map((log, index) => {
                          return (
                            <LogEntry eachLog={log} key={index} />
                          )
                        })
                      }
                    </tbody>
                  </table>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export {ViewLogs};