import React, { Component } from 'react';

import Loading from '../../tools/Loading';
import AudioRecorder from './AudioRecorder';
import AudioPreview from './AudioPreview';
import ImagePreview from './ImagePreview';
import FileUpload from '../../files/FileUpload';

import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

import DeleteIcon from '@material-ui/icons/Delete';
import WarningIcon from '@material-ui/icons/Warning';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import StorytellingStart from './StorytellingStart';
import StorytellingScene from './StorytellingScene';
import StorytellingEnd from './StorytellingEnd';

import { Activities } from '../../../../lib/ActivitiesCollection';

export default class StorytellingTool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      story: {
        name: "",
        published: false,
        activityId: undefined,
        courseId: undefined,
        user: Meteor.userId(),
        creationDate: new Date(),
        nodes: [
          {
            type: 'start',
            name: 'Start',
            description: '',
            image: undefined,
            audio: undefined,
            ordinal: 0,
            _id: 1,
          },
        ],
        isPublic: true,
      },
      selectedNode: 0,
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  handleChange = name => event => {
    let story = this.state.story;
    let isPublic = this.state.isPublic;
    if (name === 'storyName') {
      story.name = event.target.value;
    }
    if (name === 'name') {
      story.nodes[this.state.selectedNode].name = event.target.value;
    }
    if (name === 'description') {
      story.nodes[this.state.selectedNode].description = event.target.value;
    }
    if (name === "public") {
      story.isPublic = !story.isPublic;
    }
    this.setState({
      story: story,
    })
  }

  addSingleNode = (index) => {
    let story = this.state.story;
    let newNode = Math.random();
    story.nodes.push({
      type: 'scene',
      name: `New scene ${story.nodes.length}`,
      description: '',
      image: undefined,
      audio: undefined,
      ordinal: story.nodes.length,
      _id: newNode,
    });
    this.setState({
      story: story,
      selectedNode: story.nodes.length - 1,
    });
  }

  addEndNode = (index) => {
    let story = this.state.story;
    let newNode = Math.random();
    story.nodes.push({
      type: 'end',
      name: 'End',
      description: '',
      image: undefined,
      audio: undefined,
      ordinal: story.nodes.length,
      _id: newNode,
    });
    this.setState({
      story: story,
      selectedNode: story.nodes.length - 1,
    });
  }

  selectNode = (index) => {
    this.setState({
      selectedNode: index,
    });
  }

  openDialog = (action) => {
    this.setState({
      action: action,
      open: true,
    })
  }

  deleteNode = () => {
    let story = this.state.story;
    let selectedNode = this.state.selectedNode;
    if (story.nodes.length === 3) {
      if (story.nodes[2].type === "end" && story.nodes[1].type === "scene") {
        this.props.handleControlMessage(true, "Your story must have: start, 1 scene, end")
        this.handleClose();
        return false;
      }
    }
    story.nodes.splice(selectedNode, 1);
    if (selectedNode >= story.nodes.length) {
      selectedNode--;
    }
    this.setState({
      selectedNode: selectedNode,
      story: story,
    }, () => {
      this.handleClose();
    });
  }

  getAudioFileInformation(file){
    let story = this.state.story;
    story.nodes[this.state.selectedNode].audio = file;
    this.setState({
      story: story,
    });
  }

  unPickAudioFile(){
    let story = this.state.story;
    story.nodes[this.state.selectedNode].audio = undefined;
    this.setState({
      story: story,
    });
  }

  getImageFileInformation(file){
    let story = this.state.story;
    story.nodes[this.state.selectedNode].image = file;
    this.setState({
      story: story,
    });
  }

  unPickImageFile(){
    let story = this.state.story;
    story.nodes[this.state.selectedNode].image = undefined;
    this.setState({
      story: story,
    });
  }

  validateStory = () => {
    let story = this.state.story;
    if (story.nodes.length < 3) {
      this.props.handleControlMessage(true, "Your story must have at least: start, 1 scene, and the end");
      return false;
    }
    for (var i = 0; i < story.nodes.length; i++) {
      if (story.nodes[i].name === "") {
        this.props.handleControlMessage(true, "All the scenes of the story must have a name");
        this.setState({
          selectedNode: i,
          showError: true,
        });
        return false;
      }
      if (story.nodes[i].audio === undefined) {
        this.props.handleControlMessage(true, "All the scenes of the story must have an audio record");
        this.setState({
          selectedNode: i,
        });
        return false;
      }
      if (story.nodes[i].image === undefined) {
        this.props.handleControlMessage(true, "All the scenes of the story must have an image");
        this.setState({
          selectedNode: i,
        });
        return false;
      }
    }
    let hasEnd = false;
    for (var i = 0; i < story.nodes.length; i++) {
      if (story.nodes[i].type === 'end') {
        hasEnd = true;
      }
    }
    if (!hasEnd) {
      this.props.handleControlMessage(true, "Your story must have an end");
      return false;
    }
    return true;
  }

  handleSaveStory = () => {
    if (this.validateStory()) {
      this.setState({
        action: "save",
        open: true,
      })
    }
  }

  saveStory = () => {
    if (this.state.story.name !== "") {
      Activities.insert({
        activity: {
          data: this.state.story.nodes,
          type: "storytelling",
          public: this.state.story.isPublic,
          activityId: this.state.story.activityId,
          date: this.state.story.creationDate,
          user: this.state.story.user,
          course: this.state.story.courseId,
        }
      }, () => {
        this.handleControlMessage(true, "Story saved successfully", true, "storytellingList", "See list");
        this.handleClose();
      })
    }
    else {
      this.handleControlMessage(true, "Add the name of the story");
    }
  }

  handlPublishStory = () => {

  }

  publishStory = () => {

  }

  componentDidMount() {

  }

  render() {
    return(
      <div>
        <div className="storytelling-tool-container">
          <div className="storytelling-work-area">
            <h2 className="storytelling-work-area-title">Story flow</h2>
            {
              this.state.story.nodes.length >= 2 ?
                <Button color="primary" className="storytelling-work-preview-button">Story preview</Button>
              :
              undefined
            }
            {
              this.state.story.nodes.map((node, index) => {
                return(
                  <React.Fragment>
                    {
                      node.type === 'start' ?
                        <StorytellingStart
                          node={node}
                          nodes={this.state.story.nodes}
                          index={index}
                          selectedNode={this.state.selectedNode}
                          addSingleNode={this.addSingleNode.bind(this)}
                          selectNode={this.selectNode.bind(this)}
                        />
                      :
                        undefined
                    }
                    {
                      node.type === 'scene' ?
                        <StorytellingScene
                          node={node}
                          nodes={this.state.story.nodes}
                          index={index}
                          selectedNode={this.state.selectedNode}
                          addSingleNode={this.addSingleNode.bind(this)}
                          addEndNode={this.addEndNode.bind(this)}
                          selectNode={this.selectNode.bind(this)}
                        />
                      :
                        undefined
                    }
                    {
                      node.type === 'end' ?
                        <StorytellingEnd
                          node={node}
                          nodes={this.state.story.nodes}
                          index={index}
                          selectedNode={this.state.selectedNode}
                          selectNode={this.selectNode.bind(this)}
                        />
                      :
                        undefined
                    }
                  </React.Fragment>
                )
              })
            }
          </div>
          <div className="storytelling-menu-container">
            <div className="storytelling-menu-header">
              <h3 className="storytelling-menu-title">
                <React.Fragment>
                  {
                    this.state.story.nodes[this.state.selectedNode].type === 'start' ?
                        "Beginning of the story"
                    :
                      undefined
                  }
                  {
                    this.state.story.nodes[this.state.selectedNode].type === 'scene' ?
                      <React.Fragment>
                        {`Scene ${this.state.story.nodes[this.state.selectedNode].ordinal}`}
                      </React.Fragment>
                    :
                      undefined
                  }
                  {
                    this.state.story.nodes[this.state.selectedNode].type === 'end' ?
                      <React.Fragment>
                        {"End of the story"}
                      </React.Fragment>
                    :
                      undefined
                  }
                </React.Fragment>
              </h3>
              <div className="center-row">
                <Button
                  className="storytelling-media-button"
                  variant="outlined"
                  color="primary"
                  onClick={() => this.handleSaveStory()}
                >
                  Save story
                </Button>
                <Button
                  className="storytelling-media-button"
                  variant="outlined"
                  color="primary"
                  onClick={() => this.handlePublishStory()}
                >
                  Publish story
                </Button>
              </div>
              <FormGroup style={{marginTop: "1.5vh"}}>
                <FormControlLabel
                  control={<Switch size="small" onChange={this.handleChange('public')} checked={this.state.story.isPublic}/>}
                  label={<p className="form-label">Make this story public</p>}
                />
              </FormGroup>
            </div>
            <div className="storytelling-menu-body">
              <TextField
                id="node-name-input"
                label="Name"
                margin="normal"
                variant="outlined"
                fullWidth
                autoComplete={"off"}
                required
                value={this.state.story.nodes[this.state.selectedNode].name}
                onChange={this.handleChange('name')}
                error={this.state.showError && this.state.story.nodes[this.state.selectedNode].name === ''}
                helperText="This is the name of the scene ex: Introduction, just scene 1 or whatever you want."
              />
              <TextField
                id="node-description-input"
                label="Description"
                margin="normal"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={this.state.story.nodes[this.state.selectedNode].description}
                onChange={this.handleChange('description')}
                error={this.state.showError && this.state.story.nodes[this.state.selectedNode].description === ''}
                helperText="This is the description of the scene, is not required but it could help in accessibility for other students (you could write the transcription of the voice recorded)."
              />
              <Divider light/>
              {
                this.state.story.nodes[this.state.selectedNode].audio !== undefined ?

                  <AudioPreview
                    file={this.state.story.nodes[this.state.selectedNode].audio}
                    unPickAudioFile={this.unPickAudioFile.bind(this)}
                  />
                :
                <AudioRecorder
                  getFileInformation={this.getAudioFileInformation.bind(this)}
                />
              }
              {
                this.state.story.nodes[this.state.selectedNode].image !== undefined ?
                  <ImagePreview
                    file={this.state.story.nodes[this.state.selectedNode].image}
                    unPickImageFile={this.unPickImageFile.bind(this)}
                  />
                :
                <FileUpload
                  type='image'
                  user={Meteor.userId()}
                  accept={'image/*'}
                  label={'Click the button to upload an image'}
                  getFileInformation={this.getImageFileInformation.bind(this)}
                />
              }
            </div>
            {
              this.state.story.nodes[this.state.selectedNode].type !== 'start' ?
                <Tooltip title="Delete this scene">
                  <Fab
                    color="secondary"
                    className="storytelling-delete-button"
                    onClick={() => this.openDialog('delete')}
                  >
                    <DeleteIcon/>
                  </Fab>
                </Tooltip>
              :
                undefined
            }
          </div>
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-confirmation"
          aria-describedby="alert-dialog-confirmation"
        >
          {
            this.state.action === "delete" ?
              <React.Fragment>
                <DialogTitle className="success-dialog-title" id="alert-dialog-title">
                  {"Delete node"}
                </DialogTitle>
                <DialogContent className="success-dialog-content">
                  <DialogContentText className="success-dialog-content-text" id="alert-dialog-description">
                    {"Are you sure you want to delete this node of the story?"}
                  </DialogContentText>
                  <WarningIcon className="warning-dialog-icon"/>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => this.handleClose()} color="primary" autoFocus>
                    Cancel
                  </Button>
                  <Button onClick={() => this.deleteNode()} color="primary" autoFocus>
                    Confirm
                  </Button>
                </DialogActions>
              </React.Fragment>
            :
              undefined
          }
          {
            this.state.action === "save" ?
              <React.Fragment>
                <DialogTitle className="success-dialog-title" id="alert-dialog-title">
                  {"Save story"}
                </DialogTitle>
                <DialogContent className="success-dialog-content">
                  <TextField
                    id="story-name-input"
                    label="Story name"
                    placeholder="My story"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    autoComplete={"off"}
                    required
                    value={this.state.story.name}
                    onChange={this.handleChange('storyName')}
                    helperText="We know sometimes inspiration and names comes and the end"
                  />
                  <DialogContentText className="success-dialog-content-text" id="alert-dialog-description">
                    {"Add the name of the story to save it"}
                  </DialogContentText>
                  <WarningIcon className="warning-dialog-icon"/>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => this.handleClose()} color="primary" autoFocus>
                    Cancel
                  </Button>
                  <Button onClick={() => this.saveStory()} color="primary" autoFocus>
                    Save
                  </Button>
                </DialogActions>
              </React.Fragment>
            :
              undefined
          }
        </Dialog>
      </div>
    )
  }
}
