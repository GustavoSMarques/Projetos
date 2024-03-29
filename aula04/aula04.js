
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'uniform vec4 u_Translation;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position + u_Translation;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n' +
  '}\n';

// The translation distance for x, y, and z direction
var Tx = 0.0, Ty = 0.0, Tz = 0.0;

function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // Write the positions of vertices to a vertex shader
  var n = initVertexBuffers(gl);
  if (n < 0) {
    console.log('Failed to set the positions of the vertices');
    return;
  }

  // Pass the translation distance to the vertex shader
  var u_Translation = gl.getUniformLocation(gl.program, 'u_Translation');
  if (!u_Translation) {
    console.log('Failed to get the storage location of u_Translation');
    return;
  }
  gl.uniform4f(u_Translation, Tx, Ty, Tz, 0.0, 0.0);

  // Specify the color for clearing <canvas>
  gl.clearColor(0.2, 0.3, 0.3, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Draw the rectangle
  var linha = 0;
  for(var i=1; i <= 8; i++)
  {
    for (var j=1; j <= 5; j++)
    {
    gl.drawArrays(gl.TRIANGLES, 0, n);
    gl.uniform4f(u_Translation, Tx, Ty, Tz, 0.0);
    Tx = Tx + 0.50;
    }   
    if (i == 1 || i == 3 || i == 5 || i == 7){
      Tx = 0.25;
    }
    else{
      Tx = 0.00;
    }
    Ty = Ty - 0.25;
    var linha = 1;  
  }  
}

function initVertexBuffers(gl) {
  var vertices = new Float32Array([
    -1.0, 1.0, 0.0,   
    -0.75, 1.0, 0.0,   
    -1.0, 0.75, 0.0,
    -1.0, 0.75, 0.0,
    -0.75, 0.75, 0.0,
    -0.75, 1.0, 0.0, 
  ]);


  var n = 6; // The number of vertices

  // Create a buffer object
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);


  // Assign the buffer object to the attribute variable
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);

  return n;
}
