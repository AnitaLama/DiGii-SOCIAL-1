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
        a_accessories,
        a_clothes,
        a_clothes_color,
        a_eyebrow,
        a_eyes,
        a_facial_hair_color,
        a_haircolor,
        a_mouth,
        a_skin,
        a_style,
        a_top,
        a_graphic_type
      } = avatar;
      return (
        <div>
          <Avatar
            style={{ width: `${height}px`, height: `${height}px` }}
            avatarStyle={a_style}
            topType={a_top}
            accessoriesType={a_accessories}
            hairColor={a_haircolor}
            facialHairType={a_facial_hair_color}
            clotheType={a_clothes}
            clotheColor={a_clothes_color}
            eyeType={a_eyes}
            eyebrowType={a_eyebrow}
            mouthType={a_mouth}
            skinColor={a_skin}
            facialHairColor={a_facial_hair_color}
            graphicType={a_graphic_type}
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
