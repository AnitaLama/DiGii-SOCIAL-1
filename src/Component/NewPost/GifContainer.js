import React, { Component } from 'react';
import { FormInput, Button } from '../StyledComponents';

class GifContainer extends Component {
  render() {
    return (
      <div>
        <FormInput />
        <Button className="small">Search</Button>
      </div>
    );
  }
}

export default GifContainer;
