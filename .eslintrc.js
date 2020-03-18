module.exports = {
    extends: [
        // "react-hooks",
        'alloy',
        'alloy/react',
        'alloy/typescript',
        'plugin:prettier/recommended',
    ],
    settings: {
        'import/resolver': {
            // 引用路径的快捷方式
            webpack: {
                config: './build/webpack.base.config.js'
            }
        }
    },
    globals: {
        // 这里填入你的项目需要的全局变量
        // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
        //
        // jQuery: false,
        // $: false
    },
    rules: {
        'react/jsx-fragments': 0,
        quotes: ['off', 'single'],
        'jsx-quotes': 0,
        'prettier/prettier': 'error',
        
        // "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
        // "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    },
    plugins: ['prettier']
};
