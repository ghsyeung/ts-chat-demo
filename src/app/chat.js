/// <reference path="../../tools/typings/firebase/firebase.d.ts"/>
var Chat;
(function (Chat) {
    var ChatMessage = (function () {
        function ChatMessage(name, text) {
            this.name = name;
            this.text = text;
        }
        return ChatMessage;
    })();
    var ChatEngine = (function () {
        function ChatEngine(name) {
            this.name = name;
            this.firebase = new Firebase(ChatEngine.baseUrl);
        }
        ChatEngine.prototype.send = function (message) {
            this.firebase.push(new ChatMessage(this.name, message));
        };
        ChatEngine.prototype.startReceive = function () {
            var _this = this;
            this.firebase.on('child_added', function (snapshot) {
                _this.displayMessage(snapshot.val());
            });
        };
        ChatEngine.prototype.displayMessage = function (message) {
            console.log("%c%s: %c%s", 'color: red', message.name, 'color: green', message.text);
        };
        ChatEngine.baseUrl = "https://flickering-inferno-3253.firebaseio.com";
        return ChatEngine;
    })();
    Chat.ChatEngine = ChatEngine;
})(Chat || (Chat = {}));
//# sourceMappingURL=chat.js.map