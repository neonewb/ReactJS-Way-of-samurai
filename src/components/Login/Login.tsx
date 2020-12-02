import React, { FC } from 'react'
import Style from './Login.module.css'
import FormStyle from '../common/FormControls/FormControls.module.css'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { createField, Input } from '../common/FormControls/FormControls'
import { requiredField, maxLengthCreator } from '../../utils/validators'
import { connect } from 'react-redux'
import { login } from '../../redux/auth-reducer'
import { Redirect } from 'react-router-dom'
import { AppStateType } from '../../redux/redux-store'

const maxLength30 = maxLengthCreator(30)

export type LoginFormValuesT = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}

type LoginFormPropertiesT = keyof LoginFormValuesT

type MapStatePropsT = {
  captchaURL: string | null
  isAuth: boolean
}

type MapDispatchPropT = {
  login: (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
  ) => void
}

type LoginFormOwnPropsT = {
  captchaURL: string | null
}

const LoginPage: FC<MapStatePropsT & MapDispatchPropT> = ({
  login,
  isAuth,
  captchaURL,
}) => {
  const onSubmit = (FormData: LoginFormValuesT) => {
    login(
      FormData.email,
      FormData.password,
      FormData.rememberMe,
      FormData.captcha
    )
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

const LoginForm: FC<InjectedFormProps<LoginFormValuesT, LoginFormOwnPropsT> & LoginFormOwnPropsT
> = ({ handleSubmit, error, captchaURL }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField<LoginFormPropertiesT>(
        'email',
        Input,
        [requiredField, maxLength30],
        'Email',
        'email'
      )}
      {createField<LoginFormPropertiesT>(
        'password',
        Input,
        [requiredField, maxLength30],
        'Password',
        'password'
      )}
      {createField<LoginFormPropertiesT>('rememberMe', Input, null, undefined, 'checkbox', 'Remember me')}
      {captchaURL && <img src={captchaURL} alt='cartchaImg'/>}
      {captchaURL &&
        createField<LoginFormPropertiesT>('captcha', Input, [requiredField], 'Captcha', 'captcha')}
      {error && <div className={FormStyle.formSummaryError}>{error}</div>}
      <div>
        <button type='submit'>Login</button>
      </div>
    </form>
  )
}

const LoginReduxForm = reduxForm<LoginFormValuesT, LoginFormOwnPropsT>({
  form: 'login',
})(LoginForm)

const mapStateToProps = (state: AppStateType): MapStatePropsT => ({
  isAuth: state.auth.isAuth,
  captchaURL: state.auth.captchaURL,
})

export default connect(mapStateToProps, { login })(LoginPage)
