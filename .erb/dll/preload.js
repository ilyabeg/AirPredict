(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "electron"
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
(module) {

module.exports = require("electron");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			const getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./src/main/preload.ts ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* eslint-disable camelcase */
// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */

const electronHandler = {
    ipcRenderer: {
        sendMessage(channel, ...args) {
            electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.send(channel, args);
        },
        on: (channel, func) => {
            electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.on(channel, func);
        },
        off: (channel, func) => {
            electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.off(channel, func);
        },
        removeAllListeners: (channel) => {
            electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.removeAllListeners(channel);
        },
        listenerCount: (channel) => {
            return electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.listenerCount(channel);
        },
        once: (channel, func) => {
            electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.once(channel, func);
        },
        invoke: async (channel, ...args) => {
            return electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke(channel, ...args);
        },
    },
};
electron__WEBPACK_IMPORTED_MODULE_0__.contextBridge.exposeInMainWorld('electron', electronHandler);

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlbG9hZC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7Ozs7OztBQ1ZBLHFDOzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQzVCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQSxFOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLDJDQUEyQywwQ0FBMEM7V0FDckYsTUFBTTtXQUNOLDJDQUEyQyxnQ0FBZ0M7V0FDM0U7V0FDQSxLQUFLLHlCQUF5QjtXQUM5QjtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsMENBQTBDLHdDQUF3QztXQUNsRjtXQUNBO1dBQ0E7V0FDQSxFOzs7OztXQ3RCQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QsRTs7Ozs7Ozs7Ozs7OztBQ05BLDhCQUE4QjtBQUM5QixpREFBaUQ7QUFDakQsZ0NBQWdDO0FBQ3dDO0FBK0N4RSxNQUFNLGVBQWUsR0FBb0I7SUFDdkMsV0FBVyxFQUFFO1FBQ1gsV0FBVyxDQUFDLE9BQWlCLEVBQUUsR0FBRyxJQUFlO1lBQy9DLGlEQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsQyxDQUFDO1FBRUQsRUFBRSxFQUFFLENBQ0YsT0FBVSxFQUNWLElBR1MsRUFDVCxFQUFFO1lBQ0YsaURBQVcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFFRCxHQUFHLEVBQUUsQ0FDSCxPQUFVLEVBQ1YsSUFHUyxFQUNULEVBQUU7WUFDRixpREFBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUVELGtCQUFrQixFQUFFLENBQXVDLE9BQVUsRUFBRSxFQUFFO1lBQ3ZFLGlEQUFXLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUVELGFBQWEsRUFBRSxDQUNiLE9BQVUsRUFDRixFQUFFO1lBQ1YsT0FBTyxpREFBVyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxDQUFDO1FBRUQsSUFBSSxFQUFFLENBQ0osT0FBVSxFQUNWLElBR1MsRUFDVCxFQUFFO1lBQ0YsaURBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xDLENBQUM7UUFFRCxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLElBQUksRUFBRSxFQUFFO1lBQ2pDLE9BQU8saURBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDOUMsQ0FBQztLQUNGO0NBQ0YsQ0FBQztBQUVGLG1EQUFhLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLGVBQWUsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImVsZWN0cm9uXCIiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy9tYWluL3ByZWxvYWQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IGZhY3RvcnkoKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKGdsb2JhbCwgKCkgPT4ge1xucmV0dXJuICIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsZWN0cm9uXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbmNvbnN0IF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0Y29uc3QgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdGNvbnN0IG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHRjb25zdCBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0Y29uc3QgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIvdmFsdWUgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGlmKEFycmF5LmlzQXJyYXkoZGVmaW5pdGlvbikpIHtcblx0XHR2YXIgaSA9IDA7XG5cdFx0d2hpbGUoaSA8IGRlZmluaXRpb24ubGVuZ3RoKSB7XG5cdFx0XHR2YXIga2V5ID0gZGVmaW5pdGlvbltpKytdO1xuXHRcdFx0dmFyIGJpbmRpbmcgPSBkZWZpbml0aW9uW2krK107XG5cdFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdFx0aWYoYmluZGluZyA9PT0gMCkge1xuXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IGRlZmluaXRpb25baSsrXSB9KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogYmluZGluZyB9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmKGJpbmRpbmcgPT09IDApIHsgaSsrOyB9XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYoU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG4vLyBEaXNhYmxlIG5vLXVudXNlZC12YXJzLCBicm9rZW4gZm9yIHNwcmVhZCBhcmdzXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IG9mZiAqL1xuaW1wb3J0IHsgSXBjUmVuZGVyZXJFdmVudCwgY29udGV4dEJyaWRnZSwgaXBjUmVuZGVyZXIgfSBmcm9tICdlbGVjdHJvbic7XG5pbXBvcnQgeyBJUENNZXRob2RzIH0gZnJvbSAnc2hhcmVkL0lQQy90eXBlcy9jbGllbnRUb1NlcnZlcic7XG5pbXBvcnQgeyBJUENfUHVzaE5vdGlmaWNhdGlvbiB9IGZyb20gJ3NoYXJlZC9JUEMvdHlwZXMvc2VydmVyVG9DbGllbnQnO1xuXG50eXBlIENoYW5uZWxzID0ga2V5b2YgSVBDTWV0aG9kcztcblxuZXhwb3J0IGludGVyZmFjZSBFbGVjdHJvbkhhbmRsZXIge1xuICBpcGNSZW5kZXJlcjoge1xuICAgIHNlbmRNZXNzYWdlKGNoYW5uZWw6IENoYW5uZWxzLCAuLi5hcmdzOiB1bmtub3duW10pOiB2b2lkO1xuXG4gICAgb246IDxUIGV4dGVuZHMga2V5b2YgSVBDX1B1c2hOb3RpZmljYXRpb24+KFxuICAgICAgY2hhbm5lbDogVCxcbiAgICAgIGZ1bmM6IChcbiAgICAgICAgX2V2ZW50OiBJcGNSZW5kZXJlckV2ZW50LFxuICAgICAgICBhcmdzOiBJUENfUHVzaE5vdGlmaWNhdGlvbltUXVsncGF5bG9hZCddXG4gICAgICApID0+IHZvaWRcbiAgICApID0+IHZvaWQ7XG5cbiAgICBvZmY6IDxUIGV4dGVuZHMga2V5b2YgSVBDX1B1c2hOb3RpZmljYXRpb24+KFxuICAgICAgY2hhbm5lbDogVCxcbiAgICAgIGZ1bmM6IChcbiAgICAgICAgX2V2ZW50OiBJcGNSZW5kZXJlckV2ZW50LFxuICAgICAgICBhcmdzOiBJUENfUHVzaE5vdGlmaWNhdGlvbltUXVsncGF5bG9hZCddXG4gICAgICApID0+IHZvaWRcbiAgICApID0+IHZvaWQ7XG5cbiAgICByZW1vdmVBbGxMaXN0ZW5lcnM6IDxUIGV4dGVuZHMga2V5b2YgSVBDX1B1c2hOb3RpZmljYXRpb24+KFxuICAgICAgY2hhbm5lbDogVFxuICAgICkgPT4gdm9pZDtcblxuICAgIG9uY2U6IDxUIGV4dGVuZHMga2V5b2YgSVBDX1B1c2hOb3RpZmljYXRpb24+KFxuICAgICAgY2hhbm5lbDogVCxcbiAgICAgIGZ1bmM6IChcbiAgICAgICAgX2V2ZW50OiBJcGNSZW5kZXJlckV2ZW50LFxuICAgICAgICBhcmdzOiBJUENfUHVzaE5vdGlmaWNhdGlvbltUXVsncGF5bG9hZCddXG4gICAgICApID0+IHZvaWRcbiAgICApID0+IHZvaWQ7XG5cbiAgICBpbnZva2U6IDxUIGV4dGVuZHMgQ2hhbm5lbHM+KFxuICAgICAgY2hhbm5lbDogVCxcbiAgICAgIGFyZ3M6IElQQ01ldGhvZHNbVF1bJ3JlcXVlc3QnXVxuICAgICkgPT4gUHJvbWlzZTxJUENNZXRob2RzW1RdWydyZXNwb25zZSddPjtcblxuICAgIGxpc3RlbmVyQ291bnQ6IDxUIGV4dGVuZHMga2V5b2YgSVBDX1B1c2hOb3RpZmljYXRpb24+KGNoYW5uZWw6IFQpID0+IG51bWJlcjtcbiAgfTtcbn1cblxuY29uc3QgZWxlY3Ryb25IYW5kbGVyOiBFbGVjdHJvbkhhbmRsZXIgPSB7XG4gIGlwY1JlbmRlcmVyOiB7XG4gICAgc2VuZE1lc3NhZ2UoY2hhbm5lbDogQ2hhbm5lbHMsIC4uLmFyZ3M6IHVua25vd25bXSkge1xuICAgICAgaXBjUmVuZGVyZXIuc2VuZChjaGFubmVsLCBhcmdzKTtcbiAgICB9LFxuXG4gICAgb246IDxUIGV4dGVuZHMga2V5b2YgSVBDX1B1c2hOb3RpZmljYXRpb24+KFxuICAgICAgY2hhbm5lbDogVCxcbiAgICAgIGZ1bmM6IChcbiAgICAgICAgX2V2ZW50OiBJcGNSZW5kZXJlckV2ZW50LFxuICAgICAgICBhcmdzOiBJUENfUHVzaE5vdGlmaWNhdGlvbltUXVsncGF5bG9hZCddXG4gICAgICApID0+IHZvaWRcbiAgICApID0+IHtcbiAgICAgIGlwY1JlbmRlcmVyLm9uKGNoYW5uZWwsIGZ1bmMpO1xuICAgIH0sXG5cbiAgICBvZmY6IDxUIGV4dGVuZHMga2V5b2YgSVBDX1B1c2hOb3RpZmljYXRpb24+KFxuICAgICAgY2hhbm5lbDogVCxcbiAgICAgIGZ1bmM6IChcbiAgICAgICAgX2V2ZW50OiBJcGNSZW5kZXJlckV2ZW50LFxuICAgICAgICBhcmdzOiBJUENfUHVzaE5vdGlmaWNhdGlvbltUXVsncGF5bG9hZCddXG4gICAgICApID0+IHZvaWRcbiAgICApID0+IHtcbiAgICAgIGlwY1JlbmRlcmVyLm9mZihjaGFubmVsLCBmdW5jKTtcbiAgICB9LFxuXG4gICAgcmVtb3ZlQWxsTGlzdGVuZXJzOiA8VCBleHRlbmRzIGtleW9mIElQQ19QdXNoTm90aWZpY2F0aW9uPihjaGFubmVsOiBUKSA9PiB7XG4gICAgICBpcGNSZW5kZXJlci5yZW1vdmVBbGxMaXN0ZW5lcnMoY2hhbm5lbCk7XG4gICAgfSxcblxuICAgIGxpc3RlbmVyQ291bnQ6IDxUIGV4dGVuZHMga2V5b2YgSVBDX1B1c2hOb3RpZmljYXRpb24+KFxuICAgICAgY2hhbm5lbDogVFxuICAgICk6IG51bWJlciA9PiB7XG4gICAgICByZXR1cm4gaXBjUmVuZGVyZXIubGlzdGVuZXJDb3VudChjaGFubmVsKTtcbiAgICB9LFxuXG4gICAgb25jZTogPFQgZXh0ZW5kcyBrZXlvZiBJUENfUHVzaE5vdGlmaWNhdGlvbj4oXG4gICAgICBjaGFubmVsOiBULFxuICAgICAgZnVuYzogKFxuICAgICAgICBfZXZlbnQ6IElwY1JlbmRlcmVyRXZlbnQsXG4gICAgICAgIGFyZ3M6IElQQ19QdXNoTm90aWZpY2F0aW9uW1RdWydwYXlsb2FkJ11cbiAgICAgICkgPT4gdm9pZFxuICAgICkgPT4ge1xuICAgICAgaXBjUmVuZGVyZXIub25jZShjaGFubmVsLCBmdW5jKTtcbiAgICB9LFxuXG4gICAgaW52b2tlOiBhc3luYyAoY2hhbm5lbCwgLi4uYXJncykgPT4ge1xuICAgICAgcmV0dXJuIGlwY1JlbmRlcmVyLmludm9rZShjaGFubmVsLCAuLi5hcmdzKTtcbiAgICB9LFxuICB9LFxufTtcblxuY29udGV4dEJyaWRnZS5leHBvc2VJbk1haW5Xb3JsZCgnZWxlY3Ryb24nLCBlbGVjdHJvbkhhbmRsZXIpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9