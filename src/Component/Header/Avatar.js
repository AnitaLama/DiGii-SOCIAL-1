import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from 'avataaars';
import ProfileActions from '../../Redux/ProfileRedux';

class UserAvatar extends Component {
  render() {
    const { avatar, height } = this.props;
    const {
      a_accessories,
      a_clothes,
      a_eyebrow,
      a_eyes,
      a_facial_hair_color,
      a_haircolor,
      a_mouth,
      a_skin,
      a_style,
      a_top
    } = avatar;
    return <div>aaa</div>;
  }
}
export default UserAvatar;

//

// <Avatar
//   style={{ width: `${height}px`, height: `${height}px` }}
//   avatarStyle={a_style}
//   topType={a_top}
//   accessoriesType={a_accessories}
//   hairColor={a_haircolor}
//   facialHairType={a_facial_hair_color}
//   clotheType={a_clothes}
//   clotheColor="red"
//   eyeType={a_eyes}
//   eyebrowType={a_eyebrow}
//   mouthType={a_mouth}
//   skinColor={a_skin}
//   facialHairColor={a_facial_hair_color}
// />

//
// <Avatar
//   src={Images.stockImage}
//   height={50}
//   leftMargin={10}
//   rightMargin={20}
//   onClick={() => {
//     history.push(
//       `/userprofile/${user.isStudent ? 1 : 0}/${user.username}`
//     );
//   }}
// />
