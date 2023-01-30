import * as yup from 'yup';

const PasswordRegEx =
  /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
const EmailRegEx =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const registerFormSchema = yup.object().shape({
  email: yup.string().matches(EmailRegEx, 'Email is incorrect').required('Required'),
  password: yup
    .string()
    .required('Required')
    .matches(PasswordRegEx, 'Uppercase Lowercase Number Special char Required'),
  confirmPassword: yup
    .string()
    .required('Required')
    .oneOf([yup.ref('password')], 'Password does not matched')
});

export const loginFormSchema = yup.object().shape({
  email: yup.string().matches(EmailRegEx, 'Email is incorrect').required('Required'),
  password: yup
    .string()
    .required('Required')
    .matches(PasswordRegEx, 'Uppercase Lowercase Number Special char Required')
});

export const profileFormSchema = yup.object().shape({
  email: yup.string().matches(EmailRegEx, 'Email is incorrect').required('Required'),
  oldPassword: yup
    .string()
    .required('Required')
    .matches(PasswordRegEx, 'Uppercase Lowercase Number Special char Required'),
  newPassword: yup
    .string()
    .required('Required')
    .matches(PasswordRegEx, 'Uppercase Lowercase Number Special char Required')
});

export const addTodoFormSchema = yup.object().shape({
  title: yup.string().min(3, 'Too Short').max(30, 'Too Long').required('Required'),
  description: yup.string().min(3, 'Too Short').required('Required'),
  isComplete: yup.boolean(),
  isPrivate: yup.boolean(),
  isPublic: yup.boolean()
});
