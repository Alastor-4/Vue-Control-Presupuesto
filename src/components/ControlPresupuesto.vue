<script setup>
import "vue3-circle-progress/dist/circle-progress.css";
import CircleProgress from "vue3-circle-progress";
import { formatQuantity } from "../helpers";
import { computed } from "vue";

defineEmits([ "reset-app" ]);

const props = defineProps({
    budget: {
        type: Number,
        required: true,
    },
    budgetAvaiable: {
        type: Number,
        required: true,
    },
    totalDebits: {
        type: Number,
        required: true,
        default: 0,
    },
});

const percent = computed(() => {
    return parseInt(((props.budget - props.budgetAvaiable) / props.budget) * 100);

});

</script>

<template>
    <div class="two-columns">
        <div class="grafic-container">
            <p class="percent">{{ percent }}%</p>
            <CircleProgress
                :percent="percent"
                :size="250"
                :border-width="30"
                :border-bg-width="30"
                fill-color="#3B82F6"
                empty-color="#E1E1E1"
            />
        </div>
        <div class="budget-container">
            <button type="button" class="reset-app" @click="$emit('reset-app')">Reiniciar aplicación</button>
            <p><span>Presupuesto: </span>{{ formatQuantity(budget) }}</p>
            <p><span>Disponible: </span>{{ formatQuantity(budgetAvaiable) }}</p>
            <p><span>Gastado: </span> {{ formatQuantity(totalDebits) }}</p>
        </div>
    </div>
</template>

<style scoped>
.grafic-container {
    position: relative;
}

.percent {
    position: absolute;
    margin: auto;
    top: calc(50% - 1.5rem);
    left: 0;
    right: 0;
    text-align: center;
    z-index: 1;
    font-size: 3rem;
    font-weight: 900;
    color: var(--dark-gray);
}

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