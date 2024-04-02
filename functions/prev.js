import { redirect, getNext, getRandom } from './common/utils'

exports.handler = async e => {
	const { referer } = e.headers
	const site = getNext(referer, -1) || getRandom()
	return redirect(site)
}