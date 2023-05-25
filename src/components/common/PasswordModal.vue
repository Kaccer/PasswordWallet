<template>
    <v-dialog v-model="value" persistent>
        <v-card>
            <v-card-title>Token password</v-card-title>
            <v-card-text>
                <v-text-field
                    label="Password"
                    type="password"
                    v-model="password"
                ></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="savePassword">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    props: ["value", "onClose"],
    data() {
        return {
            password: "",
        };
    },
    methods: {
        savePassword() {
            if (this.password != "") {
                var CryptoJS = require("crypto-js");
                var hash = CryptoJS.SHA512(this.password).toString();
                this.$store.dispatch("saveTokenPassword", hash);
                this.password = "";
                this.onClose();
            }
        },
    },
};
</script>
