import VueRouter from 'vue-router';

const routes = [{
    path: '/',
    redirect: '/posts'
  },

  {
    path: '/posts',
    component: resolve => require(['./views/posts/index'], resolve)
  },

  {
    path: '/posts/add',
    component: resolve => require(['./views/posts/add/index'], resolve)
  },

  {
    path: '/tags',
    component: resolve => require(['./views/tags/index'], resolve),
  }
]

export default new VueRouter({
  routes
});