export type Prettify<T> = T;

export type FirstChild<T> = T extends { [key: string]: infer U } ? U : never

export type NonEmptyArray<T> = [T, ...T[]]