<template>

<div class="container my-4">
    <div class="col">
        <div class="row text-center mb-4">
            <span class="display-2 fst-italic" style="color: #666666;">Para dibujar visualizaciones</span>
        </div>
        <div class="row fs-4 mb-4">
            <ol style="color: #444444;">
                <li>seleccionar la <strong>visualizacion</strong> (barras, series, ...)</li>
                <li>cargar el <strong>csv</strong></li>
                <li>seleccionar campos a gráficar: <strong>valores, etiquetas y/o grupos</strong></li>
                <li><strong>dibujar</strong></li>
                <li>ajustar <strong>parámetros</strong></li>
                <li>cada vez que <strong>modificamos</strong>
                    parámetros (aparece el marco <span class="fw-bold" style="color: #E31C1C">rojo</span>)
                    hay que <strong>redibujar</strong> la visualizacion
                </li>
            </ol>
        </div>
        <div class="row fs-4">
            <div class="row fs-4 text-center">
                <span class="display-2 fst-italic" style="color: #666666;">Parámetros a tocar</span><br>
            </div>
            <ul>
                <li>
                    <span>columna <strong>izquierda arriba</strong>: parámetros de lienzo</span>
                </li>
                <li>
                    <span>columna <strong>izquierda abajo</strong>: parámetros del gráfico en particular</span>
                </li>
                <li>
                    <span>columna <strong>derecha</strong>: parámetros de la leyenda</span>
                </li>
            </ul>
        </div>
    </div>
</div>

</template>

<script setup>
const props = defineProps(["parametros"]);
</script>
