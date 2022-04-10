import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from '../views/Landing.vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Month from '../components/Month.vue'
import BudgetTemplate from '../views/BudgetTemplate.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/home/2022',
    children: [
      {
        path: '2022',
        name: 'Home-2022',
        component: Home,
        children: [
          {
            path: ':month(january|february|march|april|may|june|july|august|september|october|november|december)',
            name: 'Home-2022-month',
            component: Month
          },
        ]
      },
      {
        path: '2021',
        name: 'Home-2021',
        component: Home,
        children: [
          {
            path: ':month(january|february|march|april|may|june|july|august|september|october|november|december)',
            name: 'Home-2021-month',
            component: Month
          },
        ]
      },
      {
        path: '2020',
        name: 'Home-2020',
        component: Home,
        children: [
          {
            path: ':month(january|february|march|april|may|june|july|august|september|october|november|december)',
            name: 'Home-2020-month',
            component: Month
          },
        ]
      }
    ]
  },
  {
    path: '/budget-template',
    name: 'Budget-template',
    component: BudgetTemplate
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
