// src/app/api/guru/agents/utils/simchaUtils.js

export function generateToneIntro(tone, relationship, typeOfSimcha) {
  const toneMap = {
    funny: `In a light-hearted tone, reflecting the joy of this special moment, we celebrate our dear ${relationship} at this ${typeOfSimcha}.`,
    serious: `With reverence and sincerity, we mark this meaningful ${typeOfSimcha} for our beloved ${relationship}.`,
    balanced: `Blending warmth and wisdom, we share a few heartfelt thoughts in honor of our dear ${relationship}'s ${typeOfSimcha}.`,
    inspiring: `Let us elevate this moment through words of Torah and inspiration, honoring our cherished ${relationship} at this ${typeOfSimcha}.`,
    "over-the-top": `Prepare for a whirlwind of emotion and grandeur as we toast to the unmatched greatness of our ${relationship} on this majestic ${typeOfSimcha}!`,
    risque: `With a daring twist of humor and truth, we reflect on this unforgettable ${typeOfSimcha} with our unforgettable ${relationship}.`
  };

  return toneMap[tone?.toLowerCase()] || `In honor of our dear ${relationship}, we share a few words at this precious ${typeOfSimcha}.`;
}

export function generateBlessings(typeOfSimcha) {
  const brachotMap = {
    wedding: "May the couple be blessed with shalom bayit, abundant simcha, and the presence of the Shechina in their home.",
    bar_mitzvah: "May the young man grow in Torah, avodah, and gemilut chasadim, becoming a true ben Torah.",
    bat_mitzvah: "May she walk proudly in the footsteps of Sarah, Rivkah, Rachel, and Leah, and bring light to Am Yisrael.",
    brit_milah: "May the child enter the covenant of Avraham Avinu with strength, and grow to Torah, chuppah, and maasim tovim.",
    pidyon_haben: "May the child bring nachas to his family and merit a life filled with kedusha and clarity.",
    shabbat_chatan: "May this Shabbat uplift the chatan, kallah, and all who surround them with love and Torah.",
    ufruf: "May the voice of Torah and simcha always echo in the new home being built.",
    shabbat_kallah: "May this gathering uplift and inspire the kallah with Torah, joy, and the love of family and friends.",
    upsherin: "May the child grow like a tree by streams of water, strong in Torah and yirat Shamayim.",
    simchat_torah: "May we dance with the Torah and be worthy vessels of its light.",
    other: "May this occasion be filled with simcha, meaning, and continued bracha in every area of life."
  };

  return brachotMap[typeOfSimcha?.toLowerCase().replace(" ", "_")] || brachotMap["other"];
}
