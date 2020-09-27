import './test.css';
import { getId } from './utils';
import _ from 'lodash' //需要被抽离
getId()
console.log(_.each);

//import moment from 'moment' //这个库很大 
//import 'moment/locale/zh-cn' //手动引入语言包 。在webpack设置 屏蔽 moment/locale/ 引入
//  new  webpack.IgnorePlugin(/\.\/locale/,/moment/),
//moment.setlocale('zh-cn'); //中文
//console.log(moment.format('ll'));


console.log('dddd')

React 