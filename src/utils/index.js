class Util {

    static get(url, params){
        if (params) {
            url = url + "?" + this.param(params)
        }
        return fetch(url,{
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(resp => {
            if (resp.status >= 200 && resp.status < 300) {
                return resp
            }
            throw new Error(resp.statusText)
        }).then(res => {
            return res.json()
        }).catch(error => {
            
        })
    }

    static post(url, params){
        return fetch(url,{
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            credentials: 'include',
            body: params?this.param(params):""
        }).then(resp => {
            if (resp.status >= 200 && resp.status < 300) {
                return resp
            }
            throw new Error(resp.statusText)
        }).then(res => {
            return res.json()
        }).catch(error => {
            
        })
    }

    static fetch(url, method = 'get', params) {
        let options = {
            method: method,
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'include'
        }
        if (method.toLowerCase() == "post") {
            options['body'] = this.param(params)
            options['headers']['Content-Type'] = 'application/x-www-form-urlencoded'
        } else {
            options['headers']['Content-Type'] = 'application/json'
            if (params) {
                url = url + "?" + this.param(params)
            }
        }
        return fetch(url, options).then(resp => {
            if (resp.status >= 200 && resp.status < 300) {
                return resp
            }
            throw new Error(resp.statusText)
        }).then(resp => {
            return resp.json()
        }).catch(error => {
            
        })
    }

    /**
     * 判断当前浏览器是否是IE8或以下版本
     * @method isLtIE9
     * @returns {boolean}
     */
    static isLtIE8() {
        if (navigator.userAgent.indexOf('MSIE') > 0) {
            if (navigator.userAgent.indexOf('MSIE 6.0') > 0) {
                return true
            } else if (navigator.userAgent.indexOf('MSIE 7.0') > 0) {
                return true
            } else if (navigator.userAgent.indexOf('MSIE 8.0') > 0) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    static param(obj) {
        var pairs = []
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                var k = encodeURIComponent(prop),
                    v = encodeURIComponent(obj[prop])
                pairs.push(k + '=' + v)
            }
        }
        return pairs.join('&')
    }
}

export default Util