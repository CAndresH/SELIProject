import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FileUpload from '../files/FileUpload';

import CourseFilesCollection from '../../../lib/CourseFilesCollection.js';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../style/theme.js';

export default class VideoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoFile: undefined,
      showVideoInput: true,
      parentId: 'creating-course',
      showVideoAccesibilityForm: false,
      wayToAdd: '',
      audioDescription: '',
      languageSign: '',
      videoTrasnciption: true,
      wayToAddTrascription: '',
    }
  }

  saveContent(){
    this.props.showForm("UnitsEditor", true);
    let lessonName = document.getElementById('lesson-name-input').value;
    let content = {
      lesson: lessonName,
      type: 'video',
    };
    this.props.addContent(content);
  }

  getWayToAdd = event => {
    this.setState({
      wayToAdd: event.target.value,
    });
  }

  getAudioDescription = event => {
    this.setState({
      audioDescription: event.target.value,
    }, () => this.showAudioDesctiptionUpload());
  }

  showAudioDesctiptionUpload() {
    let showUpload = false;
    if(this.state.audioDescription === "No"){
      showUpload = true;
    }
    this.setState({
      showAudioDesctiptionUpload: showUpload,
    });
  }

  getLanguageSign = event => {
    this.setState({
      languageSign: event.target.value,
    }, () => this.showLanguagueSignUpload());
  }

  showLanguagueSignUpload() {
    let showUpload = false;
    if(this.state.languageSign === "No"){
      showUpload = true;
    }
    this.setState({
      showLanguagueSignUpload: showUpload,
    });
  }

  showAudioDesctiptionUpload() {
    let showUpload = false;
    if(this.state.audioDescription === "No"){
      showUpload = true;
    }
    this.setState({
      showAudioDesctiptionUpload: showUpload,
    });
  }

  getVideoTrasnciption = event => {
    this.setState({
      videoTrasnciption: event.target.value,
    }, () => this.showVideoTrasnciptionWayToAdd());
  }

  showVideoTrasnciptionWayToAdd(){
    let showUpload = false;
    if(this.state.videoTrasnciption === "No"){
      showUpload = true;
    }
    this.setState({
      videoTrasnciption: showUpload,
    });
  }

  getWayToAddTrasnciption = event => {
    this.setState({
      wayToAddTrascription: event.target.value,
    }, () => this.showVideoTrasnciptionUpload());
  }

  showVideoTrasnciptionUpload() {
    let showUpload = false;
    let showInput = true;
    if(this.state.wayToAddTrascription === "No"){
      showUpload = true;
      showInput = false;
    }
    this.setState({
      showVideoTrasnciptionUpload: showUpload,
      showVideoTrasnciptionInput: showInput,
    });
  }

  getFileInformation(fileInformation){
    this.setState({
      fileInformation: fileInformation,
    });
  }

  removeFileInformation(){
    this.setState({
      fileInformation: [],
    });
    this.setState({
      showVideoAccesibilityForm: false,
    });
  }

  resetFile(){
    this.setState({
      parentId: 'creating-course',
    });
  }

  showVideoAccesibilityForm(){
    this.setState({
      showVideoAccesibilityForm: true,
    });
  }

  render() {
    return(
      <div>
        <MuiThemeProvider theme={theme}>
          <div className="form-title">Course editor</div>
          <div className="form-subtitle">Video content</div>
          <div className="input-container">
            <TextField
              id="lesson-name-input"
              label="Lesson name"
              margin="normal"
              variant="outlined"
              fullWidth
              required
            />
          </div>
          <div className="input-container">
            <TextField
              id="outlined-uncontrolled"
              label="Lesson objective"
              margin="normal"
              variant="outlined"
              fullWidth
              required
            />
          </div>
          <div className="form-subtitle">Content</div>
          <div className="input-container">
            <FormControl component="fieldset">
              <FormLabel component="legend" className="radio-label">Select the way to add the video</FormLabel>
            </FormControl>
            <RadioGroup aria-label="position" name="position" value={this.state.wayToAdd} onChange={this.getWayToAdd} row>
              <FormControlLabel
                value="url"
                control={<Radio color="primary" />}
                label="By url"
                labelPlacement="end"
              />
              <FormControlLabel
                value="upload"
                control={<Radio color="primary" />}
                label="By upload"
                labelPlacement="end"
              />
            </RadioGroup>
          </div>

          <div className=""></div>
          {
            this.state.wayToAdd === 'upload' ?
              <div className="input-file-container">
                <FileUpload
                  parentId={this.state.parentId + "-file"}
                  accept="video/*"
                  label="Upload video"
                  uploadedTitle="Video content"
                  icon="video-g.svg"
                  collection={CourseFilesCollection}
                  removeFunction="RemoveCourseFile"
                  type="video"
                  preview={false}
                  dowload={false}
                  open={false}
                  delete={true}
                  showIcon={true}
                  showControlMessage={this.props.showControlMessage.bind(this)}
                  resetFile={this.resetFile.bind(this)}
                  getFileInformation={this.getFileInformation.bind(this)}
                  removeFileInformation={this.removeFileInformation.bind(this)}
                  showVideoAccesibilityForm={this.showVideoAccesibilityForm.bind(this)}
                />
              </div>
            :
            undefined
          }
          {
            this.state.wayToAdd === 'url' ?
              <div className="input-container">
                <TextField
                  id="outlined-uncontrolled"
                  label="Video URL"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  required
                />
              </div>
            :
            undefined
          }
          {
            this.state.showVideoAccesibilityForm ?
              <div>
                <div className="form-subtitle">Accesibility items</div>
                <div className="input-container">
                  <FormControl component="fieldset">
                    <FormLabel component="legend" className="radio-label">The uploaded video has video trasncription?</FormLabel>
                  </FormControl>
                  <RadioGroup aria-label="position" name="position" value={this.state.videoTrasnciption} onChange={this.getVideoTrasnciption} row>
                    <FormControlLabel
                      value="Yes"
                      control={<Radio color="primary" />}
                      label="Yes"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio color="primary" />}
                      label="No"
                      labelPlacement="end"
                    />
                  </RadioGroup>
                </div>
                {
                  !this.state.videoTrasnciption ?
                    <div>
                      <div className="input-container">
                        <FormControl component="fieldset">
                          <FormLabel component="legend" className="radio-label">Select the way to upload the video trasncription</FormLabel>
                        </FormControl>
                        <RadioGroup aria-label="position" name="position" value={this.state.wayToAddTrascription} onChange={this.getWayToAddTrasnciption} row>
                          <FormControlLabel
                            value="Yes"
                            control={<Radio color="primary" />}
                            label="By text"
                            labelPlacement="end"
                          />
                          <FormControlLabel
                            value="No"
                            control={<Radio color="primary" />}
                            label="By upload"
                            labelPlacement="end"
                          />
                        </RadioGroup>
                      </div>
                      {
                        this.state.showVideoTrasnciptionUpload ?
                          <div className="input-file-container">
                            <FileUpload
                              parentId={this.state.parentId + "-pdf-accssebility"}
                              accept=".pdf"
                              label="Upload video trasnciption (.pdf)"
                              uploadedTitle="Video transcription"
                              icon="pdf-g.svg"
                              collection={CourseFilesCollection}
                              removeFunction="RemoveCourseFile"
                              type="file"
                              preview={false}
                              dowload={false}
                              open={true}
                              delete={true}
                              showIcon={true}
                              showControlMessage={this.props.showControlMessage.bind(this)}
                              resetFile={this.resetFile.bind(this)}
                              getFileInformation={this.getFileInformation.bind(this)}
                              removeFileInformation={this.removeFileInformation.bind(this)}
                            />
                          </div>
                        :
                        undefined
                      }
                      {
                        this.state.showVideoTrasnciptionInput ?
                          <div className="input-container">
                            <TextField
                              id="teacher-biography-input"
                              label="Video description"
                              margin="normal"
                              variant="outlined"
                              fullWidth
                              required
                              multiline
                              rows="6"
                              error={this.state.biographyError}
                            />
                          </div>
                        :
                        undefined
                      }
                    </div>
                  :
                    undefined
                }
                <div className="input-container">
                  <FormControl component="fieldset">
                    <FormLabel component="legend" className="radio-label">The uploaded video has audio description?</FormLabel>
                  </FormControl>
                  <RadioGroup aria-label="position" name="position" value={this.state.audioDescription} onChange={this.getAudioDescription} row>
                    <FormControlLabel
                      value="Yes"
                      control={<Radio color="primary" />}
                      label="Yes"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio color="primary" />}
                      label="No"
                      labelPlacement="end"
                    />
                  </RadioGroup>
                </div>
                {
                  this.state.showAudioDesctiptionUpload ?
                    <div className="input-file-container">
                      <FileUpload
                        parentId={this.state.parentId + "-audio-accssebility"}
                        accept="audio/*"
                        label="Upload audio description"
                        uploadedTitle="Video audio description"
                        icon="audio-g.svg"
                        collection={CourseFilesCollection}
                        removeFunction="RemoveCourseFile"
                        type="audio"
                        preview={false}
                        dowload={false}
                        open={false}
                        delete={true}
                        showIcon={true}
                        showControlMessage={this.props.showControlMessage.bind(this)}
                        resetFile={this.resetFile.bind(this)}
                        getFileInformation={this.getFileInformation.bind(this)}
                        removeFileInformation={this.removeFileInformation.bind(this)}
                      />
                    </div>
                  :
                  undefined
                }
                <div className="input-container">
                  <FormControl component="fieldset">
                    <FormLabel component="legend" className="radio-label">The uploaded video has sign language interprete embebed?</FormLabel>
                  </FormControl>
                  <RadioGroup aria-label="position" name="position" value={this.state.languageSign} onChange={this.getLanguageSign} row>
                    <FormControlLabel
                      value="Yes"
                      control={<Radio color="primary" />}
                      label="Yes"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio color="primary" />}
                      label="No"
                      labelPlacement="end"
                    />
                  </RadioGroup>
                </div>
                {
                  this.state.showLanguagueSignUpload ?
                    <div className="input-file-container">
                      <FileUpload
                        parentId={this.state.parentId + "-video-accssebility"}
                        accept="video/*"
                        label="Upload language sign video"
                        uploadedTitle="Video content (Language sign)"
                        icon="video-g.svg"
                        collection={CourseFilesCollection}
                        removeFunction="RemoveCourseFile"
                        type="video-accssebility"
                        preview={false}
                        dowload={false}
                        open={false}
                        delete={true}
                        showIcon={true}
                        showControlMessage={this.props.showControlMessage.bind(this)}
                        resetFile={this.resetFile.bind(this)}
                        getFileInformation={this.getFileInformation.bind(this)}
                        removeFileInformation={this.removeFileInformation.bind(this)}
                      />
                    </div>
                  :
                  undefined
                }
              </div>
            :
            undefined
          }
          <div className="form-button-container">
            <Button onClick={() => this.saveContent()} className="form-button" id="upload-button" variant="contained" color="secondary">
              Save content
            </Button>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}
