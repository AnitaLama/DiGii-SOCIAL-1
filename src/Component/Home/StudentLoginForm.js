import React, { Component } from 'react';
import styled from '@emotion/styled';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button,
  FormInput,
  ErrorMessage,
  FormSelect
} from '../StyledComponents';
import LoginActions from '../../Redux/LoginRedux';
import SchoolActions from '../../Redux/SchoolRedux';

import {
  Colors, fontWeight, fontFilson, fontSize
} from '../../Theme';
import ResetPasswordModal from './ResetPasswordModal';

const FormWrapper = styled.div`
  margin: auto 40px;
  width: 80%;
`;
const FormTitle = styled.h1`
  ${fontFilson};
  ${fontWeight('bold')};
  ${fontSize(32)};
`;
const HelpBlock = styled.div`
  margin-top: 10px;
  h6 {
    color: ${Colors.colors.pen};
  }
`;
const ClickableSpan = styled.h6`
  cursor: pointer;
  span {
    color: ${Colors.colors.secondary} !important;
    &:hover {
      ${fontWeight('900')}
    }
  }
`;

class LoginForm extends Component {
  constructor() {
    super();
    this.state = { isModalVisible: false };
  }

  componentWillMount() {
    const { onGetAllSchools } = this.props;
    onGetAllSchools();
  }

  openModal = () => {
    this.setState({ isModalVisible: true });
  };

  closeModal = () => {
    this.setState({ isModalVisible: false });
  };

  handleOk = () => {
    this.setState({ isModalVisible: false });
  };

  getSchoolsList = () => {
    const { school } = this.props;
    return (
      school
      && school.map(item => (
        <option value={item.schoolName}>{item.schoolName}</option>
      ))
    );
  };

  render() {
    const { isModalVisible } = this.state;
    const { loginErrors } = this.props;
    const { studentLoginError } = loginErrors;
    return (
      <FormWrapper>
        <FormTitle>Log In</FormTitle>
        <Formik
          initialValues={{ school: '', username: '', password: '' }}
          validate={values => {
            const errors = {};
            if (!values.username) {
              errors.username = 'Required';
            }
            if (!values.school) {
              errors.school = 'Required';
            }
            // else if (
            //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.username)
            // ) {
            //   errors.username = 'Invalid username address';
            // }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            const { onFormLogin } = this.props;
            onFormLogin(values);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <FormSelect
                name="school"
                onChange={handleChange}
                defaultValue="-- School Name --"
              >
                <option disabled hidden>
                  -- School Name --
                </option>
                {this.getSchoolsList()}
              </FormSelect>

              <p>
                {' '}
                {errors.school && touched.school && errors.school}
              </p>
              <FormInput
                type="text"
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                placeholder="Username"
              />

              <p>
                {' '}
                {errors.username && touched.username && errors.username}
              </p>
              <FormInput
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="Password"
              />

              <p>{errors.password && touched.password && errors.password}</p>
              <Button type="submit" className="rounded" disabled={isSubmitting}>
                Submit
              </Button>
              <HelpBlock>
                <ClickableSpan onClick={this.openModal}>
                  <span>Forgot account?</span>
                </ClickableSpan>

                <ClickableSpan>
                  {'Don\'t have an account ? '}
                  <span>Sign Up</span>
                </ClickableSpan>
              </HelpBlock>
              {studentLoginError && <ErrorMessage error={studentLoginError} />}
            </form>
          )}
        </Formik>
        <ResetPasswordModal
          isModalVisible={isModalVisible}
          handleOk={this.handleOk}
          handleCancel={this.closeModal}
        />
      </FormWrapper>
    );
  }
}

LoginForm.propTypes = {
  onFormLogin: PropTypes.func,
  loginErrors: PropTypes.object
};
const mapStateToProps = state => ({
  school: state.school.schools,
  loginErrors: state.error
});
const mapDispatchToProps = dispatch => ({
  onFormLogin: values => dispatch(LoginActions.onStudentFormLoginRequest(values)),
  onGetAllSchools: values => dispatch(SchoolActions.onGetAllSchools())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
