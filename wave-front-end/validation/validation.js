const validateRegistration = body => {
  let errors = {};

  if (
    body.firstName.trim().length() < 2 ||
    !/^[A-Za-z]+/.test(body.firstName.trim())
  ) {
    errors.firstNameMsg = 'First name is required';
  }
};
