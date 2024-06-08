<script setup>
import Alerta from "./Alerta.vue";
import { ref } from "vue";

const budget = ref(0);
const error = ref("");

const emit = defineEmits([ "define-budget" ]);

const defineBudget = () => {
    if (budget.value <= 0) {

        error.value = "Presupuesto no válido";

        setTimeout(() => {
            error.value = "";
        }, 3000);
        return;
    }

    emit("define-budget", budget.value);
};
</script>

<template>
    <form class="budget" @submit.prevent="defineBudget">
        <Alerta v-if="error">{{ error }}</Alerta>
        <div class="field">
            <label for="new-budget">Definir Presupuesto</label>
            <input id="new-budget" class="new-budget" v-model="budget" type="number" placeholder="Añade tu presupuesto">
        </div>

        <input type="submit" @click:prevent="" value="Definir Presupuesto">
    </form>
</template>

<style scoped>
.budget {
    width: 100%;
}

.field {
    display: grid;
    gap: 2rem;
}

.budget label {
    font-size: 2.2rem;
    text-align: center;
    color: var(--blue);
}

.budget input[type="number"] {
    background-color: var(--light-gray);
    border-radius: 1rem;
    padding: 1rem;
    border: none;
    font-size: 2.2rem;
    text-align: center;
}

.budget input[type="submit"] {
    background-color: var(--blue);
    border: none;
    padding: 1rem;
    text-align: center;
    font-size: 2rem;
    margin-top: 2rem;
    color: var(--white);
    font-weight: 900;
    width: 100%;
    transition: background-color 300ms ease;
}

.budget input[type="submit"]:hover {
    background-color: var(--dark-blue);
    cursor: pointer;
}
</style>