import md5 from "md5";

export function getGravatarUrl(email) {
  const base = "https://www.gravatar.com/avatar/";
  const formattedEmail = (email || "").trim().toLowerCase();
  const hash = md5(formattedEmail);
  return `${base}${hash}?d=identicon`;
}
