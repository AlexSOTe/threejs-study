<template>
  <main>
    <canvas ref="canvas"></canvas>
  </main>
</template>

<script setup lang="ts">
  import * as THREE from 'three';
  import { onMounted, ref } from 'vue';
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
  import { initShaders } from '../utils/tools';


  const canvas = ref<HTMLCanvasElement | null>(null);

  onMounted(() => {
    const cvs = canvas.value!;
    Init(cvs);
  });
  function Init(cvs: HTMLCanvasElement) {
    cvs.width = window.innerWidth;
    cvs.height = window.innerHeight;
    //顶点着色器
    const vsSource = `
void main() {
  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
  gl_PointSize = 100.0;
}
`;
    //片元着色器
    const fsSource = `
void main() {
  gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
}
`;

    const gl = cvs.getContext('webgl')!;
    //初始化着色器
    //功能：解析着色器文本，整合到程序对象，关联webgl上下文对象，实现两种语言的相互通信
    initShaders(gl, vsSource, fsSource);

    gl.clearColor(0, 0, 0, 1);
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
