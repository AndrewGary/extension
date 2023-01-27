const ssButton = document.querySelector('#ssButton');

// console.log(ss);

ssButton.addEventListener('click', async () => {
  const ss = await chrome.tabs.captureVisibleTab();

  // console.log('here: ', document.innerWidth);

  chrome.storage.local.set({ screenShot: ss });

  const allTabs = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  const tabId = allTabs[0].id;

  chrome.scripting.executeScript({
    target: { tabId },
    func: async () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      // const ss = await chrome.tabs.captureVisibleTab();
      // console.log('ss: ', ss);

      const yeahhhh = await chrome.storage.local.get('screenShot');
      const screenShot = yeahhhh.screenShot;

      console.log(screenShot);

      // console.log('yeahhhh: ', yeahhhh.screenShot);

      let x1, y1, x2, y2;
      const body = document.querySelector('body');
      body.setAttribute('style', 'position:relative');

      body.insertAdjacentHTML(
        'afterbegin',
        '<canvas id="overlay" style="position:absolute;width:100%;min-height:100%;z-index:10;background-color:gray;opacity:.2" />'
      );

      const overlay = document.querySelector('#overlay');

      overlay.addEventListener('mousedown', (e) => {
        x1 = e.clientX;
        y1 = e.clientY;
      });

      overlay.addEventListener('mouseup', (e) => {
        x2 = e.clientX;
        y2 = e.clientY;

        console.log('(' + x1 + ', ' + y1 + ')');
        console.log('(' + x2 + ', ' + y2 + ')');

        var img = new Image();
        img.src = screenShot;

        // Create a canvas element
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');

        // Draw the specific section of the image to the canvas
        img.onload = function () {
          console.log('image loaded');
          ctx.drawImage(img, 0, 0);
        };
      });

      body.insertAdjacentElement('afterbegin', canvas);
    },
  });
});
// 'use strict';

// import './popup.css';

// (function () {
//   // We will make use of Storage API to get and store `count` value
//   // More information on Storage API can we found at
//   // https://developer.chrome.com/extensions/storage

//   // To get storage access, we have to mention it in `permissions` property of manifest.json file
//   // More information on Permissions can we found at
//   // https://developer.chrome.com/extensions/declare_permissions
//   const counterStorage = {
//     get: (cb) => {
//       chrome.storage.sync.get(['count'], (result) => {
//         cb(result.count);
//       });
//     },
//     set: (value, cb) => {
//       chrome.storage.sync.set(
//         {
//           count: value,
//         },
//         () => {
//           cb();
//         }
//       );
//     },
//   };

//   function setupCounter(initialValue = 0) {
//     document.getElementById('counter').innerHTML = initialValue;

//     document.getElementById('incrementBtn').addEventListener('click', () => {
//       updateCounter({
//         type: 'INCREMENT',
//       });
//     });

//     document.getElementById('decrementBtn').addEventListener('click', () => {
//       updateCounter({
//         type: 'DECREMENT',
//       });
//     });
//   }

//   function updateCounter({ type }) {
//     counterStorage.get((count) => {
//       let newCount;

//       if (type === 'INCREMENT') {
//         newCount = count + 1;
//       } else if (type === 'DECREMENT') {
//         newCount = count - 1;
//       } else {
//         newCount = count;
//       }

//       counterStorage.set(newCount, () => {
//         document.getElementById('counter').innerHTML = newCount;

//         // Communicate with content script of
//         // active tab by sending a message
//         chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//           const tab = tabs[0];

//           chrome.tabs.sendMessage(
//             tab.id,
//             {
//               type: 'COUNT',
//               payload: {
//                 count: newCount,
//               },
//             },
//             (response) => {
//               console.log('Current count value passed to contentScript file');
//             }
//           );
//         });
//       });
//     });
//   }

//   function restoreCounter() {
//     // Restore count value
//     counterStorage.get((count) => {
//       if (typeof count === 'undefined') {
//         // Set counter value as 0
//         counterStorage.set(0, () => {
//           setupCounter(0);
//         });
//       } else {
//         setupCounter(count);
//       }
//     });
//   }

//   document.addEventListener('DOMContentLoaded', restoreCounter);

//   // Communicate with background file by sending a message
//   chrome.runtime.sendMessage(
//     {
//       type: 'GREETINGS',
//       payload: {
//         message: 'Hello, my name is Pop. I am from Popup.',
//       },
//     },
//     (response) => {
//       console.log(response.message);
//     }
//   );
// })();
