
export interface IArguments {
  min?: number;
  max?: number;
  regExp?: RegExp;
  emptyError?: string;
  scopedError?: string;
  regExpError?: string;
}

export interface IOrigin{
  [propName: string]: any;
}