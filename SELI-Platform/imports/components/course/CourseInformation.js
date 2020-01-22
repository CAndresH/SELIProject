import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import InputAdornment from '@material-ui/core/InputAdornment';
import ErrorIcon from '@material-ui/icons/Error';
import ImageIcon from '@material-ui/icons/Image';
import ImageSharpIcon from '@material-ui/icons/ImageSharp';
import PictureAsPdfSharpIcon from '@material-ui/icons/PictureAsPdfSharp';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import MenuItem from '@material-ui/core/MenuItem';
import FileUpload from '../files/FileUpload';
import ImagePreview from '../files/previews/ImagePreview';
import PdfPreview from '../files/previews/PdfPreview';
import Library from '../tools/Library';
import Help from '../tools/Help';
import FormPreview from '../files/previews/FormPreview';
import CourseFilesCollection from '../../../lib/CourseFilesCollection';
import {validateOnlyLetters, validateOnlyNumbers} from '../../../lib/textFieldValidations';
import Audiences from './Audiences'


export default class CourseInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseInformation: this.props.courseInformation,
      audiences: ''
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    if (this.state.courseInformation.image !== undefined) {
      this.setState({
        image: this.state.courseInformation.image,
      });
    }
    if (this.state.courseInformation.sylabus !== undefined) {
      this.setState({
        sylabus: this.state.courseInformation.sylabus,
      });
    }
    this.setState({ open: false });
  };

  handleChange = name => event => {
    let courseInformation = this.state.courseInformation;
    if (name === 'title') {
      courseInformation.title = event.target.value;
    }
    else if (name === 'subtitle') {
      courseInformation.subtitle = event.target.value;
    }
    else if (name === 'description') {
      courseInformation.description = event.target.value;
    }
    else if (name === 'duration') {
      courseInformation.duration = event.target.value;
    }
    else if (name === 'language') {
      courseInformation.language = event.target.value;
    }
    this.setState({
      courseInformation: courseInformation,
    });
  };

  addKeyWord(){
    let keyWord = document.getElementById('keyWord-input').value;
    if(keyWord !== '') {
      let courseInformation = this.state.courseInformation;
      keyWord = keyWord.trim().split(/\s+/);
      if (keyWord.length <= 3) {
        let finalKeyWord = '';
        keyWord[0] = keyWord[0].charAt(0).toUpperCase() + keyWord[0].slice(1);
        for (var i = 0; i < keyWord.length; i++) {
          finalKeyWord = finalKeyWord + keyWord[i];
          if (i < 2) {
            finalKeyWord = finalKeyWord + " ";
          }
        }
        courseInformation.keyWords.push(finalKeyWord);
        this.setState({
          courseInformation: courseInformation,
        });
      }
      else {
        this.props.handleControlMessage(true, this.props.language.keywordsMaximumMessage);
      }
    }
    else {
      this.props.handleControlMessage(true, this.props.language.keywordsEmptyMessage);
    }
    document.getElementById('keyWord-input').value = "";
  }

  deleteKeyWord(index) {
    let courseInformation = this.state.courseInformation;
    courseInformation.keyWords.splice(index, 1);
    this.setState({
      courseInformation: courseInformation,
    });
  }

  keyController(event) {
    if (event.which == 13 || event.keyCode == 13) {
      this.addKeyWord();
    }
    else {
      validateOnlyLetters(event);
    }
  }

  openFileSelector(fileType, accept){
    this.setState({
      showLibrary: false,
      fileType: fileType,
      accept: accept,
      showPreview: false,
    }, () => {this.handleClickOpen()});
  }

  openFileSelectorEdit(fileType, accept){
    this.setState({
      showLibrary: false,
      fileType: fileType,
      accept: accept,
      showPreview: true,
    }, () => {this.handleClickOpen()});
  }

  getFileInformation(file){
    this.state.fileType === "image" ?
    this.setState({
      image: file,
      showPreview: true,
      showLibrary: false,
    })
    :
    this.setState({
      sylabus: file,
      showPreview: true,
      showLibrary: false,
    })
  }

  unPickFile(){
    this.state.fileType === "image" ?
    this.setState({
      showPreview: false,
      image: undefined,
    })
    :
    this.setState({
      showPreview: false,
      sylabus: undefined,
    })
  }

  showLibrary(){
    this.setState({
      showLibrary: true,
    })
  }

  hideLibrary(){
    this.setState({
      showLibrary: false,
    })
  }

  selectFile(fileType) {
    let courseInformation = this.state.courseInformation;
    if (fileType === "image") {
      courseInformation.image = this.state.image;
      this.setState({
        showPreview: false,
        courseInformation: courseInformation,
      });
    }
    else {
      courseInformation.sylabus = this.state.sylabus
      this.setState({
        showPreview: false,
        courseInformation: courseInformation,
      })
    }
    this.handleClose();
  }

  changeFile(type) {
    if (type === "image") {
      this.openFileSelectorEdit("image", "image/*");
    }
    else {
      this.openFileSelectorEdit("pdf", ".pdf");
    }
  }

  componentDidMount() {

  }

  componentWillUnmount(){

  }

  audiences=()=>{
    this.setState({
      audiences: "audiences"
    })
  }

  getAudiences=(audiences, name)=>{
    let courseInformation = this.state.courseInformation;
    //console.log("Audiences in Course Information", audiences, name)
    console.log("CourseInformation:::::::::::", courseInformation )
    //courseInformation.audiences = audiences;
    if (name === 'signature') {
      courseInformation.signature = audiences;
    }
    else if (name === 'level') {
      courseInformation.level = audiences;
    }
    else if (name === 'type') {
      courseInformation.type = audiences;
    }
   
  }


  render() {
    return(
      <div className="course-information-container">
        <div className="form-file-column">
          {
            this.state.courseInformation.image !== undefined ?
              <FormPreview
                file={this.state.courseInformation.image}
                type="image"
                unPickFile={this.unPickFile.bind(this)}
                changeFile={this.changeFile.bind(this)}
              />
            :
              <Button onClick={() => this.openFileSelector("image", "image/*")} className="form-image-button" fullWidth color="primary"><ImageSharpIcon className="form-image-icon"/>
                {this.props.language.selectCourseImage} <br/>
                {this.props.language.required}
              </Button>
          }
          {
            this.state.courseInformation.sylabus !== undefined ?
              <FormPreview
                file={this.state.courseInformation.sylabus}
                type="pdf"
                unPickFile={this.unPickFile.bind(this)}
                changeFile={this.changeFile.bind(this)}
              />
            :
              <Button onClick={() => this.openFileSelector("pdf", ".pdf")} className="form-file-button" fullWidth color="secondary"><PictureAsPdfSharpIcon className="form-image-icon"/>
                {this.props.language.selectCourseSyllabus} <br/>
                {this.props.language.required}
              </Button>
          }
        </div>
        <div className="form-input-column">
          <TextField
            id="title-input"
            label={this.props.language.courseTitle}
            margin="normal"
            variant="outlined"
            fullWidth
            required
            value={this.state.courseInformation.title}
            onChange={this.handleChange('title')}
          />
          <TextField
            id="subtitle-input"
            label={this.props.language.courseSubtitle}
            margin="normal"
            variant="outlined"
            fullWidth
            //required
            value={this.state.courseInformation.subtitle}
            onChange={this.handleChange('subtitle')}
          />
          <TextField
            id="description-input"
            label={this.props.language.courseDescription}
            margin="normal"
            variant="outlined"
            fullWidth
            required
            multiline
            rows={3}
            value={this.state.courseInformation.description}
            onChange={this.handleChange('description')}
          />
          <TextField
            id="subject-select-currency"
            select
            label={this.props.language.language}
            value={this.state.courseInformation.language}
            onChange={this.handleChange('language')}
            fullWidth
            helperText={this.props.language.selectLanguageCourse}
            margin="normal"
            variant="outlined"
          >
            <MenuItem value={0}>{`${this.props.language.english} (US)`}</MenuItem>
            <MenuItem value={1}>{`${this.props.language.spanish} (ES)`}</MenuItem>
            <MenuItem value={2}>{`${this.props.language.portuguese} (PT)`}</MenuItem>
            <MenuItem value={3}>{`${this.props.language.polish} (PL)`}</MenuItem>
            <MenuItem value={4}>{`${this.props.language.turkish} (TR)`}</MenuItem>
          </TextField>
          <div className="row-input">
            <TextField
              id="keyWord-input"
              label={this.props.language.courseKeyWords}
              margin="normal"
              variant="outlined"
              required
              className="button-input"
              helperText={this.props.language.courseKeyWordsHelper}
              onKeyPress={() => this.keyController(event)}
            />
          </div>
          {
            this.state.courseInformation.keyWords.length ?
              <div className="chips-container">
                {this.state.courseInformation.keyWords.map((keyWord, index) => {
                  
                  return(
                    <Chip
                      size="small"
                      avatar={<Avatar>{keyWord.charAt(0)}</Avatar>}
                      label={keyWord}
                      className="chip"
                      color="primary"
                      onDelete={() => this.deleteKeyWord(index)}
                    />
                  )
                })}
              </div>
            :
            undefined
          }
          <p className="form-message"> {this.props.language.courseKeyWordsHelp}
            <Help
              helper="keyWordHelper"
              text={this.props.language.keywordsAreUsed}
              language={this.props.language}
            />
          </p>
          <TextField
            id="duration-input"
            label={this.props.language.estimatedCourseDuration}
            margin="normal"
            variant="outlined"
            type="number"
            fullWidth
            required
            InputProps={{
              endAdornment: <InputAdornment position="end">{this.props.language.hours}</InputAdornment>,
            }}
            inputProps={{ min: "0", max: "999", step: "1" }}
            value={this.state.courseInformation.duration}
            onChange={this.handleChange('duration')}
            onKeyPress={() => validateOnlyNumbers(event)}
          /> 
 
           <Button className={"buttomAudiences"} onClick={this.audiences} variant="outlined" color="primary">Audiences</Button>
          {
              this.state.audiences==="audiences" ?
              <Audiences
              language={this.props.language}
              getAudiences={this.getAudiences}
              />
              :
              undefined
          } 
        </div>
        
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="form-dialog"
          keepMounted
          maxWidth={false}
        >
          <DialogTitle className="form-dialog-title" id="alert-dialog-title">{this.state.fileType === "image" ? this.props.language.chooseOrUploadImage : this.props.language.chooseOrUploadSyllabus}</DialogTitle>
          <DialogContent>
            <div className="file-form-dialog">
              {
                this.state.showLibrary ?
                  <Library
                    user={Meteor.userId()}
                    type={this.state.fileType}
                    getFileInformation={this.getFileInformation.bind(this)}
                    hideLibrary={this.hideLibrary.bind(this)}
                    language={this.props.language}
                  />
                :
                <div>
                  {
                    this.state.showPreview ?
                      <div className="form-preview-container">
                        {
                          this.state.fileType === "image" ?
                            <ImagePreview
                              file={this.state.image}
                              unPickFile={this.unPickFile.bind(this)}
                              language={this.props.language}
                              tipo={"Course"}
                            />
                          :
                          <PdfPreview
                            file={this.state.sylabus}
                            unPickFile={this.unPickFile.bind(this)}
                            language={this.props.language}
                          />
                        }
                      </div>
                    :
                    <div className="form-file-container">
                      <FileUpload
                        type={this.state.fileType}
                        user={Meteor.userId()}
                        accept={this.state.accept}
                        getFileInformation={this.getFileInformation.bind(this)}
                        label={this.state.fileType === 'image' ? this.props.language.uploadImageButtonLabel : this.props.language.uploadPdfButtonLabel }
                      />
                    </div>
                  }
                  <div className="center-row">
                    <p className="normal-text">{this.props.language.or}</p>
                  </div>
                  <div className="center-row">
                    <p className="normal-text">{this.props.language.pickOneFrom}</p>
                <Button onClick={() => this.showLibrary()} color="primary" className="text-button">{this.props.language.library}</Button>
                  </div>
                </div>
              }
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              {this.props.language.cancel}
            </Button>
            <Button onClick={() => this.selectFile(this.state.fileType)} disabled={this.state.fileType === "image" ? this.state.image === undefined : this.state.sylabus === undefined} color="primary">
              {this.props.language.select}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      );
    }
  }
