
import { sum } from 'lodash'; //需要被抽离


console.log('index2');

setTimeout(()=>{
    import('./utils/index').then(res => { //懒加载的代码
        console.log(res)
    })
},3000)


sum(1, 2, 3)
