/** @jsx h */
'use strict';

var mercury = require("../../../index.js");
var h = mercury.h;

module.exports = render;

function render(state) {
    return <div>
        <input
            ev-event={mercury.changeEvent(state.events.changeText)}
            name="description"
            value={state.description}
        />
        <button
            ev-click={mercury.event(state.events.add, state.description)}
        >Add</button>
        <table>
            {state.list.map(renderTask)}
        </table>
    </div>

    function renderTask(item) {
        return <tr>
            <td>
                <input
                    type="checkbox"
                    ev-click={mercury.event(state.events.toggle, {
                        id: item.id
                    })}
                    checked={item.done}
                />
            </td>
            <td style={{textDecoration: item.done ? "line-through" : "none"}}>
                {item.description}
            </td>
        </tr>
    }
}


