import React from 'react';

import TutorRegistry from './TutorRegistry';

export default class TutorList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div>
        <div className="form-container">
          <div className="form-title">Course editor</div>
          <div className="form-subtitle">Registered tutors</div>
          <div className="registry-list-container">
            {
              this.props.tutors.map((tutors) =>
                {
                  return <TutorRegistry
                    tutors={tutors}
                    key={tutors._id}/>
                })
            }
          </div>
        </div>
      </div>
    );
  }
}
