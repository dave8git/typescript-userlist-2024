const inquirer = require('inquirer');
const consola = require('consola');

enum Action {
    List = "list",
    Add = "add",
    Remove = "remove",
    Quit = "quit"
}

type InquirerAnswers = {
    action: Action
}

const startApp = () => {
    inquirer.prompt([{
        name: 'action',
        type: 'input',
        message: 'How can I help you?',
    }]).then(async (answers: InquirerAnswers) => {
        switch (answers.action) {
            case Action.List:
                users.showAll();
                break;
            case Action.Add:
                const user = await inquirer.prompt([{
                    name: 'name',
                    type: 'input',
                    message: 'Enter name',
                }, {
                    name: 'age',
                    type: 'number',
                    message: 'Enter age',
                }]);
                users.add(user);
                break;
            case Action.Remove:
                const name = await inquirer.prompt([{
                    name: 'name',
                    type: 'input',
                    message: 'Enter name',
                }]);
                users.remove(name.name);
                break;
            case Action.Quit:
                Message.showColorized(MessageVariant.Info, "Bye bye!");
                return;
        }

        startApp();
    });
}

enum MessageVariant {
    Success = 'success',
    Error = 'error',
    Info = 'info'
}

class Message {
    private content: string;
    constructor(content: string) {
        this.content = content;
    }

    public show(): void {
        console.log(this.content);
    }

    public capitalize(): void {
        this.content = this.content.charAt(0).toUpperCase() + this.content.slice(1).toLowerCase();
    }

    public toUpperCase(): void {
        this.content = this.content.toUpperCase();
    }

    public toLowerCase(): void {
        this.content = this.content.toLowerCase();
    }

    public static showColorized(variant: MessageVariant, text: string): void {
        switch (variant) {
            case MessageVariant.Success:
                consola.success(text);
                break;
            case MessageVariant.Error:
                consola.error(text);
                break;
            case MessageVariant.Info:
                consola.info(text);
                break;
            default:
                console.error('Unsupported color variant');
        }
    }
}


// const msg = new Message("heLlo world!");
// msg.show(); // "heLlo world!"
// msg.capitalize();
// msg.show(); // "Hello world!"
// msg.toLowerCase();
// msg.show(); // "hello world!"
// msg.toUpperCase();
// msg.show(); // "HELLO WORLD!"
// Message.showColorized(MessageVariant.Success, "Test"); // √ "Test"
// Message.showColorized(MessageVariant.Error, "Test 2"); // "x Test 2"
// Message.showColorized(MessageVariant.Info, "Test 3"); // ℹ "Test 3"

interface User {
    name: string;
    age: number;
}

class UsersData {
    private data: User[] = [];

    public showAll(): void {
        if (this.data.length === 0) {
            Message.showColorized(MessageVariant.Info, "No data...");
        } else {
            Message.showColorized(MessageVariant.Info, "Users data");
            console.table(this.data);
        }
    }

    public add(user: User): void {
        const { name, age } = user;
        if (typeof name === 'string' && name.length > 0 && typeof age === 'number' && age > 0) {
            this.data.push(user);
            Message.showColorized(MessageVariant.Success, "User has been successfully added!");
        } else {
            Message.showColorized(MessageVariant.Error, "Wrong data!");
        }
    }

    public remove(name: string): void {
        const userIndex = this.data.findIndex(user => user.name === name);
        if (userIndex !== -1) {
            this.data.splice(userIndex, 1);
            Message.showColorized(MessageVariant.Success, "User deleted!");
        } else {
            Message.showColorized(MessageVariant.Error, "User not found...");
        }
    }
}

const users = new UsersData();
// users.showAll();
// users.add({ name: "Jan", age: 20 });
// users.add({ name: "Adam", age: 30 });
// users.add({ name: "Kasia", age: 23 });
// users.add({ name: "Basia", age: -6 });
// users.showAll();
// users.remove("Maurycy");
// users.remove("Adam");
// users.showAll();
console.log("\n");
console.info("???? Welcome to the UsersApp!");
console.log("====================================");
Message.showColorized(MessageVariant.Info, "Available actions");
console.log("\n");
console.log("list – show all users");
console.log("add – add new user to the list");
console.log("remove – remove user from the list");
console.log("quit – quit the app");
console.log("\n");

startApp();