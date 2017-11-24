import React, { Component } from 'react';
import { Button, Divider, Grid, Image, Segment, Loader } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import {observable } from 'mobx';
import axios from 'axios';
import {SampleImagesGroup} from './SampleImagesGroup';
import 'semantic-ui-css/semantic.min.css'
import './App.css';

@observer
class App extends Component {
  randomImageList = [];
  @observable imgSearchResults = [];
  @observable showSingleSampleImage = false;
  bigImg = "";
  @observable randomLoading = false;
  @observable searchLoading = false;

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Vehicle Search Demo</h1>
        </header>
        <p className="App-intro">
          To get started, click one of the sample images on the left side and the results will show on the right side.
        </p>
        <Button onClick={this.getRandomImageList}>
          Click Here to randomly load 100 images
        </Button>
        <Divider hidden />
        <Grid celled='internally'>
          <Grid.Row>
            <Grid.Column width={8}>
              {this.showSingleSampleImage && !this.randomLoading ?
                <Segment attached color='green'>
                  <Image src={require("./images/database/"+ this.bigImg)} rounded centered/>
                </Segment>
                :<SampleImagesGroup imgList={this.randomImageList} clickSampleImage={this.clickSampleImage} imgSize="tiny"/>}
              {this.showSingleSampleImage && !this.randomLoading && 
              <Button attached='bottom' onClick={this.clickToBack} color='green'>Back</Button>}
              {
                this.randomLoading && <Loader active inline='centered' >Loading Images...</Loader>
              }
            </Grid.Column>
            <Grid.Column width={8}>
              {this.searchLoading ?
                <Loader active inline='centered'>Searching Images...</Loader>
                :<SampleImagesGroup imgList={this.imgSearchResults} imgSize="small"/>
              }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  };

  getRandomImageList = async() => {
    this.randomImageList = [];
    this.randomLoading = true;
    await axios.get("http://localhost:5000/randomImageList").then(res =>{
      this.randomImageList = res.data;
    });
    this.randomLoading = false;
  };

  clickSampleImage = async(img) => {
    this.bigImg = img;
    this.showSingleSampleImage = true;
    this.imgSearchResults = [];
    this.searchLoading = true;
    //send a request to backend to load searched results
    await axios.get("http://localhost:5000/searchResults?img="+img).then(res =>{
      this.imgSearchResults = res.data;
    });
    this.searchLoading = false;
  };

  clickToBack = () => {
    this.showSingleSampleImage = false;
    this.imgSearchResults = [];
  }
}

export default App;
