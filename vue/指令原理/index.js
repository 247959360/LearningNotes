let compiler = require('vue-template-compiler')
const ast = compiler.compile('<input v-model="age" />')

console.log(ast.render)
with(this){return _c('input',{directives:[{name:"model",rawName:"v-model",value:(age),expression:"age"}],domProps:{"value":(age)},on:{"input":function($event){if($event.target.composing)return;age=$event.target.value}}})}

let compiler = require('vue-template-compiler')
const ast = compiler.compile('<component v-model="name" />')

console.log(ast.render)
with(this){return _c('component',{model:{value:(name),callback:function ($$v) {name=$$v},expression:"name"}})}

