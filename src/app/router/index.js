import { createRouter, createWebHistory } from 'vue-router'
import { useModals } from '@vue-norma/ui'

import Home from '@/views/Home'
import Stream from '@/views/Stream'
import Clips from '@/views/Clips'
import Streams from '@/views/Streams'

// Load modules from folder
const modules = {}
const requireModule = require.context('./modules', false,  /\.js$/)
requireModule.keys().forEach(filename => {
  const moduleName = filename.replace(/(\.\/|\.js)/g, '').replace(/^\w/, c => c.toLowerCase())
  modules[moduleName] = requireModule(filename).default || requireModule(filename)
})

const routes = [
	...Object.values(modules).flat(),

	{ path: '/', name: 'home', component: Home },
	
	{ path: '/streams', children: [
		{ path: '', name: 'streams', component: Streams },
		{ path: ':uuid', name: 'stream', component: Stream, props: true },
		{ path: ':pathMatch(.*)*', redirect: { name: 'streams' } }
	] },

	{ path: '/clips', children: [
		{ path: '', name: 'clips', component: Clips },
		{ path: ':uuid', name: 'clip', component: Clips, props: true },
		{ path: ':pathMatch(.*)*', redirect: { name: 'clips' } }
	] },
		
	{ path: '/:pathMatch(.*)*', redirect: { name: 'home' } }
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
	pathToRegexOptions: { strict: true },
	scrollBehavior (to, from, savedPosition) {
		if (savedPosition)
			return savedPosition
		else if (to.hash)
			return { selector: to.hash }
		else
			return { x: 0, y: 0 }
	}
})

export default {
	install(app, options) {
		router.install(app)

		router.beforeEach((to, from, next) => {
			const modals = useModals()

			modals.close()
			app.config.globalProperties.$popover.close()

			next()
		})
	}
}

