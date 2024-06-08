<script setup>
import ControlPresupuesto from "./components/ControlPresupuesto.vue";
import IconoNuevoGasto from "./assets/img/nuevo-gasto.svg";
import Presupuesto from "./components/Presupuesto.vue";
import Modal from "./components/Modal.vue";
import { ref, reactive } from "vue";

const budget = ref(0);
const budgetAvaiable = ref(0);
const modal = reactive({
    show: false,
    animate: false,
});

const debit = reactive({
    name: "",
    quantity: "",
    category: "",
    id: null,
    date: Date.now(),
});

const defineBudget = (quantity) => {
    budget.value = quantity;
    budgetAvaiable.value = quantity;
};

const showModal = () => {
    modal.show = true;
    setTimeout(() => {
        modal.animate = true;
    }, 300);
};
const closeModal = () => {
    modal.animate = false;
    setTimeout(() => {
        modal.show = false;
    }, 300);
};

</script>

<template>
    <div>
        <header>
            <h1>Planificador de Gastos</h1>

            <div class="header-container container shadow">
                <Presupuesto v-if="budget === 0"
                             @define-budget="defineBudget"/>
                <ControlPresupuesto v-else :budget="budget" :budgetAvaiable="budgetAvaiable"/>
            </div>
        </header>
        <main v-if="budget > 0">
            <div class="create-debit">
                <img :src="IconoNuevoGasto" alt="Icono Nuevo Gasto" @click="showModal"/>
            </div>
            <Modal
                v-if="modal.show"
                @closeModal="closeModal"
                :modal="modal"
                :v-model:name="debit.name"
                :v-model:quantity="debit.quantity"
                :v-model:category="debit.category"
            />
        </main>
    </div>
</template>

<style>
:root {
    --blue: #3b82f6;
    --dark-blue: #1048A4;
    --white: #fff;
    --light-gray: #f5f5f5;
    --gray: #94a3b8;
    --dark-gray: #64748b;
    --black: #000;
    --red: #B91C1C;
    --remove: #DB2777;
    --dark-remove: #C11D67;
    margin: 0;
}

body {
    margin: 0;
}

html {
    font-size: 62.5%;
    box-sizing: border-box;
}

*,
*:before,
*:after {
    box-sizing: inherit;
}

body {
    font-size: 1.6rem;
    font-family: "Lato", sans-serif;
    background-color: var(--light-gray);
}

h1 {
    font-size: 4rem;
}

h2 {
    font-size: 3rem;
}

header {
    background-color: var(--blue);
}

header h1 {
    padding: 3rem 0;
    margin: 0;
    color: var(--white);
    text-align: center;
}

.container {
    width: 90%;
    max-width: 80rem;
    margin: 0 auto;
}

.header-container {
    margin-top: -5rem;
    transform: translateY(5rem);
    padding: 5rem;
}

.shadow {
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
    background-color: var(--white);
    border-radius: 1.2rem;
    padding: 5rem;
}

.create-debit {
    position: fixed;
    bottom: 5rem;
    right: 5rem;
}

.create-debit img {
    width: 5rem;
    cursor: pointer;
}

</style>
