const errorTemplate = (req, res, pageName, title, message, errors, session) => {
  res.render(pageName, {
    title: title,
    body: req.body,
    errs: errors,
    message: message,
    session: session,
  });
};

module.exports = errorTemplate;
