import {
	IResultFile
} from '~/services/favicons';

export interface IProps {}

export interface IState {
	archive: string;
	icons: IResultFile[];
	inProgress: boolean;
	useWebWorker: boolean;
}
