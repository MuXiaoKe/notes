// 以下函数返回 min（包含）～ max（包含）之间的数字：
export function getRandom(min: number, max: number) {
    // 或者不用Math.floor 用~~取整速度更快
    return ~~(Math.random() * (max - min + 1)) + min;
}
/**
 * 获取随机数组
 * @param len 生成数组长度
 * @returns 随机生成长度为len的数组
 */
export function getArr(len: number) {
    let arr: number[] = [];
    for (let i = 0; i < len; i++) {
        arr.push(getRandom(1, len));
    }

    return arr;
}
export const isDev = process.env.NODE_ENV === 'development'; // 开发 or 生产
// 非空判断
export function isEmpty(obj) {
    return obj === null || obj === 'undefined' || obj === '' || obj === undefined;
}
/*
 * 深拷贝 -- 有损拷贝（时间对象、正则等、函数、构造函数会丢失）
 *
 * */
export const deepClone = (obj: {}) => (obj ? JSON.parse(JSON.stringify(obj)) : '');
