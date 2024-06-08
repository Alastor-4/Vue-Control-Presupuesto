<script setup>
import imagen from "../assets/img/grafico.jpg";
import { formatQuantity } from "../helpers";

const props = defineProps({
    budget: {
        type: Number,
        required: true,
    },
    budgetAvaiable: {
        type: Number,
        required: true,
    },
});
</script>

<template>
    <div class="two-columns">
        <div class="grafic-container">
            <img :src="imagen" alt="Imagen"/>
        </div>
        <div class="budget-container">
            <button class="reset-app">Reiniciar aplicación</button>
            <p><span>Presupuesto: </span>{{ formatQuantity(budget) }}</p>
            <p><span>Disponible: </span>{{ formatQuantity(budgetAvaiable) }}</p>
            <p><span>Gastado: </span> $0</p>
        </div>
    </div>
</template>

<style scoped>
.two-columns {
    display: flex;
    flex-direction: column;
}

.two-columns > :first-child {
    margin-bottom: 3rem;
}

@media (min-width: 768px) {
    .two-columns {
        flex-direction: row;
        gap: 4rem;
        align-items: center;
    }

    .two-columns > :first-child {
        margin-bottom: 0;
    }
}

.reset-app {
    background-color: var(--remove);
    color: var(--white);
    border: none;
    padding: 1rem;
    width: 100%;
    font-weight: 900;
    text-transform: uppercase;
    border-radius: 1rem;
    transition-property: background-color;
    transition-duration: 300ms;
}

.reset-app:hover {
    cursor: pointer;
    background-color: var(--dark-remove);
}

.budget-container {
    width: 100%;
}

.budget-container p {
    font-size: 2.4rem;
    text-align: center;
    color: var(--dark-gray);
}

@media (min-width: 768px) {
    .budget-container p {
        text-align: left;
    }
}

.budget-container span {
    font-weight: 900;
    color: var(--blue);
}
</style>