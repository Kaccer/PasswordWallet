<template>
    <div style="width:60%;margin:auto">
        <v-card style="height:90vh" elevation="0">
            <v-card-title>Passwords</v-card-title>
            <v-row>
                <v-btn elevation="0" text @click="generate"
                    >Generate password</v-btn
                >
            </v-row>
            <v-row>
                <v-data-table
                    dense
                    :items="passwords"
                    :headers="headers"
                    :search="search"
                >
                    <template v-slot:top>
                        <div style="margin: 10px; position: relative">
                            <v-text-field
                                v-model="search"
                                label="Search:"
                                single-line
                                hide-details
                            ></v-text-field>
                        </div>
                    </template>
                    <template v-slot:item.actions="{ item }"
                        ><v-icon small @click="deleteItem(item)">
                            mdi-delete
                        </v-icon>
                        <v-icon small @click="editItem(item)">
                            mdi-pencil
                        </v-icon></template
                    >
                    <template v-slot:item.password="{ item }">
                        <span
                            @click="onPasswordClick(item)"
                            style="cursor:pointer"
                            >{{ item.password }}</span
                        >
                    </template>
                </v-data-table>
            </v-row>
        </v-card>
        <password-modal
            :show="showModal"
            :close="closeModal"
            @save="onSave"
            @edit="onEdit"
            :item="item"
        ></password-modal>
        <v-dialog v-model="showDelete">
            <v-card>
                <v-card-title>
                    Remove password
                </v-card-title>
                <v-card-text>
                    Are you sure to remove password? (If u save file it's not
                    going to be reversible)
                </v-card-text>
                <v-card-actions>
                    <v-btn color="blue" @click="removePassword">Remove</v-btn>
                    <v-btn color="grey" @click="closeModalDelete">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import PasswordModal from "./PasswordModal.vue";
export default {
    data() {
        return {
            showModal: false,
            headers: [
                { text: "Application", value: "app" },
                { text: "Password", value: "password" },
                { text: "Actions", value: "actions", sortable: false },
            ],
            search: "",
            showDelete: false,
            currentPassword: undefined,
            item: undefined,
        };
    },
    components: { PasswordModal },
    methods: {
        generate() {
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        closeModalDelete() {
            this.showDelete = false;
        },
        removePassword() {
            this.closeModalDelete();
            this.$store.dispatch("removePassword", this.currentPassword);
            this.currentPassword = undefined;
        },
        onSave(val) {
            this.showModal = false;
            this.$store.dispatch("addPassword", val);
        },
        deleteItem(item) {
            this.currentPassword = item;
            this.showDelete = true;
        },
        onPasswordClick(item) {
            navigator.clipboard.writeText(item.password);
        },
        editItem(item) {
            this.item = item;
            this.showModal = true;
        },
        onEdit(val) {
            this.$store.dispatch("editPassword", val);
            this.showModal = false;
            this.item = undefined;
        },
    },
    computed: {
        passwords() {
            return this.$store.state.passwords;
        },
    },
};
</script>
