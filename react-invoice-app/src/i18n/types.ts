import type { Locale } from '../domain/types';

export type { Locale };

export type Dictionary = Record<string, string>;

export type TFunction = ( key: string, params?: Record<string, string | number> ) => string;