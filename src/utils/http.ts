import axios from 'axios';

enum HTTPERROR {
    LOGICERROR, // 逻辑错误
    TIMEOUTERROR, // 超时
    NETWORKERROR // 网络错误
}

let showAuthError = false;
// 队列
// const queue = [];
// 是否有成功字段
const isSuccess = (res) => res.success;
// 返回response 字段或者 data字段或者 {}
const resFormat = (res) => res.response || res.data || {};

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: './'
});
// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        // 请求的url参数
        config.params = {
            ts: Date.now(),
            ...config.params
        };
        // 添加token
        config.headers['Access-Token'] = sessionStorage.getItem('access_token') || '';
        config.headers['Content-Type'] = 'text/plain;charset=UTF-8';
        // 异步模式
        config.headers['X-Requested-With'] = 'XMLHttpRequest';
        return config;
    },
    (error) => Promise.reject(error)
);
// 响应拦截器
instance.interceptors.response.use(
    (response) => {
        console.log('1233');
        if (!showAuthError && response.data.errorCode === '70000') {
            showAuthError = true;
            setTimeout(() => {
                showAuthError = false;
                location.href = '#/login';
            }, 300);
            return Promise.resolve(null);
        }
        // if (response.data.errorCode === 401) {
        //     return Promise.reject({
        //         errorCode: response.data.errorCode,
        //         msg: '你没有权限访问'
        //     });
        // }
        // 设置token数据
        const token = response.headers['access-token'];
        if (token) {
            sessionStorage.setItem('access_token', token);
        } else {
            sessionStorage.setItem('access_token', '');
        }
        // 设置返回数据
        let rdata: {
            msg?: string | null;
            errorCode?: number | null;
        };
        // data类型 有长度
        if (typeof response.data === 'object' && !isNaN(response.data.length)) {
            rdata = response.data[0];
        } else {
            rdata = response.data;
        }
        // 没有成功字段
        if (!isSuccess(rdata)) {
            const _err = {
                msg: rdata?.msg,
                errorCode: rdata?.errorCode,
                type: HTTPERROR[HTTPERROR.LOGICERROR],
                config: response.config
            };
            return Promise.reject(_err);
        }
        return resFormat(rdata);
    },
    (error) => {
        console.log('3456');
        const _err = {
            msg: error.message || '网络故障',
            type: /^timeout of/.test(error.message)
                ? HTTPERROR[HTTPERROR.TIMEOUTERROR]
                : HTTPERROR[HTTPERROR.NETWORKERROR],
            config: error.config
        };
        return Promise.reject(_err);
    }
);
export default instance;
