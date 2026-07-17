import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	DeleteCalendarParams,
	EngineCalendar,
	EngineCalendarServiceUpdateCalendarBody,
	EngineCreateCalendarRequest,
	EngineListCalendar,
	EngineListTimezoneResponse,
	ReadCalendarParams,
	SearchCalendarParams,
	SearchTimezonesParams,
} from '../_models';
export declare const // --- title start
	getCalendarService: (axiosInstance?: AxiosInstance) => {
		searchCalendar: (
			params?: SearchCalendarParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineListCalendar>>;
		createCalendar: (
			engineCreateCalendarRequest: EngineCreateCalendarRequest,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineCalendar>>;
		searchTimezones: (
			params?: SearchTimezonesParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineListTimezoneResponse>>;
		deleteCalendar: (
			id: string,
			params?: DeleteCalendarParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineCalendar>>;
		readCalendar: (
			id: string,
			params?: ReadCalendarParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineCalendar>>;
		updateCalendar: (
			id: string,
			engineCalendarServiceUpdateCalendarBody: EngineCalendarServiceUpdateCalendarBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineCalendar>>;
	};
export type SearchCalendarResult = AxiosResponse<EngineListCalendar>;
export type CreateCalendarResult = AxiosResponse<EngineCalendar>;
export type SearchTimezonesResult = AxiosResponse<EngineListTimezoneResponse>;
export type DeleteCalendarResult = AxiosResponse<EngineCalendar>;
export type ReadCalendarResult = AxiosResponse<EngineCalendar>;
export type UpdateCalendarResult = AxiosResponse<EngineCalendar>;
