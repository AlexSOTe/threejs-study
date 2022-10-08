declare interface WebGLRenderingContext {
  [key: string]: any;
}
declare interface IAnyObject {
  [key: string]: any;
}

declare interface ICompose extends IAnyObject {
  parent: ICompose | null;
  children: ICompose[];
  add: (obj: ICompose) => void;
  update: (t: number) => void;
}
