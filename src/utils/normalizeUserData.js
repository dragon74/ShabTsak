export const normalizeUserData = data => ({
    email: data.email,
    emailVerified: data.email_verified,
    firstName: data.given_name,
    locale: data.locale,
    fullName: data.name,
    avatar: data.picture,  // e.g. https:// lh3.googleusercontent.com/a/jhkaskdjfhjkahsewr71
    googleId: data.sub  // e.g. 891028308129038123021
});