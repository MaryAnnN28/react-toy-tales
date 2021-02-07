import React, { Component } from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
    return (
      <div id="toy-collection">
        {props.toys.map(toy => <ToyCard toyData={toy} updateLikes={props.updateLikes} donateToy={props.donateToy}/>
        )}
      </div>
    )
  }

 

export default ToyContainer;
