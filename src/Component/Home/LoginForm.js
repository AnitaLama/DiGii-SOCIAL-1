import React, { Component } from 'react';
import styled from '@emotion/styled';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, FormInput } from '../StyledComponents';
import LoginActions from '../../Redux/LoginRedux';
import { Colors } from '../../Theme';

const FormWrapper = styled.div`
  margin: auto 40px;
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
class LoginForm extends Component {
  render() {
    return (
      <FormWrapper>
        <div className="col-md col-lg col-sm">
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
              console.log(values);
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
                <Button
                  type="submit"
                  className="rounded"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
                <HelpBlock>
                  <h6>Forgot Password</h6>
                  <h6>
                    {'Don\'t have an account ?'}
                    {' '}
                    <a>Sign Up</a>
                  </h6>
                </HelpBlock>
              </form>
            )}
          </Formik>
        </div>
      </FormWrapper>
    );
  }
}

LoginForm.propTypes = {
  onFormLogin: PropTypes.func
};
const mapDispatchToProps = dispatch => ({
  onFormLogin: values => dispatch(LoginActions.onFormLoginRequest(values))
});

export default connect(
  null,
  mapDispatchToProps
)(LoginForm);
