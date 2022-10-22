<template>
    <div class="row justify-content-between">
        <div class="col-4">
            <div class="row">
                <div class="form-label my-0"><strong>TAMAÑO</strong></div>
                <hr class="my-2">
                <div class="col-6">
                    <div class="input-group mb-3">
                        <span class="input-group-text">ancho</span>
                        <input :value="modelValue.ancho" @change="this.emitir('ancho', $event.target.value)" type="number" class="form-control">
                    </div>
                </div>
                <div class="col-6">
                    <div class="input-group mb-3">
                        <span class="input-group-text">alto</span>
                        <input :value="modelValue.alto" @change="this.emitir('alto', $event.target.value)" type="number" class="form-control">
                    </div>
                </div>
            </div>
        </div>
        <div class="col-7">
            <div class="row">
                <div class="form-label my-0"><strong>MARGEN</strong></div>
                <hr class="my-2">
                <div class="col-3">
                    <div class="input-group mb-3">
                        <span class="input-group-text">izquierda</span>
                        <input  :value="modelValue.margen.izquierda" @change="this.emitirMargen('izquierda', $event.target.value)" type="number" class="form-control">
                    </div>
                </div>
                <div class="col-3">
                    <div class="input-group mb-3">
                        <span class="input-group-text">derecha</span>
                        <input  :value="modelValue.margen.derecha" @change="this.emitirMargen('derecha', $event.target.value)" type="number" class="form-control">
                    </div>
                </div>
                <div class="col-3">
                    <div class="input-group mb-3">
                        <span class="input-group-text">techo</span>
                        <input  :value="modelValue.margen.techo" @change="this.emitirMargen('techo', $event.target.value)" type="number" class="form-control">
                    </div>
                </div>
                <div class="col-3">
                    <div class="input-group mb-3">
                        <span class="input-group-text">piso</span>
                        <input  :value="modelValue.margen.piso" @change="this.emitirMargen('piso', $event.target.value)" type="number" class="form-control">
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
                [clave] : Number(data)
            })
        },
        emitirMargen(clave, data) {
            this.$emit('update:modelValue', {
                ...this.modelValue,
                margen : {
                    ...this.modelValue.margen,
                    [clave] : Number(data)
                }
            })
        }
    }
}

</script>