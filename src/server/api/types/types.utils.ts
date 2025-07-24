/**
 * Recursively omits a property from a nested object type based on a dot-separated path.
 *
 * @template Schema - The object type to omit properties from.
 * @template Path - The dot-separated string path indicating the property to omit.
 *
 * @example
 * type Example = {
 *   a: {
 *     b: {
 *       c: number;
 *       d: string;
 *     };
 *     e: boolean;
 *   };
 *   f: string;
 * };
 *
 * // Removes 'c' from 'a.b'
 * type Result = NestedOmit<Example, 'a.b.c'>;
 * // Result is:
 * // {
 * //   a: {
 * //     b: {
 * //       d: string;
 * //     };
 * //     e: boolean;
 * //   };
 * //   f: string;
 * // }
 */
export type NestedOmit<
  Schema,
  Path extends string,
> = Path extends `${infer Head}.${infer Tail}`
  ? Head extends keyof Schema
    ? {
        [K in keyof Schema]: K extends Head
          ? NestedOmit<Schema[K], Tail>
          : Schema[K];
      }
    : Schema
  : Omit<Schema, Path>;
