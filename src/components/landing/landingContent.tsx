import ROUTES from "@/constants/routeConstants";

export type LandingHeaderProps = typeof landingContent.header;
export type LandingSectionProps = typeof landingContent.section;
export type LandingSectionTwoProps = typeof landingContent.sectionTwo;

export const landingContent = {
  "header": {
    title: "שבצו את העמדות השמירה בבסיס בקלות",
    cta: "מערכת שבצ״ק משבצת את העמדות השונות בבסים באופן אוטומטי בהתאם המתאימות לכם. ניתן גם לבחור באופן ידני ולערוך את המשמרות. המערכת תאפשר צפייה מהירה וקלה במשמרות כדי שכל השומרים בבסיס ישארו מעודכנים בכל רגע.",
    ctaButton: "המשך לקרוא",
    ctaLogin: "כבר יש לכם בסיס?",
    ctaLoginSub: "התחברו כדי להתחיל להשתמש במערכת",
    ctaLoginButton: "להתחברות",
  },
  "section": {
    preface: "אז אתם בטח שואלים את עצמכם...",
    title: "איך זה עובד?",
    content: [
      "בחרו את הבסיס שלך או צרו בסיס חדש.",
      "הוסיפו את עמדות השמירה השונות בבסיס, הגדירו משמרות שברצונכם לשבץ באופן אוטומטי",
      "תוכלו לשבץ את העמדות אוטומטית בהתאם להגדרות שבחרתם עבור עמדות השמירה והשומרים בבסיס.",
    ],
    contentTwo: [
      "כמובן, ניתן גם לבחור באופן ידני ולערוך את המשמרות.",
      "המערכת תאפשר צפייה מהירה וקלה במשמרות כדי שכל השומרים בבסיס ישארו מעודכנים בכל רגע.",
    ]
  },
  "sectionTwo": {
    title: "השארו מעודכנים בכל רגע",
    content: [
      "צפו במשמרות בכל עמדות השמירה בקלות מכל מקום",
      "ניתן להתחבר דרך המחשב או בנייד ולשנות את ההגדרות השונות"
    ],
    agreement: "התחברות דרך גוגל הינה בהתאם ל$1 שלנו.",
    agreementLink: "תנאי השימוש",
    agreementLinkTo: ROUTES.TERMS
  }
};
