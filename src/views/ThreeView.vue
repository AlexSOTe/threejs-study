<template>
  <main ref="canvas"></main>
</template>

<script setup lang="ts">
  import * as THREE from 'three';
  import { onMounted, ref } from 'vue';
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"


  const canvas = ref<HTMLDivElement | null>(null);

  onMounted(() => {
    Init();
  });
  function Init() {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(103, window.innerWidth / window.innerHeight, 0.1, 2000);
    scene.add(camera);
    camera.position.set(0, 100, 1000);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1000, 1000, 1000);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(light);

    const axis = new THREE.AxesHelper(500);
    scene.add(axis);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvas.value?.append(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;

    const sphereGeometry = new THREE.SphereGeometry(100, 50, 50);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(0, 0, 0);
    scene.add(sphere);

    function Start() {
      requestAnimationFrame(Start);
      renderer.render(scene, camera);
    }
    Start();

    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight);

    });
  }
</script>

<style scoped lang="scss">
  main {
    width: 100vw;
    height: 100vh;
  }
</style>
