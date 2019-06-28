import React, { Component } from 'react';
import styled from '@emotion/styled';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, FormInput, ErrorMessage } from '../StyledComponents';
import LoginActions from '../../Redux/LoginRedux';
import { Colors, fontWeight } from '../../Theme';
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
    const { user } = this.props;
    const { error } = user;
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
                  <span>Forgot Password</span>
                </ClickableSpan>

                <ClickableSpan>
                  {'Don\'t have an account ? '}
                  <span>Sign Up</span>
                </ClickableSpan>
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
  onFormLogin: PropTypes.func,
  user: PropTypes.object
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
