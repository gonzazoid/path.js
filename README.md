
# <img src="https://img.shields.io/travis/gonzazoid/path.js.svg"></img> <img src="https://img.shields.io/npm/v/path.js.svg"></img>
 
# path.js
path provider object

Path(target_object, start_token?)

path.js предоставляет всего одну функцию (Path) которая на основе переданного ей объекта(массива) генерирует объект path, назначение которого - хранить в себе путь до какого либо свойства в целевом объекте.
При этом требуемый путь в коде задается семантически, то есть не в виде строки "some.awesome.property" а так, как если бы мы обращались к самому свойству:

import {Path} from 'gonzazoid.path.js';

const path = Path({some: {awesome: {path: {}}}, 'another sylly.and.strange': {very: {hard: {to: {parse: {path: {}}}}}}});
console.log(path.some.awesome.path.join('.'));
console.log(path['another sylly.and.strange'].very.hard.to.parse.path)
path.some.awesome = {path: {}};
console.log(path.some.awesome);

То есть что происходит?

Мы создаем объект (точнее задаем его значение) в тот момент когда указываем путь в коде, при этом путь мы указываем как обычно (some.awesome.prop) а получатель принимает массив токенов ['some', 'awesome', 'prop']
При этом работает статическая проверка типов в typescript (функция написана на typescript, возвращаемый path объект имеет тот же тип что и target объект). В динамике (на js) обращение к несуществующему свойству возвращает undefined, так как целевой объект захватывается и проверяется наличие запрашиваемого свойства у него. Второе несуществующее свойство в пути вызовет Cannot read property 'nunu' of undefined

то есть
object.udefined_prop - undefined
object.undefined_prop.another_undefined_prop - Cannot read property 'another_undefined_prop' of undefined

Для использования кода в typescript достаточно добавить модуль в проект (npm install --save gonzazoid.path.js) - пакет строго типизирован, дефиниции в наличии.

Сама функция крайне проста - вот она:

export const Path = function<T>(constr: T, path?: string): T{

    const target: string[] = Array.isArray(path) ? path : (path ? [path] : []);

    return new Proxy(target, {
      get(target: any, prop: any) {
        return (constr as any)[prop] ? Path((constr as any)[prop], target.concat([prop])) : target[prop];
      },
      set(target: any, prop: string, value: any) {
        return false;
      }
    }) as T;
};

никаких зависимостей нет.
Если есть необходимость модифицировать функцию - директория src является вложенным модулем для разработки:
cd src
npm install
.. вносим изменения в код
npm run build
в директории основного модуля (не разработки) имеем в /lib/path.js - бинарник, в /typings/index.d.ts - тайпинг
модуль для разработки имеет две dev-зависимости - tslint и typescript

то есть можно склонировать репу/вносить изменения/собирать и использовать свою версию - изменится только строка подключения модуля в package.json вашего проекта.
