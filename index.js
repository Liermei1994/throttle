function throttle(fn, interval, options = { leading: true, trailing: false },callBackFn) {
    let lastTime = 0
    let timer = null
    const { leading, trailing } = options
    const _throttle = function (...args) {
        let nowTime = new Date().getTime()
        if (!leading && !lastTime) lastTime = nowTime
        let remainTime = interval - (nowTime - lastTime)
        if (remainTime <= 0) {
            if (timer){
                clearTimeout(timer)
                timer = null
            }
            const result = fn.apply(this,args)
            if(callBackFn) callBackFn(result)
            lastTime = nowTime
            return
        }
        if (trailing && !timer) {
            timer = setTimeout(() => {
                timer = null
                lastTime = !leading ? 0 : new Date().getTime()
                const result = fn.apply(this,args)
                if(callBackFn) callBackFn(result)
            }, remainTime);
        }

    }

    _throttle.cancel = function(){
        if(timer){
            clearTimeout(timer)
            timer = null
            lastTime = 0
        }
    }

    return _throttle
}