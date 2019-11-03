import React, { Component } from 'react';
import NoteLeftInfo from '../../component/note_left/NoteLeftInfo';
import NoteLeftBlock from '../../component/note_left/NoteLeftBlock';
// Dummy Data
import {
    dummyNote,
    handleAddAgendaBlock,
    handleAddTextBlock,
    handleAddImageBlock,
    handleAddCalendarBlock,
    handleAddPdfBlock,
    handleAddTableBlock,
    handleAddTodoBlock
} from './DummyData';
import NoteLeft from './NoteLeft';
class Note extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAgendaClicked: false,
            isNoteLeftClicked: true,
            isNoteRightClicked: false,
        }
    }

    handleClickAgenda = () => {
        console.log("Agenda Clicked")
        if (this.state.isNoteLeftClicked) {
            this.setState({ 
                            isAgendaClicked: true, 
                            isNoteLeftClicked: false
                        })
            console.log(document.getElementsByClassName('Note-left')[0]);
            document.getElementsByClassName('Note-left')[0].className="Note-left-agenda-click";
        }
        else {
            this.setState({
                            isAgendaClicked: false,
                            isNoteLeftClicked: true
                        })
            document.getElementsByClassName('Note-left-agenda-click')[0].className="Note-left";
        }
    }

    handleClickNoteLeft = (e) => {
        if (!e.target.className.includes('PreviewAgenda')) {
            if (this.state.isAgendaClicked) {
                this.setState({
                                isAgendaClicked: false,
                                isNoteLeftClicked: true,
                                isNoteRightClicked: false,
                            })
                document.getElementsByClassName('Note-left-agenda-click')[0].className="Note-left";
            }
            else {
                this.setState({
                    isNoteLeftClicked: true,
                    isNoteRightClicked: false,
                })
            }
        }
    }

    handleClickNoteRight = () => {
        this.setState({
                        isNoteLeftClicked: false,
                        isNoteRightClicked: true,
})
    }

    componentDidMount() {}
    
    render() {
        
        const temp_id = 1;
        return (
            <div className="Note">
                <NoteLeft 
                    note_title={dummyNote.note_title}
                    meeting_date={dummyNote.meeting_date}
                    participants={dummyNote.participants}
                    note_id={temp_id}
                    handleClickAgenda={this.handleClickAgenda}
                    handleClickNoteLeft={this.handleClickNoteLeft}
                />
                <div 
                    className="Note-right"
                    onClick={this.handleClickNoteRight}
                >
                    <div className="Note-right-container">
                        RIGHT
                    </div>

                </div>
            </div>
        
        );
    }
}

export default Note;
