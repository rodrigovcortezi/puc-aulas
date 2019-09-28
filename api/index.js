
export function fetchItem(id) {
	return new Promise((resolve, reject) => {
		setTimeout(resolve({ title: 'Sou brabo' }, 5000))
	})
}