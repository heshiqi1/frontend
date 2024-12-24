import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
interface ResponseData<T = any> {
  code: number
  message: string
  data: T
}

const BASE_URL = BASE_URL
const TIMEOUT = 10000

console.log('当前 baseURL:', BASE_URL);

// 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_Xtalcase_BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
})

const loginservice: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    // 定义不需要 token 的接口白名单
    const whiteList = ['/','/login', '/api/user/register'];

    // 判断请求路径是否在白名单中
    const isWhiteListed = whiteList.some((url) => config.url?.includes(url));

    if (!isWhiteListed && !token) {
      console.warn('未发现 token，重定向至登录页');
      window.location.href = '/login'; // 跳转到登录页
      return Promise.reject(new Error('未发现 token'));
    }

    // 如果有 token 且不在白名单，则加上 Authorization 头
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    console.error('请求错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    const res = response.data
    // 登录接口成功返回后，保存 token
    if (response.status === 200 && response.config.url === '/auth0/token') {
      // const token =  res;
      const token =  `Bearer ${res.access_token}`;
      if (token) {
        localStorage.setItem('token', token);
        console.log('Token 已保存:', token);
      }
    }
    if (response.status !== 200) {
      console.error('响应错误:', res.message)
      return Promise.reject(new Error(res.message || 'Error'))
    }
    return res
  },
  error => {
    if (error.response && error.response.status === 401) {
      console.warn('Token 过期，重定向至登录页')
      localStorage.removeItem('token')
      window.location.href = '/login' // 跳转到登录页
    } else {
      console.error('网络错误:', error)
    }
    return Promise.reject(error)
  }
)

// 封装请求函数
const request = <T = any>(config: AxiosRequestConfig): Promise<T> => {
  return service.request<ResponseData<T>>(config).then((res) => {
    const data: unknown = res; // 将类型先设为 unknown
    return data as T; // 然后再进行类型强制转换
  })
}

// GET 请求
export const get = <T = any>(url: string, params?: any): Promise<T> => {
  return request<T>({
    url,
    method: 'get',
    params
  })
}

// POST 请求
export const post = <T = any>(url: string, data?: any): Promise<T> => {
  return request<T>({
    url,
    method: 'post',
    data
  })
}

// PUT 请求
export const put = <T = any>(url: string, data?: any): Promise<T> => {
  return request<T>({
    url,
    method: 'put',
    data
  })
}

// DELETE 请求
export const del = <T = any>(url: string, params?: any): Promise<T> => {
  return request<T>({
    url,
    method: 'delete',
    params
  })
}



export default service
