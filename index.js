/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection) {
    if (arguments.length == 1) {
        return arguments[0];
    }
    let col = JSON.parse(JSON.stringify(collection));
    let args = [].slice.call(arguments);
    args.shift();
    let selectedFields = [];
    let pattern = {
        name: [],
        gender: [],
        email: [],
        favoriteFruit: []
    };
    let collectionKeys = Object.keys(pattern);

    args.forEach(function (item) {
        if (item[0] === 'filterIn') {
            pattern[item[1]].push(item[2]);
        }

    });


    let filteredCollection = col.filter(function (item) {
        let flag1 = 0;
        let flag2 = 0;
        collectionKeys.forEach(function (key) {

            if ((pattern[key] !== []) && (pattern[key].every(function (arr) {


                return (arr.indexOf(item[key]) != -1);

            }))) {


                flag1++;

            }
            if (pattern[key] !== []) {
                flag2++;

            }
        });

        if (flag1 === flag2) {

            return item;
        }
    });

    args.forEach(function (arg) {
        if (arg[0] === 'select') {
            selectedFields.push(arg[1]);
        }

    });

    if (selectedFields.length === 0) {
        return filteredCollection;
    } else {
        collectionKeys.forEach(function (colectKey) {
            selectedFields.forEach(function (selec) {
                if (selec.indexOf(colectKey) === -1) {
                    filteredCollection.forEach(function (colects) {
                        delete colects[colectKey];

                    });
                }

            });


        });
    }
    return filteredCollection;

}

/**
 * @params {String[]}
 */
function select() {
    let args = [].slice.call(arguments);

    return ['select', args];

}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
    return ['filterIn', property, values];

}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};
