import {
	countTotalPrice,
	deleteSupply,
	addSupply,
	openImage,
} from './modules/control.js'
import {getStorage} from './modules/serviceStorage.js'
import modalControl from './modules/modalControl.js'
import renderGoods from './modules/render.js'
{
	const init = () => {
		renderGoods(getStorage('data'))
		modalControl()
		countTotalPrice()
		addSupply()
		deleteSupply()
		openImage()
	};
	window.crmInit = init;
}