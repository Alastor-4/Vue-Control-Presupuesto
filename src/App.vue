<script setup>
import ControlPresupuesto from "./components/ControlPresupuesto.vue";
import { reactive, ref, watch, computed, onMounted } from "vue";
import IconoNuevoGasto from "./assets/img/nuevo-gasto.svg";
import Presupuesto from "./components/Presupuesto.vue";
import Filtros from "./components/Filtros.vue";
import { generateId } from "../src/helpers";
import Debit from "./components/Debit.vue";
import Modal from "./components/Modal.vue";

const budget = ref(0);
const budgetAvaiable = ref(0);
const totalDebits = ref(0);
const debits = ref([]);
const filter = ref("");

const modal = reactive({
    show: false,
    animate: false,
});

watch(debits, () => {
    totalDebits.value = debits.value.reduce((total, debit) => debit.quantity + total, 0);
    budgetAvaiable.value = budget.value - totalDebits.value;

    localStorage.setItem("debits", JSON.stringify(debits.value));
}, { deep: true });

watch(modal, () => {
    if (!modal.show) {
        resetDebit();
    }
}, { deep: true });

watch(budget, () => {
    localStorage.setItem("budget", JSON.stringify(budget.value));
});

onMounted(() => {
    const budgetStorage = localStorage.getItem("budget");
    if (budgetStorage) {
        budget.value = Number(budgetStorage);
        budgetAvaiable.value = Number(budgetStorage);
    }

    const debitsStorage = localStorage.getItem("debits");
    if (debitsStorage) {
        debits.value = JSON.parse(debitsStorage);
    }
});

const resetDebit = () => {
    Object.assign(debit, {
        name: "",
        quantity: "",
        category: "",
        id: null,
        date: Date.now(),
    });
};

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

const saveDebit = () => {
    if (debit.id) {
        const { id } = debit;
        const i = debits.value.findIndex(debit => debit.id === id);
        debits.value[i] = { ...debit };
    } else {
        debits.value.push({ ...debit, id: generateId() });
    }
    closeModal();
    resetDebit();
};

const selectDebit = (id) => {
    const editDebit = debits.value.filter(debit => debit.id === id)[0];
    Object.assign(debit, editDebit);
    showModal();
};

const deleteDebit = () => {
    debits.value = debits.value.filter(debitState => debitState.id !== debit.id);
    closeModal();
};

const filteredDebits = computed(() => {
    if (filter.value) {
        return debits.value.filter(debit => debit.category === filter.value);
    }
    return debits.value;
});

const resetApp = () => {
    debits.value = [];
    budget.value = 0;
};

</script>

<template>
    <div :class="{fixed: modal.show}">
        <header>
            <h1>Planificador de Gastos</h1>

            <div class="header-container container shadow">
                <Presupuesto v-if="budget === 0"
                             @define-budget="defineBudget"/>
                <ControlPresupuesto
                    v-else
                    :budget="budget"
                    :budget-avaiable="budgetAvaiable"
                    :total-debits="totalDebits"
                    @reset-app="resetApp"
                />
            </div>
        </header>
        <main v-if="budget > 0">
            <Filtros v-model:filter="filter"/>
            <div class="debit-list container">
                <h2>{{ filteredDebits.length > 0 ? "Gastos" : "No hay gastos" }}</h2>
                <Debit v-for="debit in filteredDebits" :key="debit.id" :debit="debit" @select-debit="selectDebit"/>
            </div>
            <div class="create-debit">
                <img :src="IconoNuevoGasto" alt="Icono Nuevo Gasto" @click="showModal"/>
            </div>
            <Modal
                v-if="modal.show"
                :modal="modal"
                :budget-avaiable="budgetAvaiable"
                :id="debit.id"
                v-model:name="debit.name"
                v-model:quantity="debit.quantity"
                v-model:category="debit.category"
                @close-modal="closeModal"
                @delete-debit="deleteDebit"
                @save-debit="saveDebit"
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
    --delete: #EF4444;
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

.fixed {
    overflow: hidden;
    height: 100vh;
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

.debit-list {
    margin-top: 10rem;
}

.debit-list h2 {
    font-weight: 900;
    color: var(--dark-gray);
}
</style>
