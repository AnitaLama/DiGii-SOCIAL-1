import React, { Component } from 'react';
import { FaRegTimesCircle, FaRegCircle } from 'react-icons/fa';
import { connect } from 'react-redux';
import socketClient from 'socket.io-client';
import { Images } from '../../Theme';
import { Tabs } from '../MessageBoard';
import { strikeCount } from '../../utils/config';
import { SOCKET_URL } from '../../utils/config';
import {
  SideBarContainer,
  SideBarWrapper,
  GroupOne,
  Icon,
  GroupElement,
  Type,
  Title,
  Count
} from './style';
import StrikeActions from '../../Redux/StrikeRedux.js';
import history from '../../utils/history';

const { updateStrikeCount } = StrikeActions;

const SideBarMenus = [
  { menu: 'Videos', icon: Images.digii5.Video, link: '/student/videos' },
  { menu: 'Tutorials', icon: Images.digii5.Video },
  { menu: 'Quizzes', icon: Images.digii5.Quiz },
  { menu: 'Report', icon: Images.digii5.Video }
];

class SideBar extends Component {
  constructor() {
    super();
    this.state = {
      strikeCurrentCount: 0
    };
    this.socket = socketClient(SOCKET_URL);
  }

  componentDidMount() {
    const { strike, user } = this.props;
    this.setState({ strikeCurrentCount: strike });

    this.socket.on('strikes', data => {
      const { strikeCurrentCount } = this.state;
      if (data.strikes !== strikeCurrentCount && user === data.studentId) {
        const { updateStrikeCount } = this.props;
        // console.log('current strike>>>>>>>>>>>>>', data.strikes);
        updateStrikeCount(data.strikes);
        this.setState({ strikeCurrentCount: data.strikes });
      }
    });
  }

  componentWillUnmount() {
    this.socket = null;
  }

  handleRouting = route => {
    console.log('routed route', route);
    const { link } = route;
    history.push(link);
  };

  render() {
    const { strikeCurrentCount } = this.state;
    const count = strikeCurrentCount % strikeCount;
    const check = strikeCurrentCount !== 0 && count === 0;

    return (
      <SideBarContainer>
        <SideBarWrapper>
          <GroupOne>
            {SideBarMenus.map((item, i) => (
              <GroupElement
                key={`menu${i}`}
                onClick={() => {
                  this.handleRouting(item);
                }}
              >
                <Icon src={item.icon} alt={`icon-${item.menu}`} />
                <Type>{item.menu}</Type>
              </GroupElement>
            ))}
          </GroupOne>
          <GroupOne>
            <Title>Strikes</Title>
            <Count>
              {check || count > 0 ? (
                <FaRegTimesCircle className="red" />
              ) : (
                <FaRegCircle />
              )}
              {check || count > 1 ? (
                <FaRegTimesCircle className="red" />
              ) : (
                <FaRegCircle />
              )}
              {check ? <FaRegTimesCircle className="red" /> : <FaRegCircle />}
            </Count>
          </GroupOne>
        </SideBarWrapper>
        <Tabs />
      </SideBarContainer>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user.id,
  strike: state.strike.strikes
});
const mapDispatchToProps = dispatch => ({
  updateStrikeCount: value => {
    dispatch(updateStrikeCount(value));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
