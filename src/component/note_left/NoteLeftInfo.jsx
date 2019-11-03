import React, { Component } from 'react'
import moment from 'moment';
import DateTime from 'react-datetime'
import { Label } from './Label';
import ParticipantInfo from './ParticipantInfo';

class NoteLeftInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            note_title: this.props.note_title,
            meeting_date: this.props.meeting_date,
            isTitleClicked: false,
            moment: moment()
        }
    }

    handleChangeTitle = (e) => {
        this.setState({ note_title: e.target.value })
    }

    handleConvertTag_Title = () => {
        this.setState({ isTitleClicked: !this.state.isTitleClicked })
    }

    handleChangeDatetime = (moment) => {
        this.setState({
            moment
        });
    }

    // handleDateBlur = () => {

    // }


    render() {
        let titleElement = null;
        if (!this.state.isTitleClicked) {
            titleElement = <p onClick={this.handleConvertTag_Title}>{this.state.note_title}</p>
        }
        else {
            titleElement = (
                            <input
                                type="text"
                                value={this.state.note_title}
                                onBlur={this.handleConvertTag_Title}
                                onChange={(e) => this.handleChangeTitle(e)}
                            />
            )
        }

        return (
            <div className="NoteLeftInfo">
                <div className="NoteLeftInfo-title__container">
                    <Label title="Note Title"/>
                    <div className="NoteLeftInfo__currentNote">
                        {titleElement}
                    </div>
                </div>
                <div className="NoteLeftInfo-date__container">
                    <Label title="Date" />
                    <DateTime 
                        // onBlur={handleDateBlur}
                    />
                </div>
                <ParticipantInfo 
                    participants={this.props.participants}
                />       
            </div>
        )
    }
}

export default NoteLeftInfo