export const analyzePersonality = (text: string): string[] => {
  const traits: string[] = [];

  if (text.includes('organized') || text.includes('routine')) traits.push('Conscientious');
  if (text.includes('party') || text.includes('friends')) traits.push('Extraverted');
  if (text.includes('anxious') || text.includes('worried')) traits.push('Neurotic');
  if (text.includes('help') || text.includes('kind')) traits.push('Agreeable');
  if (text.includes('travel') || text.includes('art')) traits.push('Open to Experience');

  return traits.length > 0 ? traits : ['Conscientious'];
};
