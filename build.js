#!/usr/bin/env node
const fs = require('fs')
const members = require('./members.json')

if (!members || !members.length) throw Error('No members found in webring')

const OUTPUT_DIR = './_build'
const TEMPLATE_DIR = './templates'

let html = opml = '\n'
for (const m of members) {
	if (!m.id) continue
	html += `<tr><td><a href="${m.url}">${m.id}</td><td>`
	if (m.rss) {
		html += `<a href="${m.rss}">rss</a>`
		opml += `\t\t<outline text="${m.id}" title="${m.id}" type="rss" htmlUrl="${m.url}" xmlUrl="${m.rss}"/>\n`
	}
	html += '</td>'
	html += `<td>${ m.count ? '💾 x ' + m.count : ''}</td>`
	html += '</tr>\n'
}

const writeOutput = (file, content) => {
	fs.readFile(`${TEMPLATE_DIR}/${file}`, 'utf8', (err, data) => {
		const output = data.replace('{{ members }}', content)
		fs.writeFile(`${OUTPUT_DIR}/${file}`, output, 'utf8', err => {
			if (err) return console.log(err)
		})
	})
}

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR)
writeOutput('index.html', html)
writeOutput('webring.opml', opml)
