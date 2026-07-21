import { formatExtensionTitle } from "./capitalize-word-initials.mjs";

export const CANONICAL_EXTENSION_NAME =
  "I Don't Care About Your Tweets Premium11: Block, Mute & Not Interested on X";

export const CANONICAL_EXTENSION_DESCRIPTION =
  "Adds Block, Mute, and Not Interested buttons to each X.com post.";

/** Localized Chrome Web Store titles (max 75 characters). */
export const LOCALIZED_EXTENSION_NAMES = {
  am: "ትዊቶችዎ አይገድኑኝም Premium11: አግድ፣ ድምጸ-አልባ፣ ፍላጎት የለኝም",
  ar: "لا أهتم بتغريداتك Premium11: حظر وكتم وعدم الاهتمام",
  bg: "Не Ме Интересуват Туитовете Ви Premium11: Блок, Заглуши, Не Ме Интересува",
  bn: "আপনার টুইট নিয়ে আমার কিছু যায় আসে না Premium11: ব্লক, মিউট",
  ca: "No M'Importen Els Teus Tuits Premium11: Bloqueja, Silencia, No M'Interessa",
  cs: "Je Mi Jedno O Vaše Tweety Premium11: Blokovat, Ztlumit, Nezajímá Mě",
  da: "Jeg Gider Ikke Dine Tweets Premium11: Bloker, Mute, Ikke Interesseret",
  de: "Deine Tweets Sind Mir Egal Premium11: Block, Mute, Nicht Interessiert",
  el: "Δεν Με Νοιάζουν Τα Tweets Σας Premium11: Μπλοκ, Σίγαση, Όχι Ενδιαφέρον",
  es: "No Me Importan Tus Tuits Premium11: Bloquear, Silenciar Y No Me Interesa",
  et: "Mul On Ükskõik Sinu Säutsudest Premium11: Blokeeri, Vaigista, Ei Huvita",
  fa: "برایم مهم نیست توییت‌هایت Premium11: مسدود، بی‌صدا، علاقه‌ای نیست",
  fi: "En Välitä Twiiteistäsi Premium11: Estä, Mykistä, Ei Kiinnosta",
  fil: "Wala Akong Pakialam Sa Tweets Mo Premium11: Block, Mute, Not Interested",
  fr: "Je Me Fiche De Vos Posts Premium11: Bloquer, Masquer, Pas Intéressé",
  gu: "મને તમારા ટ્વીટ્સની પરવા નથી Premium11: બ્લોક, મ્યૂટ, રસ નથી",
  he: "לא אכפת לי מהציוצים שלך Premium11: חסימה, השתקה, לא מעוניין",
  hi: "मुझे आपके ट्वीट्स की परवाह नहीं Premium11: ब्लॉक, म्यूट, रुचि नहीं",
  hr: "Nije Me Briga Za Tvoje Tweetove Premium11: Blokiraj, Utišaj, Ne Zanima Me",
  hu: "Nem Érdekelnek A Tweetjeid Premium11: Letiltás, Némítás, Nem Érdekel",
  id: "Saya Tidak Peduli Tweet Anda Premium11: Blokir, Bisukan, Tidak Tertarik",
  it: "Non Mi Importano I Tuoi Post Premium11: Blocca, Silenzia, Non Mi Interessa",
  ja: "あなたのツイートなんてどうでもいい Premium11: ブロック・ミュート・興味なし",
  kn: "ನಿಮ್ಮ ಟ್ವೀಟ್‌ಗಳ ಬಗ್ಗೆ ನನಗೆ ಕಾಳಜಿ ಇಲ್ಲ Premium11: ಬ್ಲಾಕ್, ಮ್ಯೂಟ್",
  ko: "당신 트윗은 신경 안 씀 Premium11: 차단, 뮤트, 관심 없음",
  lt: "Man Nerūpi Jūsų Įrašai Premium11: Blokuoti, Nutildyti, Nedomina",
  lv: "Man Neinteresē Jūsu Tvīti Premium11: Bloķēt, Apklusināt, Neinteresē",
  ml: "നിങ്ങളുടെ ട്വീറ്റുകൾ എനിക്ക് പ്രശ്നമല്ല Premium11: തടയുക, മ്യൂട്ട്",
  mr: "मला तुमच्या ट्विट्सची काळजी नाही Premium11: ब्लॉक, म्यूट, रस नाही",
  ms: "Saya Tak Kisah Tweet Anda Premium11: Sekat, Senyap, Tidak Berminat",
  nl: "Ik Geef Niks Om Je Tweets Premium11: Blokkeren, Dempen, Niet Geïnteresseerd",
  no: "Jeg Bryr Meg Ikke Om Tweetene Dine Premium11: Blokker, Demp, Uinteressert",
  pl: "Nie Obchodzą Mnie Twoje Tweety Premium11: Blokuj, Wycisz, Nie Interesuje",
  pt_BR: "Não Ligo Pros Seus Posts Premium11: Bloquear, Silenciar, Não Interessa",
  pt_PT: "Não Me Interessam Os Posts Premium11: Bloquear, Silenciar, Não Interesa",
  ro: "Nu-Mi Pasă De Postările Tale Premium11: Blochează, Amuțește, Nu Interesează",
  ru: "Мне Плевать На Ваши Твиты Premium11: Блок, Заглушить, Не Интересно",
  sk: "Je Mi Jedno O Vaše Tweety Premium11: Blokovať, Stlmiť, Nezaujíma Ma",
  sl: "Boli Me Za Vaše Tvite Premium11: Blokiraj, Utišaj, Ne Zanima Me",
  sr: "Nije Me Briga Za Tvoje Tvitove Premium11: Blokiraj, Utišaj, Ne Zanima Me",
  sv: "Jag Bryr Mig Inte Om Dina Tweets Premium11: Blockera, Tysta, Ointresserad",
  sw: "Sijali Kuhusu Tweet Zako Premium11: Zuia, Nyamazisha, Sivutii",
  ta: "உங்கள் ட்வீட்களைப் பற்றி எனக்குக் கவலை இல்லை Premium11: தடு, முடக்கு",
  te: "మీ ట్వీట్‌ల గురించి నాకు పట్టింపు లేదు Premium11: బ్లాక్, మ్యూట్",
  th: "ฉันไม่สนใจทวีตของคุณ Premium11: บล็อก ปิดเสียง ไม่สนใจ",
  tr: "Tweetlerin Umurumda Değil Premium11: Engelle, Sessize Al, İlgilenmiyorum",
  uk: "Мені Плювати На Ваші Твіти Premium11: Блок, Заглушити, Не Цікаво",
  vi: "Tôi Không Quan Tâm Tweet Của Bạn Premium11: Chặn, Tắt Tiếng, Không Quan Tâm",
  zh_CN: "我不在乎你的推文 Premium11: 屏蔽、静音、不感兴趣",
  zh_TW: "我不在乎你的推文 Premium11: 封鎖、靜音、不感興趣"
};

export function resolveExtensionName(locale) {
  const raw = LOCALIZED_EXTENSION_NAMES[locale] ?? CANONICAL_EXTENSION_NAME;
  return formatExtensionTitle(locale, raw);
}

for (const [locale, name] of Object.entries({
  en: CANONICAL_EXTENSION_NAME,
  ...LOCALIZED_EXTENSION_NAMES
})) {
  if (name.length > 75) {
    throw new Error(`manifest-store-copy: [${locale}] extensionName exceeds 75 (${name.length}).`);
  }
}

if (CANONICAL_EXTENSION_DESCRIPTION.length > 132) {
  throw new Error(
    `manifest-store-copy: canonical extensionDescription exceeds 132 (${CANONICAL_EXTENSION_DESCRIPTION.length}).`
  );
}
