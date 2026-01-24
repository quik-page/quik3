import { h } from "vue";
import { search, type SugCreator } from ".";
import { checkUrl, jsonp } from "../util";
import MIcon from "../../components/utils/MIcon.vue";

// let lsfetch:ReturnType<typeof jsonp>|undefined=void 0;
const sugCt: SugCreator = {
    check: (val) => {
        return !checkUrl(val);
    },
    create(val, get, cb) {
        jsonp(
            "https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&wd=" +
                encodeURIComponent(val),
            (res) => {
                // lsfetch=void 0;
                if (res && res.g) {
                    let s = get();
                    for (let sg of res.g) {
                        s.push({
                            icon: () => h(MIcon, { name: "search" }),
                            // icon:"a",
                            text: sg.q,
                            enter(val) {
                                search(val);
                            },
                        });
                    }
                    cb(s);
                }
            },
            () => {}
        );
    },
    interrupt() {
        // 这并不能阻止请求继续，所以这没有必要
        // lsfetch?.abort();
    },
};

export { sugCt };
