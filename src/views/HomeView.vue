<template>
  <main>
    <canvas ref="canvas"></canvas>
  </main>
</template>

<script setup lang="ts">
  import * as THREE from "three";
  import { onMounted, ref } from "vue";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
  import { initShaders } from "../utils/tools";


  const canvas = ref<HTMLCanvasElement | null>(null);

  onMounted(() => {
    const cvs = canvas.value!;
    Init(cvs);
  });

  function Init(cvs: HTMLCanvasElement) {
    cvs.addEventListener('mousemove', (evt: MouseEvent) => {
      const { clientX, clientY } = evt;
      const { left, top } = cvs.getBoundingClientRect();
      //获取到鼠标再canvas中点击的位置
      const [mX, mY] = [clientX - left, clientY - top];
      console.log("鼠标css点击位置：", mX, mY);
      //坐标系转换
      const hafCvsW = cvs.width / 2;
      const hafCvsH = cvs.height / 2;
      const [x, y] = [mX - hafCvsW, -(mY - hafCvsH)];
      console.log("鼠标webgl坐标点击位置：", x, y);

      //设置点的位置
      const a_Position = gl.getAttribLocation(gl.program, "a_Position");
      gl.vertexAttrib2f(a_Position, x / hafCvsW, y / hafCvsH);


      //刷底色
      gl.clear(gl.COLOR_BUFFER_BIT);
      //绘制顶点
      gl.drawArrays(gl.POINTS, 0, 1);
    });
    cvs.width = window.innerWidth;
    cvs.height = window.innerHeight;
    //顶点着色器
    const vsSource = `
attribute vec4 a_Position;
void main() {
  //attribute的意思类似与js的export，导出让外部使用，并且可以修改
  gl_Position = a_Position;
  gl_PointSize = 50.0;
}
`;
    //片元着色器
    const fsSource = `
void main() {
  gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
}
`;

    const gl = cvs.getContext("webgl")!;
    //初始化着色器
    //功能：解析着色器文本，整合到程序对象，关联webgl上下文对象，实现两种语言的相互通信
    initShaders(gl, vsSource, fsSource);

    //设置attribute变量
    //获取到着色器语言里面的变量
    const a_Position = gl.getAttribLocation(gl.program, "a_Position");
    //修改获取到的变量
    //vertexAttrib1f(变量名,x)
    //vertexAttrib2f(变量名,x,y)
    //vertexAttrib3f(变量名,x,y,z)
    //vertexAttrib4f(变量名,x,y,z,方向)
    //设置点的位置
    //gl.vertexAttrib2f(a_Position, 0.0, 1.0);
    //gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);

    //声明颜色
    gl.clearColor(0, 0, 0, 1);
    //刷底色
    gl.clear(gl.COLOR_BUFFER_BIT);

    //绘制顶点
    gl.drawArrays(gl.POINTS, 0, 1);
  }
</script>

<style scoped lang="scss">
  main {
    width: 100vw;
    height: 100vh;
  }
</style>
