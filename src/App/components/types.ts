import {
	createContext
} from 'react';

export * from '@flexis/ui/components/common/types';

export enum ColorVariant {
	Primary = 'primary',
	Secondary = 'secondary',
	Success = 'success',
	Info = 'info',
	Warning = 'warning',
	Danger = 'danger'
}

export type Color = 'primary'|'secondary'|'success'|'info'|'warning'|'danger';

export const ColorValues: Color[] = Object.values(ColorVariant);

export const ColorContext = createContext<Color>(null);
