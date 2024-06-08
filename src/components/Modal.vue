<script setup>
import CerrarModal from "../assets/img/cerrar.svg";
import Alerta from "./Alerta.vue";
import { ref } from "vue";

const emits = defineEmits([
    "closeModal",
    "save-debit",
    "update:name",
    "update:quantity",
    "update:category",
    "delete-debit",
]);
const error = ref("");
const props = defineProps({
    modal: {
        type: Object,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: [ Number, String ],
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    budgetAvaiable: {
        type: Number,
        required: true,
    },
    id: {
        type: [ String, null ],
        required: true,
    },
});

const old = props.quantity;

const addDebit = () => {
    //Validar que no haya campos vacíos
    const { category, quantity, name, budgetAvaiable, id } = props;

    if ([ category, quantity, name ].includes("")) {
        error.value = "Todos los campos son obligatorios";
        setTimeout(() => {
            error.value = "";
        }, 3000);
        return;
    }
    if (quantity <= 0) {
        error.value = "Cantidad no válida";
        setTimeout(() => {
            error.value = "";
        }, 3000);
        return;
    }
    if (id) {
        if (quantity > old + budgetAvaiable) {
            error.value = "Has excedido el presupuesto";
            setTimeout(() => {
                error.value = "";
            }, 3000);
            return;
        }
    } else {
        if (quantity > budgetAvaiable) {
            error.value = "Has excedido el presupuesto";
            setTimeout(() => {
                error.value = "";
            }, 3000);
            return;
        }
    }

    emits("save-debit");
};
</script>

<template>
    <div class="modal">
        <div class="close-modal">
            <img :src="CerrarModal" alt="Cerrar" @click="$emit('closeModal')"/>
        </div>
        <div class="container form-container" :class="[modal.animate ? 'animate' : 'show']">
            <form class="new-debit" @submit.prevent="addDebit">
                <legend>{{ id ? "Guardar Cambios" : "Añadir Gasto" }}</legend>
                <Alerta v-if="error">{{ error }}</Alerta>
                <div class="field">
                    <label for="name">Gasto:</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Añade nombre del Gasto"
                        :value="name"
                        @input="$emit('update:name', $event.target.value)"/>

                </div>
                <div class="field">
                    <label for="quantity">Cantidad:</label>
                    <input
                        type="number"
                        id="quantity"
                        placeholder="Añade la cantidad del Gasto"
                        :value="quantity"
                        @input="$emit('update:quantity', +$event.target.value)"
                    />
                </div>
                <div class="field">
                    <label for="category">Categoría:</label>
                    <select
                        id="category"
                        :value="category"
                        @input="$emit('update:category', $event.target.value)"
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="casa">Casa</option>
                        <option value="comida">Comida</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="salud">Salud</option>
                        <option value="ocio">Ocio</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>
                <input type="submit" :value="[id ? 'Guardar Cambios' : 'Añadir Gasto']"/>
            </form>
            <button
                v-if="id"
                type="button"
                class="btn-delete"
                @click="$emit('delete-debit')"
            >
                Eliminar Gasto
            </button>
        </div>
    </div>
</template>

<style scoped>
.modal {
    position: absolute;
    background-color: rgb(0 0 0 / 0.9);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}

.close-modal {
    position: absolute;
    right: 3rem;
    top: 3rem;
}

.form-container {
    transition-property: all;
    transition-duration: 300ms;
    transition-timing-function: ease-in;
    opacity: 0;
}

.form-container.animate {
    opacity: 1;
}

.form-container.show {
    opacity: 0;
}

.close-modal img {
    width: 3rem;
    cursor: pointer;
}

.new-debit {
    margin: 10rem auto 0 auto;
    display: grid;
    gap: 2rem;
}

.new-debit legend {
    text-align: center;
    color: var(--white);
    font-size: 3rem;
    font-weight: 700;
}

.field {
    display: grid;
    gap: 2rem;
}

.new-debit input, .new-debit select {
    background-color: var(--light-gray);
    border-radius: 1rem;
    padding: 1rem;
    border: none;
    font-size: 2.2rem;
}

.new-debit label {
    color: var(--white);
    font-size: 3rem;
}

.new-debit input[type="submit"] {
    background-color: var(--blue);
    color: var(--white);
    font-weight: 700;
    cursor: pointer;
}

.btn-delete {
    border: none;
    padding: 1rem;
    width: 100%;
    background-color: var(--delete);
    font-weight: 700;
    font-size: 1.2rem;
    color: var(--white);
    margin-top: 10rem;
    cursor: pointer;
}

</style>