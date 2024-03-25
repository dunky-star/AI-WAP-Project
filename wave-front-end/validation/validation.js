const validateRegistration = body => {
  let errors = {};

  if (
    body.firstName.trim().length < 2 ||
    !/^[A-Za-z]+/.test(body.firstName.trim())
  ) {
    errors.firstNameMsg = 'First name is required';
  }

  if (
    body.lastName.trim().length < 2 ||
    !/^[A-Za-z]+/.test(body.lastName.trim())
  ) {
    errors.lastNameMsg = 'Last name is required';
  }
  if (
    body.email.trim() == '' ||
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(body.email.trim())
  ) {
    errors.emailMsg = 'Invalid Email Address';
  }
  if (
    body.password.trim().length == 0 ||
    !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(body.password.trim())
  ) {
    errors.passwordMsg = 'Invalid Password format';
  }
};

module.exports = { validateRegistration };
