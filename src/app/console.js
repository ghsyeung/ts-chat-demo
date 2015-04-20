/// <reference path="chat.ts"/>
var ConsoleChat;
(function (ConsoleChat) {
    ConsoleChat.ChatInit = function (name) {
        if (!name) {
            throw "Can I have you name please?";
        }
        else {
            var engine = new Chat.ChatEngine(name);
            engine.startReceive();
            window["send"] = engine.send.bind(engine);
        }
    };
})(ConsoleChat || (ConsoleChat = {}));
//# sourceMappingURL=console.js.map