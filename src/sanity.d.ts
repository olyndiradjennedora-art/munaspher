// Minimal ambient declarations to silence editor/TS errors for Sanity imports in studio files
// Use unknown instead of any to satisfy the lint rule no-explicit-any
declare module 'sanity' {
  export function defineType<T = unknown>(arg: T): T;
  export function defineConfig<T = unknown>(arg: T): T;
  export function defineField<T = unknown>(arg: T): T;
  export function defineArray<T = unknown>(arg: T): T;
  export const Studio: unknown;
  const _default: unknown;
  export default _default;
}
