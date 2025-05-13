export const recommend = (traits: string[]) => {
  const trait = traits[0] || 'Conscientious';

  const book = {
    Conscientious: 'Atomic Habits',
    Extraverted: 'Subtle Art of Not Giving a F*ck',
    Neurotic: 'Reasons to Stay Alive',
    Agreeable: 'Tuesdays with Morrie',
    'Open to Experience': 'Sapiens',
  }[trait];

  const song = {
    Conscientious: 'Eye of the Tiger',
    Extraverted: 'Uptown Funk',
    Neurotic: 'Fix You',
    Agreeable: 'Count on Me',
    'Open to Experience': 'Bohemian Rhapsody',
  }[trait];

  const ootd = {
    Conscientious: 'Neat smart-casual outfit',
    Extraverted: 'Bold streetwear',
    Neurotic: 'Comfortable hoodie and jeans',
    Agreeable: 'Soft pastels and cardigans',
    'Open to Experience': 'Bohemian chic style',
  }[trait];

  return { book, song, ootd };
};
