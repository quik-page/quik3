import type { EventHandle } from "./types";

function getEventHandle():EventHandle {
    return {
        _listeners: {},
        on: function(event, listener) {
            if (!this._listeners[event]) {
                this._listeners[event] = [];
            }
            this._listeners[event].push(listener);
        },
        off: function(event, listener) {
            if (this._listeners[event]) {
                const index = this._listeners[event].indexOf(listener);
                if (index > -1) {
                    this._listeners[event].splice(index, 1);
                }
            }
        },
        emit: function(event, data) {
            if (this._listeners[event]) {
                this._listeners[event].forEach(listener => {
                    listener(data);
                });
            }
        },
        clear: function(event) {
            if (event) {
                this._listeners[event] = [];
            } else {
                this._listeners = {};
            }
        }
    }
}

export default getEventHandle;