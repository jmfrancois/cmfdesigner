export function onClickSelectionListItem(event, data) {
	if (event.persist) {
		event.persist();
	}
	return {
		type: 'CLICK_SELECTION_LIST_ITEM',
		id: data.item.get('id'),
		event,
	};
}

