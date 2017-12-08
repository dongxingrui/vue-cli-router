import Vue from 'vue'/* 引用vue文件 */
import Router from 'vue-router'/* 引用vue路由模块，并赋值给变量Router */
import HelloWorld from '@/components/HelloWorld'/* 英文Hello.vue模版，并赋值给变量Hello */
import MyTravelOfCli from '@/components/MyTravelOfCli'
import Test from '@/components/Test'
// @ 相当于 ../
Vue.use(Router)/* 使用路由 */

// 定义组件, 也可以像教程之前教的方法从别的文件引入
const First = { template: '<div><h2>我是第 1 个子页面</h2></div>' }

export default new Router({
  routes: [/* 进行路由配置，规定“/”引入到Hello组件 */
    {
      path: '/',
      name: 'HelloWorld', // 这里的name同上，暂时没发现有什么意思
      component: HelloWorld // 注册Hello组件
    },
    {
      path: '/myTravelOfCli',
      name: 'MyTravelOfCli',
      component: MyTravelOfCli
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/first',
      name: 'First',
      component: First
    }]
})
/* 说明：如果需要增加组件
 * 那就在components文件下定义xx.vue文件并编写代码即可，
 * 如果需要配置路由就要进行在index.js进行路由“路径”配置，
 * 还需要点击跳转就要用到<router-link></router-link>标签了
 */
