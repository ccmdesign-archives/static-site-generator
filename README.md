Static Site Generator
=====================

Directory structure
-------------------

```
├─ images/
├─ js/
├─ scss/
├─ templates/
│  ├─ layouts/
│  └─ partials/
└─ data.json
```

`images/`: Image files.

`js/`: Javascript files.

`scss/`: SASS files.

`templates/`: Nunjucks templates.

`templates/layouts/`: Nunjucks templates you want to extend.

`templates/partial/`: Nunjucks templates you want to include.

`data.json`: JSON file with the data you want to be available in the templates.


Gulp tasks
----------

`gulp serve`: (Default) Starts the server and watch files changes.

`gulp build`: Builds project for production.

`gulp clean`: Deletes the `dist` folder.
