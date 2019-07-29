import React, { Component } from "react";
import { style } from "typestyle";
import styled from "@emotion/styled";

import { Colors, Images } from "../../Theme";


const { snow } = Colors.colors;

const ModalContainer = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.32);
  height: 100%;
  width: 100%;
  z-index: 10000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
const ModalBox = styled.div`
  width: 50%;
  min-width: 50%;
  min-height: 200px;
  margin: auto;
  background: ${snow};
  vertical-align: center;
  border-radius: 40px;
  padding: 20px;
  .close {
    cursor: pointer;
    margin-top: -10px;
    color: red;
    text-align: right;
  }
`;

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log("Edit post is rendered");
    return (
      <ModalContainer>
        <ModalBox
          style={{
            marginTop: "200px"
          }}
        >
          {/* <ButtonWrapper>
            <Button className="rounded short" >
              OK
            </Button>
          </ButtonWrapper> */}
        </ModalBox>
      </ModalContainer>
    );
  }
}

export default EditPost;
