<template>
    <div class="row justify-content-between">
        <div class="col-12">
            <div class="row">
                <div class="form-label my-0"><strong>DATA</strong></div>
                <hr class="my-2">
                <div class="col-4">
                    <div class="input-group mb-3">
                        <span class="input-group-text">x</span>
                        <input :value="modelValue.x" @change="this.emitir('x', $event.target.value)" type="text" class="form-control">
                    </div>
                </div>
                <div class="col-4">
                    <div class="input-group mb-3">
                        <span class="input-group-text">y</span>
                        <input :value="modelValue.y" @change="this.emitir('y', $event.target.value)" type="text" class="form-control">
                    </div>
                </div>
                <div class="col-4">
                    <div class="input-group mb-3">
                        <span class="input-group-text">grupo</span>
                        <input :value="modelValue.grupo" @change="this.emitir('grupo', $event.target.value)" type="text" class="form-control">
                    </div>
                </div>
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