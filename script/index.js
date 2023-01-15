import {
	countTotalPrice,
	deleteSupply,
	addSupply,
} from './modules/control.js'

import modalControl from './modules/modalControl.js'
console.log('fix');
	const init = () => {
		modalControl()
		countTotalPrice()
		addSupply()
		deleteSupply()
	};
	window.crmInit = init;
