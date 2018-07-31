// 打包使用的vendor.js

// 兼容包相关
require('babel-polyfill');
require('es6-promise'); // es6-promise polyfill
// require('console-polyfill')
// require('eventsource-polyfill') // eventsource兼容ie8
require('fetch-detector'); // 防止部分chrome乱码
require('fetch-ie8'); // fetch ie8 兼容
require('es5-shim'); // react兼容ie8
require('es5-shim/es5-sham');

// 公共包相关
require('react');
require('react-dom');
require('react-router');
// require('redux')
// require('react-redux')
// require('redux-thunk')
// require('redux-logger')