import React, { Fragment} from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import ResizableContent from './ResizableContent'
export default class ImagePreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount(){

  }

  render() {
    return(
        <div className="storytelling-media-preview-container">
           
            <ResizableContent
             // top={0}
             // left={0}
              width={180}
              height={180}
              rotateangle={this.props.rotateangle}
              rotateAngle={this.props.rotateAngle}
              //coordenada={this.props.coordenada}
              //coordenadaCursos={this.coordenadaCursos}
            >
              <div
                className="file-image-preview"
                style={{
                  backgroundImage: `url(${this.props.file.link})`,
                }}
              ></div>
              {/* <div>
                  <img style={{width: '160px', height: '160px', position: 'relative'}} src={this.props.file.link}></img>
              </div> */}
            </ResizableContent>
          
          {/* <div className="storytelling-media-image">
            <div style={{backgroundImage: `url(${this.props.file.link})`}} className="file-image-preview"></div>
          </div> */}
        </div>
      );
    }
  }
