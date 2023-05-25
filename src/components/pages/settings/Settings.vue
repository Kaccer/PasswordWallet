<template>
    <div style="width:60%;margin:auto">
        <v-card elevation="0" style="height:90vh">
            <v-card-title>Settings</v-card-title>
            <v-card-text>
                <v-row>
                    <v-file-input
                        label="Passwords file"
                        @change="(e) => loadFile(e, loadPasswords)"
                    ></v-file-input>
                </v-row>
                <v-row>
                    <v-file-input
                        label="Token file"
                        @change="(e) => loadFile(e, loadToken)"
                    ></v-file-input>
                </v-row>
                <v-row>
                    <v-btn text @click="savePasswords">Save passwords</v-btn>
                    <v-btn
                        text
                        :disabled="tokenPassword == undefined"
                        @click="saveToken"
                        >Save token</v-btn
                    >
                </v-row>
            </v-card-text>
        </v-card>
        <password-modal v-model="dialog" :onClose="close"></password-modal>
    </div>
</template>

<script>
import PasswordModal from "../../common/PasswordModal.vue";
export default {
    components: {
        PasswordModal,
    },
    data() {
        return {
            dialog: false,
            tokenFile: undefined,
            passwordsFile: undefined,
        };
    },
    computed: {
        tokenPassword() {
            return this.$store.state.tokenPassword ?? undefined;
        },
    },
    methods: {
        close() {
            this.dialog = false;
            if (this.tokenFile) {
                var CryptoJS = require("crypto-js");
                var decrypted = CryptoJS.AES.decrypt(
                    JSON.parse(this.tokenFile),
                    this.tokenPassword
                ).toString(CryptoJS.enc.Utf8);
                this.$store.dispatch("setToken", decrypted);
                this.tokenFile = undefined;
                this.loadPasswords(this.passwordsFile);
            }
        },
        loadPasswords(result) {
            var token = this.$store.state.token;
            if (token && result) {
                var CryptoJS = require("crypto-js");
                var decrypted = CryptoJS.AES.decrypt(
                    JSON.parse(result),
                    token
                ).toString(CryptoJS.enc.Utf8);
                this.$store.dispatch("setPasswords", JSON.parse(decrypted));
                this.passwordsFile = undefined;
            } else {
                this.passwordsFile = result;
            }
        },
        loadFile(e, func) {
            if (e) this.readFile(e, func);
        },
        savePasswords() {
            var passwords = JSON.stringify(this.$store.state.passwords);
            var token = this.$store.state.token;
            var CryptoJS = require("crypto-js");
            var encryptedPasswords = CryptoJS.AES.encrypt(
                passwords,
                token
            ).toString();

            this.saveFile(encryptedPasswords, "passwords.blb");
        },
        loadToken(result) {
            this.tokenFile = result;
            this.dialog = true;
        },
        saveToken() {
            var token = this.$store.state.token;
            var tokenPassword = this.tokenPassword;
            if (tokenPassword) {
                var CryptoJS = require("crypto-js");
                var encryptedToken = CryptoJS.AES.encrypt(
                    token,
                    tokenPassword
                ).toString();
                this.saveFile(encryptedToken, "token.tk");
            }
        },
        saveFile: function(content, basicText) {
            const data = JSON.stringify(content);
            const blob = new Blob([data], { type: "text/plain" });
            const e = document.createEvent("MouseEvents"),
                a = document.createElement("a");
            a.download = basicText;
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl = [basicText, a.download, a.href].join(":");
            e.initEvent(
                "click",
                true,
                false,
                window,
                0,
                0,
                0,
                0,
                0,
                false,
                false,
                false,
                false,
                0,
                null
            );
            a.dispatchEvent(e);
        },
        readFile(file, func) {
            const reader = new FileReader();
            reader.onload = (res) => {
                func(res.target.result);
            };
            reader.readAsText(file);
        },
    },
};
</script>
