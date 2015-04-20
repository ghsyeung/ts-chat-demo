/// <reference path="chat.ts"/>

module ConsoleChat {
    export var ChatInit:(name:string) => void = (name:string) => {
        if (!name) {
            throw "Can I have you name please?";
        } else {
            var engine = new Chat.ChatEngine(name);
            engine.startReceive();
            window["send"] = engine.send.bind(engine);
        }
    }
}