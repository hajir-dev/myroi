/**
 * Central documentation for the lightweight resource contracts used in Phase 1.
 * Keeping these shapes explicit makes the Firebase migration in Phase 2 easier.
 */

/**
 * @typedef {Object} ResourceField
 * @property {string} name
 * @property {string} label
 * @property {"text" | "email" | "password" | "select"} [type]
 * @property {string[]} [options]
 * @property {boolean} [required]
 * @property {string} [placeholder]
 */

/**
 * @typedef {Object} ResourceConfig
 * @property {string} title
 * @property {string} description
 * @property {string} path
 * @property {string} singular
 * @property {string} [searchPlaceholder]
 * @property {Array<[string, string]>} columns
 * @property {ResourceField[]} fields
 */

export {};
