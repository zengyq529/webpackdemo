//此文件在多个文件中被调用 需要作为公共文件抽离 而不是跟其他js打包到一起。


export function getId(){
    return '我是common'
}