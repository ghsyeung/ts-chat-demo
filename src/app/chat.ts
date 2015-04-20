/// <reference path="../../tools/typings/firebase/firebase.d.ts"/>
module Chat {
    class ChatMessage {
        constructor(public name:string, public text:string) {
        }
    }

    export class ChatEngine {
        private static baseUrl = "https://flickering-inferno-3253.firebaseio.com";
        private firebase;

        constructor(private name:string) {
            this.firebase = new Firebase(ChatEngine.baseUrl);
        }

        send(message:string) {
            this.firebase.push(new ChatMessage(this.name, message));
        }

        startReceive() {
            this.firebase.on('child_added', (snapshot:FirebaseDataSnapshot) => {
                this.displayMessage(snapshot.val());
            });
        }

        displayMessage(message:ChatMessage) {
            console.log("%c%s: %c%s", 'color: red', message.name, 'color: green', message.text);
        }
    }
}
