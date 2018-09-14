const url = process.env.CLIENT_URL;
const fromEmail = process.env.FROM_EMAIL;

module.exports.welcomeEmail = (email, user) => {
  const text = `
        Hi,
        Thank you for choosing BuildIt!
        You are just one click away from completing your registration.

        Confirm your email:\n
        ${url}/signup/${user.id}
    `;

  return {
    to: `${email}`,
    from: {
      address: fromEmail,
      name: "BuildIt"
    },
    subject: "Please complete your BuildIt registration",
    text
  };
};
