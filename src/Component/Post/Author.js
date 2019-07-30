import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { FeelingsList } from "../NewPost/index";
import {
  flex,
  Images,
  fontSize,
  fontWeight,
  fontFilson,
  Colors
} from "../../Theme";
import { Avatar } from "../StyledComponents";
import history from "../../history";
import { connect } from "react-redux";
import PostAction from "../../Redux/PostRedux";


import { FaBeer, FaFolder } from "react-icons/fa";
import { IconContext } from "react-icons";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdCreate, MdDeleteSweep } from "react-icons/md";
import EditPost from "../NewPost/Editpost";
// const { grey } = Colors.colors;

const AuthorWrapper = styled.div`
  ${flex()};

  .dropdown {
    position: absolute;
    top: 0;
    right: 0;
  }
`;

const AuthorInfo = styled.div`
  margin: auto 0;
  padding: 0 10px;
`;
const Name = styled.div`
  ${fontWeight("bold")};
  ${fontFilson()};
  text-transform: capitalize;
  span.emoji {
    font-family: "Segoe UI Emoji";
    font-family: Lato;
    color: ${Colors.colors.light};
    ${fontSize(14)};
    text-transform: none;
  }
`;

// const Post = styled.div`
//   ${fontSize(14)};
//   color: ${grey};
// `;
const TaggedList = styled.span`
  span {
    font-family: Lato;
    color: ${Colors.colors.light};
    ${fontSize(14)};
    text-transform: none;
    &::after {
      content: ", ";
    }
  }
  span:first-of-type {
    &::before {
      content: " with - ";
    }
  }
  span:last-of-type {
    &::after {
      content: "";
    }
  }
`;
const TaggedUser = styled.span`
  cursor: pointer;
`;
class Author extends Component {
  onUserNameClick = (type, name) => {
    history.push(`/userprofile/${type}/${name}`);
  };

  getExtraInfo = () => {
    const { data } = this.props;
    const { post_type, p_text, notifications } = data;
    const type = post_type.pt_title;
    const emoji =
      type === "feeling" && FeelingsList.find(item => item.name === p_text);

    if (type === "feeling") {
      return (
        <span className="emoji">
          {` - is feeling ${p_text} ${emoji.emoji}`}
        </span>
      );
    }
    if (type === "tag") {
      return (
        <TaggedList>
          {notifications.map((item, i) => {
            const { n_is_student, student, user } = item;
            if (n_is_student) {
              return (
                <TaggedUser
                  key={`${item}-${student}-${i}`}
                  onClick={() => {
                    this.onUserNameClick(
                      item.n_is_student,
                      student.st_username
                    );
                  }}
                >
                  {student.st_username}
                </TaggedUser>
              );
            }
            return (
              <TaggedUser
                key={`${item}-${user}-${i}`}
                onClick={() => {
                  this.onUserNameClick(item.n_is_student, user.u_name);
                }}
              >
                {user.u_name}
              </TaggedUser>
            );
          })}
        </TaggedList>
      );
    }
  };

  onPostChange = () => {
    this.setState({ open: !this.state.open });
  };
  // Edit and Delete Post
  onPostChangepopup = value => {
    return (
      <div>
        <IconContext.Provider
          value={{ color: "blue", className: "global-class-name" }}
        >
          <button
            onClick={this.modalPopUp}
            style={{
              backgroundColor: "transparent",
              border: 0,
              outline: 0
            }}
          >
            {" "}
            <MdCreate />{" "}
          </button>
        </IconContext.Provider>
        <br />
        <IconContext.Provider
          value={{ color: "red", className: "global-class-name" }}
        >
          <button
            onClick={() => {
              this.props.onDelete(value);
            }}
            style={{
              backgroundColor: "transparent",
              border: 0,
              outline: 0
            }}
          >
            {" "}
            <MdDeleteSweep />{" "}
          </button>
        </IconContext.Provider>
      </div>
    );
  };

  render() {
    const { data } = this.props;
    const { user } = this.props;

    const { isStudent, id } = user.user;

    const { post_type, p_text, p_id } = data;
    const type = post_type.pt_title;
    let firstname = "";
    let lastname = "";
    // post typet,po ypepost console.log('data author', data);
    console.log(data);
    if (data.p_isStudent) {
      const { student } = data;

      firstname = student ? student.st_firstname : "";
      lastname = student ? student.st_lastname : "";
    } else {
      const { user } = data;
      const { user_profile } = user;
      const { up_firstname, up_lastname } = user_profile;
      firstname = up_firstname;
      lastname = up_lastname;
    }
    return (
      <AuthorWrapper>
        <Avatar src={Images.stockImage} height={53} />
        <AuthorInfo>
          <Name>
            {firstname} {lastname} {this.getExtraInfo()}
          </Name>{" "}
          {/* <Post>{this.getContent()}</Post>
            <PostedDate>{postDate}</PostedDate> */}
        </AuthorInfo>
        {/* Edit And Delete */}
        <div className="dropdown">
          <IconContext.Provider
            value={{
              color: "blue",
              className: "global-class-name"
            }}
          >
            <button
              className="dropbtn"
              onClick={this.onPostChange}
              style={{
                backgroundColor: "transparent",
                border: 0,
                outline: 0,
                padding: "12px"
              }}
            >
              <IoMdArrowDropdown />
            </button>
          </IconContext.Provider>
        </div>
      </AuthorWrapper>
    );
  }
}
Author.propTypes = {
  data: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  onDelete: value => dispatch(PostAction.onPostDelete(value))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Author);
