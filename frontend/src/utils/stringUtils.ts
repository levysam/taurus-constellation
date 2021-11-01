export const capitalize = (text: string): string => text.charAt(0).toUpperCase() + text.slice(1);

export const getFirstWord = (text: string): string => text.split(' ')[0] || '';

export default capitalize;
