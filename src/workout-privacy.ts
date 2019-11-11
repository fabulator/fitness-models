export const PRIVATE = 2;
export const FRIENDS = 1;
export const PUBLIC = 0;

export type Privacy = typeof PRIVATE | typeof FRIENDS | typeof PUBLIC;
