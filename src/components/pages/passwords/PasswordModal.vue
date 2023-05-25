<template>
    <v-dialog v-model="show" persistent v-if="show">
        <v-card>
            <v-card-title>
                {{ title }}
            </v-card-title>
            <v-card-text>
                <v-text-field
                    type="number"
                    v-model="length"
                    label="Password length"
                ></v-text-field>
                <v-row>
                    <v-checkbox v-model="numbers" label="Numbers"> </v-checkbox>
                    <v-checkbox v-model="special" label="Special characters">
                    </v-checkbox>
                    <v-checkbox
                        v-model="uppercase"
                        label="Uppercase characters"
                    >
                    </v-checkbox>
                    <v-checkbox
                        v-model="lowercase"
                        label="Lowercase characters"
                    >
                    </v-checkbox>
                </v-row>
                <v-row>
                    <v-btn @click="generate" :disabled="disabledGen"
                        >Generate password</v-btn
                    >
                </v-row>
                <v-row>
                    <v-text-field
                        label="App"
                        v-model="app"
                        :disabled="item != undefined"
                    ></v-text-field>
                    <v-text-field
                        label="Password"
                        v-model="password"
                    ></v-text-field>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="saveAndClose">Save</v-btn>
                <v-btn @click="close">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    data() {
        return {
            length: 1,
            numbers: false,
            special: false,
            uppercase: false,
            lowercase: false,
            password: "",
            app: "",
            numbersSet: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            specialSet: [
                `!`,
                '"',
                `#`,
                `$`,
                `%`,
                `&`,
                "'",
                `(`,
                `)`,
                `*`,
                `+`,
                `,`,
                `-`,
                `.`,
                `/`,
                `:`,
                `;`,
                `<`,
                `=`,
                `>`,
                `?`,
                `@`,
                `[`,
                "\\",
                `]`,
                `^`,
                `_`,
                "`",
                `{`,
                `|`,
                `}`,
                `~`,
            ],
        };
    },
    computed: {
        title() {
            if (this.item) return "Edit password";
            else return "Add password";
        },
        disabledGen() {
            var res = !(
                this.numbers ||
                this.lowercase ||
                this.uppercase ||
                this.special
            );
            return res;
        },
        uppercaseSet() {
            let letters = [];
            for (let i = "A".charCodeAt(0); i <= "Z".charCodeAt(0); i++) {
                letters.push(String.fromCharCode([i]));
            }
            return letters;
        },
        lowercaseSet() {
            let letters = [];
            for (let i = "a".charCodeAt(0); i <= "z".charCodeAt(0); i++) {
                letters.push(String.fromCharCode([i]));
            }
            return letters;
        },
    },
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        close: {
            type: Function,
            default: () => {},
        },
        item: {
            type: Object,
            default: undefined,
        },
    },
    methods: {
        generate() {
            var letters = [];
            if (this.numbers) {
                letters.push(...this.numbersSet);
            }
            if (this.lowercase) {
                letters.push(...this.lowercaseSet);
            }
            if (this.uppercase) {
                letters.push(...this.uppercaseSet);
            }
            if (this.special) {
                letters.push(...this.specialSet);
            }
            var password = "";
            var i = 0;
            while (i < this.length) {
                var index = Math.floor(Math.random() * letters.length);
                i = i + 1;
                password += letters[index];
            }
            this.password = password;
        },
        saveAndClose() {
            if (this.app != "" && this.password != "") {
                if (this.item != undefined) {
                    this.$emit("edit", {
                        app: this.app,
                        password: this.password,
                    });
                } else {
                    this.$emit("save", {
                        app: this.app,
                        password: this.password,
                    });
                }
            }
        },
    },
    watch: {
        length(val) {
            this.length = val < 1 ? 1 : val > 32 ? 32 : val;
        },
        show(val) {
            if (val) {
                this.length = 1;
                this.numbers = false;
                this.special = false;
                this.uppercase = false;
                this.lowercase = false;
                if (this.item) {
                    this.app = this.item.app;
                    this.password = this.item.password;
                } else {
                    this.password = "";
                    this.app = "";
                }
            }
        },
        item(val) {
            if (val) {
                this.app = val.app;
                this.password = val.password;
            }
        },
    },
};
</script>
