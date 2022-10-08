declare interface WebGLRenderingContext {
  [key: string]: any;
}
declare interface IAnyObject {
  [key: string]: any;
}

/**
 * �ؼ�֡
 */
declare interface IFm {
  /**
   * �ؼ�֡����ʱ���
   */
  time: number;
  /**
   * �������Զ�Ӧ��ֵ
   */
  value: number;
}

declare interface IStar {
  x: number;
  y: number;
  size: number;
  colorR: number;
  colorG: number;
  colorB: number;
  colorA: number;
  fms: Map<string, IFm[]>;
}