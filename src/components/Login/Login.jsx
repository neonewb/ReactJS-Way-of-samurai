import React from 'react'
import Style from './Login.module.css'
import FormStyle from '../common/FormControls/FormControls.module.css'
import { reduxForm } from 'redux-form'
import { createField, Input } from '../common/FormControls/FormControls'
import { requiredField, maxLengthCreator } from '../../utils/validators'
import { connect } from 'react-redux'
import { login } from '../../redux/auth-reducer'
import { Redirect } from 'react-router-dom'

const maxLength30 = maxLengthCreator(30)

const LoginPage = ({ login, isAuth, captchaURL }) => {
  const onSubmit = (FormData) => {
    login(FormData.email, FormData.password, FormData.rememberMe, FormData.captcha)
  }

  if (isAuth) {
    return <Redirect to={'/profile'} />
  }

  return (
    <div className={Style.login}>
      <div>LOGIN</div>
      <div>Welcome to the Matrix network!</div>
      <LoginReduxForm onSubmit={onSubmit} captchaURL={captchaURL} />
    </div>
  )
}

const LoginForm = ({ handleSubmit, error, captchaURL }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField(
        'email',
        Input,
        [requiredField, maxLength30],
        'Email',
        'email'
      )}
      {createField(
        'password',
        Input,
        [requiredField, maxLength30],
        'Password',
        'password'
      )}
      {createField('rememberMe', Input, null, null, 'checkbox', 'Remember me')}
      {captchaURL && <img src={captchaURL} /> }
      {captchaURL && createField(
        'captcha',
        Input,
        [requiredField],
        'Captcha',
        'captcha'
      )}
      {error && <div className={FormStyle.formSummaryError}>{error}</div>}
      <div>
        <button type='submit'>Login</button>
      </div>
    </form>
  )
}

const LoginReduxForm = reduxForm({
  form: 'login',
})(LoginForm)

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  captchaURL: state.auth.captchaURL
})

export default connect(mapStateToProps, { login })(LoginPage)
