# SuperheroApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.0.

* Este proyecto es una aplicación Angular creada utilizando componentes Standalone, Signals, Angular Material y buenas prácticas de organización modular y atómica.

## Arquitectura del proyecto

La arquitectura está organizada de forma clara, sencilla y atómica:

src/
├── app/
│   ├── components/            # Componentes compartidos standalone
│   ├── directives/            # Directivas reutilizables
│   ├── interceptors/          # Interceptores HTTP
│   ├── models/                # Interfaces y modelos
│   ├── services/              # Servicios con Signals
│   ├── selectors/             # Selectores para el store
│   ├── shared/                # Componentes compartidos (cards, modals)
│   ├── pages/
│   │   └── heroes-page/       # Página principal con lista y detalle de héroes
│   └── tests/                 # Tests unitarios
│
├── assets/
│   └── images/                # Imágenes estáticas
├── environments/              # Variables de entorno
├── styles/                    # Estilos globales
└── main.ts

* Angular 19

* Angular Material

* TypeScript

* Signals (señales de Angular)

* Standalone Components

* Unit Testing (Jasmine y Karma)

* Funcionalidades destacadas

* Listado, creación, edición y eliminación de héroes.

* Gestión del estado con señales (Signals).

* Formularios reactivos con validaciones.

* Confirmaciones de eliminación con SweetAlert2.

* Notificaciones mediante ngx-toastr.

* Tests unitarios integrados en componentes y servicios.

## Buenas prácticas aplicadas

* Código atómico, modular y claro.

* Validaciones reactivas en formularios.

* Arquitectura escalable utilizando componentes standalone.

* Testing unitario para garantizar calidad.

* Uso eficiente de señales (Signals) para manejo de estado reactivo.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```
