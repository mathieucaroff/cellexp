export type Result<
   TResult,
   TType extends string | undefined = undefined,
   TData extends Record<string, any> = Record<string, any>
> =
   | {
        error: true
        info?: (TType extends undefined ? {} : { type: TType }) & {
           message: string
           data: TData
        }
     }
   | { error: false; result: TResult }
