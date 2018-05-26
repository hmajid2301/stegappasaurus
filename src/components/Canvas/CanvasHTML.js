const renderHTML = (imageBlob, options) => (
  `
  <body>
    <canvas id="canvas"></canvas>
    <script>
       loadImage();

       function loadImage() {
         const canvas = document.getElementById("canvas");
         canvas.style.display = "none";
         const ctx = canvas.getContext("2d");
         let image = new Image();
         image.onload = function() {
           ctx.drawImage(image, 0, 0);
         };
         image.src = '${imageBlob}';
       }

       document.addEventListener("message", function(data) {
         function getPixelData() {
           const canvas = document.getElementById("canvas");
           const ctx = canvas.getContext("2d");
           const imageData = ctx.getImageData(0, 0, ${options.width}, ${options.height});
           const data = {data: imageData.data, functionName: 'getPixelData'};
           return JSON.stringify(data);
         }

         function setPixelData(pixelData) {
           const canvas = document.getElementById("canvas");
           const ctx = canvas.getContext("2d");
           ctx.putImageData(pixelData, 0, 0);
           const data = {data: canvas.toDataURL(), functionName: 'setPixelData'};
           return JSON.stringify(data);
         }

         let inputData = JSON.parse(data.data);
         const funcName = inputData.name;
         const args = inputData.args;
         let message = '';
         
         switch(funcName) {
           case 'getPixelData':
             message = getPixelData();
             break;
             
           case 'setPixelData':
             message = setPixelData(args);
             break;
             
           default:
             message = 'error';
             break;
         }
         window.postMessage(message);
       });
    </script>
  </body>
  `
);

export default renderHTML;

