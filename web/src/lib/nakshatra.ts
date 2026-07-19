// 27 nakshatras of 13°20′, four padas of 3°20′ each, from 0° Aries sidereal.

export const NAKSHATRA_WESTERN = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
  "Punarvasu", "Pushya", "Ashlesha", "Magha", "P. Phalguni", "U. Phalguni",
  "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
  "Mula", "P. Ashadha", "U. Ashadha", "Shravana", "Dhanishta", "Shatabhisha",
  "P. Bhadrapada", "U. Bhadrapada", "Revati",
];

export const NAKSHATRA_DEVANAGARI = [
  "अश्विनी", "भरणी", "कृत्तिका", "रोहिणी", "मृगशिरा", "आर्द्रा",
  "पुनर्वसु", "पुष्य", "आश्लेषा", "मघा", "पू. फाल्गुनी", "उ. फाल्गुनी",
  "हस्त", "चित्रा", "स्वाती", "विशाखा", "अनुराधा", "ज्येष्ठा",
  "मूल", "पू. आषाढ़ा", "उ. आषाढ़ा", "श्रवण", "धनिष्ठा", "शतभिषा",
  "पू. भाद्रपदा", "उ. भाद्रपदा", "रेवती",
];

// Multiply before dividing: exact pada boundaries (e.g. 110° = 33 × 3°20′)
// would otherwise floor into the pada below through float error.
export function nakshatraOf(lon: number): { index: number; pada: number } {
  const norm = ((lon % 360) + 360) % 360;
  const index = Math.floor((norm * 27) / 360) % 27;
  const pada = (Math.floor((norm * 108) / 360) % 4) + 1;
  return { index, pada };
}
