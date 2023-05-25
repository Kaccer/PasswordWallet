<template>
    <v-app>
        <app-bar></app-bar>
    </v-app>
</template>

<script>
import AppBar from "./components/common/AppBar.vue";
export default {
    name: "App",

    components: {
        AppBar,
    },

    data: () => ({
        //
    }),
};
</script>
