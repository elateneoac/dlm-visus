<template>
    <span class="form-label"><strong>ETIQUETAS</strong></span>
    <hr class="my-2">
    <div class="row justify-content-between">
        <div class="col-2">
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text">x</span>
                <input :value="modelValue.x" @change="this.emitir('x', $event.target.value)" type="number" class="form-control">
            </div>
        </div>
        <div class="col-2">
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text">y</span>
                <input :value="modelValue.y" @change="this.emitir('y', $event.target.value)" type="number" class="form-control">
            </div>
        </div>
        <div class="col-2">
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text">espaciado</span>
                <input :value="modelValue.espaciado" @change="this.emitir('espaciado', $event.target.value)" type="number" class="form-control">
            </div>
        </div>
        <div class="col-2">
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text">radio</span>
                <input :value="modelValue.radio" @change="this.emitir('radio', $event.target.value)" type="number" class="form-control">
            </div>
        </div>
        <div class="col-2">
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text">tamanio</span>
                <input :value="modelValue.tamanio" @change="this.emitir('tamanio', $event.target.value)" type="number" class="form-control">
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <div class="input-group input-group-sm mb-3">
                <div class="form-check form-switch">
                    <input class="form-check-input me-3 mt-2" :checked="this.flag_todos" @change="this.todos($event.target.checked)" type="checkbox">
                    <span class="input-group-text">todos</span>
                </div>
            </div>
        </div>

        <template v-for="(value, key) in modelValue.estetica">
            <div class="col-12">
                <div class="input-group input-group-sm mb-3">
                    <div class="form-check form-switch">
                        <input :checked="modelValue.estetica[key].mostrar" @change="this.emitirEstetica(key, 'mostrar', $event.target.checked)" class="form-check-input me-3" type="checkbox">
                    </div>

                    <span class="input-group-text">nombre</span>
                    <input :value="modelValue.estetica[key].nombre" @change="this.emitirEstetica(key, 'nombre', $event.target.value)" type="text" class="form-control">
                    
                    <span class="input-group-text">color</span>
                    <input :value="modelValue.estetica[key].color" @change="this.emitirEstetica(key, 'color', $event.target.value)" type="text" class="form-control">
                </div>
            </div>
        </template>
    </div>
</template>

<script>

export default {
    props: ['modelValue'],

    data() {
        return {
            flag_todos : true
        }
    },

    methods: {
        todos(flag) {
            this.flag_todos = flag;
            var nueva = {}
            for(const e of Object.entries(this.modelValue.estetica)) {
                let k = e[0]
                let v = e[1]

                nueva[k] = {
                    ...v,
                    ['mostrar'] : flag
                }
            }


            this.$emit('update:modelValue', {
                ...this.modelValue,
                estetica : nueva
            })
        },
        emitir(clave, data) {
            this.$emit('update:modelValue', {
                ...this.modelValue,
                [clave] : Number(data)
            })
        },
        emitirEstetica(topico, clave, data) {
            this.$emit('update:modelValue', {
                ...this.modelValue,
                estetica : {
                    ...this.modelValue.estetica,
                    [topico] : {
                        ...this.modelValue.estetica[topico],
                        [clave] : data
                    }
                }
            })
        }
    }
}

</script>