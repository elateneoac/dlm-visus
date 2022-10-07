import { defineStore } from 'pinia'

export const estetica = defineStore({

    id : 'estetica',
    state : () => ({
        medios: {
            'clarin' : {'nombre': 'Clarín', 'color': 'red', 'mostrar' : true},
            'infobae' : {'nombre': 'Infobae', 'color': 'orange', 'mostrar' : true},
            'lanacion' : {'nombre': 'La Nación', 'color': 'lightblue', 'mostrar' : true},
            'paginadoce' : {'nombre': 'Página 12', 'color': 'blue', 'mostrar' : true},
            'ambito' : {'nombre': 'Ámbito', 'color': 'darkcyan', 'mostrar' : true},
            'eldestape' : {'nombre': 'El Destape', 'color': 'darkblue', 'mostrar' : true},
            'perfil' : {'nombre': 'Perfil', 'color': 'darkgrey', 'mostrar' : true},
            // 'telam' : {'nombre': 'Télam', 'color': 'violet', 'mostrar' : true},
            'todonoticias' : {'nombre': 'TN', 'color': 'darkred', 'mostrar' : true},
            'casarosada' : {'nombre': 'Casa Rosada', 'color': 'pink', 'mostrar' : true},
            'diariodeleuco' : {'nombre': 'Le doy mi palabra', 'color': 'darkviolet', 'mostrar' : true},
        },
        secciones: {
            'politica' : {'nombre' : 'Política'},
            'economia' : {'nombre' : 'Economía'},
            'internacional' : {'nombre' : 'Internacional'},
            'sociedad' : {'nombre' : 'Sociedad'},
            'espectaculos' : {'nombre' : 'Espectáculos'},
            'deportes' : {'nombre' : 'Deportes'},
            'lifestyle' : {'nombre' : 'Lifestyle'},
            'opinion' : {'nombre' : 'Opinión'},
        },
        locale_es: {
            "dateTime": "%A, %e de %B de %Y, %X",
            "date": "%d/%m/%Y",
            "time": "%H:%M:%S",
            "periods": ["AM", "PM"],
            "days": ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
            "shortDays": ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
            "months": ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
            "shortMonths": ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
          }
    }),

})