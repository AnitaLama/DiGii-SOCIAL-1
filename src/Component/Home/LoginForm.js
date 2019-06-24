import React, { Component } from 'react';
import styled from '@emotion/styled';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, FormInput, ErrorMessage } from '../StyledComponents';
import LoginActions from '../../Redux/LoginRedux';
import { Colors } from '../../Theme';
import ResetPasswordModal from './ResetPasswordModal';

const FormWrapper = styled.div`
  margin: auto 40px;
  width: 80%;
`;
const HelpBlock = styled.div`
  margin-top: 10px;
  h6 {
    color: ${Colors.colors.pen};
  }
  a {
    cursor: pointer;
    &:hover {
      color: ${Colors.colors.peach} !important;
    }
  }
`;
const ClickableSpan = styled.h6`
  cursor: pointer;
`;
class LoginForm extends Component {
  constructor() {
    super();
    this.state = { isModalVisible: false };
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

  render() {
    const { isModalVisible } = this.state;
    const { error } = this.props.user;
    return (
      <FormWrapper>
        <h1>Log In</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={values => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
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
              <FormInput
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Username"
              />

              <p>
                {' '}
                {errors.email && touched.email && errors.email}
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
                  Forgot Password
                </ClickableSpan>
                <h6>
                  {'Don\'t have an account ?'}
                  {' '}
                </h6>
                <ClickableSpan>Sign Up</ClickableSpan>
              </HelpBlock>
              {error && <ErrorMessage error={error} />}
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
  onFormLogin: PropTypes.func
};
const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = dispatch => ({
  onFormLogin: values => dispatch(LoginActions.onFormLoginRequest(values))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
