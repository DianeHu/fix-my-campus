import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import IssueView from '@/components/IssueView'
import Contact from '@/components/Contact'
import {storageRef } from '../database'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/issues',
      name: 'Issues',
      component: IssueView
    },
    {
      path: '/contact',
      name: 'Contacts',
      component: Contact
    }
  ]
})
