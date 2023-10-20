export type isNever<T> = [T] extends [never] ? true : false;

export type isAny<T> = 0 extends 1 & T ? true : false;

export type isNotFalse<T> = [T] extends [false] ? true : false;

export type isUnknown<T> = unknown extends T ? true : false;

export type len<T extends readonly any[]> = T['length'];

export type expect<T extends true> = T;

export type Equal<a, b> = (<T>() => T extends a ? 1 : 2) extends <T>() => T extends b ? 1 : 2 ? true : false;

export type NonFalsy<T> = T extends false | 0 | '' | null | undefined | 0n ? never : T;

export type Primitives = number | boolean | string | undefined | null | symbol | bigint;

export type WidenLiteral<T> = T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : T extends bigint
  ? bigint
  : T extends symbol
  ? symbol
  : T;

export type Data = {
  [name: string & {}]: unknown;
};

export type Next<T extends readonly any[]> = [any, ...T];
export type Prev<T extends readonly any[]> = T extends readonly [any, ...infer Rest] ? Rest : [];

export type BuildObjects =
  | Function
  | Date
  | RegExp
  | {
      readonly [Symbol.toStringTag]: string;
    }
  | Generator
  | any[];

export type isPlainObject<T, excludeUnion = BuildObjects> = T extends object
  ? T extends string | excludeUnion
    ? false
    : true
  : false;

export type withDefault<T, def> = If<isNever<T>, def, T>;

export type If<T, a, b> = T extends true ? a : b;

export type Union<A, B> = [A] extends [B] ? B : [B] extends [A] ? A : A | B;

export type AllBoolean<T extends boolean[]> = If<T[number], true, false>;

export type Extends<A, B> = A extends B ? true : false;

export type Some<T extends boolean[]> = boolean extends T[number] ? true : false;
export type Not<T> = T extends true ? false : true;

export type AllKeys<T> = T extends any ? keyof T : never;

export type MergeUnions<T> =
  | {
      [k in AllKeys<T>]: T[k];
    }
  | never;

export type IsTuple<T> = T extends readonly [] | readonly [any, ...any] | readonly [...any, any] ? true : false;

export type IsStrictArray<T> = Not<IsTuple<T>>;

export type TypeOf<Target, Value> = If<isNever<Exclude<Value, Target>>, true, false>;

export type AsyncFunction = (...args: any[]) => Promise<unknown>;

export type AsyncFunctionReturn<T extends AsyncFunction> = Awaited<ReturnType<T>>;

export type JsonPrimitive = string | number | boolean | null;

export type AbstractConstructor<T, Arguments extends unknown[] = any[]> = abstract new (...arguments_: Arguments) => T;
export type Constructor<T, Arguments extends unknown[] = any[]> = new (...arguments_: Arguments) => T;
export type Class<T, Arguments extends unknown[] = any[]> = {
  prototype: T;
  new (...arguments_: Arguments): T;
};
export interface AbstractClass<T, Arguments extends unknown[] = any[]> extends AbstractConstructor<T, Arguments> {
  prototype: T;
}

export type Split<S extends string, Delimiter extends string> = S extends `${infer Head}${Delimiter}${infer Tail}`
  ? [Head, ...Split<Tail, Delimiter>]
  : S extends Delimiter
  ? []
  : [S];

export type TupleLength<T extends readonly unknown[]> = T extends { readonly length: infer L } ? L : never;

export type UpperCaseCharacters =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z';

export type StringDigit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export type Whitespace =
  | '\u{9}' // '\t'
  | '\u{A}' // '\n'
  | '\u{B}' // '\v'
  | '\u{C}' // '\f'
  | '\u{D}' // '\r'
  | '\u{20}' // ' '
  | '\u{85}'
  | '\u{A0}'
  | '\u{1680}'
  | '\u{2000}'
  | '\u{2001}'
  | '\u{2002}'
  | '\u{2003}'
  | '\u{2004}'
  | '\u{2005}'
  | '\u{2006}'
  | '\u{2007}'
  | '\u{2008}'
  | '\u{2009}'
  | '\u{200A}'
  | '\u{2028}'
  | '\u{2029}'
  | '\u{202F}'
  | '\u{205F}'
  | '\u{3000}'
  | '\u{FEFF}';

export type WordSeparators = '-' | '_' | Whitespace;

export type NotEmptyTuple = [unknown, ...unknown[]];
export type isNotEmptyTuple<T> = T extends NotEmptyTuple ? true : false;

export type isLowCase<T extends string> = If<Lowercase<T>, true, false>;
export type isUpperCase<T extends string> = If<Uppercase<T>, true, false>;

// export type Trim<T extends string> = T extends `${Whitespace}${infer Rest}`
export type TrimLeft<T extends string> = T extends `${Whitespace}${infer Rest}` ? TrimLeft<Rest> : T;
export type TrimRight<T extends string> = T extends `${infer Rest}${Whitespace}` ? TrimRight<Rest> : T;

export type Trim<T extends string> = TrimLeft<TrimRight<T>>;

export type isNumeric<T extends string> = T extends `${number}` ? (Trim<T> extends T ? true : false) : false;

export type FilterOptionalKeys<T extends object> = Exclude<
  {
    [key in keyof T]: isAny<T> extends true
      ? never
      : undefined extends T[key]
      ? never
      : T[key] extends undefined
      ? never
      : BaseKeyFilter<T, key>;
  }[keyof T],
  undefined
>;

export type FilterRequiredKeys<T extends object> = Exclude<
  {
    [key in keyof T]: isAny<T> extends true
      ? key
      : undefined extends T[key]
      ? never
      : T[key] extends undefined
      ? never
      : BaseKeyFilter<T, key>;
  }[keyof T],
  undefined
>;

type BaseKeyFilter<Type, Key extends keyof Type> = Key extends symbol
  ? never
  : Type[Key] extends symbol
  ? never
  : Type[Key] extends Record<string, unknown>
  ? Key
  : [(...arguments_: any[]) => any] extends [Type[Key]]
  ? never
  : Key;
