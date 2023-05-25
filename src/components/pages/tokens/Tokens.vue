<template>
    <div style="width:60%;margin:auto">
        <v-card style="height:90vh" elevation="0">
            <v-card-title>Tokens</v-card-title>
            <v-btn text @click="generate">Generate token</v-btn>
            <v-btn text :disabled="resetDisabled" @click="reset"
                >Clear password</v-btn
            >
        </v-card>
        <password-modal v-model="dialog" :onClose="close"></password-modal>
    </div>
</template>

<script>
import { generateToken } from "../../../actions/actions.js";
import PasswordModal from "../../common/PasswordModal.vue";
export default {
    data() {
        return {
            dialog: false,
        };
    },
    components: { PasswordModal },
    computed: {
        resetDisabled() {
            return this.$store.state.tokenPassword == undefined;
        },
    },
    methods: {
        generate() {
            if (this.$store.state.tokenPassword == undefined)
                this.dialog = true;
        },
        close() {
            this.dialog = false;
            if (this.$store.state.token == undefined) {
                var token = generateToken();
                this.$store.dispatch("setToken", token);
            }
        },
        reset() {
            this.$store.dispatch("clearPassword");
        },
    },
};
</script>
