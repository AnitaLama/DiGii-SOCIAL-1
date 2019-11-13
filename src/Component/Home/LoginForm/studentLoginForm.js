import React, { Component } from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { notification } from 'antd';
import {
  Button,
  FormInput,
  FormSelect,
  ErrorMessage
} from '../../StyledComponents';
import LoginActions from '../../../Redux/LoginRedux';
import ErrorActions from '../../../Redux/ErrorRedux';
import SchoolActions from '../../../Redux/SchoolRedux';

import {
  ResetPasswordModal,
  FormWrapper,
  FormTitle,
  HelpBlock,
  ClickableSpan
} from './index';

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
        <option value={item.schoolName} key={item.schoolName}>
          {item.schoolName}
        </option>
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
            const { onFormLogin, onClearReducer } = this.props;
            onFormLogin(values);
            onClearReducer();
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
  loginErrors: PropTypes.object,
  onGetAllSchools: PropTypes.func,
  school: PropTypes.array
};
const mapStateToProps = state => ({
  school: state.school.schools,
  loginErrors: state.error
});
const mapDispatchToProps = dispatch => ({
  onFormLogin: values => dispatch(LoginActions.onStudentFormLoginRequest(values)),
  onGetAllSchools: () => dispatch(SchoolActions.onGetAllSchools()),
  onClearReducer: () => dispatch(ErrorActions.onClearReducer())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
