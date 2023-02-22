import axios from 'axios';

export const BASE_EP = import.meta.env.VITE_BASE_ENDPOINT;
const request = axios.create({
	baseURL: BASE_EP,
});

request.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(error) => {
		const status = error?.response?.data?.status || 500,
			message = error?.response?.data?.message || 'Something went wrong!';
		return { status, message, success: false };
	}
);

export default request;
