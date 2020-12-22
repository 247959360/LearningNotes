import { ASSETS_TYPE } from './const.js'
export function initAssetRegisters(Vue) {
  ASSETS_TYPE.forEach((type) => {
    Vue[type] = function(id, definition) {
      if(type == 'component') {
        // 注册全局组件
        // 使用extend方法 将对象变成构造函数
        
        // 找到当前的父类 大Vue
        definition = this.options._base.extend(definition)
        

      
      } else if(type == 'filter') {
        // 注册全局过滤器

      
      } else if(type == 'directive') {
        // 注册全局指令

      }
      // options里面放的都是全局的，也就是子类可以获取到。子类可能需要用到
      // 其他的放到Vue.xxx 专属于某一个子类的
      // 组件的名字其实就是id
      this.options[type + 's'][id] = definition
      // console.log(this.options)
    }
  })
}