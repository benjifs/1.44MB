import { redirect, getRandom } from './common/utils'

exports.handler = async e => {
	const { referer } = e.headers
	const site = getRandom(referer)
	return redirect(site)
}