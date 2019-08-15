import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import Avatar from 'avataaars';
import { Images } from '../../Theme';

const ImageAvatar = styled.img`
  height: ${props => `${props.height}px` || '56px'};
  border-radius: ${props => `${`${props.height}` / 2}px` || '28px'};
  margin-right: ${props => `${props.rightMargin}px` || '0'};
  margin-left: ${props => `${props.leftMargin}px` || '0'};
`;

class UserAvatar extends Component {
  render() {
    const { avatar } = this.props;
    if (avatar) {
      const { height } = this.props;
      const {
        avatarTop,
        avatarClothes,
        avatarClothesColor,
        avatarEyebrow,
        avatarEyes,
        avatarFacialHairMoustache,
        avatarFacialHairColor,
        avatarHair,
        a_mouth,
        avatarSkin,
        avatarStyle,
        avatarAccessories,
        avatarGraphicType
      } = avatar;
      return (
        <div>
          <Avatar
            style={{ width: `${height}px`, height: `${height}px` }}
            avatarStyle={avatarStyle}
            topType={avatarTop}
            accessoriesType={avatarAccessories}
            hairColor={avatarHair}
            facialHairType={avatarFacialHairMoustache}
            facialHairColor={avatarFacialHairColor}
            clotheType={avatarClothes}
            clotheColor={avatarClothesColor}
            eyeType={avatarEyes}
            eyebrowType={avatarEyebrow}
            mouthType={a_mouth}
            skinColor={avatarSkin}
            facialHairColor={avatarFacialHairColor}
            graphicType={avatarGraphicType}
          />
        </div>
      );
    }
    const { src } = this.props;
    return <ImageAvatar src={Images.stockImage} {...this.props} />;
  }
}
export default UserAvatar;

// const Avatar = props => {
//   const { src } = props;
//   return <Images src={src} {...props} />;
// };
Avatar.propTypes = {
  src: PropTypes.string
};
// export default UserAvatar;
