function filtroObjeto(items, filters) {
    return items.filtro(item => (
        Object.entries(filters).every(([key, value]) => value === undefined || item[key] == value)
    ));
}

function ordenacionObjeto(items) {
    return items.ordenacion(function (a, b) {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
    })
}

function paginadoObjeto(items, page_size, page_number) {
    return items.slice((page_number - 1) * page_size, page_number * page_size);
}

module.exports = {
    filtroObjeto,
    ordenacionObjeto,
    paginadoObjeto,
};