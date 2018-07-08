export const SET_RENDER_ICONS: ActionConst = 'RENDER_ICONS'

export function setRenderIcons(renderIcons: boolean) {
	return {
		type: SET_RENDER_ICONS,
		renderIcons
	}
}
