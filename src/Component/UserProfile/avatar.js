import React, { Component } from "react";
import Avatar, { Piece } from "avataaars";

class UserAvatar extends Component {
  render() {
    return (
      <div>
        Your avatar:
        <Avatar
          style={{ width: "100px", height: "100px" }}
          avatarStyle="Circle"
          topType="LongHairMiaWallace"
          accessoriesType="Prescription02"
          hairColor="BrownDark"
          facialHairType="Blank"
          clotheType="Hoodie"
          clotheColor="PastelBlue"
          eyeType="Happy"
          eyebrowType="Default"
          mouthType="Smile"
          skinColor="Light"
        />
        <div>
          <Piece pieceType="mouth" pieceSize="100" mouthType="Eating" />
          <Piece pieceType="eyes" pieceSize="100" eyeType="Dizzy" />
          <Piece
            pieceType="eyebrows"
            pieceSize="100"
            eyebrowType="RaisedExcited"
          />
          <Piece
            pieceType="accessories"
            pieceSize="100"
            accessoriesType="Round"
          />
          <Piece
            pieceType="top"
            pieceSize="100"
            topType="LongHairFro"
            hairColor="Red"
          />
          <Piece
            pieceType="facialHair"
            pieceSize="100"
            facialHairType="BeardMajestic"
          />
          <Piece
            pieceType="clothe"
            pieceSize="100"
            clotheType="Hoodie"
            clotheColor="Red"
          />
          <Piece pieceType="graphics" pieceSize="100" graphicType="Skull" />
          <Piece pieceType="skin" pieceSize="100" skinColor="Brown" />
        </div>
      </div>
    );
  }
}

export default UserAvatar;
