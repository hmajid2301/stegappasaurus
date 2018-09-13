import Expo from 'expo';
import React, { Component } from 'react';

import MyApp from './src/Routes';


const robotoThinPath = require('./assets/fonts/Roboto-Thin.ttf');


export default class App extends Component {
  constructor() {
    super();
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'roboto-thin': robotoThinPath,
    });
    this.setState({ loading: false });
  }
  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    return (
      <MyApp />
    );
  }
}

// import React, { Component } from "react";
// import { StyleSheet, Text, View, WebView, Button } from "react-native";

// export default class App extends Component<{}> {

//   constructor(props) {
//     super(props);

//     this.state = {
//       text: "ReactNative Sample"
//     };

//     this.onWebViewMessage = this.onWebViewMessage.bind(this);
//   }

//   html = 
//   `<html>
//   <body>
//   <div id="container">
//       <p id="p"></p> 
//       <p id="pa"></p> 
//       <button id="button" onclick="clickHandler();" >Send to RN</button>
//   </div>
//   <script>
//     document.getElementById("pa").innerHTML = "Working on it";
//   (function(){

//     var promiseChain = Promise.resolve();
//     var callbacks = {};
    
//     var init = function() {
//       window.webViewBridge = {
//         send: function(targetFunc, data, success, error) {

//           var msgObj = {
//             targetFunc: targetFunc,
//             data: data || {}
//           };

//           if (success || error) {
//             msgObj.msgId = "testing";
//           }

//           var msg = JSON.stringify(msgObj);

//           promiseChain = promiseChain.then(function () {
//             return new Promise(function (resolve, reject) {
//               console.log("sending message " + msgObj.targetFunc);

//               if (msgObj.msgId) {
//                 callbacks[msgObj.msgId] = {
//                   onsuccess: success,
//                   onerror: error
//                 };
//               }

//               window.postMessage(msg);
//               resolve();
//             })
//           }).catch(function (e) {
//             console.error('rnBridge send failed ' + e.message);
//           });
//         },


//       };
//     };

//     init();
//   }());

//       window.counter = 0;
//       function clickHandler() {
//           window.counter++;
//           document.getElementById("p").innerHTML = window.counter;
//           window.webViewBridge.send('handleDataReceived', window.counter, function(res) {
//               window.document.getElementById("button").setAttribute("style", "color: " + res);
//           }, function(err) {
//         window.document.getElementById("container").setAttribute("style", "color: " + err);
//           });
//       }
//   </script>

//   </body>
//   </html>`
  
//   handleDataReceived(msgData) {
//     this.setState({
//       text2: `Message from web view ${msgData.data}`
//     });
//     msgData.isSuccessfull = true;
//     msgData.args = [msgData.data % 2 ? "green" : "red"];
//     this.myWebView.postMessage(JSON.stringify(msgData));
//   }

//   onWebViewMessage(event) {
//     console.log("Message received from webview");

//     let msgData;
//     try {
//       msgData = JSON.parse(event.nativeEvent.data);
//     } catch (err) {
//       console.warn(err);
//       return;
//     }

//     switch (msgData.targetFunc) {
//       case "handleDataReceived":
//         this[msgData.targetFunc].apply(this, [msgData]);
//         break;
//     }
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>{this.state.text}</Text>
//         <Text style={styles.welcome}>{this.state.text2}</Text>
//         <View style={styles.webViewContainer}>
//           <WebView
//             ref={webview => {this.myWebView = webview;}}
//             source={{html: this.html}}
//             onMessage={this.onWebViewMessage}
//           />
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center"
//   },
//   welcome: {
//     flex: 1,
//     paddingTop: 30,
//     fontSize: 20,
//     textAlign: "center",
//     backgroundColor: "#fff123"
//   },
//   webViewContainer: {
//     flex: 4
//   }
// });