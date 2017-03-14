import VueRouter from 'vue-router';

const routes = [{
  path: '/',
  redirect: '/home'
}, {
  path: '/home',
  component: resolve => require(['./views/home/index'], resolve)
}, {
  name: 'detail',
  path: '/detail',
  component: resolve => require(['./views/detail/index'], resolve),
}, {
  name: 'types',
  path: '/types',
  component: resolve => require(['./views/types/index'], resolve),
}]

export default new VueRouter({
  routes
});