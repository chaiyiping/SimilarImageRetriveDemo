import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';

export class SampleImagesGroup extends Component {
  render() {
    const imgListComponent = this.props.imgList.map((img) => {
        return <Image onClick={this.onImgClick(img)} key={img} 
            src={process.env.PUBLIC_URL + "./images/database/"+ img} rounded/>;
    });
    return (
        <div>
            <Image.Group size={this.props.imgSize}>
               {imgListComponent} 
            </Image.Group>
        </div>
    );
  }

  onImgClick = (img) => () => this.props.clickSampleImage(img);
}