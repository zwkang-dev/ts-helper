import { expectType } from 'tsd';
import { isNever, Equal } from '../src';

expectType<Equal<true, true>>(true);
expectType<Equal<[], []>>(true);

expectType<Equal<{ a: 123 }, { a: 123 }>>(true);
expectType<Equal<{ a: 123 }, { a: 123; b: 22 }>>(false);
