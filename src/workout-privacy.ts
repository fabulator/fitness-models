export const ME = 2;
export const FRIENDS = 1;
export const EVERYONE = 0;

export type Privacy = typeof ME | typeof FRIENDS | typeof EVERYONE;
