import {
	PAGE_SETPATH
} from '../action-types';

export function setPath(path: string) {
	return {
		type: PAGE_SETPATH,
		path
	}
}