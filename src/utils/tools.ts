
export function initShaders(gl: any, vsSource: string, fsSource: string) {
  //创建程序对象
  const program = gl.createProgram();
  //建立着色器对象
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  //建立片元着色器
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
  //把顶点着色器对象装进程序对象中
  gl.attachShader(program, vertexShader);
  //把片元着色器对象装进程序对象中
  gl.attachShader(program, fragmentShader);
  //连接webgl上下文对象
  gl.linkProgram(program);
  //启动程序对象
  gl.useProgram(program);
  //将程序对象挂到上下文对象上
  gl.program = program;
  return true;
}

export function loadShader(gl: any, type: number, source: string) {
  //根据着色类型，建立着色器对象
  const shader = gl.createShader(type);
  //将着色器源文件传入着色器对象
  gl.shaderSource(shader, source);
  //编译着色器对象
  gl.compileShader(shader);
  //返回着色器对象
  return shader;
}
