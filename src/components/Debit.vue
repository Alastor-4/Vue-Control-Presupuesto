<script setup>
import IconoSuscripciones from "../assets/img/icono_suscripciones.svg";
import { formatQuantity, formatDate } from "../helpers/index.js";
import IconoComida from "../assets/img/icono_comida.svg";
import IconoGastos from "../assets/img/icono_gastos.svg";
import IconoAhorro from "../assets/img/icono_ahorro.svg";
import IconoSalud from "../assets/img/icono_salud.svg";
import IconoCasa from "../assets/img/icono_casa.svg";
import IconoOcio from "../assets/img/icono_ocio.svg";

const dictionarieIcons = {
    ahorro: IconoAhorro,
    comida: IconoComida,
    casa: IconoCasa,
    gastos: IconoGastos,
    ocio: IconoOcio,
    salud: IconoSalud,
    suscripciones: IconoSuscripciones,
};

const props = defineProps({
    debit: {
        type: Object,
        required: true,
    },
});

defineEmits([ "selectDebit" ]);
</script>

<template>
    <div class="debit shadow">
        <div class="content">
            <img
                :src="dictionarieIcons[debit.category]"
                alt="Icono Gasto"
                class="icon"
            />
            <div class="details">
                <p class="category">{{ debit.category }}</p>
                <p class="name" @click="$emit('selectDebit', debit.id)">{{ debit.name }}</p>
                <p class="date">Fecha: <span>{{ formatDate(debit.date) }}</span></p>
            </div>
        </div>
        <p class="quantity">{{ formatQuantity(debit.quantity) }}</p>
    </div>
</template>

<style scoped>
.debit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.content {
    display: flex;
    align-items: center;
    gap: 2rem;
}

.icon {
    width: 5rem;
}

.details p {
    margin: 0 0 1rem 0;
}

.category {
    color: var(--gray);
    font-size: 1.2rem;
    text-transform: uppercase;
    font-weight: 900;
}

.name {
    color: var(--dark-gray);
    font-size: 2.4rem;
    font-weight: 700;
    cursor: pointer;
}

.date {
    color: var(--dark-gray);
    font-size: 1.6rem;
    font-weight: 900;
}

.date span {
    font-weight: 400;
}

.quantity {
    font-size: 3rem;
    font-weight: 900;
    margin: 0;
}
</style>