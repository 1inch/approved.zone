declare let require: any;
declare let web3: any;
import { Component } from '@angular/core';
import { etherlime } from 'etherlime';
const ethers = require('ethers');
const ToDo = require('../../../build/ToDoManager.json');
const Config = require('../../../config.json');


interface MyWindow extends Window {
  ethereum: any;
}

declare var window: MyWindow;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'MyToDo dApp';

  public successMessage: string;
  public infoMessage: string;
  public errorMessage: string;
  public contractInstance: any;
  public contractAddress = Config.contractAddress;
  public toDos = {
    toDo: [],
    inProgress: [],
    done: []
  }
  public inactiveButton;

  constructor() {

  }

  async ngOnInit() {
    try {
      await window.ethereum.enable()
      const provider = new ethers.providers.Web3Provider(web3.currentProvider);
      const signer = await provider.getSigner();
      this.contractInstance = await etherlime.ContractAt(ToDo, this.contractAddress, signer, provider);
      this.successMessage = 'The contract has been set and is ready to interact with it!';
      this.toDos = await this.getToDoStatuses();
    } catch (e) {
      if (e.message.includes('web3 is not defined')) {
        this.errorMessage = 'Error. Make sure you are using Metamask'
      } else {
        this.errorMessage = e.message;
      }
    }
  }

  private async getToDoIndex(_toDo) {
    const indexCounter = await this.contractInstance.indexCounter();
    const counter = indexCounter.toNumber();
    for (let i = 0; i < indexCounter; i++) {
      let toDo = await this.contractInstance.getToDoByIndex(i);
      if (toDo === _toDo) {
        return i
      }
    }
  }

  public async addToDo(todo) {

    try {
      this.inactiveButton = true;
      await this.contractInstance.addToDo(todo.value);
      this.addInfoMessage('ToDo has been added!');
      this.toDos.toDo.push(todo.value);
      this.inactiveButton = false;
    } catch (e) {
      this.addInfoMessage(`Transaction failed. Are you sure you hadn't already added this ToDo! ${e.message}`);
      this.inactiveButton = false;
    }
  }

  public async moveToInProgress(todo) {
    try {
      const index = await this.getToDoIndex(todo);
      await this.contractInstance.changeToDoStatus(index);
      this.toDos.toDo.splice(this.toDos.toDo.indexOf(todo), 1);
      this.toDos.inProgress.push(todo);
      this.addInfoMessage('Status has been changed!');
    } catch (e) {
      this.addInfoMessage(e.message);
    }
  }

  public async moveToDone(todo) {
    try {
      const index = await this.getToDoIndex(todo);
      await this.contractInstance.changeToDoStatus(index);
      this.toDos.inProgress.splice(this.toDos.inProgress.indexOf(todo), 1);
      this.toDos.done.push(todo);
      this.addInfoMessage('Status has been changed!');
    } catch (e) {
      this.addInfoMessage(e.message);
    }

  }

  public async removeToDo(todo, destination) {
    try {
      const index = await this.getToDoIndex(todo);
      await this.contractInstance.removeToDo(index);
      this.cleanCurrentTodo(todo, destination);
      this.addInfoMessage("ToDo has been removed!")
    } catch (e) {
      this.addInfoMessage("ToDo not found to be removed. Add it first!")
    }
  }


  private async getToDoStatuses() {
    let statuses = {
      toDo: [],
      inProgress: [],
      done: []
    }

    try {
      let indexCounter = await this.contractInstance.indexCounter();
      let index = indexCounter.toNumber();
      for (let i = 0; i < index; i++) {
        let toDo = await this.contractInstance.getToDoByIndex(i)
        let status = await this.contractInstance.getToDoStatus(i);
        if (status === 1) {
          statuses.toDo.push(toDo);
        } else if (status === 2) {
          statuses.inProgress.push(toDo);
        } else if (status === 3) {
          statuses.done.push(toDo);
        }
      }

    } catch (e) {
      this.addInfoMessage(e.message)
    }

    return statuses;
  }

  private addInfoMessage(message: string) {
    this.infoMessage = message;
    this.clearInfoMessage();
  }

  private async clearInfoMessage() {
    setTimeout(() => {
      this.infoMessage = '';
    }, 5000);
  }

  private cleanCurrentTodo(todo, destination) {
    if (destination === 'todo') {
      this.toDos.toDo.splice(this.toDos.toDo.indexOf(todo), 1);
    } else if (destination === 'progress') {
      this.toDos.inProgress.splice(this.toDos.inProgress.indexOf(todo), 1);
    } else if (destination === 'done') {
      this.toDos.done.splice(this.toDos.done.indexOf(todo), 1);
    }
  }

}
