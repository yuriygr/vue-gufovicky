const Kb = () => import('@/views/Kb')

import { KbMenu, KbPage } from '@/views/_kb'

export default [
  {
    path: '/kb',
    name: 'kb',
    component: Kb,
    meta: { section: 'kb' },
    redirect: { name: 'kb-menu' },
    children: [
      { path: '', name: 'kb-menu', component: KbMenu },
      { path: ':uuid', name: 'kb-page', component: KbPage, props: true },
	    { path: ':pathMatch(.*)*', redirect: { name: 'kb-menu' } }
	] }
]