const index = (imageBlob, options) => (
  `<body>
    <canvas id='canvas'></canvas>
    <script>
      (function(){
        const promiseChain = Promise.resolve();
        let callbacks = {};
        let init = function() {

        function guid() {
          function s4() {
              return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }

        window.webViewBridge = {
          send: function(targetFunc, data, success, error) {

            const msgObj = {
                targetFunc: targetFunc,
                data: data || {}
            };

            if (success || error) {
                msgObj.msgId = guid();
            }

            const msg = JSON.stringify(msgObj);
            promiseChain = promiseChain.then(function () {
              return new Promise(function (resolve, reject) {
                console.log('sending message ' + msgObj.targetFunc);

                if (msgObj.msgId) {
                    callbacks[msgObj.msgId] = {
                        onsuccess: success,
                        onerror: error
                    };
                }

                window.postMessage(msg);
                resolve();
              })
            }).catch(function (e) {
              console.error('rnBridge send failed ' + e.message);
            });
          },
        };

        window.document.addEventListener('message', function(e) {
          console.log('message received from react native');
          let message;

          try {
              message = JSON.parse(e.data);
          }
          catch(err) {
              console.error('failed to parse message from react-native ' + err);
              return;
          }

          if (message.args && callbacks[message.msgId]) {
            if (message.isSuccessfull) {
                callbacks[message.msgId].onsuccess.apply(null, message.args);
            }
            else {
                callbacks[message.msgId].onerror.apply(null, message.args);
            }
            delete callbacks[message.msgId];
          }
        });
      };
    init();
    }());

    loadImage();

    function loadImage() {
      const canvas = document.getElementById('canvas');
      canvas.style.display = 'none';
      const ctx = canvas.getContext('2d');
      let image = new Image();
      image.onload = function() {
        ctx.drawImage(image, 0, 0);
      };
      image.src = '${imageBlob}';
    }
    document.addEventListener("message", function(data) {
      function getPixelData() {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, ${options.width}, ${options.height});
        const data = {data: imageData.data, name: 'getPixelData'};
        return JSON.stringify(data);
      }

      function setPixelData(pixelData) {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        ctx.putImageData(pixelData, 0, 0);
        const data = {data: canvas.toDataURL(), name: 'setPixelData'};
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
      window.webViewBridge.send('handleDataReceived', message, function(res) {
        console.log('WebView sent data successfully');
      }, function(err) {
        console.log('WebView receiving data error ' + err);
      });
    });
    </script>
  </body>`);

export default index;

