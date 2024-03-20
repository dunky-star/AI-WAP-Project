const successTemplate = (res, pageName, title, message, session, data) => {
  res.render(pageName, {
    title: title,
    message: message,
    session: session,
    data: data,
  });
};

module.exports = successTemplate;
