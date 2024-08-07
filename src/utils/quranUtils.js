// Sample data for the start page of each Surah in a 604-paged Mushaf
// This data may not be exact and should be verified for accuracy
export const surahStartPages = [
  1, 2, 50, 77, 106, 128, 151, 177, 187, 208, 
  221, 235, 249, 255, 262, 267, 282, 293, 305, 312, 
  322, 332, 342, 349, 359, 367, 377, 385, 396, 404, 
  411, 415, 418, 428, 434, 440, 446, 453, 458, 467, 
  477, 483, 489, 496, 499, 502, 507, 511, 515, 518, 
  520, 523, 526, 528, 531, 533, 535, 537, 539, 541, 
  543, 545, 547, 549, 551, 553, 554, 556, 558, 560, 
  562, 564, 566, 568, 570, 572, 574, 576, 578, 580, 
  582, 584, 586, 588, 590, 592, 594, 596, 598, 600, 
  602, 604
];

export const surahNames = [
  'Al-Fatiha',
  'Al-Baqarah',
  'Al-Imran',
  'An-Nisa',
  'Al-Maidah',
  'Al-Anam',
  'Al-Araf',
  'Al-Anfal',
  'At-Tawbah',
  'Yunus',
  'Hud',
  'Yusuf',
  'Ar-Rad',
  'Ibrahim',
  'Al-Hijr',
  'An-Nahl',
  'Al-Isra',
  'Al-Kahf',
  'Maryam',
  'Taha',
  'Al-Anbiya',
  'Al-Hajj',
  'Al-Muminun',
  'An-Nur',
  'Al-Furqan',
  'Ash-Shuara',
  'An-Naml',
  'Al-Qasas',
  'Al-Ankabut',
  'Ar-Rum',
  'Luqman',
  'As-Sajda',
  'Al-Ahzab',
  'Saba',
  'Fatir',
  'Ya-Sin',
  'As-Saffat',
  'Sad',
  'Az-Zumar',
  'Ghafir',
  'Fussilat',
  'Ash-Shura',
  'Az-Zukhruf',
  'Ad-Dukhan',
  'Al-Jathiya',
  'Al-Ahqaf',
  'Muhammad',
  'Al-Fath',
  'Al-Hujurat',
  'Qaf',
  'Adh-Dhariyat',
  'At-Tur',
  'An-Najm',
  'Al-Qamar',
  'Ar-Rahman',
  'Al-Waqia',
  'Al-Hadid',
  'Al-Mujadila',
  'Al-Hashr',
  'Al-Mumtahina',
  'As-Saff',
  'Al-Jumua',
  'Al-Munafiqun',
  'At-Taghabun',
  'At-Talaq',
  'At-Tahrim',
  'Al-Mulk',
  'Al-Qalam',
  'Al-Haaqqa',
  'Al-Maarij',
  'Nuh',
  'Al-Jinn',
  'Al-Muzzammil',
  'Al-Muddathir',
  'Al-Qiyama',
  'Al-Insan',
  'Al-Mursalat',
  'An-Naba',
  'An-Naziat',
  'Abasa',
  'At-Takwir',
  'Al-Infitar',
  'Al-Mutaffifin',
  'Al-Inshiqaq',
  'Al-Buruj',
  'At-Tariq',
  'Al-Ala',
  'Al-Ghashiya',
  'Al-Fajr',
  'Al-Balad',
  'Ash-Shams',
  'Al-Lail',
  'Ad-Duha',
  'Ash-Sharh',
  'At-Tin',
  'Al-Alaq',
  'Al-Qadr',
  'Al-Bayyina',
  'Az-Zalzala',
  'Al-Adiyat',
  'Al-Qaria',
  'At-Takathur',
  'Al-Asr',
  'Al-Humaza',
  'Al-Fil',
  'Quraish',
  'Al-Maun',
  'Al-Kawthar',
  'Al-Kafirun',
  'An-Nasr',
  'Al-Masad',
  'Al-Ikhlas',
  'Al-Falaq',
  'An-Nas'
];

// Function to get Surah number based on page number
export function getSurahByPage(pageNumber) {
  if (pageNumber < 1 || pageNumber > 604) {
      console.error("getSurahByPage: Invalid page number")
      return -1;
  }
  for (let i = 0; i < surahStartPages.length; i++) {
      if (pageNumber < surahStartPages[i]) {
          return i + 1;
      }
  }
  return surahStartPages.length;
}

// Function to get page number based on Surah number
export function getPageBySurah(surahNumber) {
  if (surahNumber < 1 || surahNumber > surahStartPages.length) {
      console.error("getPageBySurah: Invalid Surah number")
      return -1;
  }
  return surahStartPages[surahNumber - 1];
}
