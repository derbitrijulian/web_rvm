
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model UserBottleCount
 * 
 */
export type UserBottleCount = $Result.DefaultSelection<Prisma.$UserBottleCountPayload>
/**
 * Model BottleTransaction
 * 
 */
export type BottleTransaction = $Result.DefaultSelection<Prisma.$BottleTransactionPayload>
/**
 * Model ArduinoConnection
 * 
 */
export type ArduinoConnection = $Result.DefaultSelection<Prisma.$ArduinoConnectionPayload>
/**
 * Model RvmLocation
 * 
 */
export type RvmLocation = $Result.DefaultSelection<Prisma.$RvmLocationPayload>
/**
 * Model BottleCount
 * 
 */
export type BottleCount = $Result.DefaultSelection<Prisma.$BottleCountPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const BottleTransactionType: {
  DEPOSIT: 'DEPOSIT',
  REDEEM: 'REDEEM',
  ADJUSTMENT: 'ADJUSTMENT'
};

export type BottleTransactionType = (typeof BottleTransactionType)[keyof typeof BottleTransactionType]

}

export type BottleTransactionType = $Enums.BottleTransactionType

export const BottleTransactionType: typeof $Enums.BottleTransactionType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userBottleCount`: Exposes CRUD operations for the **UserBottleCount** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserBottleCounts
    * const userBottleCounts = await prisma.userBottleCount.findMany()
    * ```
    */
  get userBottleCount(): Prisma.UserBottleCountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bottleTransaction`: Exposes CRUD operations for the **BottleTransaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BottleTransactions
    * const bottleTransactions = await prisma.bottleTransaction.findMany()
    * ```
    */
  get bottleTransaction(): Prisma.BottleTransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.arduinoConnection`: Exposes CRUD operations for the **ArduinoConnection** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ArduinoConnections
    * const arduinoConnections = await prisma.arduinoConnection.findMany()
    * ```
    */
  get arduinoConnection(): Prisma.ArduinoConnectionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rvmLocation`: Exposes CRUD operations for the **RvmLocation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RvmLocations
    * const rvmLocations = await prisma.rvmLocation.findMany()
    * ```
    */
  get rvmLocation(): Prisma.RvmLocationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bottleCount`: Exposes CRUD operations for the **BottleCount** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BottleCounts
    * const bottleCounts = await prisma.bottleCount.findMany()
    * ```
    */
  get bottleCount(): Prisma.BottleCountDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.12.0
   * Query Engine version: 8047c96bbd92db98a2abc7c9323ce77c02c89dbc
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    UserBottleCount: 'UserBottleCount',
    BottleTransaction: 'BottleTransaction',
    ArduinoConnection: 'ArduinoConnection',
    RvmLocation: 'RvmLocation',
    BottleCount: 'BottleCount'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "userBottleCount" | "bottleTransaction" | "arduinoConnection" | "rvmLocation" | "bottleCount"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      UserBottleCount: {
        payload: Prisma.$UserBottleCountPayload<ExtArgs>
        fields: Prisma.UserBottleCountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserBottleCountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBottleCountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserBottleCountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBottleCountPayload>
          }
          findFirst: {
            args: Prisma.UserBottleCountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBottleCountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserBottleCountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBottleCountPayload>
          }
          findMany: {
            args: Prisma.UserBottleCountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBottleCountPayload>[]
          }
          create: {
            args: Prisma.UserBottleCountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBottleCountPayload>
          }
          createMany: {
            args: Prisma.UserBottleCountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserBottleCountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBottleCountPayload>[]
          }
          delete: {
            args: Prisma.UserBottleCountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBottleCountPayload>
          }
          update: {
            args: Prisma.UserBottleCountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBottleCountPayload>
          }
          deleteMany: {
            args: Prisma.UserBottleCountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserBottleCountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserBottleCountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBottleCountPayload>[]
          }
          upsert: {
            args: Prisma.UserBottleCountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBottleCountPayload>
          }
          aggregate: {
            args: Prisma.UserBottleCountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserBottleCount>
          }
          groupBy: {
            args: Prisma.UserBottleCountGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserBottleCountGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserBottleCountCountArgs<ExtArgs>
            result: $Utils.Optional<UserBottleCountCountAggregateOutputType> | number
          }
        }
      }
      BottleTransaction: {
        payload: Prisma.$BottleTransactionPayload<ExtArgs>
        fields: Prisma.BottleTransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BottleTransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BottleTransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BottleTransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BottleTransactionPayload>
          }
          findFirst: {
            args: Prisma.BottleTransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BottleTransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BottleTransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BottleTransactionPayload>
          }
          findMany: {
            args: Prisma.BottleTransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BottleTransactionPayload>[]
          }
          create: {
            args: Prisma.BottleTransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BottleTransactionPayload>
          }
          createMany: {
            args: Prisma.BottleTransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BottleTransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BottleTransactionPayload>[]
          }
          delete: {
            args: Prisma.BottleTransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BottleTransactionPayload>
          }
          update: {
            args: Prisma.BottleTransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BottleTransactionPayload>
          }
          deleteMany: {
            args: Prisma.BottleTransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BottleTransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BottleTransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BottleTransactionPayload>[]
          }
          upsert: {
            args: Prisma.BottleTransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BottleTransactionPayload>
          }
          aggregate: {
            args: Prisma.BottleTransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBottleTransaction>
          }
          groupBy: {
            args: Prisma.BottleTransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<BottleTransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.BottleTransactionCountArgs<ExtArgs>
            result: $Utils.Optional<BottleTransactionCountAggregateOutputType> | number
          }
        }
      }
      ArduinoConnection: {
        payload: Prisma.$ArduinoConnectionPayload<ExtArgs>
        fields: Prisma.ArduinoConnectionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArduinoConnectionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArduinoConnectionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArduinoConnectionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArduinoConnectionPayload>
          }
          findFirst: {
            args: Prisma.ArduinoConnectionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArduinoConnectionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArduinoConnectionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArduinoConnectionPayload>
          }
          findMany: {
            args: Prisma.ArduinoConnectionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArduinoConnectionPayload>[]
          }
          create: {
            args: Prisma.ArduinoConnectionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArduinoConnectionPayload>
          }
          createMany: {
            args: Prisma.ArduinoConnectionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ArduinoConnectionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArduinoConnectionPayload>[]
          }
          delete: {
            args: Prisma.ArduinoConnectionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArduinoConnectionPayload>
          }
          update: {
            args: Prisma.ArduinoConnectionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArduinoConnectionPayload>
          }
          deleteMany: {
            args: Prisma.ArduinoConnectionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArduinoConnectionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ArduinoConnectionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArduinoConnectionPayload>[]
          }
          upsert: {
            args: Prisma.ArduinoConnectionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArduinoConnectionPayload>
          }
          aggregate: {
            args: Prisma.ArduinoConnectionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArduinoConnection>
          }
          groupBy: {
            args: Prisma.ArduinoConnectionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArduinoConnectionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArduinoConnectionCountArgs<ExtArgs>
            result: $Utils.Optional<ArduinoConnectionCountAggregateOutputType> | number
          }
        }
      }
      RvmLocation: {
        payload: Prisma.$RvmLocationPayload<ExtArgs>
        fields: Prisma.RvmLocationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RvmLocationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RvmLocationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RvmLocationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RvmLocationPayload>
          }
          findFirst: {
            args: Prisma.RvmLocationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RvmLocationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RvmLocationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RvmLocationPayload>
          }
          findMany: {
            args: Prisma.RvmLocationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RvmLocationPayload>[]
          }
          create: {
            args: Prisma.RvmLocationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RvmLocationPayload>
          }
          createMany: {
            args: Prisma.RvmLocationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RvmLocationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RvmLocationPayload>[]
          }
          delete: {
            args: Prisma.RvmLocationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RvmLocationPayload>
          }
          update: {
            args: Prisma.RvmLocationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RvmLocationPayload>
          }
          deleteMany: {
            args: Prisma.RvmLocationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RvmLocationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RvmLocationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RvmLocationPayload>[]
          }
          upsert: {
            args: Prisma.RvmLocationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RvmLocationPayload>
          }
          aggregate: {
            args: Prisma.RvmLocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRvmLocation>
          }
          groupBy: {
            args: Prisma.RvmLocationGroupByArgs<ExtArgs>
            result: $Utils.Optional<RvmLocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.RvmLocationCountArgs<ExtArgs>
            result: $Utils.Optional<RvmLocationCountAggregateOutputType> | number
          }
        }
      }
      BottleCount: {
        payload: Prisma.$BottleCountPayload<ExtArgs>
        fields: Prisma.BottleCountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BottleCountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BottleCountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BottleCountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BottleCountPayload>
          }
          findFirst: {
            args: Prisma.BottleCountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BottleCountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BottleCountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BottleCountPayload>
          }
          findMany: {
            args: Prisma.BottleCountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BottleCountPayload>[]
          }
          create: {
            args: Prisma.BottleCountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BottleCountPayload>
          }
          createMany: {
            args: Prisma.BottleCountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BottleCountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BottleCountPayload>[]
          }
          delete: {
            args: Prisma.BottleCountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BottleCountPayload>
          }
          update: {
            args: Prisma.BottleCountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BottleCountPayload>
          }
          deleteMany: {
            args: Prisma.BottleCountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BottleCountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BottleCountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BottleCountPayload>[]
          }
          upsert: {
            args: Prisma.BottleCountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BottleCountPayload>
          }
          aggregate: {
            args: Prisma.BottleCountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBottleCount>
          }
          groupBy: {
            args: Prisma.BottleCountGroupByArgs<ExtArgs>
            result: $Utils.Optional<BottleCountGroupByOutputType>[]
          }
          count: {
            args: Prisma.BottleCountCountArgs<ExtArgs>
            result: $Utils.Optional<BottleCountCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    userBottleCount?: UserBottleCountOmit
    bottleTransaction?: BottleTransactionOmit
    arduinoConnection?: ArduinoConnectionOmit
    rvmLocation?: RvmLocationOmit
    bottleCount?: BottleCountOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserBottleCountCountOutputType
   */

  export type UserBottleCountCountOutputType = {
    bottleCounts: number
    bottleTransactions: number
  }

  export type UserBottleCountCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bottleCounts?: boolean | UserBottleCountCountOutputTypeCountBottleCountsArgs
    bottleTransactions?: boolean | UserBottleCountCountOutputTypeCountBottleTransactionsArgs
  }

  // Custom InputTypes
  /**
   * UserBottleCountCountOutputType without action
   */
  export type UserBottleCountCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBottleCountCountOutputType
     */
    select?: UserBottleCountCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserBottleCountCountOutputType without action
   */
  export type UserBottleCountCountOutputTypeCountBottleCountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BottleCountWhereInput
  }

  /**
   * UserBottleCountCountOutputType without action
   */
  export type UserBottleCountCountOutputTypeCountBottleTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BottleTransactionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    createdAt: Date | null
    nama: string | null
    password: string | null
    phoneNumber: string | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    createdAt: Date | null
    nama: string | null
    password: string | null
    phoneNumber: string | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    createdAt: number
    nama: number
    password: number
    phoneNumber: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    createdAt?: true
    nama?: true
    password?: true
    phoneNumber?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    createdAt?: true
    nama?: true
    password?: true
    phoneNumber?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    createdAt?: true
    nama?: true
    password?: true
    phoneNumber?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    createdAt: Date
    nama: string
    password: string
    phoneNumber: string
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    createdAt?: boolean
    nama?: boolean
    password?: boolean
    phoneNumber?: boolean
    updatedAt?: boolean
    bottleCount?: boolean | User$bottleCountArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    createdAt?: boolean
    nama?: boolean
    password?: boolean
    phoneNumber?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    createdAt?: boolean
    nama?: boolean
    password?: boolean
    phoneNumber?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    createdAt?: boolean
    nama?: boolean
    password?: boolean
    phoneNumber?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "createdAt" | "nama" | "password" | "phoneNumber" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bottleCount?: boolean | User$bottleCountArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      bottleCount: Prisma.$UserBottleCountPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      createdAt: Date
      nama: string
      password: string
      phoneNumber: string
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bottleCount<T extends User$bottleCountArgs<ExtArgs> = {}>(args?: Subset<T, User$bottleCountArgs<ExtArgs>>): Prisma__UserBottleCountClient<$Result.GetResult<Prisma.$UserBottleCountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly nama: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly phoneNumber: FieldRef<"User", 'String'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.bottleCount
   */
  export type User$bottleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBottleCount
     */
    select?: UserBottleCountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBottleCount
     */
    omit?: UserBottleCountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBottleCountInclude<ExtArgs> | null
    where?: UserBottleCountWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model UserBottleCount
   */

  export type AggregateUserBottleCount = {
    _count: UserBottleCountCountAggregateOutputType | null
    _avg: UserBottleCountAvgAggregateOutputType | null
    _sum: UserBottleCountSumAggregateOutputType | null
    _min: UserBottleCountMinAggregateOutputType | null
    _max: UserBottleCountMaxAggregateOutputType | null
  }

  export type UserBottleCountAvgAggregateOutputType = {
    totalBottles: number | null
    redeemableCount: number | null
    lifetimeCount: number | null
    points: number | null
    lifetimePoints: number | null
  }

  export type UserBottleCountSumAggregateOutputType = {
    totalBottles: number | null
    redeemableCount: number | null
    lifetimeCount: number | null
    points: number | null
    lifetimePoints: number | null
  }

  export type UserBottleCountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    totalBottles: number | null
    redeemableCount: number | null
    lifetimeCount: number | null
    points: number | null
    lifetimePoints: number | null
    lastUpdated: Date | null
  }

  export type UserBottleCountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    totalBottles: number | null
    redeemableCount: number | null
    lifetimeCount: number | null
    points: number | null
    lifetimePoints: number | null
    lastUpdated: Date | null
  }

  export type UserBottleCountCountAggregateOutputType = {
    id: number
    userId: number
    totalBottles: number
    redeemableCount: number
    lifetimeCount: number
    points: number
    lifetimePoints: number
    lastUpdated: number
    _all: number
  }


  export type UserBottleCountAvgAggregateInputType = {
    totalBottles?: true
    redeemableCount?: true
    lifetimeCount?: true
    points?: true
    lifetimePoints?: true
  }

  export type UserBottleCountSumAggregateInputType = {
    totalBottles?: true
    redeemableCount?: true
    lifetimeCount?: true
    points?: true
    lifetimePoints?: true
  }

  export type UserBottleCountMinAggregateInputType = {
    id?: true
    userId?: true
    totalBottles?: true
    redeemableCount?: true
    lifetimeCount?: true
    points?: true
    lifetimePoints?: true
    lastUpdated?: true
  }

  export type UserBottleCountMaxAggregateInputType = {
    id?: true
    userId?: true
    totalBottles?: true
    redeemableCount?: true
    lifetimeCount?: true
    points?: true
    lifetimePoints?: true
    lastUpdated?: true
  }

  export type UserBottleCountCountAggregateInputType = {
    id?: true
    userId?: true
    totalBottles?: true
    redeemableCount?: true
    lifetimeCount?: true
    points?: true
    lifetimePoints?: true
    lastUpdated?: true
    _all?: true
  }

  export type UserBottleCountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserBottleCount to aggregate.
     */
    where?: UserBottleCountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserBottleCounts to fetch.
     */
    orderBy?: UserBottleCountOrderByWithRelationInput | UserBottleCountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserBottleCountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserBottleCounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserBottleCounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserBottleCounts
    **/
    _count?: true | UserBottleCountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserBottleCountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserBottleCountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserBottleCountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserBottleCountMaxAggregateInputType
  }

  export type GetUserBottleCountAggregateType<T extends UserBottleCountAggregateArgs> = {
        [P in keyof T & keyof AggregateUserBottleCount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserBottleCount[P]>
      : GetScalarType<T[P], AggregateUserBottleCount[P]>
  }




  export type UserBottleCountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserBottleCountWhereInput
    orderBy?: UserBottleCountOrderByWithAggregationInput | UserBottleCountOrderByWithAggregationInput[]
    by: UserBottleCountScalarFieldEnum[] | UserBottleCountScalarFieldEnum
    having?: UserBottleCountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserBottleCountCountAggregateInputType | true
    _avg?: UserBottleCountAvgAggregateInputType
    _sum?: UserBottleCountSumAggregateInputType
    _min?: UserBottleCountMinAggregateInputType
    _max?: UserBottleCountMaxAggregateInputType
  }

  export type UserBottleCountGroupByOutputType = {
    id: string
    userId: string
    totalBottles: number
    redeemableCount: number
    lifetimeCount: number
    points: number
    lifetimePoints: number
    lastUpdated: Date
    _count: UserBottleCountCountAggregateOutputType | null
    _avg: UserBottleCountAvgAggregateOutputType | null
    _sum: UserBottleCountSumAggregateOutputType | null
    _min: UserBottleCountMinAggregateOutputType | null
    _max: UserBottleCountMaxAggregateOutputType | null
  }

  type GetUserBottleCountGroupByPayload<T extends UserBottleCountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserBottleCountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserBottleCountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserBottleCountGroupByOutputType[P]>
            : GetScalarType<T[P], UserBottleCountGroupByOutputType[P]>
        }
      >
    >


  export type UserBottleCountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    totalBottles?: boolean
    redeemableCount?: boolean
    lifetimeCount?: boolean
    points?: boolean
    lifetimePoints?: boolean
    lastUpdated?: boolean
    bottleCounts?: boolean | UserBottleCount$bottleCountsArgs<ExtArgs>
    bottleTransactions?: boolean | UserBottleCount$bottleTransactionsArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | UserBottleCountCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userBottleCount"]>

  export type UserBottleCountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    totalBottles?: boolean
    redeemableCount?: boolean
    lifetimeCount?: boolean
    points?: boolean
    lifetimePoints?: boolean
    lastUpdated?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userBottleCount"]>

  export type UserBottleCountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    totalBottles?: boolean
    redeemableCount?: boolean
    lifetimeCount?: boolean
    points?: boolean
    lifetimePoints?: boolean
    lastUpdated?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userBottleCount"]>

  export type UserBottleCountSelectScalar = {
    id?: boolean
    userId?: boolean
    totalBottles?: boolean
    redeemableCount?: boolean
    lifetimeCount?: boolean
    points?: boolean
    lifetimePoints?: boolean
    lastUpdated?: boolean
  }

  export type UserBottleCountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "totalBottles" | "redeemableCount" | "lifetimeCount" | "points" | "lifetimePoints" | "lastUpdated", ExtArgs["result"]["userBottleCount"]>
  export type UserBottleCountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bottleCounts?: boolean | UserBottleCount$bottleCountsArgs<ExtArgs>
    bottleTransactions?: boolean | UserBottleCount$bottleTransactionsArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | UserBottleCountCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserBottleCountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserBottleCountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserBottleCountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserBottleCount"
    objects: {
      bottleCounts: Prisma.$BottleCountPayload<ExtArgs>[]
      bottleTransactions: Prisma.$BottleTransactionPayload<ExtArgs>[]
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      totalBottles: number
      redeemableCount: number
      lifetimeCount: number
      points: number
      lifetimePoints: number
      lastUpdated: Date
    }, ExtArgs["result"]["userBottleCount"]>
    composites: {}
  }

  type UserBottleCountGetPayload<S extends boolean | null | undefined | UserBottleCountDefaultArgs> = $Result.GetResult<Prisma.$UserBottleCountPayload, S>

  type UserBottleCountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserBottleCountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserBottleCountCountAggregateInputType | true
    }

  export interface UserBottleCountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserBottleCount'], meta: { name: 'UserBottleCount' } }
    /**
     * Find zero or one UserBottleCount that matches the filter.
     * @param {UserBottleCountFindUniqueArgs} args - Arguments to find a UserBottleCount
     * @example
     * // Get one UserBottleCount
     * const userBottleCount = await prisma.userBottleCount.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserBottleCountFindUniqueArgs>(args: SelectSubset<T, UserBottleCountFindUniqueArgs<ExtArgs>>): Prisma__UserBottleCountClient<$Result.GetResult<Prisma.$UserBottleCountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserBottleCount that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserBottleCountFindUniqueOrThrowArgs} args - Arguments to find a UserBottleCount
     * @example
     * // Get one UserBottleCount
     * const userBottleCount = await prisma.userBottleCount.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserBottleCountFindUniqueOrThrowArgs>(args: SelectSubset<T, UserBottleCountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserBottleCountClient<$Result.GetResult<Prisma.$UserBottleCountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserBottleCount that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBottleCountFindFirstArgs} args - Arguments to find a UserBottleCount
     * @example
     * // Get one UserBottleCount
     * const userBottleCount = await prisma.userBottleCount.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserBottleCountFindFirstArgs>(args?: SelectSubset<T, UserBottleCountFindFirstArgs<ExtArgs>>): Prisma__UserBottleCountClient<$Result.GetResult<Prisma.$UserBottleCountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserBottleCount that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBottleCountFindFirstOrThrowArgs} args - Arguments to find a UserBottleCount
     * @example
     * // Get one UserBottleCount
     * const userBottleCount = await prisma.userBottleCount.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserBottleCountFindFirstOrThrowArgs>(args?: SelectSubset<T, UserBottleCountFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserBottleCountClient<$Result.GetResult<Prisma.$UserBottleCountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserBottleCounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBottleCountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserBottleCounts
     * const userBottleCounts = await prisma.userBottleCount.findMany()
     * 
     * // Get first 10 UserBottleCounts
     * const userBottleCounts = await prisma.userBottleCount.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userBottleCountWithIdOnly = await prisma.userBottleCount.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserBottleCountFindManyArgs>(args?: SelectSubset<T, UserBottleCountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserBottleCountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserBottleCount.
     * @param {UserBottleCountCreateArgs} args - Arguments to create a UserBottleCount.
     * @example
     * // Create one UserBottleCount
     * const UserBottleCount = await prisma.userBottleCount.create({
     *   data: {
     *     // ... data to create a UserBottleCount
     *   }
     * })
     * 
     */
    create<T extends UserBottleCountCreateArgs>(args: SelectSubset<T, UserBottleCountCreateArgs<ExtArgs>>): Prisma__UserBottleCountClient<$Result.GetResult<Prisma.$UserBottleCountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserBottleCounts.
     * @param {UserBottleCountCreateManyArgs} args - Arguments to create many UserBottleCounts.
     * @example
     * // Create many UserBottleCounts
     * const userBottleCount = await prisma.userBottleCount.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserBottleCountCreateManyArgs>(args?: SelectSubset<T, UserBottleCountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserBottleCounts and returns the data saved in the database.
     * @param {UserBottleCountCreateManyAndReturnArgs} args - Arguments to create many UserBottleCounts.
     * @example
     * // Create many UserBottleCounts
     * const userBottleCount = await prisma.userBottleCount.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserBottleCounts and only return the `id`
     * const userBottleCountWithIdOnly = await prisma.userBottleCount.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserBottleCountCreateManyAndReturnArgs>(args?: SelectSubset<T, UserBottleCountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserBottleCountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserBottleCount.
     * @param {UserBottleCountDeleteArgs} args - Arguments to delete one UserBottleCount.
     * @example
     * // Delete one UserBottleCount
     * const UserBottleCount = await prisma.userBottleCount.delete({
     *   where: {
     *     // ... filter to delete one UserBottleCount
     *   }
     * })
     * 
     */
    delete<T extends UserBottleCountDeleteArgs>(args: SelectSubset<T, UserBottleCountDeleteArgs<ExtArgs>>): Prisma__UserBottleCountClient<$Result.GetResult<Prisma.$UserBottleCountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserBottleCount.
     * @param {UserBottleCountUpdateArgs} args - Arguments to update one UserBottleCount.
     * @example
     * // Update one UserBottleCount
     * const userBottleCount = await prisma.userBottleCount.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserBottleCountUpdateArgs>(args: SelectSubset<T, UserBottleCountUpdateArgs<ExtArgs>>): Prisma__UserBottleCountClient<$Result.GetResult<Prisma.$UserBottleCountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserBottleCounts.
     * @param {UserBottleCountDeleteManyArgs} args - Arguments to filter UserBottleCounts to delete.
     * @example
     * // Delete a few UserBottleCounts
     * const { count } = await prisma.userBottleCount.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserBottleCountDeleteManyArgs>(args?: SelectSubset<T, UserBottleCountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserBottleCounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBottleCountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserBottleCounts
     * const userBottleCount = await prisma.userBottleCount.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserBottleCountUpdateManyArgs>(args: SelectSubset<T, UserBottleCountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserBottleCounts and returns the data updated in the database.
     * @param {UserBottleCountUpdateManyAndReturnArgs} args - Arguments to update many UserBottleCounts.
     * @example
     * // Update many UserBottleCounts
     * const userBottleCount = await prisma.userBottleCount.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserBottleCounts and only return the `id`
     * const userBottleCountWithIdOnly = await prisma.userBottleCount.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserBottleCountUpdateManyAndReturnArgs>(args: SelectSubset<T, UserBottleCountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserBottleCountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserBottleCount.
     * @param {UserBottleCountUpsertArgs} args - Arguments to update or create a UserBottleCount.
     * @example
     * // Update or create a UserBottleCount
     * const userBottleCount = await prisma.userBottleCount.upsert({
     *   create: {
     *     // ... data to create a UserBottleCount
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserBottleCount we want to update
     *   }
     * })
     */
    upsert<T extends UserBottleCountUpsertArgs>(args: SelectSubset<T, UserBottleCountUpsertArgs<ExtArgs>>): Prisma__UserBottleCountClient<$Result.GetResult<Prisma.$UserBottleCountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserBottleCounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBottleCountCountArgs} args - Arguments to filter UserBottleCounts to count.
     * @example
     * // Count the number of UserBottleCounts
     * const count = await prisma.userBottleCount.count({
     *   where: {
     *     // ... the filter for the UserBottleCounts we want to count
     *   }
     * })
    **/
    count<T extends UserBottleCountCountArgs>(
      args?: Subset<T, UserBottleCountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserBottleCountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserBottleCount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBottleCountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserBottleCountAggregateArgs>(args: Subset<T, UserBottleCountAggregateArgs>): Prisma.PrismaPromise<GetUserBottleCountAggregateType<T>>

    /**
     * Group by UserBottleCount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBottleCountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserBottleCountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserBottleCountGroupByArgs['orderBy'] }
        : { orderBy?: UserBottleCountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserBottleCountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserBottleCountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserBottleCount model
   */
  readonly fields: UserBottleCountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserBottleCount.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserBottleCountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bottleCounts<T extends UserBottleCount$bottleCountsArgs<ExtArgs> = {}>(args?: Subset<T, UserBottleCount$bottleCountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BottleCountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bottleTransactions<T extends UserBottleCount$bottleTransactionsArgs<ExtArgs> = {}>(args?: Subset<T, UserBottleCount$bottleTransactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BottleTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserBottleCount model
   */
  interface UserBottleCountFieldRefs {
    readonly id: FieldRef<"UserBottleCount", 'String'>
    readonly userId: FieldRef<"UserBottleCount", 'String'>
    readonly totalBottles: FieldRef<"UserBottleCount", 'Int'>
    readonly redeemableCount: FieldRef<"UserBottleCount", 'Int'>
    readonly lifetimeCount: FieldRef<"UserBottleCount", 'Int'>
    readonly points: FieldRef<"UserBottleCount", 'Int'>
    readonly lifetimePoints: FieldRef<"UserBottleCount", 'Int'>
    readonly lastUpdated: FieldRef<"UserBottleCount", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserBottleCount findUnique
   */
  export type UserBottleCountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBottleCount
     */
    select?: UserBottleCountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBottleCount
     */
    omit?: UserBottleCountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBottleCountInclude<ExtArgs> | null
    /**
     * Filter, which UserBottleCount to fetch.
     */
    where: UserBottleCountWhereUniqueInput
  }

  /**
   * UserBottleCount findUniqueOrThrow
   */
  export type UserBottleCountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBottleCount
     */
    select?: UserBottleCountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBottleCount
     */
    omit?: UserBottleCountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBottleCountInclude<ExtArgs> | null
    /**
     * Filter, which UserBottleCount to fetch.
     */
    where: UserBottleCountWhereUniqueInput
  }

  /**
   * UserBottleCount findFirst
   */
  export type UserBottleCountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBottleCount
     */
    select?: UserBottleCountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBottleCount
     */
    omit?: UserBottleCountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBottleCountInclude<ExtArgs> | null
    /**
     * Filter, which UserBottleCount to fetch.
     */
    where?: UserBottleCountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserBottleCounts to fetch.
     */
    orderBy?: UserBottleCountOrderByWithRelationInput | UserBottleCountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserBottleCounts.
     */
    cursor?: UserBottleCountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserBottleCounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserBottleCounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserBottleCounts.
     */
    distinct?: UserBottleCountScalarFieldEnum | UserBottleCountScalarFieldEnum[]
  }

  /**
   * UserBottleCount findFirstOrThrow
   */
  export type UserBottleCountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBottleCount
     */
    select?: UserBottleCountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBottleCount
     */
    omit?: UserBottleCountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBottleCountInclude<ExtArgs> | null
    /**
     * Filter, which UserBottleCount to fetch.
     */
    where?: UserBottleCountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserBottleCounts to fetch.
     */
    orderBy?: UserBottleCountOrderByWithRelationInput | UserBottleCountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserBottleCounts.
     */
    cursor?: UserBottleCountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserBottleCounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserBottleCounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserBottleCounts.
     */
    distinct?: UserBottleCountScalarFieldEnum | UserBottleCountScalarFieldEnum[]
  }

  /**
   * UserBottleCount findMany
   */
  export type UserBottleCountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBottleCount
     */
    select?: UserBottleCountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBottleCount
     */
    omit?: UserBottleCountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBottleCountInclude<ExtArgs> | null
    /**
     * Filter, which UserBottleCounts to fetch.
     */
    where?: UserBottleCountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserBottleCounts to fetch.
     */
    orderBy?: UserBottleCountOrderByWithRelationInput | UserBottleCountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserBottleCounts.
     */
    cursor?: UserBottleCountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserBottleCounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserBottleCounts.
     */
    skip?: number
    distinct?: UserBottleCountScalarFieldEnum | UserBottleCountScalarFieldEnum[]
  }

  /**
   * UserBottleCount create
   */
  export type UserBottleCountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBottleCount
     */
    select?: UserBottleCountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBottleCount
     */
    omit?: UserBottleCountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBottleCountInclude<ExtArgs> | null
    /**
     * The data needed to create a UserBottleCount.
     */
    data: XOR<UserBottleCountCreateInput, UserBottleCountUncheckedCreateInput>
  }

  /**
   * UserBottleCount createMany
   */
  export type UserBottleCountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserBottleCounts.
     */
    data: UserBottleCountCreateManyInput | UserBottleCountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserBottleCount createManyAndReturn
   */
  export type UserBottleCountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBottleCount
     */
    select?: UserBottleCountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserBottleCount
     */
    omit?: UserBottleCountOmit<ExtArgs> | null
    /**
     * The data used to create many UserBottleCounts.
     */
    data: UserBottleCountCreateManyInput | UserBottleCountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBottleCountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserBottleCount update
   */
  export type UserBottleCountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBottleCount
     */
    select?: UserBottleCountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBottleCount
     */
    omit?: UserBottleCountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBottleCountInclude<ExtArgs> | null
    /**
     * The data needed to update a UserBottleCount.
     */
    data: XOR<UserBottleCountUpdateInput, UserBottleCountUncheckedUpdateInput>
    /**
     * Choose, which UserBottleCount to update.
     */
    where: UserBottleCountWhereUniqueInput
  }

  /**
   * UserBottleCount updateMany
   */
  export type UserBottleCountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserBottleCounts.
     */
    data: XOR<UserBottleCountUpdateManyMutationInput, UserBottleCountUncheckedUpdateManyInput>
    /**
     * Filter which UserBottleCounts to update
     */
    where?: UserBottleCountWhereInput
    /**
     * Limit how many UserBottleCounts to update.
     */
    limit?: number
  }

  /**
   * UserBottleCount updateManyAndReturn
   */
  export type UserBottleCountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBottleCount
     */
    select?: UserBottleCountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserBottleCount
     */
    omit?: UserBottleCountOmit<ExtArgs> | null
    /**
     * The data used to update UserBottleCounts.
     */
    data: XOR<UserBottleCountUpdateManyMutationInput, UserBottleCountUncheckedUpdateManyInput>
    /**
     * Filter which UserBottleCounts to update
     */
    where?: UserBottleCountWhereInput
    /**
     * Limit how many UserBottleCounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBottleCountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserBottleCount upsert
   */
  export type UserBottleCountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBottleCount
     */
    select?: UserBottleCountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBottleCount
     */
    omit?: UserBottleCountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBottleCountInclude<ExtArgs> | null
    /**
     * The filter to search for the UserBottleCount to update in case it exists.
     */
    where: UserBottleCountWhereUniqueInput
    /**
     * In case the UserBottleCount found by the `where` argument doesn't exist, create a new UserBottleCount with this data.
     */
    create: XOR<UserBottleCountCreateInput, UserBottleCountUncheckedCreateInput>
    /**
     * In case the UserBottleCount was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserBottleCountUpdateInput, UserBottleCountUncheckedUpdateInput>
  }

  /**
   * UserBottleCount delete
   */
  export type UserBottleCountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBottleCount
     */
    select?: UserBottleCountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBottleCount
     */
    omit?: UserBottleCountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBottleCountInclude<ExtArgs> | null
    /**
     * Filter which UserBottleCount to delete.
     */
    where: UserBottleCountWhereUniqueInput
  }

  /**
   * UserBottleCount deleteMany
   */
  export type UserBottleCountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserBottleCounts to delete
     */
    where?: UserBottleCountWhereInput
    /**
     * Limit how many UserBottleCounts to delete.
     */
    limit?: number
  }

  /**
   * UserBottleCount.bottleCounts
   */
  export type UserBottleCount$bottleCountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BottleCount
     */
    select?: BottleCountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BottleCount
     */
    omit?: BottleCountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BottleCountInclude<ExtArgs> | null
    where?: BottleCountWhereInput
    orderBy?: BottleCountOrderByWithRelationInput | BottleCountOrderByWithRelationInput[]
    cursor?: BottleCountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BottleCountScalarFieldEnum | BottleCountScalarFieldEnum[]
  }

  /**
   * UserBottleCount.bottleTransactions
   */
  export type UserBottleCount$bottleTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BottleTransaction
     */
    select?: BottleTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BottleTransaction
     */
    omit?: BottleTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BottleTransactionInclude<ExtArgs> | null
    where?: BottleTransactionWhereInput
    orderBy?: BottleTransactionOrderByWithRelationInput | BottleTransactionOrderByWithRelationInput[]
    cursor?: BottleTransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BottleTransactionScalarFieldEnum | BottleTransactionScalarFieldEnum[]
  }

  /**
   * UserBottleCount without action
   */
  export type UserBottleCountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBottleCount
     */
    select?: UserBottleCountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBottleCount
     */
    omit?: UserBottleCountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBottleCountInclude<ExtArgs> | null
  }


  /**
   * Model BottleTransaction
   */

  export type AggregateBottleTransaction = {
    _count: BottleTransactionCountAggregateOutputType | null
    _avg: BottleTransactionAvgAggregateOutputType | null
    _sum: BottleTransactionSumAggregateOutputType | null
    _min: BottleTransactionMinAggregateOutputType | null
    _max: BottleTransactionMaxAggregateOutputType | null
  }

  export type BottleTransactionAvgAggregateOutputType = {
    bottleCountId: number | null
    bottleCount: number | null
    pointsEarned: number | null
  }

  export type BottleTransactionSumAggregateOutputType = {
    bottleCountId: number | null
    bottleCount: number | null
    pointsEarned: number | null
  }

  export type BottleTransactionMinAggregateOutputType = {
    id: string | null
    userBottleCountId: string | null
    bottleCountId: number | null
    deviceId: string | null
    transactionType: string | null
    bottleCount: number | null
    pointsEarned: number | null
    timestamp: Date | null
  }

  export type BottleTransactionMaxAggregateOutputType = {
    id: string | null
    userBottleCountId: string | null
    bottleCountId: number | null
    deviceId: string | null
    transactionType: string | null
    bottleCount: number | null
    pointsEarned: number | null
    timestamp: Date | null
  }

  export type BottleTransactionCountAggregateOutputType = {
    id: number
    userBottleCountId: number
    bottleCountId: number
    deviceId: number
    transactionType: number
    bottleCount: number
    pointsEarned: number
    timestamp: number
    _all: number
  }


  export type BottleTransactionAvgAggregateInputType = {
    bottleCountId?: true
    bottleCount?: true
    pointsEarned?: true
  }

  export type BottleTransactionSumAggregateInputType = {
    bottleCountId?: true
    bottleCount?: true
    pointsEarned?: true
  }

  export type BottleTransactionMinAggregateInputType = {
    id?: true
    userBottleCountId?: true
    bottleCountId?: true
    deviceId?: true
    transactionType?: true
    bottleCount?: true
    pointsEarned?: true
    timestamp?: true
  }

  export type BottleTransactionMaxAggregateInputType = {
    id?: true
    userBottleCountId?: true
    bottleCountId?: true
    deviceId?: true
    transactionType?: true
    bottleCount?: true
    pointsEarned?: true
    timestamp?: true
  }

  export type BottleTransactionCountAggregateInputType = {
    id?: true
    userBottleCountId?: true
    bottleCountId?: true
    deviceId?: true
    transactionType?: true
    bottleCount?: true
    pointsEarned?: true
    timestamp?: true
    _all?: true
  }

  export type BottleTransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BottleTransaction to aggregate.
     */
    where?: BottleTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BottleTransactions to fetch.
     */
    orderBy?: BottleTransactionOrderByWithRelationInput | BottleTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BottleTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BottleTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BottleTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BottleTransactions
    **/
    _count?: true | BottleTransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BottleTransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BottleTransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BottleTransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BottleTransactionMaxAggregateInputType
  }

  export type GetBottleTransactionAggregateType<T extends BottleTransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateBottleTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBottleTransaction[P]>
      : GetScalarType<T[P], AggregateBottleTransaction[P]>
  }




  export type BottleTransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BottleTransactionWhereInput
    orderBy?: BottleTransactionOrderByWithAggregationInput | BottleTransactionOrderByWithAggregationInput[]
    by: BottleTransactionScalarFieldEnum[] | BottleTransactionScalarFieldEnum
    having?: BottleTransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BottleTransactionCountAggregateInputType | true
    _avg?: BottleTransactionAvgAggregateInputType
    _sum?: BottleTransactionSumAggregateInputType
    _min?: BottleTransactionMinAggregateInputType
    _max?: BottleTransactionMaxAggregateInputType
  }

  export type BottleTransactionGroupByOutputType = {
    id: string
    userBottleCountId: string
    bottleCountId: number | null
    deviceId: string | null
    transactionType: string
    bottleCount: number
    pointsEarned: number
    timestamp: Date
    _count: BottleTransactionCountAggregateOutputType | null
    _avg: BottleTransactionAvgAggregateOutputType | null
    _sum: BottleTransactionSumAggregateOutputType | null
    _min: BottleTransactionMinAggregateOutputType | null
    _max: BottleTransactionMaxAggregateOutputType | null
  }

  type GetBottleTransactionGroupByPayload<T extends BottleTransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BottleTransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BottleTransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BottleTransactionGroupByOutputType[P]>
            : GetScalarType<T[P], BottleTransactionGroupByOutputType[P]>
        }
      >
    >


  export type BottleTransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userBottleCountId?: boolean
    bottleCountId?: boolean
    deviceId?: boolean
    transactionType?: boolean
    bottleCount?: boolean
    pointsEarned?: boolean
    timestamp?: boolean
    userBottleCount?: boolean | UserBottleCountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bottleTransaction"]>

  export type BottleTransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userBottleCountId?: boolean
    bottleCountId?: boolean
    deviceId?: boolean
    transactionType?: boolean
    bottleCount?: boolean
    pointsEarned?: boolean
    timestamp?: boolean
    userBottleCount?: boolean | UserBottleCountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bottleTransaction"]>

  export type BottleTransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userBottleCountId?: boolean
    bottleCountId?: boolean
    deviceId?: boolean
    transactionType?: boolean
    bottleCount?: boolean
    pointsEarned?: boolean
    timestamp?: boolean
    userBottleCount?: boolean | UserBottleCountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bottleTransaction"]>

  export type BottleTransactionSelectScalar = {
    id?: boolean
    userBottleCountId?: boolean
    bottleCountId?: boolean
    deviceId?: boolean
    transactionType?: boolean
    bottleCount?: boolean
    pointsEarned?: boolean
    timestamp?: boolean
  }

  export type BottleTransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userBottleCountId" | "bottleCountId" | "deviceId" | "transactionType" | "bottleCount" | "pointsEarned" | "timestamp", ExtArgs["result"]["bottleTransaction"]>
  export type BottleTransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userBottleCount?: boolean | UserBottleCountDefaultArgs<ExtArgs>
  }
  export type BottleTransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userBottleCount?: boolean | UserBottleCountDefaultArgs<ExtArgs>
  }
  export type BottleTransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userBottleCount?: boolean | UserBottleCountDefaultArgs<ExtArgs>
  }

  export type $BottleTransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BottleTransaction"
    objects: {
      userBottleCount: Prisma.$UserBottleCountPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userBottleCountId: string
      bottleCountId: number | null
      deviceId: string | null
      transactionType: string
      bottleCount: number
      pointsEarned: number
      timestamp: Date
    }, ExtArgs["result"]["bottleTransaction"]>
    composites: {}
  }

  type BottleTransactionGetPayload<S extends boolean | null | undefined | BottleTransactionDefaultArgs> = $Result.GetResult<Prisma.$BottleTransactionPayload, S>

  type BottleTransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BottleTransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BottleTransactionCountAggregateInputType | true
    }

  export interface BottleTransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BottleTransaction'], meta: { name: 'BottleTransaction' } }
    /**
     * Find zero or one BottleTransaction that matches the filter.
     * @param {BottleTransactionFindUniqueArgs} args - Arguments to find a BottleTransaction
     * @example
     * // Get one BottleTransaction
     * const bottleTransaction = await prisma.bottleTransaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BottleTransactionFindUniqueArgs>(args: SelectSubset<T, BottleTransactionFindUniqueArgs<ExtArgs>>): Prisma__BottleTransactionClient<$Result.GetResult<Prisma.$BottleTransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BottleTransaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BottleTransactionFindUniqueOrThrowArgs} args - Arguments to find a BottleTransaction
     * @example
     * // Get one BottleTransaction
     * const bottleTransaction = await prisma.bottleTransaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BottleTransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, BottleTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BottleTransactionClient<$Result.GetResult<Prisma.$BottleTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BottleTransaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BottleTransactionFindFirstArgs} args - Arguments to find a BottleTransaction
     * @example
     * // Get one BottleTransaction
     * const bottleTransaction = await prisma.bottleTransaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BottleTransactionFindFirstArgs>(args?: SelectSubset<T, BottleTransactionFindFirstArgs<ExtArgs>>): Prisma__BottleTransactionClient<$Result.GetResult<Prisma.$BottleTransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BottleTransaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BottleTransactionFindFirstOrThrowArgs} args - Arguments to find a BottleTransaction
     * @example
     * // Get one BottleTransaction
     * const bottleTransaction = await prisma.bottleTransaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BottleTransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, BottleTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__BottleTransactionClient<$Result.GetResult<Prisma.$BottleTransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BottleTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BottleTransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BottleTransactions
     * const bottleTransactions = await prisma.bottleTransaction.findMany()
     * 
     * // Get first 10 BottleTransactions
     * const bottleTransactions = await prisma.bottleTransaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bottleTransactionWithIdOnly = await prisma.bottleTransaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BottleTransactionFindManyArgs>(args?: SelectSubset<T, BottleTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BottleTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BottleTransaction.
     * @param {BottleTransactionCreateArgs} args - Arguments to create a BottleTransaction.
     * @example
     * // Create one BottleTransaction
     * const BottleTransaction = await prisma.bottleTransaction.create({
     *   data: {
     *     // ... data to create a BottleTransaction
     *   }
     * })
     * 
     */
    create<T extends BottleTransactionCreateArgs>(args: SelectSubset<T, BottleTransactionCreateArgs<ExtArgs>>): Prisma__BottleTransactionClient<$Result.GetResult<Prisma.$BottleTransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BottleTransactions.
     * @param {BottleTransactionCreateManyArgs} args - Arguments to create many BottleTransactions.
     * @example
     * // Create many BottleTransactions
     * const bottleTransaction = await prisma.bottleTransaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BottleTransactionCreateManyArgs>(args?: SelectSubset<T, BottleTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BottleTransactions and returns the data saved in the database.
     * @param {BottleTransactionCreateManyAndReturnArgs} args - Arguments to create many BottleTransactions.
     * @example
     * // Create many BottleTransactions
     * const bottleTransaction = await prisma.bottleTransaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BottleTransactions and only return the `id`
     * const bottleTransactionWithIdOnly = await prisma.bottleTransaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BottleTransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, BottleTransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BottleTransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BottleTransaction.
     * @param {BottleTransactionDeleteArgs} args - Arguments to delete one BottleTransaction.
     * @example
     * // Delete one BottleTransaction
     * const BottleTransaction = await prisma.bottleTransaction.delete({
     *   where: {
     *     // ... filter to delete one BottleTransaction
     *   }
     * })
     * 
     */
    delete<T extends BottleTransactionDeleteArgs>(args: SelectSubset<T, BottleTransactionDeleteArgs<ExtArgs>>): Prisma__BottleTransactionClient<$Result.GetResult<Prisma.$BottleTransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BottleTransaction.
     * @param {BottleTransactionUpdateArgs} args - Arguments to update one BottleTransaction.
     * @example
     * // Update one BottleTransaction
     * const bottleTransaction = await prisma.bottleTransaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BottleTransactionUpdateArgs>(args: SelectSubset<T, BottleTransactionUpdateArgs<ExtArgs>>): Prisma__BottleTransactionClient<$Result.GetResult<Prisma.$BottleTransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BottleTransactions.
     * @param {BottleTransactionDeleteManyArgs} args - Arguments to filter BottleTransactions to delete.
     * @example
     * // Delete a few BottleTransactions
     * const { count } = await prisma.bottleTransaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BottleTransactionDeleteManyArgs>(args?: SelectSubset<T, BottleTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BottleTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BottleTransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BottleTransactions
     * const bottleTransaction = await prisma.bottleTransaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BottleTransactionUpdateManyArgs>(args: SelectSubset<T, BottleTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BottleTransactions and returns the data updated in the database.
     * @param {BottleTransactionUpdateManyAndReturnArgs} args - Arguments to update many BottleTransactions.
     * @example
     * // Update many BottleTransactions
     * const bottleTransaction = await prisma.bottleTransaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BottleTransactions and only return the `id`
     * const bottleTransactionWithIdOnly = await prisma.bottleTransaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BottleTransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, BottleTransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BottleTransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BottleTransaction.
     * @param {BottleTransactionUpsertArgs} args - Arguments to update or create a BottleTransaction.
     * @example
     * // Update or create a BottleTransaction
     * const bottleTransaction = await prisma.bottleTransaction.upsert({
     *   create: {
     *     // ... data to create a BottleTransaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BottleTransaction we want to update
     *   }
     * })
     */
    upsert<T extends BottleTransactionUpsertArgs>(args: SelectSubset<T, BottleTransactionUpsertArgs<ExtArgs>>): Prisma__BottleTransactionClient<$Result.GetResult<Prisma.$BottleTransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BottleTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BottleTransactionCountArgs} args - Arguments to filter BottleTransactions to count.
     * @example
     * // Count the number of BottleTransactions
     * const count = await prisma.bottleTransaction.count({
     *   where: {
     *     // ... the filter for the BottleTransactions we want to count
     *   }
     * })
    **/
    count<T extends BottleTransactionCountArgs>(
      args?: Subset<T, BottleTransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BottleTransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BottleTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BottleTransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BottleTransactionAggregateArgs>(args: Subset<T, BottleTransactionAggregateArgs>): Prisma.PrismaPromise<GetBottleTransactionAggregateType<T>>

    /**
     * Group by BottleTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BottleTransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BottleTransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BottleTransactionGroupByArgs['orderBy'] }
        : { orderBy?: BottleTransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BottleTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBottleTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BottleTransaction model
   */
  readonly fields: BottleTransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BottleTransaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BottleTransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    userBottleCount<T extends UserBottleCountDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserBottleCountDefaultArgs<ExtArgs>>): Prisma__UserBottleCountClient<$Result.GetResult<Prisma.$UserBottleCountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BottleTransaction model
   */
  interface BottleTransactionFieldRefs {
    readonly id: FieldRef<"BottleTransaction", 'String'>
    readonly userBottleCountId: FieldRef<"BottleTransaction", 'String'>
    readonly bottleCountId: FieldRef<"BottleTransaction", 'Int'>
    readonly deviceId: FieldRef<"BottleTransaction", 'String'>
    readonly transactionType: FieldRef<"BottleTransaction", 'String'>
    readonly bottleCount: FieldRef<"BottleTransaction", 'Int'>
    readonly pointsEarned: FieldRef<"BottleTransaction", 'Int'>
    readonly timestamp: FieldRef<"BottleTransaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BottleTransaction findUnique
   */
  export type BottleTransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BottleTransaction
     */
    select?: BottleTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BottleTransaction
     */
    omit?: BottleTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BottleTransactionInclude<ExtArgs> | null
    /**
     * Filter, which BottleTransaction to fetch.
     */
    where: BottleTransactionWhereUniqueInput
  }

  /**
   * BottleTransaction findUniqueOrThrow
   */
  export type BottleTransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BottleTransaction
     */
    select?: BottleTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BottleTransaction
     */
    omit?: BottleTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BottleTransactionInclude<ExtArgs> | null
    /**
     * Filter, which BottleTransaction to fetch.
     */
    where: BottleTransactionWhereUniqueInput
  }

  /**
   * BottleTransaction findFirst
   */
  export type BottleTransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BottleTransaction
     */
    select?: BottleTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BottleTransaction
     */
    omit?: BottleTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BottleTransactionInclude<ExtArgs> | null
    /**
     * Filter, which BottleTransaction to fetch.
     */
    where?: BottleTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BottleTransactions to fetch.
     */
    orderBy?: BottleTransactionOrderByWithRelationInput | BottleTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BottleTransactions.
     */
    cursor?: BottleTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BottleTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BottleTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BottleTransactions.
     */
    distinct?: BottleTransactionScalarFieldEnum | BottleTransactionScalarFieldEnum[]
  }

  /**
   * BottleTransaction findFirstOrThrow
   */
  export type BottleTransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BottleTransaction
     */
    select?: BottleTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BottleTransaction
     */
    omit?: BottleTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BottleTransactionInclude<ExtArgs> | null
    /**
     * Filter, which BottleTransaction to fetch.
     */
    where?: BottleTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BottleTransactions to fetch.
     */
    orderBy?: BottleTransactionOrderByWithRelationInput | BottleTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BottleTransactions.
     */
    cursor?: BottleTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BottleTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BottleTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BottleTransactions.
     */
    distinct?: BottleTransactionScalarFieldEnum | BottleTransactionScalarFieldEnum[]
  }

  /**
   * BottleTransaction findMany
   */
  export type BottleTransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BottleTransaction
     */
    select?: BottleTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BottleTransaction
     */
    omit?: BottleTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BottleTransactionInclude<ExtArgs> | null
    /**
     * Filter, which BottleTransactions to fetch.
     */
    where?: BottleTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BottleTransactions to fetch.
     */
    orderBy?: BottleTransactionOrderByWithRelationInput | BottleTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BottleTransactions.
     */
    cursor?: BottleTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BottleTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BottleTransactions.
     */
    skip?: number
    distinct?: BottleTransactionScalarFieldEnum | BottleTransactionScalarFieldEnum[]
  }

  /**
   * BottleTransaction create
   */
  export type BottleTransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BottleTransaction
     */
    select?: BottleTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BottleTransaction
     */
    omit?: BottleTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BottleTransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a BottleTransaction.
     */
    data: XOR<BottleTransactionCreateInput, BottleTransactionUncheckedCreateInput>
  }

  /**
   * BottleTransaction createMany
   */
  export type BottleTransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BottleTransactions.
     */
    data: BottleTransactionCreateManyInput | BottleTransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BottleTransaction createManyAndReturn
   */
  export type BottleTransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BottleTransaction
     */
    select?: BottleTransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BottleTransaction
     */
    omit?: BottleTransactionOmit<ExtArgs> | null
    /**
     * The data used to create many BottleTransactions.
     */
    data: BottleTransactionCreateManyInput | BottleTransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BottleTransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BottleTransaction update
   */
  export type BottleTransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BottleTransaction
     */
    select?: BottleTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BottleTransaction
     */
    omit?: BottleTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BottleTransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a BottleTransaction.
     */
    data: XOR<BottleTransactionUpdateInput, BottleTransactionUncheckedUpdateInput>
    /**
     * Choose, which BottleTransaction to update.
     */
    where: BottleTransactionWhereUniqueInput
  }

  /**
   * BottleTransaction updateMany
   */
  export type BottleTransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BottleTransactions.
     */
    data: XOR<BottleTransactionUpdateManyMutationInput, BottleTransactionUncheckedUpdateManyInput>
    /**
     * Filter which BottleTransactions to update
     */
    where?: BottleTransactionWhereInput
    /**
     * Limit how many BottleTransactions to update.
     */
    limit?: number
  }

  /**
   * BottleTransaction updateManyAndReturn
   */
  export type BottleTransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BottleTransaction
     */
    select?: BottleTransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BottleTransaction
     */
    omit?: BottleTransactionOmit<ExtArgs> | null
    /**
     * The data used to update BottleTransactions.
     */
    data: XOR<BottleTransactionUpdateManyMutationInput, BottleTransactionUncheckedUpdateManyInput>
    /**
     * Filter which BottleTransactions to update
     */
    where?: BottleTransactionWhereInput
    /**
     * Limit how many BottleTransactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BottleTransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BottleTransaction upsert
   */
  export type BottleTransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BottleTransaction
     */
    select?: BottleTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BottleTransaction
     */
    omit?: BottleTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BottleTransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the BottleTransaction to update in case it exists.
     */
    where: BottleTransactionWhereUniqueInput
    /**
     * In case the BottleTransaction found by the `where` argument doesn't exist, create a new BottleTransaction with this data.
     */
    create: XOR<BottleTransactionCreateInput, BottleTransactionUncheckedCreateInput>
    /**
     * In case the BottleTransaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BottleTransactionUpdateInput, BottleTransactionUncheckedUpdateInput>
  }

  /**
   * BottleTransaction delete
   */
  export type BottleTransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BottleTransaction
     */
    select?: BottleTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BottleTransaction
     */
    omit?: BottleTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BottleTransactionInclude<ExtArgs> | null
    /**
     * Filter which BottleTransaction to delete.
     */
    where: BottleTransactionWhereUniqueInput
  }

  /**
   * BottleTransaction deleteMany
   */
  export type BottleTransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BottleTransactions to delete
     */
    where?: BottleTransactionWhereInput
    /**
     * Limit how many BottleTransactions to delete.
     */
    limit?: number
  }

  /**
   * BottleTransaction without action
   */
  export type BottleTransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BottleTransaction
     */
    select?: BottleTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BottleTransaction
     */
    omit?: BottleTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BottleTransactionInclude<ExtArgs> | null
  }


  /**
   * Model ArduinoConnection
   */

  export type AggregateArduinoConnection = {
    _count: ArduinoConnectionCountAggregateOutputType | null
    _avg: ArduinoConnectionAvgAggregateOutputType | null
    _sum: ArduinoConnectionSumAggregateOutputType | null
    _min: ArduinoConnectionMinAggregateOutputType | null
    _max: ArduinoConnectionMaxAggregateOutputType | null
  }

  export type ArduinoConnectionAvgAggregateOutputType = {
    id: number | null
    locationId: number | null
  }

  export type ArduinoConnectionSumAggregateOutputType = {
    id: number | null
    locationId: number | null
  }

  export type ArduinoConnectionMinAggregateOutputType = {
    id: number | null
    deviceId: string | null
    locationId: number | null
    ipAddress: string | null
    status: string | null
    lastPing: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ArduinoConnectionMaxAggregateOutputType = {
    id: number | null
    deviceId: string | null
    locationId: number | null
    ipAddress: string | null
    status: string | null
    lastPing: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ArduinoConnectionCountAggregateOutputType = {
    id: number
    deviceId: number
    locationId: number
    ipAddress: number
    status: number
    lastPing: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ArduinoConnectionAvgAggregateInputType = {
    id?: true
    locationId?: true
  }

  export type ArduinoConnectionSumAggregateInputType = {
    id?: true
    locationId?: true
  }

  export type ArduinoConnectionMinAggregateInputType = {
    id?: true
    deviceId?: true
    locationId?: true
    ipAddress?: true
    status?: true
    lastPing?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ArduinoConnectionMaxAggregateInputType = {
    id?: true
    deviceId?: true
    locationId?: true
    ipAddress?: true
    status?: true
    lastPing?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ArduinoConnectionCountAggregateInputType = {
    id?: true
    deviceId?: true
    locationId?: true
    ipAddress?: true
    status?: true
    lastPing?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ArduinoConnectionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArduinoConnection to aggregate.
     */
    where?: ArduinoConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArduinoConnections to fetch.
     */
    orderBy?: ArduinoConnectionOrderByWithRelationInput | ArduinoConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArduinoConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArduinoConnections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArduinoConnections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ArduinoConnections
    **/
    _count?: true | ArduinoConnectionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ArduinoConnectionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ArduinoConnectionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArduinoConnectionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArduinoConnectionMaxAggregateInputType
  }

  export type GetArduinoConnectionAggregateType<T extends ArduinoConnectionAggregateArgs> = {
        [P in keyof T & keyof AggregateArduinoConnection]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArduinoConnection[P]>
      : GetScalarType<T[P], AggregateArduinoConnection[P]>
  }




  export type ArduinoConnectionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArduinoConnectionWhereInput
    orderBy?: ArduinoConnectionOrderByWithAggregationInput | ArduinoConnectionOrderByWithAggregationInput[]
    by: ArduinoConnectionScalarFieldEnum[] | ArduinoConnectionScalarFieldEnum
    having?: ArduinoConnectionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArduinoConnectionCountAggregateInputType | true
    _avg?: ArduinoConnectionAvgAggregateInputType
    _sum?: ArduinoConnectionSumAggregateInputType
    _min?: ArduinoConnectionMinAggregateInputType
    _max?: ArduinoConnectionMaxAggregateInputType
  }

  export type ArduinoConnectionGroupByOutputType = {
    id: number
    deviceId: string
    locationId: number | null
    ipAddress: string | null
    status: string
    lastPing: Date
    createdAt: Date
    updatedAt: Date
    _count: ArduinoConnectionCountAggregateOutputType | null
    _avg: ArduinoConnectionAvgAggregateOutputType | null
    _sum: ArduinoConnectionSumAggregateOutputType | null
    _min: ArduinoConnectionMinAggregateOutputType | null
    _max: ArduinoConnectionMaxAggregateOutputType | null
  }

  type GetArduinoConnectionGroupByPayload<T extends ArduinoConnectionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArduinoConnectionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArduinoConnectionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArduinoConnectionGroupByOutputType[P]>
            : GetScalarType<T[P], ArduinoConnectionGroupByOutputType[P]>
        }
      >
    >


  export type ArduinoConnectionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    deviceId?: boolean
    locationId?: boolean
    ipAddress?: boolean
    status?: boolean
    lastPing?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["arduinoConnection"]>

  export type ArduinoConnectionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    deviceId?: boolean
    locationId?: boolean
    ipAddress?: boolean
    status?: boolean
    lastPing?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["arduinoConnection"]>

  export type ArduinoConnectionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    deviceId?: boolean
    locationId?: boolean
    ipAddress?: boolean
    status?: boolean
    lastPing?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["arduinoConnection"]>

  export type ArduinoConnectionSelectScalar = {
    id?: boolean
    deviceId?: boolean
    locationId?: boolean
    ipAddress?: boolean
    status?: boolean
    lastPing?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ArduinoConnectionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "deviceId" | "locationId" | "ipAddress" | "status" | "lastPing" | "createdAt" | "updatedAt", ExtArgs["result"]["arduinoConnection"]>

  export type $ArduinoConnectionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ArduinoConnection"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      deviceId: string
      locationId: number | null
      ipAddress: string | null
      status: string
      lastPing: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["arduinoConnection"]>
    composites: {}
  }

  type ArduinoConnectionGetPayload<S extends boolean | null | undefined | ArduinoConnectionDefaultArgs> = $Result.GetResult<Prisma.$ArduinoConnectionPayload, S>

  type ArduinoConnectionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ArduinoConnectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ArduinoConnectionCountAggregateInputType | true
    }

  export interface ArduinoConnectionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ArduinoConnection'], meta: { name: 'ArduinoConnection' } }
    /**
     * Find zero or one ArduinoConnection that matches the filter.
     * @param {ArduinoConnectionFindUniqueArgs} args - Arguments to find a ArduinoConnection
     * @example
     * // Get one ArduinoConnection
     * const arduinoConnection = await prisma.arduinoConnection.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArduinoConnectionFindUniqueArgs>(args: SelectSubset<T, ArduinoConnectionFindUniqueArgs<ExtArgs>>): Prisma__ArduinoConnectionClient<$Result.GetResult<Prisma.$ArduinoConnectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ArduinoConnection that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ArduinoConnectionFindUniqueOrThrowArgs} args - Arguments to find a ArduinoConnection
     * @example
     * // Get one ArduinoConnection
     * const arduinoConnection = await prisma.arduinoConnection.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArduinoConnectionFindUniqueOrThrowArgs>(args: SelectSubset<T, ArduinoConnectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArduinoConnectionClient<$Result.GetResult<Prisma.$ArduinoConnectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArduinoConnection that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArduinoConnectionFindFirstArgs} args - Arguments to find a ArduinoConnection
     * @example
     * // Get one ArduinoConnection
     * const arduinoConnection = await prisma.arduinoConnection.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArduinoConnectionFindFirstArgs>(args?: SelectSubset<T, ArduinoConnectionFindFirstArgs<ExtArgs>>): Prisma__ArduinoConnectionClient<$Result.GetResult<Prisma.$ArduinoConnectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArduinoConnection that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArduinoConnectionFindFirstOrThrowArgs} args - Arguments to find a ArduinoConnection
     * @example
     * // Get one ArduinoConnection
     * const arduinoConnection = await prisma.arduinoConnection.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArduinoConnectionFindFirstOrThrowArgs>(args?: SelectSubset<T, ArduinoConnectionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArduinoConnectionClient<$Result.GetResult<Prisma.$ArduinoConnectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ArduinoConnections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArduinoConnectionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ArduinoConnections
     * const arduinoConnections = await prisma.arduinoConnection.findMany()
     * 
     * // Get first 10 ArduinoConnections
     * const arduinoConnections = await prisma.arduinoConnection.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const arduinoConnectionWithIdOnly = await prisma.arduinoConnection.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ArduinoConnectionFindManyArgs>(args?: SelectSubset<T, ArduinoConnectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArduinoConnectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ArduinoConnection.
     * @param {ArduinoConnectionCreateArgs} args - Arguments to create a ArduinoConnection.
     * @example
     * // Create one ArduinoConnection
     * const ArduinoConnection = await prisma.arduinoConnection.create({
     *   data: {
     *     // ... data to create a ArduinoConnection
     *   }
     * })
     * 
     */
    create<T extends ArduinoConnectionCreateArgs>(args: SelectSubset<T, ArduinoConnectionCreateArgs<ExtArgs>>): Prisma__ArduinoConnectionClient<$Result.GetResult<Prisma.$ArduinoConnectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ArduinoConnections.
     * @param {ArduinoConnectionCreateManyArgs} args - Arguments to create many ArduinoConnections.
     * @example
     * // Create many ArduinoConnections
     * const arduinoConnection = await prisma.arduinoConnection.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArduinoConnectionCreateManyArgs>(args?: SelectSubset<T, ArduinoConnectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ArduinoConnections and returns the data saved in the database.
     * @param {ArduinoConnectionCreateManyAndReturnArgs} args - Arguments to create many ArduinoConnections.
     * @example
     * // Create many ArduinoConnections
     * const arduinoConnection = await prisma.arduinoConnection.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ArduinoConnections and only return the `id`
     * const arduinoConnectionWithIdOnly = await prisma.arduinoConnection.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ArduinoConnectionCreateManyAndReturnArgs>(args?: SelectSubset<T, ArduinoConnectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArduinoConnectionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ArduinoConnection.
     * @param {ArduinoConnectionDeleteArgs} args - Arguments to delete one ArduinoConnection.
     * @example
     * // Delete one ArduinoConnection
     * const ArduinoConnection = await prisma.arduinoConnection.delete({
     *   where: {
     *     // ... filter to delete one ArduinoConnection
     *   }
     * })
     * 
     */
    delete<T extends ArduinoConnectionDeleteArgs>(args: SelectSubset<T, ArduinoConnectionDeleteArgs<ExtArgs>>): Prisma__ArduinoConnectionClient<$Result.GetResult<Prisma.$ArduinoConnectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ArduinoConnection.
     * @param {ArduinoConnectionUpdateArgs} args - Arguments to update one ArduinoConnection.
     * @example
     * // Update one ArduinoConnection
     * const arduinoConnection = await prisma.arduinoConnection.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArduinoConnectionUpdateArgs>(args: SelectSubset<T, ArduinoConnectionUpdateArgs<ExtArgs>>): Prisma__ArduinoConnectionClient<$Result.GetResult<Prisma.$ArduinoConnectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ArduinoConnections.
     * @param {ArduinoConnectionDeleteManyArgs} args - Arguments to filter ArduinoConnections to delete.
     * @example
     * // Delete a few ArduinoConnections
     * const { count } = await prisma.arduinoConnection.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArduinoConnectionDeleteManyArgs>(args?: SelectSubset<T, ArduinoConnectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArduinoConnections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArduinoConnectionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ArduinoConnections
     * const arduinoConnection = await prisma.arduinoConnection.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArduinoConnectionUpdateManyArgs>(args: SelectSubset<T, ArduinoConnectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArduinoConnections and returns the data updated in the database.
     * @param {ArduinoConnectionUpdateManyAndReturnArgs} args - Arguments to update many ArduinoConnections.
     * @example
     * // Update many ArduinoConnections
     * const arduinoConnection = await prisma.arduinoConnection.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ArduinoConnections and only return the `id`
     * const arduinoConnectionWithIdOnly = await prisma.arduinoConnection.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ArduinoConnectionUpdateManyAndReturnArgs>(args: SelectSubset<T, ArduinoConnectionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArduinoConnectionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ArduinoConnection.
     * @param {ArduinoConnectionUpsertArgs} args - Arguments to update or create a ArduinoConnection.
     * @example
     * // Update or create a ArduinoConnection
     * const arduinoConnection = await prisma.arduinoConnection.upsert({
     *   create: {
     *     // ... data to create a ArduinoConnection
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ArduinoConnection we want to update
     *   }
     * })
     */
    upsert<T extends ArduinoConnectionUpsertArgs>(args: SelectSubset<T, ArduinoConnectionUpsertArgs<ExtArgs>>): Prisma__ArduinoConnectionClient<$Result.GetResult<Prisma.$ArduinoConnectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ArduinoConnections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArduinoConnectionCountArgs} args - Arguments to filter ArduinoConnections to count.
     * @example
     * // Count the number of ArduinoConnections
     * const count = await prisma.arduinoConnection.count({
     *   where: {
     *     // ... the filter for the ArduinoConnections we want to count
     *   }
     * })
    **/
    count<T extends ArduinoConnectionCountArgs>(
      args?: Subset<T, ArduinoConnectionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArduinoConnectionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ArduinoConnection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArduinoConnectionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ArduinoConnectionAggregateArgs>(args: Subset<T, ArduinoConnectionAggregateArgs>): Prisma.PrismaPromise<GetArduinoConnectionAggregateType<T>>

    /**
     * Group by ArduinoConnection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArduinoConnectionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ArduinoConnectionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArduinoConnectionGroupByArgs['orderBy'] }
        : { orderBy?: ArduinoConnectionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ArduinoConnectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArduinoConnectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ArduinoConnection model
   */
  readonly fields: ArduinoConnectionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ArduinoConnection.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArduinoConnectionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ArduinoConnection model
   */
  interface ArduinoConnectionFieldRefs {
    readonly id: FieldRef<"ArduinoConnection", 'Int'>
    readonly deviceId: FieldRef<"ArduinoConnection", 'String'>
    readonly locationId: FieldRef<"ArduinoConnection", 'Int'>
    readonly ipAddress: FieldRef<"ArduinoConnection", 'String'>
    readonly status: FieldRef<"ArduinoConnection", 'String'>
    readonly lastPing: FieldRef<"ArduinoConnection", 'DateTime'>
    readonly createdAt: FieldRef<"ArduinoConnection", 'DateTime'>
    readonly updatedAt: FieldRef<"ArduinoConnection", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ArduinoConnection findUnique
   */
  export type ArduinoConnectionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArduinoConnection
     */
    select?: ArduinoConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArduinoConnection
     */
    omit?: ArduinoConnectionOmit<ExtArgs> | null
    /**
     * Filter, which ArduinoConnection to fetch.
     */
    where: ArduinoConnectionWhereUniqueInput
  }

  /**
   * ArduinoConnection findUniqueOrThrow
   */
  export type ArduinoConnectionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArduinoConnection
     */
    select?: ArduinoConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArduinoConnection
     */
    omit?: ArduinoConnectionOmit<ExtArgs> | null
    /**
     * Filter, which ArduinoConnection to fetch.
     */
    where: ArduinoConnectionWhereUniqueInput
  }

  /**
   * ArduinoConnection findFirst
   */
  export type ArduinoConnectionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArduinoConnection
     */
    select?: ArduinoConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArduinoConnection
     */
    omit?: ArduinoConnectionOmit<ExtArgs> | null
    /**
     * Filter, which ArduinoConnection to fetch.
     */
    where?: ArduinoConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArduinoConnections to fetch.
     */
    orderBy?: ArduinoConnectionOrderByWithRelationInput | ArduinoConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArduinoConnections.
     */
    cursor?: ArduinoConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArduinoConnections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArduinoConnections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArduinoConnections.
     */
    distinct?: ArduinoConnectionScalarFieldEnum | ArduinoConnectionScalarFieldEnum[]
  }

  /**
   * ArduinoConnection findFirstOrThrow
   */
  export type ArduinoConnectionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArduinoConnection
     */
    select?: ArduinoConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArduinoConnection
     */
    omit?: ArduinoConnectionOmit<ExtArgs> | null
    /**
     * Filter, which ArduinoConnection to fetch.
     */
    where?: ArduinoConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArduinoConnections to fetch.
     */
    orderBy?: ArduinoConnectionOrderByWithRelationInput | ArduinoConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArduinoConnections.
     */
    cursor?: ArduinoConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArduinoConnections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArduinoConnections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArduinoConnections.
     */
    distinct?: ArduinoConnectionScalarFieldEnum | ArduinoConnectionScalarFieldEnum[]
  }

  /**
   * ArduinoConnection findMany
   */
  export type ArduinoConnectionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArduinoConnection
     */
    select?: ArduinoConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArduinoConnection
     */
    omit?: ArduinoConnectionOmit<ExtArgs> | null
    /**
     * Filter, which ArduinoConnections to fetch.
     */
    where?: ArduinoConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArduinoConnections to fetch.
     */
    orderBy?: ArduinoConnectionOrderByWithRelationInput | ArduinoConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ArduinoConnections.
     */
    cursor?: ArduinoConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArduinoConnections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArduinoConnections.
     */
    skip?: number
    distinct?: ArduinoConnectionScalarFieldEnum | ArduinoConnectionScalarFieldEnum[]
  }

  /**
   * ArduinoConnection create
   */
  export type ArduinoConnectionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArduinoConnection
     */
    select?: ArduinoConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArduinoConnection
     */
    omit?: ArduinoConnectionOmit<ExtArgs> | null
    /**
     * The data needed to create a ArduinoConnection.
     */
    data: XOR<ArduinoConnectionCreateInput, ArduinoConnectionUncheckedCreateInput>
  }

  /**
   * ArduinoConnection createMany
   */
  export type ArduinoConnectionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ArduinoConnections.
     */
    data: ArduinoConnectionCreateManyInput | ArduinoConnectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ArduinoConnection createManyAndReturn
   */
  export type ArduinoConnectionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArduinoConnection
     */
    select?: ArduinoConnectionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ArduinoConnection
     */
    omit?: ArduinoConnectionOmit<ExtArgs> | null
    /**
     * The data used to create many ArduinoConnections.
     */
    data: ArduinoConnectionCreateManyInput | ArduinoConnectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ArduinoConnection update
   */
  export type ArduinoConnectionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArduinoConnection
     */
    select?: ArduinoConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArduinoConnection
     */
    omit?: ArduinoConnectionOmit<ExtArgs> | null
    /**
     * The data needed to update a ArduinoConnection.
     */
    data: XOR<ArduinoConnectionUpdateInput, ArduinoConnectionUncheckedUpdateInput>
    /**
     * Choose, which ArduinoConnection to update.
     */
    where: ArduinoConnectionWhereUniqueInput
  }

  /**
   * ArduinoConnection updateMany
   */
  export type ArduinoConnectionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ArduinoConnections.
     */
    data: XOR<ArduinoConnectionUpdateManyMutationInput, ArduinoConnectionUncheckedUpdateManyInput>
    /**
     * Filter which ArduinoConnections to update
     */
    where?: ArduinoConnectionWhereInput
    /**
     * Limit how many ArduinoConnections to update.
     */
    limit?: number
  }

  /**
   * ArduinoConnection updateManyAndReturn
   */
  export type ArduinoConnectionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArduinoConnection
     */
    select?: ArduinoConnectionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ArduinoConnection
     */
    omit?: ArduinoConnectionOmit<ExtArgs> | null
    /**
     * The data used to update ArduinoConnections.
     */
    data: XOR<ArduinoConnectionUpdateManyMutationInput, ArduinoConnectionUncheckedUpdateManyInput>
    /**
     * Filter which ArduinoConnections to update
     */
    where?: ArduinoConnectionWhereInput
    /**
     * Limit how many ArduinoConnections to update.
     */
    limit?: number
  }

  /**
   * ArduinoConnection upsert
   */
  export type ArduinoConnectionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArduinoConnection
     */
    select?: ArduinoConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArduinoConnection
     */
    omit?: ArduinoConnectionOmit<ExtArgs> | null
    /**
     * The filter to search for the ArduinoConnection to update in case it exists.
     */
    where: ArduinoConnectionWhereUniqueInput
    /**
     * In case the ArduinoConnection found by the `where` argument doesn't exist, create a new ArduinoConnection with this data.
     */
    create: XOR<ArduinoConnectionCreateInput, ArduinoConnectionUncheckedCreateInput>
    /**
     * In case the ArduinoConnection was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArduinoConnectionUpdateInput, ArduinoConnectionUncheckedUpdateInput>
  }

  /**
   * ArduinoConnection delete
   */
  export type ArduinoConnectionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArduinoConnection
     */
    select?: ArduinoConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArduinoConnection
     */
    omit?: ArduinoConnectionOmit<ExtArgs> | null
    /**
     * Filter which ArduinoConnection to delete.
     */
    where: ArduinoConnectionWhereUniqueInput
  }

  /**
   * ArduinoConnection deleteMany
   */
  export type ArduinoConnectionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArduinoConnections to delete
     */
    where?: ArduinoConnectionWhereInput
    /**
     * Limit how many ArduinoConnections to delete.
     */
    limit?: number
  }

  /**
   * ArduinoConnection without action
   */
  export type ArduinoConnectionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArduinoConnection
     */
    select?: ArduinoConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArduinoConnection
     */
    omit?: ArduinoConnectionOmit<ExtArgs> | null
  }


  /**
   * Model RvmLocation
   */

  export type AggregateRvmLocation = {
    _count: RvmLocationCountAggregateOutputType | null
    _avg: RvmLocationAvgAggregateOutputType | null
    _sum: RvmLocationSumAggregateOutputType | null
    _min: RvmLocationMinAggregateOutputType | null
    _max: RvmLocationMaxAggregateOutputType | null
  }

  export type RvmLocationAvgAggregateOutputType = {
    id: number | null
    capacity: number | null
    currentStock: number | null
  }

  export type RvmLocationSumAggregateOutputType = {
    id: number | null
    capacity: number | null
    currentStock: number | null
  }

  export type RvmLocationMinAggregateOutputType = {
    id: number | null
    name: string | null
    address: string | null
    capacity: number | null
    currentStock: number | null
    capacityStatus: string | null
    operationalHours: string | null
    contactNumber: string | null
    status: string | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RvmLocationMaxAggregateOutputType = {
    id: number | null
    name: string | null
    address: string | null
    capacity: number | null
    currentStock: number | null
    capacityStatus: string | null
    operationalHours: string | null
    contactNumber: string | null
    status: string | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RvmLocationCountAggregateOutputType = {
    id: number
    name: number
    address: number
    position: number
    capacity: number
    currentStock: number
    capacityStatus: number
    operationalHours: number
    contactNumber: number
    status: number
    image: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RvmLocationAvgAggregateInputType = {
    id?: true
    capacity?: true
    currentStock?: true
  }

  export type RvmLocationSumAggregateInputType = {
    id?: true
    capacity?: true
    currentStock?: true
  }

  export type RvmLocationMinAggregateInputType = {
    id?: true
    name?: true
    address?: true
    capacity?: true
    currentStock?: true
    capacityStatus?: true
    operationalHours?: true
    contactNumber?: true
    status?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RvmLocationMaxAggregateInputType = {
    id?: true
    name?: true
    address?: true
    capacity?: true
    currentStock?: true
    capacityStatus?: true
    operationalHours?: true
    contactNumber?: true
    status?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RvmLocationCountAggregateInputType = {
    id?: true
    name?: true
    address?: true
    position?: true
    capacity?: true
    currentStock?: true
    capacityStatus?: true
    operationalHours?: true
    contactNumber?: true
    status?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RvmLocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RvmLocation to aggregate.
     */
    where?: RvmLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RvmLocations to fetch.
     */
    orderBy?: RvmLocationOrderByWithRelationInput | RvmLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RvmLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RvmLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RvmLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RvmLocations
    **/
    _count?: true | RvmLocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RvmLocationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RvmLocationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RvmLocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RvmLocationMaxAggregateInputType
  }

  export type GetRvmLocationAggregateType<T extends RvmLocationAggregateArgs> = {
        [P in keyof T & keyof AggregateRvmLocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRvmLocation[P]>
      : GetScalarType<T[P], AggregateRvmLocation[P]>
  }




  export type RvmLocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RvmLocationWhereInput
    orderBy?: RvmLocationOrderByWithAggregationInput | RvmLocationOrderByWithAggregationInput[]
    by: RvmLocationScalarFieldEnum[] | RvmLocationScalarFieldEnum
    having?: RvmLocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RvmLocationCountAggregateInputType | true
    _avg?: RvmLocationAvgAggregateInputType
    _sum?: RvmLocationSumAggregateInputType
    _min?: RvmLocationMinAggregateInputType
    _max?: RvmLocationMaxAggregateInputType
  }

  export type RvmLocationGroupByOutputType = {
    id: number
    name: string
    address: string | null
    position: JsonValue
    capacity: number
    currentStock: number
    capacityStatus: string
    operationalHours: string
    contactNumber: string | null
    status: string
    image: string | null
    createdAt: Date
    updatedAt: Date
    _count: RvmLocationCountAggregateOutputType | null
    _avg: RvmLocationAvgAggregateOutputType | null
    _sum: RvmLocationSumAggregateOutputType | null
    _min: RvmLocationMinAggregateOutputType | null
    _max: RvmLocationMaxAggregateOutputType | null
  }

  type GetRvmLocationGroupByPayload<T extends RvmLocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RvmLocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RvmLocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RvmLocationGroupByOutputType[P]>
            : GetScalarType<T[P], RvmLocationGroupByOutputType[P]>
        }
      >
    >


  export type RvmLocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    position?: boolean
    capacity?: boolean
    currentStock?: boolean
    capacityStatus?: boolean
    operationalHours?: boolean
    contactNumber?: boolean
    status?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["rvmLocation"]>

  export type RvmLocationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    position?: boolean
    capacity?: boolean
    currentStock?: boolean
    capacityStatus?: boolean
    operationalHours?: boolean
    contactNumber?: boolean
    status?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["rvmLocation"]>

  export type RvmLocationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    position?: boolean
    capacity?: boolean
    currentStock?: boolean
    capacityStatus?: boolean
    operationalHours?: boolean
    contactNumber?: boolean
    status?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["rvmLocation"]>

  export type RvmLocationSelectScalar = {
    id?: boolean
    name?: boolean
    address?: boolean
    position?: boolean
    capacity?: boolean
    currentStock?: boolean
    capacityStatus?: boolean
    operationalHours?: boolean
    contactNumber?: boolean
    status?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RvmLocationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "address" | "position" | "capacity" | "currentStock" | "capacityStatus" | "operationalHours" | "contactNumber" | "status" | "image" | "createdAt" | "updatedAt", ExtArgs["result"]["rvmLocation"]>

  export type $RvmLocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RvmLocation"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      address: string | null
      position: Prisma.JsonValue
      capacity: number
      currentStock: number
      capacityStatus: string
      operationalHours: string
      contactNumber: string | null
      status: string
      image: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["rvmLocation"]>
    composites: {}
  }

  type RvmLocationGetPayload<S extends boolean | null | undefined | RvmLocationDefaultArgs> = $Result.GetResult<Prisma.$RvmLocationPayload, S>

  type RvmLocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RvmLocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RvmLocationCountAggregateInputType | true
    }

  export interface RvmLocationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RvmLocation'], meta: { name: 'RvmLocation' } }
    /**
     * Find zero or one RvmLocation that matches the filter.
     * @param {RvmLocationFindUniqueArgs} args - Arguments to find a RvmLocation
     * @example
     * // Get one RvmLocation
     * const rvmLocation = await prisma.rvmLocation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RvmLocationFindUniqueArgs>(args: SelectSubset<T, RvmLocationFindUniqueArgs<ExtArgs>>): Prisma__RvmLocationClient<$Result.GetResult<Prisma.$RvmLocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RvmLocation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RvmLocationFindUniqueOrThrowArgs} args - Arguments to find a RvmLocation
     * @example
     * // Get one RvmLocation
     * const rvmLocation = await prisma.rvmLocation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RvmLocationFindUniqueOrThrowArgs>(args: SelectSubset<T, RvmLocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RvmLocationClient<$Result.GetResult<Prisma.$RvmLocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RvmLocation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RvmLocationFindFirstArgs} args - Arguments to find a RvmLocation
     * @example
     * // Get one RvmLocation
     * const rvmLocation = await prisma.rvmLocation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RvmLocationFindFirstArgs>(args?: SelectSubset<T, RvmLocationFindFirstArgs<ExtArgs>>): Prisma__RvmLocationClient<$Result.GetResult<Prisma.$RvmLocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RvmLocation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RvmLocationFindFirstOrThrowArgs} args - Arguments to find a RvmLocation
     * @example
     * // Get one RvmLocation
     * const rvmLocation = await prisma.rvmLocation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RvmLocationFindFirstOrThrowArgs>(args?: SelectSubset<T, RvmLocationFindFirstOrThrowArgs<ExtArgs>>): Prisma__RvmLocationClient<$Result.GetResult<Prisma.$RvmLocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RvmLocations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RvmLocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RvmLocations
     * const rvmLocations = await prisma.rvmLocation.findMany()
     * 
     * // Get first 10 RvmLocations
     * const rvmLocations = await prisma.rvmLocation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rvmLocationWithIdOnly = await prisma.rvmLocation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RvmLocationFindManyArgs>(args?: SelectSubset<T, RvmLocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RvmLocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RvmLocation.
     * @param {RvmLocationCreateArgs} args - Arguments to create a RvmLocation.
     * @example
     * // Create one RvmLocation
     * const RvmLocation = await prisma.rvmLocation.create({
     *   data: {
     *     // ... data to create a RvmLocation
     *   }
     * })
     * 
     */
    create<T extends RvmLocationCreateArgs>(args: SelectSubset<T, RvmLocationCreateArgs<ExtArgs>>): Prisma__RvmLocationClient<$Result.GetResult<Prisma.$RvmLocationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RvmLocations.
     * @param {RvmLocationCreateManyArgs} args - Arguments to create many RvmLocations.
     * @example
     * // Create many RvmLocations
     * const rvmLocation = await prisma.rvmLocation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RvmLocationCreateManyArgs>(args?: SelectSubset<T, RvmLocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RvmLocations and returns the data saved in the database.
     * @param {RvmLocationCreateManyAndReturnArgs} args - Arguments to create many RvmLocations.
     * @example
     * // Create many RvmLocations
     * const rvmLocation = await prisma.rvmLocation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RvmLocations and only return the `id`
     * const rvmLocationWithIdOnly = await prisma.rvmLocation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RvmLocationCreateManyAndReturnArgs>(args?: SelectSubset<T, RvmLocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RvmLocationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RvmLocation.
     * @param {RvmLocationDeleteArgs} args - Arguments to delete one RvmLocation.
     * @example
     * // Delete one RvmLocation
     * const RvmLocation = await prisma.rvmLocation.delete({
     *   where: {
     *     // ... filter to delete one RvmLocation
     *   }
     * })
     * 
     */
    delete<T extends RvmLocationDeleteArgs>(args: SelectSubset<T, RvmLocationDeleteArgs<ExtArgs>>): Prisma__RvmLocationClient<$Result.GetResult<Prisma.$RvmLocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RvmLocation.
     * @param {RvmLocationUpdateArgs} args - Arguments to update one RvmLocation.
     * @example
     * // Update one RvmLocation
     * const rvmLocation = await prisma.rvmLocation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RvmLocationUpdateArgs>(args: SelectSubset<T, RvmLocationUpdateArgs<ExtArgs>>): Prisma__RvmLocationClient<$Result.GetResult<Prisma.$RvmLocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RvmLocations.
     * @param {RvmLocationDeleteManyArgs} args - Arguments to filter RvmLocations to delete.
     * @example
     * // Delete a few RvmLocations
     * const { count } = await prisma.rvmLocation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RvmLocationDeleteManyArgs>(args?: SelectSubset<T, RvmLocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RvmLocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RvmLocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RvmLocations
     * const rvmLocation = await prisma.rvmLocation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RvmLocationUpdateManyArgs>(args: SelectSubset<T, RvmLocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RvmLocations and returns the data updated in the database.
     * @param {RvmLocationUpdateManyAndReturnArgs} args - Arguments to update many RvmLocations.
     * @example
     * // Update many RvmLocations
     * const rvmLocation = await prisma.rvmLocation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RvmLocations and only return the `id`
     * const rvmLocationWithIdOnly = await prisma.rvmLocation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RvmLocationUpdateManyAndReturnArgs>(args: SelectSubset<T, RvmLocationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RvmLocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RvmLocation.
     * @param {RvmLocationUpsertArgs} args - Arguments to update or create a RvmLocation.
     * @example
     * // Update or create a RvmLocation
     * const rvmLocation = await prisma.rvmLocation.upsert({
     *   create: {
     *     // ... data to create a RvmLocation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RvmLocation we want to update
     *   }
     * })
     */
    upsert<T extends RvmLocationUpsertArgs>(args: SelectSubset<T, RvmLocationUpsertArgs<ExtArgs>>): Prisma__RvmLocationClient<$Result.GetResult<Prisma.$RvmLocationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RvmLocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RvmLocationCountArgs} args - Arguments to filter RvmLocations to count.
     * @example
     * // Count the number of RvmLocations
     * const count = await prisma.rvmLocation.count({
     *   where: {
     *     // ... the filter for the RvmLocations we want to count
     *   }
     * })
    **/
    count<T extends RvmLocationCountArgs>(
      args?: Subset<T, RvmLocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RvmLocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RvmLocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RvmLocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RvmLocationAggregateArgs>(args: Subset<T, RvmLocationAggregateArgs>): Prisma.PrismaPromise<GetRvmLocationAggregateType<T>>

    /**
     * Group by RvmLocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RvmLocationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RvmLocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RvmLocationGroupByArgs['orderBy'] }
        : { orderBy?: RvmLocationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RvmLocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRvmLocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RvmLocation model
   */
  readonly fields: RvmLocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RvmLocation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RvmLocationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RvmLocation model
   */
  interface RvmLocationFieldRefs {
    readonly id: FieldRef<"RvmLocation", 'Int'>
    readonly name: FieldRef<"RvmLocation", 'String'>
    readonly address: FieldRef<"RvmLocation", 'String'>
    readonly position: FieldRef<"RvmLocation", 'Json'>
    readonly capacity: FieldRef<"RvmLocation", 'Int'>
    readonly currentStock: FieldRef<"RvmLocation", 'Int'>
    readonly capacityStatus: FieldRef<"RvmLocation", 'String'>
    readonly operationalHours: FieldRef<"RvmLocation", 'String'>
    readonly contactNumber: FieldRef<"RvmLocation", 'String'>
    readonly status: FieldRef<"RvmLocation", 'String'>
    readonly image: FieldRef<"RvmLocation", 'String'>
    readonly createdAt: FieldRef<"RvmLocation", 'DateTime'>
    readonly updatedAt: FieldRef<"RvmLocation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RvmLocation findUnique
   */
  export type RvmLocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RvmLocation
     */
    select?: RvmLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RvmLocation
     */
    omit?: RvmLocationOmit<ExtArgs> | null
    /**
     * Filter, which RvmLocation to fetch.
     */
    where: RvmLocationWhereUniqueInput
  }

  /**
   * RvmLocation findUniqueOrThrow
   */
  export type RvmLocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RvmLocation
     */
    select?: RvmLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RvmLocation
     */
    omit?: RvmLocationOmit<ExtArgs> | null
    /**
     * Filter, which RvmLocation to fetch.
     */
    where: RvmLocationWhereUniqueInput
  }

  /**
   * RvmLocation findFirst
   */
  export type RvmLocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RvmLocation
     */
    select?: RvmLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RvmLocation
     */
    omit?: RvmLocationOmit<ExtArgs> | null
    /**
     * Filter, which RvmLocation to fetch.
     */
    where?: RvmLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RvmLocations to fetch.
     */
    orderBy?: RvmLocationOrderByWithRelationInput | RvmLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RvmLocations.
     */
    cursor?: RvmLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RvmLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RvmLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RvmLocations.
     */
    distinct?: RvmLocationScalarFieldEnum | RvmLocationScalarFieldEnum[]
  }

  /**
   * RvmLocation findFirstOrThrow
   */
  export type RvmLocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RvmLocation
     */
    select?: RvmLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RvmLocation
     */
    omit?: RvmLocationOmit<ExtArgs> | null
    /**
     * Filter, which RvmLocation to fetch.
     */
    where?: RvmLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RvmLocations to fetch.
     */
    orderBy?: RvmLocationOrderByWithRelationInput | RvmLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RvmLocations.
     */
    cursor?: RvmLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RvmLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RvmLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RvmLocations.
     */
    distinct?: RvmLocationScalarFieldEnum | RvmLocationScalarFieldEnum[]
  }

  /**
   * RvmLocation findMany
   */
  export type RvmLocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RvmLocation
     */
    select?: RvmLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RvmLocation
     */
    omit?: RvmLocationOmit<ExtArgs> | null
    /**
     * Filter, which RvmLocations to fetch.
     */
    where?: RvmLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RvmLocations to fetch.
     */
    orderBy?: RvmLocationOrderByWithRelationInput | RvmLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RvmLocations.
     */
    cursor?: RvmLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RvmLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RvmLocations.
     */
    skip?: number
    distinct?: RvmLocationScalarFieldEnum | RvmLocationScalarFieldEnum[]
  }

  /**
   * RvmLocation create
   */
  export type RvmLocationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RvmLocation
     */
    select?: RvmLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RvmLocation
     */
    omit?: RvmLocationOmit<ExtArgs> | null
    /**
     * The data needed to create a RvmLocation.
     */
    data: XOR<RvmLocationCreateInput, RvmLocationUncheckedCreateInput>
  }

  /**
   * RvmLocation createMany
   */
  export type RvmLocationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RvmLocations.
     */
    data: RvmLocationCreateManyInput | RvmLocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RvmLocation createManyAndReturn
   */
  export type RvmLocationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RvmLocation
     */
    select?: RvmLocationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RvmLocation
     */
    omit?: RvmLocationOmit<ExtArgs> | null
    /**
     * The data used to create many RvmLocations.
     */
    data: RvmLocationCreateManyInput | RvmLocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RvmLocation update
   */
  export type RvmLocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RvmLocation
     */
    select?: RvmLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RvmLocation
     */
    omit?: RvmLocationOmit<ExtArgs> | null
    /**
     * The data needed to update a RvmLocation.
     */
    data: XOR<RvmLocationUpdateInput, RvmLocationUncheckedUpdateInput>
    /**
     * Choose, which RvmLocation to update.
     */
    where: RvmLocationWhereUniqueInput
  }

  /**
   * RvmLocation updateMany
   */
  export type RvmLocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RvmLocations.
     */
    data: XOR<RvmLocationUpdateManyMutationInput, RvmLocationUncheckedUpdateManyInput>
    /**
     * Filter which RvmLocations to update
     */
    where?: RvmLocationWhereInput
    /**
     * Limit how many RvmLocations to update.
     */
    limit?: number
  }

  /**
   * RvmLocation updateManyAndReturn
   */
  export type RvmLocationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RvmLocation
     */
    select?: RvmLocationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RvmLocation
     */
    omit?: RvmLocationOmit<ExtArgs> | null
    /**
     * The data used to update RvmLocations.
     */
    data: XOR<RvmLocationUpdateManyMutationInput, RvmLocationUncheckedUpdateManyInput>
    /**
     * Filter which RvmLocations to update
     */
    where?: RvmLocationWhereInput
    /**
     * Limit how many RvmLocations to update.
     */
    limit?: number
  }

  /**
   * RvmLocation upsert
   */
  export type RvmLocationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RvmLocation
     */
    select?: RvmLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RvmLocation
     */
    omit?: RvmLocationOmit<ExtArgs> | null
    /**
     * The filter to search for the RvmLocation to update in case it exists.
     */
    where: RvmLocationWhereUniqueInput
    /**
     * In case the RvmLocation found by the `where` argument doesn't exist, create a new RvmLocation with this data.
     */
    create: XOR<RvmLocationCreateInput, RvmLocationUncheckedCreateInput>
    /**
     * In case the RvmLocation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RvmLocationUpdateInput, RvmLocationUncheckedUpdateInput>
  }

  /**
   * RvmLocation delete
   */
  export type RvmLocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RvmLocation
     */
    select?: RvmLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RvmLocation
     */
    omit?: RvmLocationOmit<ExtArgs> | null
    /**
     * Filter which RvmLocation to delete.
     */
    where: RvmLocationWhereUniqueInput
  }

  /**
   * RvmLocation deleteMany
   */
  export type RvmLocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RvmLocations to delete
     */
    where?: RvmLocationWhereInput
    /**
     * Limit how many RvmLocations to delete.
     */
    limit?: number
  }

  /**
   * RvmLocation without action
   */
  export type RvmLocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RvmLocation
     */
    select?: RvmLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RvmLocation
     */
    omit?: RvmLocationOmit<ExtArgs> | null
  }


  /**
   * Model BottleCount
   */

  export type AggregateBottleCount = {
    _count: BottleCountCountAggregateOutputType | null
    _avg: BottleCountAvgAggregateOutputType | null
    _sum: BottleCountSumAggregateOutputType | null
    _min: BottleCountMinAggregateOutputType | null
    _max: BottleCountMaxAggregateOutputType | null
  }

  export type BottleCountAvgAggregateOutputType = {
    id: number | null
    count: number | null
    distance: number | null
  }

  export type BottleCountSumAggregateOutputType = {
    id: number | null
    count: number | null
    distance: number | null
  }

  export type BottleCountMinAggregateOutputType = {
    id: number | null
    deviceId: string | null
    count: number | null
    distance: number | null
    source: string | null
    timestamp: Date | null
    userBottleCountId: string | null
  }

  export type BottleCountMaxAggregateOutputType = {
    id: number | null
    deviceId: string | null
    count: number | null
    distance: number | null
    source: string | null
    timestamp: Date | null
    userBottleCountId: string | null
  }

  export type BottleCountCountAggregateOutputType = {
    id: number
    deviceId: number
    count: number
    distance: number
    source: number
    timestamp: number
    userBottleCountId: number
    _all: number
  }


  export type BottleCountAvgAggregateInputType = {
    id?: true
    count?: true
    distance?: true
  }

  export type BottleCountSumAggregateInputType = {
    id?: true
    count?: true
    distance?: true
  }

  export type BottleCountMinAggregateInputType = {
    id?: true
    deviceId?: true
    count?: true
    distance?: true
    source?: true
    timestamp?: true
    userBottleCountId?: true
  }

  export type BottleCountMaxAggregateInputType = {
    id?: true
    deviceId?: true
    count?: true
    distance?: true
    source?: true
    timestamp?: true
    userBottleCountId?: true
  }

  export type BottleCountCountAggregateInputType = {
    id?: true
    deviceId?: true
    count?: true
    distance?: true
    source?: true
    timestamp?: true
    userBottleCountId?: true
    _all?: true
  }

  export type BottleCountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BottleCount to aggregate.
     */
    where?: BottleCountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BottleCounts to fetch.
     */
    orderBy?: BottleCountOrderByWithRelationInput | BottleCountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BottleCountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BottleCounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BottleCounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BottleCounts
    **/
    _count?: true | BottleCountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BottleCountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BottleCountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BottleCountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BottleCountMaxAggregateInputType
  }

  export type GetBottleCountAggregateType<T extends BottleCountAggregateArgs> = {
        [P in keyof T & keyof AggregateBottleCount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBottleCount[P]>
      : GetScalarType<T[P], AggregateBottleCount[P]>
  }




  export type BottleCountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BottleCountWhereInput
    orderBy?: BottleCountOrderByWithAggregationInput | BottleCountOrderByWithAggregationInput[]
    by: BottleCountScalarFieldEnum[] | BottleCountScalarFieldEnum
    having?: BottleCountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BottleCountCountAggregateInputType | true
    _avg?: BottleCountAvgAggregateInputType
    _sum?: BottleCountSumAggregateInputType
    _min?: BottleCountMinAggregateInputType
    _max?: BottleCountMaxAggregateInputType
  }

  export type BottleCountGroupByOutputType = {
    id: number
    deviceId: string
    count: number
    distance: number | null
    source: string
    timestamp: Date
    userBottleCountId: string | null
    _count: BottleCountCountAggregateOutputType | null
    _avg: BottleCountAvgAggregateOutputType | null
    _sum: BottleCountSumAggregateOutputType | null
    _min: BottleCountMinAggregateOutputType | null
    _max: BottleCountMaxAggregateOutputType | null
  }

  type GetBottleCountGroupByPayload<T extends BottleCountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BottleCountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BottleCountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BottleCountGroupByOutputType[P]>
            : GetScalarType<T[P], BottleCountGroupByOutputType[P]>
        }
      >
    >


  export type BottleCountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    deviceId?: boolean
    count?: boolean
    distance?: boolean
    source?: boolean
    timestamp?: boolean
    userBottleCountId?: boolean
    userBottleCount?: boolean | BottleCount$userBottleCountArgs<ExtArgs>
  }, ExtArgs["result"]["bottleCount"]>

  export type BottleCountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    deviceId?: boolean
    count?: boolean
    distance?: boolean
    source?: boolean
    timestamp?: boolean
    userBottleCountId?: boolean
    userBottleCount?: boolean | BottleCount$userBottleCountArgs<ExtArgs>
  }, ExtArgs["result"]["bottleCount"]>

  export type BottleCountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    deviceId?: boolean
    count?: boolean
    distance?: boolean
    source?: boolean
    timestamp?: boolean
    userBottleCountId?: boolean
    userBottleCount?: boolean | BottleCount$userBottleCountArgs<ExtArgs>
  }, ExtArgs["result"]["bottleCount"]>

  export type BottleCountSelectScalar = {
    id?: boolean
    deviceId?: boolean
    count?: boolean
    distance?: boolean
    source?: boolean
    timestamp?: boolean
    userBottleCountId?: boolean
  }

  export type BottleCountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "deviceId" | "count" | "distance" | "source" | "timestamp" | "userBottleCountId", ExtArgs["result"]["bottleCount"]>
  export type BottleCountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userBottleCount?: boolean | BottleCount$userBottleCountArgs<ExtArgs>
  }
  export type BottleCountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userBottleCount?: boolean | BottleCount$userBottleCountArgs<ExtArgs>
  }
  export type BottleCountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userBottleCount?: boolean | BottleCount$userBottleCountArgs<ExtArgs>
  }

  export type $BottleCountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BottleCount"
    objects: {
      userBottleCount: Prisma.$UserBottleCountPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      deviceId: string
      count: number
      distance: number | null
      source: string
      timestamp: Date
      userBottleCountId: string | null
    }, ExtArgs["result"]["bottleCount"]>
    composites: {}
  }

  type BottleCountGetPayload<S extends boolean | null | undefined | BottleCountDefaultArgs> = $Result.GetResult<Prisma.$BottleCountPayload, S>

  type BottleCountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BottleCountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BottleCountCountAggregateInputType | true
    }

  export interface BottleCountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BottleCount'], meta: { name: 'BottleCount' } }
    /**
     * Find zero or one BottleCount that matches the filter.
     * @param {BottleCountFindUniqueArgs} args - Arguments to find a BottleCount
     * @example
     * // Get one BottleCount
     * const bottleCount = await prisma.bottleCount.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BottleCountFindUniqueArgs>(args: SelectSubset<T, BottleCountFindUniqueArgs<ExtArgs>>): Prisma__BottleCountClient<$Result.GetResult<Prisma.$BottleCountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BottleCount that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BottleCountFindUniqueOrThrowArgs} args - Arguments to find a BottleCount
     * @example
     * // Get one BottleCount
     * const bottleCount = await prisma.bottleCount.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BottleCountFindUniqueOrThrowArgs>(args: SelectSubset<T, BottleCountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BottleCountClient<$Result.GetResult<Prisma.$BottleCountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BottleCount that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BottleCountFindFirstArgs} args - Arguments to find a BottleCount
     * @example
     * // Get one BottleCount
     * const bottleCount = await prisma.bottleCount.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BottleCountFindFirstArgs>(args?: SelectSubset<T, BottleCountFindFirstArgs<ExtArgs>>): Prisma__BottleCountClient<$Result.GetResult<Prisma.$BottleCountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BottleCount that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BottleCountFindFirstOrThrowArgs} args - Arguments to find a BottleCount
     * @example
     * // Get one BottleCount
     * const bottleCount = await prisma.bottleCount.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BottleCountFindFirstOrThrowArgs>(args?: SelectSubset<T, BottleCountFindFirstOrThrowArgs<ExtArgs>>): Prisma__BottleCountClient<$Result.GetResult<Prisma.$BottleCountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BottleCounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BottleCountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BottleCounts
     * const bottleCounts = await prisma.bottleCount.findMany()
     * 
     * // Get first 10 BottleCounts
     * const bottleCounts = await prisma.bottleCount.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bottleCountWithIdOnly = await prisma.bottleCount.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BottleCountFindManyArgs>(args?: SelectSubset<T, BottleCountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BottleCountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BottleCount.
     * @param {BottleCountCreateArgs} args - Arguments to create a BottleCount.
     * @example
     * // Create one BottleCount
     * const BottleCount = await prisma.bottleCount.create({
     *   data: {
     *     // ... data to create a BottleCount
     *   }
     * })
     * 
     */
    create<T extends BottleCountCreateArgs>(args: SelectSubset<T, BottleCountCreateArgs<ExtArgs>>): Prisma__BottleCountClient<$Result.GetResult<Prisma.$BottleCountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BottleCounts.
     * @param {BottleCountCreateManyArgs} args - Arguments to create many BottleCounts.
     * @example
     * // Create many BottleCounts
     * const bottleCount = await prisma.bottleCount.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BottleCountCreateManyArgs>(args?: SelectSubset<T, BottleCountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BottleCounts and returns the data saved in the database.
     * @param {BottleCountCreateManyAndReturnArgs} args - Arguments to create many BottleCounts.
     * @example
     * // Create many BottleCounts
     * const bottleCount = await prisma.bottleCount.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BottleCounts and only return the `id`
     * const bottleCountWithIdOnly = await prisma.bottleCount.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BottleCountCreateManyAndReturnArgs>(args?: SelectSubset<T, BottleCountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BottleCountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BottleCount.
     * @param {BottleCountDeleteArgs} args - Arguments to delete one BottleCount.
     * @example
     * // Delete one BottleCount
     * const BottleCount = await prisma.bottleCount.delete({
     *   where: {
     *     // ... filter to delete one BottleCount
     *   }
     * })
     * 
     */
    delete<T extends BottleCountDeleteArgs>(args: SelectSubset<T, BottleCountDeleteArgs<ExtArgs>>): Prisma__BottleCountClient<$Result.GetResult<Prisma.$BottleCountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BottleCount.
     * @param {BottleCountUpdateArgs} args - Arguments to update one BottleCount.
     * @example
     * // Update one BottleCount
     * const bottleCount = await prisma.bottleCount.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BottleCountUpdateArgs>(args: SelectSubset<T, BottleCountUpdateArgs<ExtArgs>>): Prisma__BottleCountClient<$Result.GetResult<Prisma.$BottleCountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BottleCounts.
     * @param {BottleCountDeleteManyArgs} args - Arguments to filter BottleCounts to delete.
     * @example
     * // Delete a few BottleCounts
     * const { count } = await prisma.bottleCount.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BottleCountDeleteManyArgs>(args?: SelectSubset<T, BottleCountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BottleCounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BottleCountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BottleCounts
     * const bottleCount = await prisma.bottleCount.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BottleCountUpdateManyArgs>(args: SelectSubset<T, BottleCountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BottleCounts and returns the data updated in the database.
     * @param {BottleCountUpdateManyAndReturnArgs} args - Arguments to update many BottleCounts.
     * @example
     * // Update many BottleCounts
     * const bottleCount = await prisma.bottleCount.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BottleCounts and only return the `id`
     * const bottleCountWithIdOnly = await prisma.bottleCount.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BottleCountUpdateManyAndReturnArgs>(args: SelectSubset<T, BottleCountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BottleCountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BottleCount.
     * @param {BottleCountUpsertArgs} args - Arguments to update or create a BottleCount.
     * @example
     * // Update or create a BottleCount
     * const bottleCount = await prisma.bottleCount.upsert({
     *   create: {
     *     // ... data to create a BottleCount
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BottleCount we want to update
     *   }
     * })
     */
    upsert<T extends BottleCountUpsertArgs>(args: SelectSubset<T, BottleCountUpsertArgs<ExtArgs>>): Prisma__BottleCountClient<$Result.GetResult<Prisma.$BottleCountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BottleCounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BottleCountCountArgs} args - Arguments to filter BottleCounts to count.
     * @example
     * // Count the number of BottleCounts
     * const count = await prisma.bottleCount.count({
     *   where: {
     *     // ... the filter for the BottleCounts we want to count
     *   }
     * })
    **/
    count<T extends BottleCountCountArgs>(
      args?: Subset<T, BottleCountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BottleCountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BottleCount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BottleCountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BottleCountAggregateArgs>(args: Subset<T, BottleCountAggregateArgs>): Prisma.PrismaPromise<GetBottleCountAggregateType<T>>

    /**
     * Group by BottleCount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BottleCountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BottleCountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BottleCountGroupByArgs['orderBy'] }
        : { orderBy?: BottleCountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BottleCountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBottleCountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BottleCount model
   */
  readonly fields: BottleCountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BottleCount.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BottleCountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    userBottleCount<T extends BottleCount$userBottleCountArgs<ExtArgs> = {}>(args?: Subset<T, BottleCount$userBottleCountArgs<ExtArgs>>): Prisma__UserBottleCountClient<$Result.GetResult<Prisma.$UserBottleCountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BottleCount model
   */
  interface BottleCountFieldRefs {
    readonly id: FieldRef<"BottleCount", 'Int'>
    readonly deviceId: FieldRef<"BottleCount", 'String'>
    readonly count: FieldRef<"BottleCount", 'Int'>
    readonly distance: FieldRef<"BottleCount", 'Float'>
    readonly source: FieldRef<"BottleCount", 'String'>
    readonly timestamp: FieldRef<"BottleCount", 'DateTime'>
    readonly userBottleCountId: FieldRef<"BottleCount", 'String'>
  }
    

  // Custom InputTypes
  /**
   * BottleCount findUnique
   */
  export type BottleCountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BottleCount
     */
    select?: BottleCountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BottleCount
     */
    omit?: BottleCountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BottleCountInclude<ExtArgs> | null
    /**
     * Filter, which BottleCount to fetch.
     */
    where: BottleCountWhereUniqueInput
  }

  /**
   * BottleCount findUniqueOrThrow
   */
  export type BottleCountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BottleCount
     */
    select?: BottleCountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BottleCount
     */
    omit?: BottleCountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BottleCountInclude<ExtArgs> | null
    /**
     * Filter, which BottleCount to fetch.
     */
    where: BottleCountWhereUniqueInput
  }

  /**
   * BottleCount findFirst
   */
  export type BottleCountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BottleCount
     */
    select?: BottleCountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BottleCount
     */
    omit?: BottleCountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BottleCountInclude<ExtArgs> | null
    /**
     * Filter, which BottleCount to fetch.
     */
    where?: BottleCountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BottleCounts to fetch.
     */
    orderBy?: BottleCountOrderByWithRelationInput | BottleCountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BottleCounts.
     */
    cursor?: BottleCountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BottleCounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BottleCounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BottleCounts.
     */
    distinct?: BottleCountScalarFieldEnum | BottleCountScalarFieldEnum[]
  }

  /**
   * BottleCount findFirstOrThrow
   */
  export type BottleCountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BottleCount
     */
    select?: BottleCountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BottleCount
     */
    omit?: BottleCountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BottleCountInclude<ExtArgs> | null
    /**
     * Filter, which BottleCount to fetch.
     */
    where?: BottleCountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BottleCounts to fetch.
     */
    orderBy?: BottleCountOrderByWithRelationInput | BottleCountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BottleCounts.
     */
    cursor?: BottleCountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BottleCounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BottleCounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BottleCounts.
     */
    distinct?: BottleCountScalarFieldEnum | BottleCountScalarFieldEnum[]
  }

  /**
   * BottleCount findMany
   */
  export type BottleCountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BottleCount
     */
    select?: BottleCountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BottleCount
     */
    omit?: BottleCountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BottleCountInclude<ExtArgs> | null
    /**
     * Filter, which BottleCounts to fetch.
     */
    where?: BottleCountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BottleCounts to fetch.
     */
    orderBy?: BottleCountOrderByWithRelationInput | BottleCountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BottleCounts.
     */
    cursor?: BottleCountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BottleCounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BottleCounts.
     */
    skip?: number
    distinct?: BottleCountScalarFieldEnum | BottleCountScalarFieldEnum[]
  }

  /**
   * BottleCount create
   */
  export type BottleCountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BottleCount
     */
    select?: BottleCountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BottleCount
     */
    omit?: BottleCountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BottleCountInclude<ExtArgs> | null
    /**
     * The data needed to create a BottleCount.
     */
    data: XOR<BottleCountCreateInput, BottleCountUncheckedCreateInput>
  }

  /**
   * BottleCount createMany
   */
  export type BottleCountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BottleCounts.
     */
    data: BottleCountCreateManyInput | BottleCountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BottleCount createManyAndReturn
   */
  export type BottleCountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BottleCount
     */
    select?: BottleCountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BottleCount
     */
    omit?: BottleCountOmit<ExtArgs> | null
    /**
     * The data used to create many BottleCounts.
     */
    data: BottleCountCreateManyInput | BottleCountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BottleCountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BottleCount update
   */
  export type BottleCountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BottleCount
     */
    select?: BottleCountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BottleCount
     */
    omit?: BottleCountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BottleCountInclude<ExtArgs> | null
    /**
     * The data needed to update a BottleCount.
     */
    data: XOR<BottleCountUpdateInput, BottleCountUncheckedUpdateInput>
    /**
     * Choose, which BottleCount to update.
     */
    where: BottleCountWhereUniqueInput
  }

  /**
   * BottleCount updateMany
   */
  export type BottleCountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BottleCounts.
     */
    data: XOR<BottleCountUpdateManyMutationInput, BottleCountUncheckedUpdateManyInput>
    /**
     * Filter which BottleCounts to update
     */
    where?: BottleCountWhereInput
    /**
     * Limit how many BottleCounts to update.
     */
    limit?: number
  }

  /**
   * BottleCount updateManyAndReturn
   */
  export type BottleCountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BottleCount
     */
    select?: BottleCountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BottleCount
     */
    omit?: BottleCountOmit<ExtArgs> | null
    /**
     * The data used to update BottleCounts.
     */
    data: XOR<BottleCountUpdateManyMutationInput, BottleCountUncheckedUpdateManyInput>
    /**
     * Filter which BottleCounts to update
     */
    where?: BottleCountWhereInput
    /**
     * Limit how many BottleCounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BottleCountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BottleCount upsert
   */
  export type BottleCountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BottleCount
     */
    select?: BottleCountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BottleCount
     */
    omit?: BottleCountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BottleCountInclude<ExtArgs> | null
    /**
     * The filter to search for the BottleCount to update in case it exists.
     */
    where: BottleCountWhereUniqueInput
    /**
     * In case the BottleCount found by the `where` argument doesn't exist, create a new BottleCount with this data.
     */
    create: XOR<BottleCountCreateInput, BottleCountUncheckedCreateInput>
    /**
     * In case the BottleCount was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BottleCountUpdateInput, BottleCountUncheckedUpdateInput>
  }

  /**
   * BottleCount delete
   */
  export type BottleCountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BottleCount
     */
    select?: BottleCountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BottleCount
     */
    omit?: BottleCountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BottleCountInclude<ExtArgs> | null
    /**
     * Filter which BottleCount to delete.
     */
    where: BottleCountWhereUniqueInput
  }

  /**
   * BottleCount deleteMany
   */
  export type BottleCountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BottleCounts to delete
     */
    where?: BottleCountWhereInput
    /**
     * Limit how many BottleCounts to delete.
     */
    limit?: number
  }

  /**
   * BottleCount.userBottleCount
   */
  export type BottleCount$userBottleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBottleCount
     */
    select?: UserBottleCountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBottleCount
     */
    omit?: UserBottleCountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBottleCountInclude<ExtArgs> | null
    where?: UserBottleCountWhereInput
  }

  /**
   * BottleCount without action
   */
  export type BottleCountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BottleCount
     */
    select?: BottleCountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BottleCount
     */
    omit?: BottleCountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BottleCountInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    createdAt: 'createdAt',
    nama: 'nama',
    password: 'password',
    phoneNumber: 'phoneNumber',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UserBottleCountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    totalBottles: 'totalBottles',
    redeemableCount: 'redeemableCount',
    lifetimeCount: 'lifetimeCount',
    points: 'points',
    lifetimePoints: 'lifetimePoints',
    lastUpdated: 'lastUpdated'
  };

  export type UserBottleCountScalarFieldEnum = (typeof UserBottleCountScalarFieldEnum)[keyof typeof UserBottleCountScalarFieldEnum]


  export const BottleTransactionScalarFieldEnum: {
    id: 'id',
    userBottleCountId: 'userBottleCountId',
    bottleCountId: 'bottleCountId',
    deviceId: 'deviceId',
    transactionType: 'transactionType',
    bottleCount: 'bottleCount',
    pointsEarned: 'pointsEarned',
    timestamp: 'timestamp'
  };

  export type BottleTransactionScalarFieldEnum = (typeof BottleTransactionScalarFieldEnum)[keyof typeof BottleTransactionScalarFieldEnum]


  export const ArduinoConnectionScalarFieldEnum: {
    id: 'id',
    deviceId: 'deviceId',
    locationId: 'locationId',
    ipAddress: 'ipAddress',
    status: 'status',
    lastPing: 'lastPing',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ArduinoConnectionScalarFieldEnum = (typeof ArduinoConnectionScalarFieldEnum)[keyof typeof ArduinoConnectionScalarFieldEnum]


  export const RvmLocationScalarFieldEnum: {
    id: 'id',
    name: 'name',
    address: 'address',
    position: 'position',
    capacity: 'capacity',
    currentStock: 'currentStock',
    capacityStatus: 'capacityStatus',
    operationalHours: 'operationalHours',
    contactNumber: 'contactNumber',
    status: 'status',
    image: 'image',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RvmLocationScalarFieldEnum = (typeof RvmLocationScalarFieldEnum)[keyof typeof RvmLocationScalarFieldEnum]


  export const BottleCountScalarFieldEnum: {
    id: 'id',
    deviceId: 'deviceId',
    count: 'count',
    distance: 'distance',
    source: 'source',
    timestamp: 'timestamp',
    userBottleCountId: 'userBottleCountId'
  };

  export type BottleCountScalarFieldEnum = (typeof BottleCountScalarFieldEnum)[keyof typeof BottleCountScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    nama?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    phoneNumber?: StringFilter<"User"> | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    bottleCount?: XOR<UserBottleCountNullableScalarRelationFilter, UserBottleCountWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    nama?: SortOrder
    password?: SortOrder
    phoneNumber?: SortOrder
    updatedAt?: SortOrder
    bottleCount?: UserBottleCountOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    createdAt?: DateTimeFilter<"User"> | Date | string
    nama?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    phoneNumber?: StringFilter<"User"> | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    bottleCount?: XOR<UserBottleCountNullableScalarRelationFilter, UserBottleCountWhereInput> | null
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    nama?: SortOrder
    password?: SortOrder
    phoneNumber?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    nama?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    phoneNumber?: StringWithAggregatesFilter<"User"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type UserBottleCountWhereInput = {
    AND?: UserBottleCountWhereInput | UserBottleCountWhereInput[]
    OR?: UserBottleCountWhereInput[]
    NOT?: UserBottleCountWhereInput | UserBottleCountWhereInput[]
    id?: StringFilter<"UserBottleCount"> | string
    userId?: StringFilter<"UserBottleCount"> | string
    totalBottles?: IntFilter<"UserBottleCount"> | number
    redeemableCount?: IntFilter<"UserBottleCount"> | number
    lifetimeCount?: IntFilter<"UserBottleCount"> | number
    points?: IntFilter<"UserBottleCount"> | number
    lifetimePoints?: IntFilter<"UserBottleCount"> | number
    lastUpdated?: DateTimeFilter<"UserBottleCount"> | Date | string
    bottleCounts?: BottleCountListRelationFilter
    bottleTransactions?: BottleTransactionListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserBottleCountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    totalBottles?: SortOrder
    redeemableCount?: SortOrder
    lifetimeCount?: SortOrder
    points?: SortOrder
    lifetimePoints?: SortOrder
    lastUpdated?: SortOrder
    bottleCounts?: BottleCountOrderByRelationAggregateInput
    bottleTransactions?: BottleTransactionOrderByRelationAggregateInput
    user?: UserOrderByWithRelationInput
  }

  export type UserBottleCountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: UserBottleCountWhereInput | UserBottleCountWhereInput[]
    OR?: UserBottleCountWhereInput[]
    NOT?: UserBottleCountWhereInput | UserBottleCountWhereInput[]
    totalBottles?: IntFilter<"UserBottleCount"> | number
    redeemableCount?: IntFilter<"UserBottleCount"> | number
    lifetimeCount?: IntFilter<"UserBottleCount"> | number
    points?: IntFilter<"UserBottleCount"> | number
    lifetimePoints?: IntFilter<"UserBottleCount"> | number
    lastUpdated?: DateTimeFilter<"UserBottleCount"> | Date | string
    bottleCounts?: BottleCountListRelationFilter
    bottleTransactions?: BottleTransactionListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type UserBottleCountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    totalBottles?: SortOrder
    redeemableCount?: SortOrder
    lifetimeCount?: SortOrder
    points?: SortOrder
    lifetimePoints?: SortOrder
    lastUpdated?: SortOrder
    _count?: UserBottleCountCountOrderByAggregateInput
    _avg?: UserBottleCountAvgOrderByAggregateInput
    _max?: UserBottleCountMaxOrderByAggregateInput
    _min?: UserBottleCountMinOrderByAggregateInput
    _sum?: UserBottleCountSumOrderByAggregateInput
  }

  export type UserBottleCountScalarWhereWithAggregatesInput = {
    AND?: UserBottleCountScalarWhereWithAggregatesInput | UserBottleCountScalarWhereWithAggregatesInput[]
    OR?: UserBottleCountScalarWhereWithAggregatesInput[]
    NOT?: UserBottleCountScalarWhereWithAggregatesInput | UserBottleCountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserBottleCount"> | string
    userId?: StringWithAggregatesFilter<"UserBottleCount"> | string
    totalBottles?: IntWithAggregatesFilter<"UserBottleCount"> | number
    redeemableCount?: IntWithAggregatesFilter<"UserBottleCount"> | number
    lifetimeCount?: IntWithAggregatesFilter<"UserBottleCount"> | number
    points?: IntWithAggregatesFilter<"UserBottleCount"> | number
    lifetimePoints?: IntWithAggregatesFilter<"UserBottleCount"> | number
    lastUpdated?: DateTimeWithAggregatesFilter<"UserBottleCount"> | Date | string
  }

  export type BottleTransactionWhereInput = {
    AND?: BottleTransactionWhereInput | BottleTransactionWhereInput[]
    OR?: BottleTransactionWhereInput[]
    NOT?: BottleTransactionWhereInput | BottleTransactionWhereInput[]
    id?: StringFilter<"BottleTransaction"> | string
    userBottleCountId?: StringFilter<"BottleTransaction"> | string
    bottleCountId?: IntNullableFilter<"BottleTransaction"> | number | null
    deviceId?: StringNullableFilter<"BottleTransaction"> | string | null
    transactionType?: StringFilter<"BottleTransaction"> | string
    bottleCount?: IntFilter<"BottleTransaction"> | number
    pointsEarned?: IntFilter<"BottleTransaction"> | number
    timestamp?: DateTimeFilter<"BottleTransaction"> | Date | string
    userBottleCount?: XOR<UserBottleCountScalarRelationFilter, UserBottleCountWhereInput>
  }

  export type BottleTransactionOrderByWithRelationInput = {
    id?: SortOrder
    userBottleCountId?: SortOrder
    bottleCountId?: SortOrderInput | SortOrder
    deviceId?: SortOrderInput | SortOrder
    transactionType?: SortOrder
    bottleCount?: SortOrder
    pointsEarned?: SortOrder
    timestamp?: SortOrder
    userBottleCount?: UserBottleCountOrderByWithRelationInput
  }

  export type BottleTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BottleTransactionWhereInput | BottleTransactionWhereInput[]
    OR?: BottleTransactionWhereInput[]
    NOT?: BottleTransactionWhereInput | BottleTransactionWhereInput[]
    userBottleCountId?: StringFilter<"BottleTransaction"> | string
    bottleCountId?: IntNullableFilter<"BottleTransaction"> | number | null
    deviceId?: StringNullableFilter<"BottleTransaction"> | string | null
    transactionType?: StringFilter<"BottleTransaction"> | string
    bottleCount?: IntFilter<"BottleTransaction"> | number
    pointsEarned?: IntFilter<"BottleTransaction"> | number
    timestamp?: DateTimeFilter<"BottleTransaction"> | Date | string
    userBottleCount?: XOR<UserBottleCountScalarRelationFilter, UserBottleCountWhereInput>
  }, "id">

  export type BottleTransactionOrderByWithAggregationInput = {
    id?: SortOrder
    userBottleCountId?: SortOrder
    bottleCountId?: SortOrderInput | SortOrder
    deviceId?: SortOrderInput | SortOrder
    transactionType?: SortOrder
    bottleCount?: SortOrder
    pointsEarned?: SortOrder
    timestamp?: SortOrder
    _count?: BottleTransactionCountOrderByAggregateInput
    _avg?: BottleTransactionAvgOrderByAggregateInput
    _max?: BottleTransactionMaxOrderByAggregateInput
    _min?: BottleTransactionMinOrderByAggregateInput
    _sum?: BottleTransactionSumOrderByAggregateInput
  }

  export type BottleTransactionScalarWhereWithAggregatesInput = {
    AND?: BottleTransactionScalarWhereWithAggregatesInput | BottleTransactionScalarWhereWithAggregatesInput[]
    OR?: BottleTransactionScalarWhereWithAggregatesInput[]
    NOT?: BottleTransactionScalarWhereWithAggregatesInput | BottleTransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BottleTransaction"> | string
    userBottleCountId?: StringWithAggregatesFilter<"BottleTransaction"> | string
    bottleCountId?: IntNullableWithAggregatesFilter<"BottleTransaction"> | number | null
    deviceId?: StringNullableWithAggregatesFilter<"BottleTransaction"> | string | null
    transactionType?: StringWithAggregatesFilter<"BottleTransaction"> | string
    bottleCount?: IntWithAggregatesFilter<"BottleTransaction"> | number
    pointsEarned?: IntWithAggregatesFilter<"BottleTransaction"> | number
    timestamp?: DateTimeWithAggregatesFilter<"BottleTransaction"> | Date | string
  }

  export type ArduinoConnectionWhereInput = {
    AND?: ArduinoConnectionWhereInput | ArduinoConnectionWhereInput[]
    OR?: ArduinoConnectionWhereInput[]
    NOT?: ArduinoConnectionWhereInput | ArduinoConnectionWhereInput[]
    id?: IntFilter<"ArduinoConnection"> | number
    deviceId?: StringFilter<"ArduinoConnection"> | string
    locationId?: IntNullableFilter<"ArduinoConnection"> | number | null
    ipAddress?: StringNullableFilter<"ArduinoConnection"> | string | null
    status?: StringFilter<"ArduinoConnection"> | string
    lastPing?: DateTimeFilter<"ArduinoConnection"> | Date | string
    createdAt?: DateTimeFilter<"ArduinoConnection"> | Date | string
    updatedAt?: DateTimeFilter<"ArduinoConnection"> | Date | string
  }

  export type ArduinoConnectionOrderByWithRelationInput = {
    id?: SortOrder
    deviceId?: SortOrder
    locationId?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    status?: SortOrder
    lastPing?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArduinoConnectionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ArduinoConnectionWhereInput | ArduinoConnectionWhereInput[]
    OR?: ArduinoConnectionWhereInput[]
    NOT?: ArduinoConnectionWhereInput | ArduinoConnectionWhereInput[]
    deviceId?: StringFilter<"ArduinoConnection"> | string
    locationId?: IntNullableFilter<"ArduinoConnection"> | number | null
    ipAddress?: StringNullableFilter<"ArduinoConnection"> | string | null
    status?: StringFilter<"ArduinoConnection"> | string
    lastPing?: DateTimeFilter<"ArduinoConnection"> | Date | string
    createdAt?: DateTimeFilter<"ArduinoConnection"> | Date | string
    updatedAt?: DateTimeFilter<"ArduinoConnection"> | Date | string
  }, "id">

  export type ArduinoConnectionOrderByWithAggregationInput = {
    id?: SortOrder
    deviceId?: SortOrder
    locationId?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    status?: SortOrder
    lastPing?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ArduinoConnectionCountOrderByAggregateInput
    _avg?: ArduinoConnectionAvgOrderByAggregateInput
    _max?: ArduinoConnectionMaxOrderByAggregateInput
    _min?: ArduinoConnectionMinOrderByAggregateInput
    _sum?: ArduinoConnectionSumOrderByAggregateInput
  }

  export type ArduinoConnectionScalarWhereWithAggregatesInput = {
    AND?: ArduinoConnectionScalarWhereWithAggregatesInput | ArduinoConnectionScalarWhereWithAggregatesInput[]
    OR?: ArduinoConnectionScalarWhereWithAggregatesInput[]
    NOT?: ArduinoConnectionScalarWhereWithAggregatesInput | ArduinoConnectionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ArduinoConnection"> | number
    deviceId?: StringWithAggregatesFilter<"ArduinoConnection"> | string
    locationId?: IntNullableWithAggregatesFilter<"ArduinoConnection"> | number | null
    ipAddress?: StringNullableWithAggregatesFilter<"ArduinoConnection"> | string | null
    status?: StringWithAggregatesFilter<"ArduinoConnection"> | string
    lastPing?: DateTimeWithAggregatesFilter<"ArduinoConnection"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"ArduinoConnection"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ArduinoConnection"> | Date | string
  }

  export type RvmLocationWhereInput = {
    AND?: RvmLocationWhereInput | RvmLocationWhereInput[]
    OR?: RvmLocationWhereInput[]
    NOT?: RvmLocationWhereInput | RvmLocationWhereInput[]
    id?: IntFilter<"RvmLocation"> | number
    name?: StringFilter<"RvmLocation"> | string
    address?: StringNullableFilter<"RvmLocation"> | string | null
    position?: JsonFilter<"RvmLocation">
    capacity?: IntFilter<"RvmLocation"> | number
    currentStock?: IntFilter<"RvmLocation"> | number
    capacityStatus?: StringFilter<"RvmLocation"> | string
    operationalHours?: StringFilter<"RvmLocation"> | string
    contactNumber?: StringNullableFilter<"RvmLocation"> | string | null
    status?: StringFilter<"RvmLocation"> | string
    image?: StringNullableFilter<"RvmLocation"> | string | null
    createdAt?: DateTimeFilter<"RvmLocation"> | Date | string
    updatedAt?: DateTimeFilter<"RvmLocation"> | Date | string
  }

  export type RvmLocationOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrderInput | SortOrder
    position?: SortOrder
    capacity?: SortOrder
    currentStock?: SortOrder
    capacityStatus?: SortOrder
    operationalHours?: SortOrder
    contactNumber?: SortOrderInput | SortOrder
    status?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RvmLocationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RvmLocationWhereInput | RvmLocationWhereInput[]
    OR?: RvmLocationWhereInput[]
    NOT?: RvmLocationWhereInput | RvmLocationWhereInput[]
    name?: StringFilter<"RvmLocation"> | string
    address?: StringNullableFilter<"RvmLocation"> | string | null
    position?: JsonFilter<"RvmLocation">
    capacity?: IntFilter<"RvmLocation"> | number
    currentStock?: IntFilter<"RvmLocation"> | number
    capacityStatus?: StringFilter<"RvmLocation"> | string
    operationalHours?: StringFilter<"RvmLocation"> | string
    contactNumber?: StringNullableFilter<"RvmLocation"> | string | null
    status?: StringFilter<"RvmLocation"> | string
    image?: StringNullableFilter<"RvmLocation"> | string | null
    createdAt?: DateTimeFilter<"RvmLocation"> | Date | string
    updatedAt?: DateTimeFilter<"RvmLocation"> | Date | string
  }, "id">

  export type RvmLocationOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrderInput | SortOrder
    position?: SortOrder
    capacity?: SortOrder
    currentStock?: SortOrder
    capacityStatus?: SortOrder
    operationalHours?: SortOrder
    contactNumber?: SortOrderInput | SortOrder
    status?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RvmLocationCountOrderByAggregateInput
    _avg?: RvmLocationAvgOrderByAggregateInput
    _max?: RvmLocationMaxOrderByAggregateInput
    _min?: RvmLocationMinOrderByAggregateInput
    _sum?: RvmLocationSumOrderByAggregateInput
  }

  export type RvmLocationScalarWhereWithAggregatesInput = {
    AND?: RvmLocationScalarWhereWithAggregatesInput | RvmLocationScalarWhereWithAggregatesInput[]
    OR?: RvmLocationScalarWhereWithAggregatesInput[]
    NOT?: RvmLocationScalarWhereWithAggregatesInput | RvmLocationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"RvmLocation"> | number
    name?: StringWithAggregatesFilter<"RvmLocation"> | string
    address?: StringNullableWithAggregatesFilter<"RvmLocation"> | string | null
    position?: JsonWithAggregatesFilter<"RvmLocation">
    capacity?: IntWithAggregatesFilter<"RvmLocation"> | number
    currentStock?: IntWithAggregatesFilter<"RvmLocation"> | number
    capacityStatus?: StringWithAggregatesFilter<"RvmLocation"> | string
    operationalHours?: StringWithAggregatesFilter<"RvmLocation"> | string
    contactNumber?: StringNullableWithAggregatesFilter<"RvmLocation"> | string | null
    status?: StringWithAggregatesFilter<"RvmLocation"> | string
    image?: StringNullableWithAggregatesFilter<"RvmLocation"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RvmLocation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RvmLocation"> | Date | string
  }

  export type BottleCountWhereInput = {
    AND?: BottleCountWhereInput | BottleCountWhereInput[]
    OR?: BottleCountWhereInput[]
    NOT?: BottleCountWhereInput | BottleCountWhereInput[]
    id?: IntFilter<"BottleCount"> | number
    deviceId?: StringFilter<"BottleCount"> | string
    count?: IntFilter<"BottleCount"> | number
    distance?: FloatNullableFilter<"BottleCount"> | number | null
    source?: StringFilter<"BottleCount"> | string
    timestamp?: DateTimeFilter<"BottleCount"> | Date | string
    userBottleCountId?: StringNullableFilter<"BottleCount"> | string | null
    userBottleCount?: XOR<UserBottleCountNullableScalarRelationFilter, UserBottleCountWhereInput> | null
  }

  export type BottleCountOrderByWithRelationInput = {
    id?: SortOrder
    deviceId?: SortOrder
    count?: SortOrder
    distance?: SortOrderInput | SortOrder
    source?: SortOrder
    timestamp?: SortOrder
    userBottleCountId?: SortOrderInput | SortOrder
    userBottleCount?: UserBottleCountOrderByWithRelationInput
  }

  export type BottleCountWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: BottleCountWhereInput | BottleCountWhereInput[]
    OR?: BottleCountWhereInput[]
    NOT?: BottleCountWhereInput | BottleCountWhereInput[]
    deviceId?: StringFilter<"BottleCount"> | string
    count?: IntFilter<"BottleCount"> | number
    distance?: FloatNullableFilter<"BottleCount"> | number | null
    source?: StringFilter<"BottleCount"> | string
    timestamp?: DateTimeFilter<"BottleCount"> | Date | string
    userBottleCountId?: StringNullableFilter<"BottleCount"> | string | null
    userBottleCount?: XOR<UserBottleCountNullableScalarRelationFilter, UserBottleCountWhereInput> | null
  }, "id">

  export type BottleCountOrderByWithAggregationInput = {
    id?: SortOrder
    deviceId?: SortOrder
    count?: SortOrder
    distance?: SortOrderInput | SortOrder
    source?: SortOrder
    timestamp?: SortOrder
    userBottleCountId?: SortOrderInput | SortOrder
    _count?: BottleCountCountOrderByAggregateInput
    _avg?: BottleCountAvgOrderByAggregateInput
    _max?: BottleCountMaxOrderByAggregateInput
    _min?: BottleCountMinOrderByAggregateInput
    _sum?: BottleCountSumOrderByAggregateInput
  }

  export type BottleCountScalarWhereWithAggregatesInput = {
    AND?: BottleCountScalarWhereWithAggregatesInput | BottleCountScalarWhereWithAggregatesInput[]
    OR?: BottleCountScalarWhereWithAggregatesInput[]
    NOT?: BottleCountScalarWhereWithAggregatesInput | BottleCountScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"BottleCount"> | number
    deviceId?: StringWithAggregatesFilter<"BottleCount"> | string
    count?: IntWithAggregatesFilter<"BottleCount"> | number
    distance?: FloatNullableWithAggregatesFilter<"BottleCount"> | number | null
    source?: StringWithAggregatesFilter<"BottleCount"> | string
    timestamp?: DateTimeWithAggregatesFilter<"BottleCount"> | Date | string
    userBottleCountId?: StringNullableWithAggregatesFilter<"BottleCount"> | string | null
  }

  export type UserCreateInput = {
    id?: string
    email: string
    createdAt?: Date | string
    nama: string
    password: string
    phoneNumber: string
    updatedAt?: Date | string
    bottleCount?: UserBottleCountCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    createdAt?: Date | string
    nama: string
    password: string
    phoneNumber: string
    updatedAt?: Date | string
    bottleCount?: UserBottleCountUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    nama?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bottleCount?: UserBottleCountUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    nama?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bottleCount?: UserBottleCountUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    createdAt?: Date | string
    nama: string
    password: string
    phoneNumber: string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    nama?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    nama?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserBottleCountCreateInput = {
    id?: string
    totalBottles?: number
    redeemableCount?: number
    lifetimeCount?: number
    points?: number
    lifetimePoints?: number
    lastUpdated?: Date | string
    bottleCounts?: BottleCountCreateNestedManyWithoutUserBottleCountInput
    bottleTransactions?: BottleTransactionCreateNestedManyWithoutUserBottleCountInput
    user: UserCreateNestedOneWithoutBottleCountInput
  }

  export type UserBottleCountUncheckedCreateInput = {
    id?: string
    userId: string
    totalBottles?: number
    redeemableCount?: number
    lifetimeCount?: number
    points?: number
    lifetimePoints?: number
    lastUpdated?: Date | string
    bottleCounts?: BottleCountUncheckedCreateNestedManyWithoutUserBottleCountInput
    bottleTransactions?: BottleTransactionUncheckedCreateNestedManyWithoutUserBottleCountInput
  }

  export type UserBottleCountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalBottles?: IntFieldUpdateOperationsInput | number
    redeemableCount?: IntFieldUpdateOperationsInput | number
    lifetimeCount?: IntFieldUpdateOperationsInput | number
    points?: IntFieldUpdateOperationsInput | number
    lifetimePoints?: IntFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    bottleCounts?: BottleCountUpdateManyWithoutUserBottleCountNestedInput
    bottleTransactions?: BottleTransactionUpdateManyWithoutUserBottleCountNestedInput
    user?: UserUpdateOneRequiredWithoutBottleCountNestedInput
  }

  export type UserBottleCountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    totalBottles?: IntFieldUpdateOperationsInput | number
    redeemableCount?: IntFieldUpdateOperationsInput | number
    lifetimeCount?: IntFieldUpdateOperationsInput | number
    points?: IntFieldUpdateOperationsInput | number
    lifetimePoints?: IntFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    bottleCounts?: BottleCountUncheckedUpdateManyWithoutUserBottleCountNestedInput
    bottleTransactions?: BottleTransactionUncheckedUpdateManyWithoutUserBottleCountNestedInput
  }

  export type UserBottleCountCreateManyInput = {
    id?: string
    userId: string
    totalBottles?: number
    redeemableCount?: number
    lifetimeCount?: number
    points?: number
    lifetimePoints?: number
    lastUpdated?: Date | string
  }

  export type UserBottleCountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalBottles?: IntFieldUpdateOperationsInput | number
    redeemableCount?: IntFieldUpdateOperationsInput | number
    lifetimeCount?: IntFieldUpdateOperationsInput | number
    points?: IntFieldUpdateOperationsInput | number
    lifetimePoints?: IntFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserBottleCountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    totalBottles?: IntFieldUpdateOperationsInput | number
    redeemableCount?: IntFieldUpdateOperationsInput | number
    lifetimeCount?: IntFieldUpdateOperationsInput | number
    points?: IntFieldUpdateOperationsInput | number
    lifetimePoints?: IntFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BottleTransactionCreateInput = {
    id?: string
    bottleCountId?: number | null
    deviceId?: string | null
    transactionType: string
    bottleCount: number
    pointsEarned?: number
    timestamp?: Date | string
    userBottleCount: UserBottleCountCreateNestedOneWithoutBottleTransactionsInput
  }

  export type BottleTransactionUncheckedCreateInput = {
    id?: string
    userBottleCountId: string
    bottleCountId?: number | null
    deviceId?: string | null
    transactionType: string
    bottleCount: number
    pointsEarned?: number
    timestamp?: Date | string
  }

  export type BottleTransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bottleCountId?: NullableIntFieldUpdateOperationsInput | number | null
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionType?: StringFieldUpdateOperationsInput | string
    bottleCount?: IntFieldUpdateOperationsInput | number
    pointsEarned?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    userBottleCount?: UserBottleCountUpdateOneRequiredWithoutBottleTransactionsNestedInput
  }

  export type BottleTransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userBottleCountId?: StringFieldUpdateOperationsInput | string
    bottleCountId?: NullableIntFieldUpdateOperationsInput | number | null
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionType?: StringFieldUpdateOperationsInput | string
    bottleCount?: IntFieldUpdateOperationsInput | number
    pointsEarned?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BottleTransactionCreateManyInput = {
    id?: string
    userBottleCountId: string
    bottleCountId?: number | null
    deviceId?: string | null
    transactionType: string
    bottleCount: number
    pointsEarned?: number
    timestamp?: Date | string
  }

  export type BottleTransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    bottleCountId?: NullableIntFieldUpdateOperationsInput | number | null
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionType?: StringFieldUpdateOperationsInput | string
    bottleCount?: IntFieldUpdateOperationsInput | number
    pointsEarned?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BottleTransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userBottleCountId?: StringFieldUpdateOperationsInput | string
    bottleCountId?: NullableIntFieldUpdateOperationsInput | number | null
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionType?: StringFieldUpdateOperationsInput | string
    bottleCount?: IntFieldUpdateOperationsInput | number
    pointsEarned?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArduinoConnectionCreateInput = {
    deviceId: string
    locationId?: number | null
    ipAddress?: string | null
    status: string
    lastPing?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArduinoConnectionUncheckedCreateInput = {
    id?: number
    deviceId: string
    locationId?: number | null
    ipAddress?: string | null
    status: string
    lastPing?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArduinoConnectionUpdateInput = {
    deviceId?: StringFieldUpdateOperationsInput | string
    locationId?: NullableIntFieldUpdateOperationsInput | number | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    lastPing?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArduinoConnectionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    deviceId?: StringFieldUpdateOperationsInput | string
    locationId?: NullableIntFieldUpdateOperationsInput | number | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    lastPing?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArduinoConnectionCreateManyInput = {
    id?: number
    deviceId: string
    locationId?: number | null
    ipAddress?: string | null
    status: string
    lastPing?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArduinoConnectionUpdateManyMutationInput = {
    deviceId?: StringFieldUpdateOperationsInput | string
    locationId?: NullableIntFieldUpdateOperationsInput | number | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    lastPing?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArduinoConnectionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    deviceId?: StringFieldUpdateOperationsInput | string
    locationId?: NullableIntFieldUpdateOperationsInput | number | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    lastPing?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RvmLocationCreateInput = {
    name: string
    address?: string | null
    position: JsonNullValueInput | InputJsonValue
    capacity?: number
    currentStock?: number
    capacityStatus?: string
    operationalHours?: string
    contactNumber?: string | null
    status?: string
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RvmLocationUncheckedCreateInput = {
    id?: number
    name: string
    address?: string | null
    position: JsonNullValueInput | InputJsonValue
    capacity?: number
    currentStock?: number
    capacityStatus?: string
    operationalHours?: string
    contactNumber?: string | null
    status?: string
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RvmLocationUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    position?: JsonNullValueInput | InputJsonValue
    capacity?: IntFieldUpdateOperationsInput | number
    currentStock?: IntFieldUpdateOperationsInput | number
    capacityStatus?: StringFieldUpdateOperationsInput | string
    operationalHours?: StringFieldUpdateOperationsInput | string
    contactNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RvmLocationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    position?: JsonNullValueInput | InputJsonValue
    capacity?: IntFieldUpdateOperationsInput | number
    currentStock?: IntFieldUpdateOperationsInput | number
    capacityStatus?: StringFieldUpdateOperationsInput | string
    operationalHours?: StringFieldUpdateOperationsInput | string
    contactNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RvmLocationCreateManyInput = {
    id?: number
    name: string
    address?: string | null
    position: JsonNullValueInput | InputJsonValue
    capacity?: number
    currentStock?: number
    capacityStatus?: string
    operationalHours?: string
    contactNumber?: string | null
    status?: string
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RvmLocationUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    position?: JsonNullValueInput | InputJsonValue
    capacity?: IntFieldUpdateOperationsInput | number
    currentStock?: IntFieldUpdateOperationsInput | number
    capacityStatus?: StringFieldUpdateOperationsInput | string
    operationalHours?: StringFieldUpdateOperationsInput | string
    contactNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RvmLocationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    position?: JsonNullValueInput | InputJsonValue
    capacity?: IntFieldUpdateOperationsInput | number
    currentStock?: IntFieldUpdateOperationsInput | number
    capacityStatus?: StringFieldUpdateOperationsInput | string
    operationalHours?: StringFieldUpdateOperationsInput | string
    contactNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BottleCountCreateInput = {
    deviceId: string
    count?: number
    distance?: number | null
    source?: string
    timestamp?: Date | string
    userBottleCount?: UserBottleCountCreateNestedOneWithoutBottleCountsInput
  }

  export type BottleCountUncheckedCreateInput = {
    id?: number
    deviceId: string
    count?: number
    distance?: number | null
    source?: string
    timestamp?: Date | string
    userBottleCountId?: string | null
  }

  export type BottleCountUpdateInput = {
    deviceId?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    distance?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    userBottleCount?: UserBottleCountUpdateOneWithoutBottleCountsNestedInput
  }

  export type BottleCountUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    deviceId?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    distance?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    userBottleCountId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BottleCountCreateManyInput = {
    id?: number
    deviceId: string
    count?: number
    distance?: number | null
    source?: string
    timestamp?: Date | string
    userBottleCountId?: string | null
  }

  export type BottleCountUpdateManyMutationInput = {
    deviceId?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    distance?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BottleCountUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    deviceId?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    distance?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    userBottleCountId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserBottleCountNullableScalarRelationFilter = {
    is?: UserBottleCountWhereInput | null
    isNot?: UserBottleCountWhereInput | null
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    nama?: SortOrder
    password?: SortOrder
    phoneNumber?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    nama?: SortOrder
    password?: SortOrder
    phoneNumber?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    nama?: SortOrder
    password?: SortOrder
    phoneNumber?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BottleCountListRelationFilter = {
    every?: BottleCountWhereInput
    some?: BottleCountWhereInput
    none?: BottleCountWhereInput
  }

  export type BottleTransactionListRelationFilter = {
    every?: BottleTransactionWhereInput
    some?: BottleTransactionWhereInput
    none?: BottleTransactionWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type BottleCountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BottleTransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserBottleCountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    totalBottles?: SortOrder
    redeemableCount?: SortOrder
    lifetimeCount?: SortOrder
    points?: SortOrder
    lifetimePoints?: SortOrder
    lastUpdated?: SortOrder
  }

  export type UserBottleCountAvgOrderByAggregateInput = {
    totalBottles?: SortOrder
    redeemableCount?: SortOrder
    lifetimeCount?: SortOrder
    points?: SortOrder
    lifetimePoints?: SortOrder
  }

  export type UserBottleCountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    totalBottles?: SortOrder
    redeemableCount?: SortOrder
    lifetimeCount?: SortOrder
    points?: SortOrder
    lifetimePoints?: SortOrder
    lastUpdated?: SortOrder
  }

  export type UserBottleCountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    totalBottles?: SortOrder
    redeemableCount?: SortOrder
    lifetimeCount?: SortOrder
    points?: SortOrder
    lifetimePoints?: SortOrder
    lastUpdated?: SortOrder
  }

  export type UserBottleCountSumOrderByAggregateInput = {
    totalBottles?: SortOrder
    redeemableCount?: SortOrder
    lifetimeCount?: SortOrder
    points?: SortOrder
    lifetimePoints?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type UserBottleCountScalarRelationFilter = {
    is?: UserBottleCountWhereInput
    isNot?: UserBottleCountWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type BottleTransactionCountOrderByAggregateInput = {
    id?: SortOrder
    userBottleCountId?: SortOrder
    bottleCountId?: SortOrder
    deviceId?: SortOrder
    transactionType?: SortOrder
    bottleCount?: SortOrder
    pointsEarned?: SortOrder
    timestamp?: SortOrder
  }

  export type BottleTransactionAvgOrderByAggregateInput = {
    bottleCountId?: SortOrder
    bottleCount?: SortOrder
    pointsEarned?: SortOrder
  }

  export type BottleTransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    userBottleCountId?: SortOrder
    bottleCountId?: SortOrder
    deviceId?: SortOrder
    transactionType?: SortOrder
    bottleCount?: SortOrder
    pointsEarned?: SortOrder
    timestamp?: SortOrder
  }

  export type BottleTransactionMinOrderByAggregateInput = {
    id?: SortOrder
    userBottleCountId?: SortOrder
    bottleCountId?: SortOrder
    deviceId?: SortOrder
    transactionType?: SortOrder
    bottleCount?: SortOrder
    pointsEarned?: SortOrder
    timestamp?: SortOrder
  }

  export type BottleTransactionSumOrderByAggregateInput = {
    bottleCountId?: SortOrder
    bottleCount?: SortOrder
    pointsEarned?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type ArduinoConnectionCountOrderByAggregateInput = {
    id?: SortOrder
    deviceId?: SortOrder
    locationId?: SortOrder
    ipAddress?: SortOrder
    status?: SortOrder
    lastPing?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArduinoConnectionAvgOrderByAggregateInput = {
    id?: SortOrder
    locationId?: SortOrder
  }

  export type ArduinoConnectionMaxOrderByAggregateInput = {
    id?: SortOrder
    deviceId?: SortOrder
    locationId?: SortOrder
    ipAddress?: SortOrder
    status?: SortOrder
    lastPing?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArduinoConnectionMinOrderByAggregateInput = {
    id?: SortOrder
    deviceId?: SortOrder
    locationId?: SortOrder
    ipAddress?: SortOrder
    status?: SortOrder
    lastPing?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArduinoConnectionSumOrderByAggregateInput = {
    id?: SortOrder
    locationId?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type RvmLocationCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    position?: SortOrder
    capacity?: SortOrder
    currentStock?: SortOrder
    capacityStatus?: SortOrder
    operationalHours?: SortOrder
    contactNumber?: SortOrder
    status?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RvmLocationAvgOrderByAggregateInput = {
    id?: SortOrder
    capacity?: SortOrder
    currentStock?: SortOrder
  }

  export type RvmLocationMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    capacity?: SortOrder
    currentStock?: SortOrder
    capacityStatus?: SortOrder
    operationalHours?: SortOrder
    contactNumber?: SortOrder
    status?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RvmLocationMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    capacity?: SortOrder
    currentStock?: SortOrder
    capacityStatus?: SortOrder
    operationalHours?: SortOrder
    contactNumber?: SortOrder
    status?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RvmLocationSumOrderByAggregateInput = {
    id?: SortOrder
    capacity?: SortOrder
    currentStock?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type BottleCountCountOrderByAggregateInput = {
    id?: SortOrder
    deviceId?: SortOrder
    count?: SortOrder
    distance?: SortOrder
    source?: SortOrder
    timestamp?: SortOrder
    userBottleCountId?: SortOrder
  }

  export type BottleCountAvgOrderByAggregateInput = {
    id?: SortOrder
    count?: SortOrder
    distance?: SortOrder
  }

  export type BottleCountMaxOrderByAggregateInput = {
    id?: SortOrder
    deviceId?: SortOrder
    count?: SortOrder
    distance?: SortOrder
    source?: SortOrder
    timestamp?: SortOrder
    userBottleCountId?: SortOrder
  }

  export type BottleCountMinOrderByAggregateInput = {
    id?: SortOrder
    deviceId?: SortOrder
    count?: SortOrder
    distance?: SortOrder
    source?: SortOrder
    timestamp?: SortOrder
    userBottleCountId?: SortOrder
  }

  export type BottleCountSumOrderByAggregateInput = {
    id?: SortOrder
    count?: SortOrder
    distance?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type UserBottleCountCreateNestedOneWithoutUserInput = {
    create?: XOR<UserBottleCountCreateWithoutUserInput, UserBottleCountUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserBottleCountCreateOrConnectWithoutUserInput
    connect?: UserBottleCountWhereUniqueInput
  }

  export type UserBottleCountUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<UserBottleCountCreateWithoutUserInput, UserBottleCountUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserBottleCountCreateOrConnectWithoutUserInput
    connect?: UserBottleCountWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserBottleCountUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserBottleCountCreateWithoutUserInput, UserBottleCountUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserBottleCountCreateOrConnectWithoutUserInput
    upsert?: UserBottleCountUpsertWithoutUserInput
    disconnect?: UserBottleCountWhereInput | boolean
    delete?: UserBottleCountWhereInput | boolean
    connect?: UserBottleCountWhereUniqueInput
    update?: XOR<XOR<UserBottleCountUpdateToOneWithWhereWithoutUserInput, UserBottleCountUpdateWithoutUserInput>, UserBottleCountUncheckedUpdateWithoutUserInput>
  }

  export type UserBottleCountUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserBottleCountCreateWithoutUserInput, UserBottleCountUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserBottleCountCreateOrConnectWithoutUserInput
    upsert?: UserBottleCountUpsertWithoutUserInput
    disconnect?: UserBottleCountWhereInput | boolean
    delete?: UserBottleCountWhereInput | boolean
    connect?: UserBottleCountWhereUniqueInput
    update?: XOR<XOR<UserBottleCountUpdateToOneWithWhereWithoutUserInput, UserBottleCountUpdateWithoutUserInput>, UserBottleCountUncheckedUpdateWithoutUserInput>
  }

  export type BottleCountCreateNestedManyWithoutUserBottleCountInput = {
    create?: XOR<BottleCountCreateWithoutUserBottleCountInput, BottleCountUncheckedCreateWithoutUserBottleCountInput> | BottleCountCreateWithoutUserBottleCountInput[] | BottleCountUncheckedCreateWithoutUserBottleCountInput[]
    connectOrCreate?: BottleCountCreateOrConnectWithoutUserBottleCountInput | BottleCountCreateOrConnectWithoutUserBottleCountInput[]
    createMany?: BottleCountCreateManyUserBottleCountInputEnvelope
    connect?: BottleCountWhereUniqueInput | BottleCountWhereUniqueInput[]
  }

  export type BottleTransactionCreateNestedManyWithoutUserBottleCountInput = {
    create?: XOR<BottleTransactionCreateWithoutUserBottleCountInput, BottleTransactionUncheckedCreateWithoutUserBottleCountInput> | BottleTransactionCreateWithoutUserBottleCountInput[] | BottleTransactionUncheckedCreateWithoutUserBottleCountInput[]
    connectOrCreate?: BottleTransactionCreateOrConnectWithoutUserBottleCountInput | BottleTransactionCreateOrConnectWithoutUserBottleCountInput[]
    createMany?: BottleTransactionCreateManyUserBottleCountInputEnvelope
    connect?: BottleTransactionWhereUniqueInput | BottleTransactionWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutBottleCountInput = {
    create?: XOR<UserCreateWithoutBottleCountInput, UserUncheckedCreateWithoutBottleCountInput>
    connectOrCreate?: UserCreateOrConnectWithoutBottleCountInput
    connect?: UserWhereUniqueInput
  }

  export type BottleCountUncheckedCreateNestedManyWithoutUserBottleCountInput = {
    create?: XOR<BottleCountCreateWithoutUserBottleCountInput, BottleCountUncheckedCreateWithoutUserBottleCountInput> | BottleCountCreateWithoutUserBottleCountInput[] | BottleCountUncheckedCreateWithoutUserBottleCountInput[]
    connectOrCreate?: BottleCountCreateOrConnectWithoutUserBottleCountInput | BottleCountCreateOrConnectWithoutUserBottleCountInput[]
    createMany?: BottleCountCreateManyUserBottleCountInputEnvelope
    connect?: BottleCountWhereUniqueInput | BottleCountWhereUniqueInput[]
  }

  export type BottleTransactionUncheckedCreateNestedManyWithoutUserBottleCountInput = {
    create?: XOR<BottleTransactionCreateWithoutUserBottleCountInput, BottleTransactionUncheckedCreateWithoutUserBottleCountInput> | BottleTransactionCreateWithoutUserBottleCountInput[] | BottleTransactionUncheckedCreateWithoutUserBottleCountInput[]
    connectOrCreate?: BottleTransactionCreateOrConnectWithoutUserBottleCountInput | BottleTransactionCreateOrConnectWithoutUserBottleCountInput[]
    createMany?: BottleTransactionCreateManyUserBottleCountInputEnvelope
    connect?: BottleTransactionWhereUniqueInput | BottleTransactionWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BottleCountUpdateManyWithoutUserBottleCountNestedInput = {
    create?: XOR<BottleCountCreateWithoutUserBottleCountInput, BottleCountUncheckedCreateWithoutUserBottleCountInput> | BottleCountCreateWithoutUserBottleCountInput[] | BottleCountUncheckedCreateWithoutUserBottleCountInput[]
    connectOrCreate?: BottleCountCreateOrConnectWithoutUserBottleCountInput | BottleCountCreateOrConnectWithoutUserBottleCountInput[]
    upsert?: BottleCountUpsertWithWhereUniqueWithoutUserBottleCountInput | BottleCountUpsertWithWhereUniqueWithoutUserBottleCountInput[]
    createMany?: BottleCountCreateManyUserBottleCountInputEnvelope
    set?: BottleCountWhereUniqueInput | BottleCountWhereUniqueInput[]
    disconnect?: BottleCountWhereUniqueInput | BottleCountWhereUniqueInput[]
    delete?: BottleCountWhereUniqueInput | BottleCountWhereUniqueInput[]
    connect?: BottleCountWhereUniqueInput | BottleCountWhereUniqueInput[]
    update?: BottleCountUpdateWithWhereUniqueWithoutUserBottleCountInput | BottleCountUpdateWithWhereUniqueWithoutUserBottleCountInput[]
    updateMany?: BottleCountUpdateManyWithWhereWithoutUserBottleCountInput | BottleCountUpdateManyWithWhereWithoutUserBottleCountInput[]
    deleteMany?: BottleCountScalarWhereInput | BottleCountScalarWhereInput[]
  }

  export type BottleTransactionUpdateManyWithoutUserBottleCountNestedInput = {
    create?: XOR<BottleTransactionCreateWithoutUserBottleCountInput, BottleTransactionUncheckedCreateWithoutUserBottleCountInput> | BottleTransactionCreateWithoutUserBottleCountInput[] | BottleTransactionUncheckedCreateWithoutUserBottleCountInput[]
    connectOrCreate?: BottleTransactionCreateOrConnectWithoutUserBottleCountInput | BottleTransactionCreateOrConnectWithoutUserBottleCountInput[]
    upsert?: BottleTransactionUpsertWithWhereUniqueWithoutUserBottleCountInput | BottleTransactionUpsertWithWhereUniqueWithoutUserBottleCountInput[]
    createMany?: BottleTransactionCreateManyUserBottleCountInputEnvelope
    set?: BottleTransactionWhereUniqueInput | BottleTransactionWhereUniqueInput[]
    disconnect?: BottleTransactionWhereUniqueInput | BottleTransactionWhereUniqueInput[]
    delete?: BottleTransactionWhereUniqueInput | BottleTransactionWhereUniqueInput[]
    connect?: BottleTransactionWhereUniqueInput | BottleTransactionWhereUniqueInput[]
    update?: BottleTransactionUpdateWithWhereUniqueWithoutUserBottleCountInput | BottleTransactionUpdateWithWhereUniqueWithoutUserBottleCountInput[]
    updateMany?: BottleTransactionUpdateManyWithWhereWithoutUserBottleCountInput | BottleTransactionUpdateManyWithWhereWithoutUserBottleCountInput[]
    deleteMany?: BottleTransactionScalarWhereInput | BottleTransactionScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutBottleCountNestedInput = {
    create?: XOR<UserCreateWithoutBottleCountInput, UserUncheckedCreateWithoutBottleCountInput>
    connectOrCreate?: UserCreateOrConnectWithoutBottleCountInput
    upsert?: UserUpsertWithoutBottleCountInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBottleCountInput, UserUpdateWithoutBottleCountInput>, UserUncheckedUpdateWithoutBottleCountInput>
  }

  export type BottleCountUncheckedUpdateManyWithoutUserBottleCountNestedInput = {
    create?: XOR<BottleCountCreateWithoutUserBottleCountInput, BottleCountUncheckedCreateWithoutUserBottleCountInput> | BottleCountCreateWithoutUserBottleCountInput[] | BottleCountUncheckedCreateWithoutUserBottleCountInput[]
    connectOrCreate?: BottleCountCreateOrConnectWithoutUserBottleCountInput | BottleCountCreateOrConnectWithoutUserBottleCountInput[]
    upsert?: BottleCountUpsertWithWhereUniqueWithoutUserBottleCountInput | BottleCountUpsertWithWhereUniqueWithoutUserBottleCountInput[]
    createMany?: BottleCountCreateManyUserBottleCountInputEnvelope
    set?: BottleCountWhereUniqueInput | BottleCountWhereUniqueInput[]
    disconnect?: BottleCountWhereUniqueInput | BottleCountWhereUniqueInput[]
    delete?: BottleCountWhereUniqueInput | BottleCountWhereUniqueInput[]
    connect?: BottleCountWhereUniqueInput | BottleCountWhereUniqueInput[]
    update?: BottleCountUpdateWithWhereUniqueWithoutUserBottleCountInput | BottleCountUpdateWithWhereUniqueWithoutUserBottleCountInput[]
    updateMany?: BottleCountUpdateManyWithWhereWithoutUserBottleCountInput | BottleCountUpdateManyWithWhereWithoutUserBottleCountInput[]
    deleteMany?: BottleCountScalarWhereInput | BottleCountScalarWhereInput[]
  }

  export type BottleTransactionUncheckedUpdateManyWithoutUserBottleCountNestedInput = {
    create?: XOR<BottleTransactionCreateWithoutUserBottleCountInput, BottleTransactionUncheckedCreateWithoutUserBottleCountInput> | BottleTransactionCreateWithoutUserBottleCountInput[] | BottleTransactionUncheckedCreateWithoutUserBottleCountInput[]
    connectOrCreate?: BottleTransactionCreateOrConnectWithoutUserBottleCountInput | BottleTransactionCreateOrConnectWithoutUserBottleCountInput[]
    upsert?: BottleTransactionUpsertWithWhereUniqueWithoutUserBottleCountInput | BottleTransactionUpsertWithWhereUniqueWithoutUserBottleCountInput[]
    createMany?: BottleTransactionCreateManyUserBottleCountInputEnvelope
    set?: BottleTransactionWhereUniqueInput | BottleTransactionWhereUniqueInput[]
    disconnect?: BottleTransactionWhereUniqueInput | BottleTransactionWhereUniqueInput[]
    delete?: BottleTransactionWhereUniqueInput | BottleTransactionWhereUniqueInput[]
    connect?: BottleTransactionWhereUniqueInput | BottleTransactionWhereUniqueInput[]
    update?: BottleTransactionUpdateWithWhereUniqueWithoutUserBottleCountInput | BottleTransactionUpdateWithWhereUniqueWithoutUserBottleCountInput[]
    updateMany?: BottleTransactionUpdateManyWithWhereWithoutUserBottleCountInput | BottleTransactionUpdateManyWithWhereWithoutUserBottleCountInput[]
    deleteMany?: BottleTransactionScalarWhereInput | BottleTransactionScalarWhereInput[]
  }

  export type UserBottleCountCreateNestedOneWithoutBottleTransactionsInput = {
    create?: XOR<UserBottleCountCreateWithoutBottleTransactionsInput, UserBottleCountUncheckedCreateWithoutBottleTransactionsInput>
    connectOrCreate?: UserBottleCountCreateOrConnectWithoutBottleTransactionsInput
    connect?: UserBottleCountWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserBottleCountUpdateOneRequiredWithoutBottleTransactionsNestedInput = {
    create?: XOR<UserBottleCountCreateWithoutBottleTransactionsInput, UserBottleCountUncheckedCreateWithoutBottleTransactionsInput>
    connectOrCreate?: UserBottleCountCreateOrConnectWithoutBottleTransactionsInput
    upsert?: UserBottleCountUpsertWithoutBottleTransactionsInput
    connect?: UserBottleCountWhereUniqueInput
    update?: XOR<XOR<UserBottleCountUpdateToOneWithWhereWithoutBottleTransactionsInput, UserBottleCountUpdateWithoutBottleTransactionsInput>, UserBottleCountUncheckedUpdateWithoutBottleTransactionsInput>
  }

  export type UserBottleCountCreateNestedOneWithoutBottleCountsInput = {
    create?: XOR<UserBottleCountCreateWithoutBottleCountsInput, UserBottleCountUncheckedCreateWithoutBottleCountsInput>
    connectOrCreate?: UserBottleCountCreateOrConnectWithoutBottleCountsInput
    connect?: UserBottleCountWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserBottleCountUpdateOneWithoutBottleCountsNestedInput = {
    create?: XOR<UserBottleCountCreateWithoutBottleCountsInput, UserBottleCountUncheckedCreateWithoutBottleCountsInput>
    connectOrCreate?: UserBottleCountCreateOrConnectWithoutBottleCountsInput
    upsert?: UserBottleCountUpsertWithoutBottleCountsInput
    disconnect?: UserBottleCountWhereInput | boolean
    delete?: UserBottleCountWhereInput | boolean
    connect?: UserBottleCountWhereUniqueInput
    update?: XOR<XOR<UserBottleCountUpdateToOneWithWhereWithoutBottleCountsInput, UserBottleCountUpdateWithoutBottleCountsInput>, UserBottleCountUncheckedUpdateWithoutBottleCountsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type UserBottleCountCreateWithoutUserInput = {
    id?: string
    totalBottles?: number
    redeemableCount?: number
    lifetimeCount?: number
    points?: number
    lifetimePoints?: number
    lastUpdated?: Date | string
    bottleCounts?: BottleCountCreateNestedManyWithoutUserBottleCountInput
    bottleTransactions?: BottleTransactionCreateNestedManyWithoutUserBottleCountInput
  }

  export type UserBottleCountUncheckedCreateWithoutUserInput = {
    id?: string
    totalBottles?: number
    redeemableCount?: number
    lifetimeCount?: number
    points?: number
    lifetimePoints?: number
    lastUpdated?: Date | string
    bottleCounts?: BottleCountUncheckedCreateNestedManyWithoutUserBottleCountInput
    bottleTransactions?: BottleTransactionUncheckedCreateNestedManyWithoutUserBottleCountInput
  }

  export type UserBottleCountCreateOrConnectWithoutUserInput = {
    where: UserBottleCountWhereUniqueInput
    create: XOR<UserBottleCountCreateWithoutUserInput, UserBottleCountUncheckedCreateWithoutUserInput>
  }

  export type UserBottleCountUpsertWithoutUserInput = {
    update: XOR<UserBottleCountUpdateWithoutUserInput, UserBottleCountUncheckedUpdateWithoutUserInput>
    create: XOR<UserBottleCountCreateWithoutUserInput, UserBottleCountUncheckedCreateWithoutUserInput>
    where?: UserBottleCountWhereInput
  }

  export type UserBottleCountUpdateToOneWithWhereWithoutUserInput = {
    where?: UserBottleCountWhereInput
    data: XOR<UserBottleCountUpdateWithoutUserInput, UserBottleCountUncheckedUpdateWithoutUserInput>
  }

  export type UserBottleCountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalBottles?: IntFieldUpdateOperationsInput | number
    redeemableCount?: IntFieldUpdateOperationsInput | number
    lifetimeCount?: IntFieldUpdateOperationsInput | number
    points?: IntFieldUpdateOperationsInput | number
    lifetimePoints?: IntFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    bottleCounts?: BottleCountUpdateManyWithoutUserBottleCountNestedInput
    bottleTransactions?: BottleTransactionUpdateManyWithoutUserBottleCountNestedInput
  }

  export type UserBottleCountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalBottles?: IntFieldUpdateOperationsInput | number
    redeemableCount?: IntFieldUpdateOperationsInput | number
    lifetimeCount?: IntFieldUpdateOperationsInput | number
    points?: IntFieldUpdateOperationsInput | number
    lifetimePoints?: IntFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    bottleCounts?: BottleCountUncheckedUpdateManyWithoutUserBottleCountNestedInput
    bottleTransactions?: BottleTransactionUncheckedUpdateManyWithoutUserBottleCountNestedInput
  }

  export type BottleCountCreateWithoutUserBottleCountInput = {
    deviceId: string
    count?: number
    distance?: number | null
    source?: string
    timestamp?: Date | string
  }

  export type BottleCountUncheckedCreateWithoutUserBottleCountInput = {
    id?: number
    deviceId: string
    count?: number
    distance?: number | null
    source?: string
    timestamp?: Date | string
  }

  export type BottleCountCreateOrConnectWithoutUserBottleCountInput = {
    where: BottleCountWhereUniqueInput
    create: XOR<BottleCountCreateWithoutUserBottleCountInput, BottleCountUncheckedCreateWithoutUserBottleCountInput>
  }

  export type BottleCountCreateManyUserBottleCountInputEnvelope = {
    data: BottleCountCreateManyUserBottleCountInput | BottleCountCreateManyUserBottleCountInput[]
    skipDuplicates?: boolean
  }

  export type BottleTransactionCreateWithoutUserBottleCountInput = {
    id?: string
    bottleCountId?: number | null
    deviceId?: string | null
    transactionType: string
    bottleCount: number
    pointsEarned?: number
    timestamp?: Date | string
  }

  export type BottleTransactionUncheckedCreateWithoutUserBottleCountInput = {
    id?: string
    bottleCountId?: number | null
    deviceId?: string | null
    transactionType: string
    bottleCount: number
    pointsEarned?: number
    timestamp?: Date | string
  }

  export type BottleTransactionCreateOrConnectWithoutUserBottleCountInput = {
    where: BottleTransactionWhereUniqueInput
    create: XOR<BottleTransactionCreateWithoutUserBottleCountInput, BottleTransactionUncheckedCreateWithoutUserBottleCountInput>
  }

  export type BottleTransactionCreateManyUserBottleCountInputEnvelope = {
    data: BottleTransactionCreateManyUserBottleCountInput | BottleTransactionCreateManyUserBottleCountInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutBottleCountInput = {
    id?: string
    email: string
    createdAt?: Date | string
    nama: string
    password: string
    phoneNumber: string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutBottleCountInput = {
    id?: string
    email: string
    createdAt?: Date | string
    nama: string
    password: string
    phoneNumber: string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutBottleCountInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBottleCountInput, UserUncheckedCreateWithoutBottleCountInput>
  }

  export type BottleCountUpsertWithWhereUniqueWithoutUserBottleCountInput = {
    where: BottleCountWhereUniqueInput
    update: XOR<BottleCountUpdateWithoutUserBottleCountInput, BottleCountUncheckedUpdateWithoutUserBottleCountInput>
    create: XOR<BottleCountCreateWithoutUserBottleCountInput, BottleCountUncheckedCreateWithoutUserBottleCountInput>
  }

  export type BottleCountUpdateWithWhereUniqueWithoutUserBottleCountInput = {
    where: BottleCountWhereUniqueInput
    data: XOR<BottleCountUpdateWithoutUserBottleCountInput, BottleCountUncheckedUpdateWithoutUserBottleCountInput>
  }

  export type BottleCountUpdateManyWithWhereWithoutUserBottleCountInput = {
    where: BottleCountScalarWhereInput
    data: XOR<BottleCountUpdateManyMutationInput, BottleCountUncheckedUpdateManyWithoutUserBottleCountInput>
  }

  export type BottleCountScalarWhereInput = {
    AND?: BottleCountScalarWhereInput | BottleCountScalarWhereInput[]
    OR?: BottleCountScalarWhereInput[]
    NOT?: BottleCountScalarWhereInput | BottleCountScalarWhereInput[]
    id?: IntFilter<"BottleCount"> | number
    deviceId?: StringFilter<"BottleCount"> | string
    count?: IntFilter<"BottleCount"> | number
    distance?: FloatNullableFilter<"BottleCount"> | number | null
    source?: StringFilter<"BottleCount"> | string
    timestamp?: DateTimeFilter<"BottleCount"> | Date | string
    userBottleCountId?: StringNullableFilter<"BottleCount"> | string | null
  }

  export type BottleTransactionUpsertWithWhereUniqueWithoutUserBottleCountInput = {
    where: BottleTransactionWhereUniqueInput
    update: XOR<BottleTransactionUpdateWithoutUserBottleCountInput, BottleTransactionUncheckedUpdateWithoutUserBottleCountInput>
    create: XOR<BottleTransactionCreateWithoutUserBottleCountInput, BottleTransactionUncheckedCreateWithoutUserBottleCountInput>
  }

  export type BottleTransactionUpdateWithWhereUniqueWithoutUserBottleCountInput = {
    where: BottleTransactionWhereUniqueInput
    data: XOR<BottleTransactionUpdateWithoutUserBottleCountInput, BottleTransactionUncheckedUpdateWithoutUserBottleCountInput>
  }

  export type BottleTransactionUpdateManyWithWhereWithoutUserBottleCountInput = {
    where: BottleTransactionScalarWhereInput
    data: XOR<BottleTransactionUpdateManyMutationInput, BottleTransactionUncheckedUpdateManyWithoutUserBottleCountInput>
  }

  export type BottleTransactionScalarWhereInput = {
    AND?: BottleTransactionScalarWhereInput | BottleTransactionScalarWhereInput[]
    OR?: BottleTransactionScalarWhereInput[]
    NOT?: BottleTransactionScalarWhereInput | BottleTransactionScalarWhereInput[]
    id?: StringFilter<"BottleTransaction"> | string
    userBottleCountId?: StringFilter<"BottleTransaction"> | string
    bottleCountId?: IntNullableFilter<"BottleTransaction"> | number | null
    deviceId?: StringNullableFilter<"BottleTransaction"> | string | null
    transactionType?: StringFilter<"BottleTransaction"> | string
    bottleCount?: IntFilter<"BottleTransaction"> | number
    pointsEarned?: IntFilter<"BottleTransaction"> | number
    timestamp?: DateTimeFilter<"BottleTransaction"> | Date | string
  }

  export type UserUpsertWithoutBottleCountInput = {
    update: XOR<UserUpdateWithoutBottleCountInput, UserUncheckedUpdateWithoutBottleCountInput>
    create: XOR<UserCreateWithoutBottleCountInput, UserUncheckedCreateWithoutBottleCountInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBottleCountInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBottleCountInput, UserUncheckedUpdateWithoutBottleCountInput>
  }

  export type UserUpdateWithoutBottleCountInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    nama?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutBottleCountInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    nama?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserBottleCountCreateWithoutBottleTransactionsInput = {
    id?: string
    totalBottles?: number
    redeemableCount?: number
    lifetimeCount?: number
    points?: number
    lifetimePoints?: number
    lastUpdated?: Date | string
    bottleCounts?: BottleCountCreateNestedManyWithoutUserBottleCountInput
    user: UserCreateNestedOneWithoutBottleCountInput
  }

  export type UserBottleCountUncheckedCreateWithoutBottleTransactionsInput = {
    id?: string
    userId: string
    totalBottles?: number
    redeemableCount?: number
    lifetimeCount?: number
    points?: number
    lifetimePoints?: number
    lastUpdated?: Date | string
    bottleCounts?: BottleCountUncheckedCreateNestedManyWithoutUserBottleCountInput
  }

  export type UserBottleCountCreateOrConnectWithoutBottleTransactionsInput = {
    where: UserBottleCountWhereUniqueInput
    create: XOR<UserBottleCountCreateWithoutBottleTransactionsInput, UserBottleCountUncheckedCreateWithoutBottleTransactionsInput>
  }

  export type UserBottleCountUpsertWithoutBottleTransactionsInput = {
    update: XOR<UserBottleCountUpdateWithoutBottleTransactionsInput, UserBottleCountUncheckedUpdateWithoutBottleTransactionsInput>
    create: XOR<UserBottleCountCreateWithoutBottleTransactionsInput, UserBottleCountUncheckedCreateWithoutBottleTransactionsInput>
    where?: UserBottleCountWhereInput
  }

  export type UserBottleCountUpdateToOneWithWhereWithoutBottleTransactionsInput = {
    where?: UserBottleCountWhereInput
    data: XOR<UserBottleCountUpdateWithoutBottleTransactionsInput, UserBottleCountUncheckedUpdateWithoutBottleTransactionsInput>
  }

  export type UserBottleCountUpdateWithoutBottleTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalBottles?: IntFieldUpdateOperationsInput | number
    redeemableCount?: IntFieldUpdateOperationsInput | number
    lifetimeCount?: IntFieldUpdateOperationsInput | number
    points?: IntFieldUpdateOperationsInput | number
    lifetimePoints?: IntFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    bottleCounts?: BottleCountUpdateManyWithoutUserBottleCountNestedInput
    user?: UserUpdateOneRequiredWithoutBottleCountNestedInput
  }

  export type UserBottleCountUncheckedUpdateWithoutBottleTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    totalBottles?: IntFieldUpdateOperationsInput | number
    redeemableCount?: IntFieldUpdateOperationsInput | number
    lifetimeCount?: IntFieldUpdateOperationsInput | number
    points?: IntFieldUpdateOperationsInput | number
    lifetimePoints?: IntFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    bottleCounts?: BottleCountUncheckedUpdateManyWithoutUserBottleCountNestedInput
  }

  export type UserBottleCountCreateWithoutBottleCountsInput = {
    id?: string
    totalBottles?: number
    redeemableCount?: number
    lifetimeCount?: number
    points?: number
    lifetimePoints?: number
    lastUpdated?: Date | string
    bottleTransactions?: BottleTransactionCreateNestedManyWithoutUserBottleCountInput
    user: UserCreateNestedOneWithoutBottleCountInput
  }

  export type UserBottleCountUncheckedCreateWithoutBottleCountsInput = {
    id?: string
    userId: string
    totalBottles?: number
    redeemableCount?: number
    lifetimeCount?: number
    points?: number
    lifetimePoints?: number
    lastUpdated?: Date | string
    bottleTransactions?: BottleTransactionUncheckedCreateNestedManyWithoutUserBottleCountInput
  }

  export type UserBottleCountCreateOrConnectWithoutBottleCountsInput = {
    where: UserBottleCountWhereUniqueInput
    create: XOR<UserBottleCountCreateWithoutBottleCountsInput, UserBottleCountUncheckedCreateWithoutBottleCountsInput>
  }

  export type UserBottleCountUpsertWithoutBottleCountsInput = {
    update: XOR<UserBottleCountUpdateWithoutBottleCountsInput, UserBottleCountUncheckedUpdateWithoutBottleCountsInput>
    create: XOR<UserBottleCountCreateWithoutBottleCountsInput, UserBottleCountUncheckedCreateWithoutBottleCountsInput>
    where?: UserBottleCountWhereInput
  }

  export type UserBottleCountUpdateToOneWithWhereWithoutBottleCountsInput = {
    where?: UserBottleCountWhereInput
    data: XOR<UserBottleCountUpdateWithoutBottleCountsInput, UserBottleCountUncheckedUpdateWithoutBottleCountsInput>
  }

  export type UserBottleCountUpdateWithoutBottleCountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalBottles?: IntFieldUpdateOperationsInput | number
    redeemableCount?: IntFieldUpdateOperationsInput | number
    lifetimeCount?: IntFieldUpdateOperationsInput | number
    points?: IntFieldUpdateOperationsInput | number
    lifetimePoints?: IntFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    bottleTransactions?: BottleTransactionUpdateManyWithoutUserBottleCountNestedInput
    user?: UserUpdateOneRequiredWithoutBottleCountNestedInput
  }

  export type UserBottleCountUncheckedUpdateWithoutBottleCountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    totalBottles?: IntFieldUpdateOperationsInput | number
    redeemableCount?: IntFieldUpdateOperationsInput | number
    lifetimeCount?: IntFieldUpdateOperationsInput | number
    points?: IntFieldUpdateOperationsInput | number
    lifetimePoints?: IntFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    bottleTransactions?: BottleTransactionUncheckedUpdateManyWithoutUserBottleCountNestedInput
  }

  export type BottleCountCreateManyUserBottleCountInput = {
    id?: number
    deviceId: string
    count?: number
    distance?: number | null
    source?: string
    timestamp?: Date | string
  }

  export type BottleTransactionCreateManyUserBottleCountInput = {
    id?: string
    bottleCountId?: number | null
    deviceId?: string | null
    transactionType: string
    bottleCount: number
    pointsEarned?: number
    timestamp?: Date | string
  }

  export type BottleCountUpdateWithoutUserBottleCountInput = {
    deviceId?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    distance?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BottleCountUncheckedUpdateWithoutUserBottleCountInput = {
    id?: IntFieldUpdateOperationsInput | number
    deviceId?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    distance?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BottleCountUncheckedUpdateManyWithoutUserBottleCountInput = {
    id?: IntFieldUpdateOperationsInput | number
    deviceId?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    distance?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BottleTransactionUpdateWithoutUserBottleCountInput = {
    id?: StringFieldUpdateOperationsInput | string
    bottleCountId?: NullableIntFieldUpdateOperationsInput | number | null
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionType?: StringFieldUpdateOperationsInput | string
    bottleCount?: IntFieldUpdateOperationsInput | number
    pointsEarned?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BottleTransactionUncheckedUpdateWithoutUserBottleCountInput = {
    id?: StringFieldUpdateOperationsInput | string
    bottleCountId?: NullableIntFieldUpdateOperationsInput | number | null
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionType?: StringFieldUpdateOperationsInput | string
    bottleCount?: IntFieldUpdateOperationsInput | number
    pointsEarned?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BottleTransactionUncheckedUpdateManyWithoutUserBottleCountInput = {
    id?: StringFieldUpdateOperationsInput | string
    bottleCountId?: NullableIntFieldUpdateOperationsInput | number | null
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionType?: StringFieldUpdateOperationsInput | string
    bottleCount?: IntFieldUpdateOperationsInput | number
    pointsEarned?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}