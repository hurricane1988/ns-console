import axios from "axios";
import {re} from "@babel/core/lib/vendor/import-meta-resolve";


// 新建个axios对象
const httpClient = axios.create({
    validateStatus(status) {
        // 设置默认的合法的状态，若状态码不合法，则不会接受response
        return status >= 200 && status <= 504
    },
    // 超时时间10秒
    timeout: 10000
});

// 请求重试次数
httpClient.defaults.retry = 3
// 请求重试时间间隔
httpClient.defaults.retryDelay = 1000
// 是否重试
httpClient.defaults.shouldRetry = true

// 添加请求拦截器
httpClient.interceptors.request.use(
    config => {
        // 添加header
        config.headers["Content-Type"] = "application/json"
        config.headers["Accept-Language"] = "zh-CN"
        // 可以全局设置接口请求header中带token
        config.headers["Authorization"] = localStorage.getItem("token")

        if (config.method === "post") {
            if (!config.data) { // 没有参数时，config.data为null，需要转下类型
                config.data = {}
            }
        }
        return config
    },
    err => {
        // Promise.reject()方法返回一个带有拒绝原因的Promise对象，在F12的console中显示报错
        Promise.reject(err)
    }
);

// 添加响应拦截器
httpClient.interceptors.response.use(
    response => {
        if (response.status !== 200) {
            return Promise.reject(response.data)
        } else {
            return response.data
        }
    },
    err => {
        return Promise.reject(err)
    }
);

export default httpClient;