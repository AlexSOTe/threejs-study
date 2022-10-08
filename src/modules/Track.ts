import type { SubTrack } from "./SubTrack";

/** 
 * 全局轨道
 */
export class Track {
  parent: Track | null;
  children: SubTrack[];

  constructor() {
    this.parent = null;
    this.children = [];
  }

  add(obj: SubTrack) {
    obj.parent = this;
    this.children.push(obj);
  }
  /**
   * 基于世界时间更新
   * @param globalTime 世界时间
   */
  update(globalTime: number) {
    this.children.forEach(v => v.update(globalTime));
  }
}
