<template>
    <div>
        <v-toolbar style="height:10vh" dark flat color="cyan">
            <v-toolbar-title></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tabs style="height:100%" v-model="tab" align-with-title grow>
                <v-tab style="height:100%">
                    Passwords
                </v-tab>
                <v-tab>
                    Tokens
                </v-tab>
                <v-tab>
                    Settings
                </v-tab>
            </v-tabs>
        </v-toolbar>
        <v-spacer></v-spacer>
        <v-tabs-items v-model="tab">
            <v-tab-item style="overflow:auto"
                ><passwords></passwords
            ></v-tab-item>
            <v-tab-item><tokens></tokens></v-tab-item>
            <v-tab-item><settings></settings></v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
import Passwords from "@/components/pages/passwords/Passwords.vue";
import Tokens from "@/components/pages/tokens/Tokens.vue";
import Settings from "@/components/pages/settings/Settings.vue";
export default {
    components: {
        Passwords,
        Tokens,
        Settings,
    },
    data() {
        return {
            tab: 0,
        };
    },
};
</script>
