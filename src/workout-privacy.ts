export const PRIVATE = 1;
export const FRIENDS = 2;
export const PUBLIC = 3;

export type Privacy = typeof PRIVATE | typeof FRIENDS | typeof PUBLIC;
