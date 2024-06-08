<script setup>
import CerrarModal from "../assets/img/cerrar.svg";

const emit = defineEmits([ "closeModal", "update:name", "update:quantity", "update:category" ]);
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
});
</script>

<template>
    <div class="modal">
        <div class="close-modal">
            <img :src="CerrarModal" alt="Cerrar" @click="$emit('closeModal')"/>
        </div>
        <div class="container form-container" :class="[modal.animate ? 'animate' : 'show']">
            <form class="new-debit">
                <legend>Añadir Gasto</legend>
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
                        <option value="save">Ahorro</option>
                        <option value="home">Casa</option>
                        <option value="food">Comida</option>
                        <option value="variety">Gastos Varios</option>
                        <option value="health">Salud</option>
                        <option value="fun">Ocio</option>
                        <option value="suscriptions">Suscripciones</option>
                    </select>
                </div>
                <input type="submit" value="Añadir Gasto"/>
            </form>
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

</style>