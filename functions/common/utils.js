import members from '../../members.json'

export const redirect = site => {
	const statusMessage = `redirecting to: ${site.url}`
	console.log(statusMessage)
	return {
		statusCode: 303,
		headers: { Location: site.url },
		body: statusMessage
	}
}

const getIndex = url => url ? members.findIndex(site => url.includes(site.url)) : -1

const mod = (index, length) => (index + length) % length
// Shouldn't be needed in this case but for large offsets of `i`
// use the function below instead
// const mod = (index, length) => ((index % length) + length) % length

export const getNext = (url, direction = 1) => {
	const index = getIndex(url)
	if (index !== -1) {
		return members[mod(index + direction, members.length)]
	}
	console.log('referrer position not found.')
	return null
}

export const getRandom = () => members[Math.floor(Math.random() * members.length)]