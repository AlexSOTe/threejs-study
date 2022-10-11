import type { Track } from "./Track";

/**
 * 线性补间算法，公式：y = kx + b
 * @param localTime 本地时间
 * @param fms 关键帧集合
 * @param last 最后一个关键帧的索引
 */
function getValBetweenFms(localTime: number, fms: IFm[], last: number): number | undefined {
  for (let i = 0; i < last; i++) {
    const fm1 = fms[i];
    const fm2 = fms[i + 1];
    //判断本地时间是否在两个关键帧之间
    if (
      fm1 &&
      fm2 &&
      localTime >= fm1.time &&
      localTime <= fm2.time
    ) {
      //两关键帧之间的时间差
      const betTime = fm2.time - fm1.time;
      //两关键帧之间的值差
      const betValue = fm2.value - fm1.value;
      //斜率
      const k = betValue / betTime;
      //求出b, b = y - kx
      const b = fm1.value - fm1.time * k;
      const val = k * localTime + b;
      return val;
    }
  }
}


/**
 * 轨道对象
 */
export class SubTrack {
  //时间轨道上的目标对象，待添加动画的对象，以下简称目标对象
  target: IStar;
  //目标对象的父对象
  parent: Track | null;
  //目标对象轨道的建立时间
  start: number;
  //目标对象所占轨道的时长
  timeLen: number;
  //是否循环
  loop: boolean;

  /**
   * 时间轨道上的目标对象
   * @param target
   */
  constructor(target: IStar) {
    this.target = target;
    this.parent = null;
    this.start = 0;
    this.timeLen = 5;
    this.loop = false;
  }
  update(globalTime: number) {
    const { timeLen, target, loop } = this;
    //本地时间 = 世界时间 - 目标对象开始时间
    let localTime = globalTime - this.start;
    if (loop) {
      //根据本地时间轨长度取余后的本地时间
      localTime = localTime % timeLen;
    }
    // 遍历目标对象属性集合。fms：某个属性的关键帧集合
    for (const [key, fms] of target.fms) {
      // 最后一个关键帧的索引
      const last = fms.length - 1;
      //本地时间在第一个关键帧之前
      if (localTime < fms[0].time) {
        //@ts-ignore
        target[key] = fms[0].value;
      }
      //本地时间在最后一个关键帧之后
      else if (localTime > fms[last].time) {
        //@ts-ignore
        target[key] = fms[last].value;
      }
      //本地时间在第一个关键帧和最后一个关键帧之间（包含这两个关键帧）
      else {
        //@ts-ignore
        target[key] = getValBetweenFms(localTime, fms, last);
      }
    }
  }
}
