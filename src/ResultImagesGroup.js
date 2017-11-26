import React, { Component } from 'react';
import { Image,Segment } from 'semantic-ui-react';

export class ResultImagesGroup extends Component {
  render() {
    const imgListComponent = this.props.imgList.map((img) => {
        return (
                <Image key={img.name} 
                label={ img.label===1?{as: 'a', color: 'red', icon: 'help',corner: 'right'} 
                : {as: 'a', color: 'green', icon: 'checkmark',corner: 'right'}} 
                src={process.env.PUBLIC_URL + "/images/results/"+ img.name} rounded/>
        );
    });
    return (
        <div>
            <Image.Group size={this.props.imgSize}>
               {imgListComponent} 
            </Image.Group>
        </div>
    );
  }
}