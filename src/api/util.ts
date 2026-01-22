function getRandomCode() {
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function checkUrl(str: string) {
    return /^(https?:\/\/)?([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&%\$\-]+)*@)?((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.[a-zA-Z]{2,4})(\:[0-9]+)?(\/[^\/][a-zA-Z0-9\.\,\?\'\\\/\+&%\$#\=~_\-@]*)*(\/)?$/.test(
        str
    );
}

function loadimg(url: string, cb: (st: boolean) => void) {
    var img = new Image();
    img.src = url;
    img.onload = function () {
        cb(true);
    };
    img.onerror = function () {
        cb(false);
    };
}

function getFavicon(url: string, cb: (faviconUrl: string | boolean) => void) {
    try {
        var u = new URL(url);
    } catch (e) {
        cb(false);
        return;
    }
    var _ic = "https://api.xinac.net/icon/?url=" + u.origin;
    if (u.hostname.indexOf("bing.com") != -1) {
        _ic = "https://bing.com/favicon.ico";
    } else if (
        u.hostname.indexOf("www.google.com") != -1 ||
        u.hostname.indexOf("google.com") == 0
    ) {
        _ic = "https://s2.loli.net/2024/08/10/dVNZ4SzFxTMpj1a.png";
    } else if (u.hostname.indexOf("tfseek.top") != -1) {
        _ic = "https://tfseek.top/assets/img/216.png";
    }
    loadimg(_ic, function (st) {
        if (st) {
            cb(_ic);
        } else {
            loadimg(
                u.protocol + "//" + u.host + "/favicon.ico",
                function (st2) {
                    if (st2) {
                        cb(u.protocol + "//" + u.host + "/favicon.ico");
                    } else {
                        cb(false);
                    }
                }
            );
        }
    });

    // 删除多余代码，统一体验
}

function debounce<T extends (...args: any[]) => any>(fn: T, delay: number) {
    let timer: ReturnType<typeof setTimeout> | undefined;

    return function (this: unknown, ...args: Parameters<T>) {
        if (timer) clearTimeout(timer);
        
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

function jsonp(url: string, cb: (data: any) => void, errcb: () => void) {
    const callbackName = "jsonp_callback_" + Math.round(100000 * Math.random());
    (window as any)[callbackName] = function (data: any) {
        delete (window as any)[callbackName];
        document.body.removeChild(script);
        cb(data);
    };

    const script = document.createElement("script");
    script.src = url + (url.indexOf("?") >= 0 ? "&" : "?") + "callback=" + callbackName;
    script.onerror = function () {
        delete (window as any)[callbackName];
        document.body.removeChild(script);
        errcb();
    };
    document.body.appendChild(script);
    return {
        abort(){
            // 这并不能阻止请求，反而会导致一堆报错
            // delete (window as any)[callbackName];
            // document.body.removeChild(script);
            errcb();
        }
    }
}

function getLocalFiles(one=true){
    return new Promise<FileList>((resolve, reject) => {
        const input = document.createElement('input');
        input.type = 'file';
        if(!one){
            input.multiple = true;
        }
        input.onchange = () => {
            if(input.files && input.files.length > 0){
                resolve(input.files);
            }else{
                reject();
            }
        };
        input.click();
    });
}

export { getRandomCode, checkUrl, loadimg, getFavicon, debounce, jsonp, getLocalFiles };