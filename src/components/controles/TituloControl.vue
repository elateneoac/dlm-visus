<template>
    <span class="form-label"><strong>TÍTULO</strong></span>
    <hr class="my-2">
    <div class="row">
        <div class="col-6">
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text">texto</span>
                <input :value="modelValue.texto" @change="this.emitir('texto', $event.target.value)" type="text" class="form-control">
            </div>
        </div>
        <div class="col-2">
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text">tamaño</span>
                <input :value="modelValue.tamanio" @change="this.emitir('tamanio', $event.target.value)" type="number" class="form-control">
                <span class="input-group-text">pt</span>
            </div>
        </div>
        <div class="col-2">
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text">color</span>
                <input :value="modelValue.color" @change="this.emitir('color', $event.target.value)" type="text" class="form-control">
            </div>
        </div>
        <div class="col-1">
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text">x</span>
                <input :value="modelValue.x" @change="this.emitir('x', $event.target.value)" type="number" class="form-control">
            </div>
        </div>
        <div class="col-1">
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text">y</span>
                <input :value="modelValue.y" @change="this.emitir('y', $event.target.value)" type="number" class="form-control">
            </div>
        </div>
    </div>
    <!-- <div class="row">
        <div class="col-2">
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text">fondo</span>
                <input :value="modelValue.fondo" @change="this.emitir('fondo', $event.target.value)" type="text" class="form-control">
            </div>
        </div>
        <div class="col-2">
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text">base</span>
                <input :value="modelValue.base" @change="this.emitir('base', $event.target.value)" type="number" class="form-control">
            </div>
        </div>
        <div class="col-2">
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text">altura</span>
                <input :value="modelValue.altura" @change="this.emitir('altura', $event.target.value)" type="number" class="form-control">
            </div>
        </div>
    </div> -->
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