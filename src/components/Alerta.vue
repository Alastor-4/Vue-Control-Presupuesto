<template>
    <div class="alert">
        <slot />
    </div>
</template>

<style scoped>
.alert {
    padding: 1rem;
    font-size: 1.6rem;
    font-weight: 900;
    text-transform: uppercase;
    text-align: center;
    background-color: var(--white);
    border-left: .5rem solid var(--red);
    color: var(--red);
    margin-bottom: 2rem;
}
</style>