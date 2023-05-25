    export function generateToken() {
        var array = new Uint8Array(128);
        window.crypto.getRandomValues(array);
        var string = new TextDecoder().decode(array);
        return string
    }