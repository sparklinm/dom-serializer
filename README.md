Renders a DOM node or an array of DOM nodes to a string.

Fork 的 [cheeriojs/dom-serializer](https://github.com/cheeriojs/dom-serializer)。并对其做了修改，在 `dev_array_attrs` 分支。

用于对 `htmlparser2` 生成的 `nodes` 进行字符串化。`htmlparser2` 并不支持重复的属性，例如：

`<input id="t" id="s">` 被 `htmlparser2` 转换后会变成 `<input id="t">`，后面重复的 id 属性被忽略。

使用 [dev_array_attrs 分支](https://github.com/sparklinm/dom-serializer/tree/dev_array_attrs) 配合 [修改后的 domhandler](https://github.com/sparklinm/htmlparser2/tree/dev_array_attrs) 可以完成对重复属性的解析。

示例：

```js
let { Parser, DomWithAttributeArrayHandler } = require('htmlparser2');
let domSerializer = require('dom-serializer');

const handler = new DomWithAttributeArrayHandler(
    (err, dom) => {
        if (err) {
            console.error(`XML错误:${domStr}`);
            console.error(err);
        }
    },
    {
        normalizeWhitespace: false
    }
);

const parser = new Parser(handler, {
    xmlMode: true
});

parser.write('<input id="test1" id="test2">');

parser.end();

domSerializer(handler.dom, {
    xmlMode: true
});

// <input id="test1" id="test2">
```
