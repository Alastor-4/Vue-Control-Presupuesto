<script setup>
defineProps([ "filter" ]);
defineEmits([ "update:filter" ]);
</script>

<template>
    <div class="filter shadow container">
        <form>
            <div class="field">
                <label for="select">Filtrar Gastos</label>
                <select
                    id="select"
                    :value="filter"
                    @input="$emit('update:filter', $event.target.value)"
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
        </form>
    </div>
</template>

<style scoped>
.filter {
    margin-top: 10rem;
}

.filter .field {
    display: flex;
    align-items: center;
    gap: 2rem
}

.filter label {
    font-size: 3rem;
    font-weight: 900;
    color: var(--dark-gray);
}

.filter select {
    flex: 1;
    padding: 1rem;
    border: none;
    border-radius: 1rem;
    background-color: var(--light-gray);
    text-align: center;
    font-size: 1.8rem;
}
</style>