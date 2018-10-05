import SelectionList from './SelectionList.component';

function onClickSelectionListItem(event, data) {
	if (event && event.persist) {
		event.persist();
	}
	return {
		type: SelectionList.ACTION_TYPE_SELECT_ITEM,
		id: data.id || data.item.get('id'),
		event,
	};
}

export default {
	onClickSelectionListItem,
};
