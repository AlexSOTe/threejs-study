/**
 * 关键帧
 */
interface IFm {
  /**
   * 关键帧所在时间点
   */
  time: number;
  /**
   * 动画属性对应的值
   */
  value: number;
}

/**
 * 线性补间算法，公式：y = kx + b
 * @param localTime 本地时间
 * @param fms 关键帧集合
 * @param last 最后一个关键帧的索引
 */
function getValBetweenFms(localTime: number, fms: IFm[], last: number) {
  for (let i = 0; i < last; i++) {
    const fm1 = fms[i];
    const fm2 = fms[i + 1];
    //判断本地时间是否在两个关键帧之间
    if (localTime >= fm1.time && localTime <= fm2.time) {
      const x = fm2.time - fm1.time;
      const y = fm2.value - fm1.value;
      const k = y / x;
      const b = y - k * x;
      return k * localTime + b;
    }
  }
}


/**
 * 轨道
 */
export class Track {
  //时间轨道上的目标对象，待添加动画的对象，以下简称目标对象
  target: ICompose;
  //目标对象的父对象
  parent: ICompose | null;
  //目标对象轨道的建立时间
  start: number;
  //目标对象所占轨道的时长
  timeLen: number;
  //是否循环
  loop: boolean;
  //目标对象的属性集合
  keyMap: Map<string, IFm[]>;

  /**
   * 时间轨道上的目标对象
   * @param target
   */
  constructor(target: ICompose) {
    this.target = target;
    this.parent = null;
    this.start = 0;
    this.timeLen = 5;
    this.loop = false;
    this.keyMap = new Map<string, IFm[]>();
  }
  update(globalTime: number) {
    const { keyMap, timeLen, target, loop } = this;
    //本地时间 = 世界时间 - 目标对象开始时间
    let localTime = globalTime - this.start;
    if (loop) {
      //根据本地时间轨长度取余后的本地时间
      localTime = localTime % timeLen;
    }
    // 遍历目标对象属性集合
    for (const [key, fms] of keyMap.entries()) {
      //fms：某个属性的关键帧集合
      // 最后一个关键帧的索引
      const last = fms.length - 1;
      //本地时间在第一个关键帧之前
      if (localTime < fms[0].time) {
        target[key] = fms[0].value;
      }
      //本地时间在最后一个关键帧之后
      else if (localTime > fms[last].time) {
        target[key] = fms[last].value;
      }
      //本地时间在第一个关键帧和最后一个关键帧之间（包含这两个关键帧）
      else {
        target[key] = getValBetweenFms(localTime, fms, last);
      }
    }
  }
}
