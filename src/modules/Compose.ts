

export class Compose {
  parent: ICompose | null;
  children: ICompose[];

  constructor() {
    this.parent = null;
    this.children = [];
  }

  add(obj: ICompose) {
    obj.parent = this;
    this.children.push(obj);
  }
  /**
   * 基于世界时间更新
   * @param globalTime 世界时间
   */
  update(globalTime: number) {
    this.children.forEach(v => {
      v.update(globalTime);
    });
  }
}
