<template>
    <span class="form-label"><strong>CUADRÍCULA</strong></span>
    <hr class="my-2">
    <div class="row">
        <div class="col-2">
            <div class="form-check form-switch">
                <label class="form-check-label">mostrar</label>
                <input :checked="modelValue.mostrar" @change="this.emitir('mostrar', $event.target.checked)" class="form-check-input" type="checkbox">
            </div>
        </div>
        <div class="col-2">
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="grosor">grosor</span>
                <input :value="modelValue.grosor" @change="this.emitir('grosor', $event.target.value)" type="number" class="form-control" :disabled="!modelValue.mostrar">
            </div>
        </div>
        <div class="col-2">
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="grosor">color</span>
                <input :value="modelValue.color" @change="this.emitir('color', $event.target.value)" type="text" class="form-control" :disabled="!modelValue.mostrar">
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: ['modelValue'],

    methods: {
        emitir(clave, data) {
            this.$emit('update:modelValue', {
                ...this.modelValue,
                [clave] : data
            })
        }
    }
}

</script>