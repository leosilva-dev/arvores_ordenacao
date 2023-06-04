import * as readline from 'readline';
import { AVLTree } from './AVLTree';

export class Menu {
  tree: AVLTree;
  rl: readline.Interface;

  constructor() {
    this.tree = new AVLTree();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  start(): void {
    console.log('');
    console.log('');
    console.log('================================');
    console.log('Digite 1 para inserir');
    console.log('Digite 2 para remover');
    console.log('Digite 3 para inspecionar um nó');
    console.log('Digite 4 para sair');
    console.log('================================');
    console.log('');
    console.log('');

    this.rl.question('Opção: ', (option) => {
        if (option === '1') {
          this.insertValue();
        } else if (option === '2') {
          this.removeValue();
        } else if (option === '3') {
          this.inspect();
        } else if (option === '4') {
          console.log('Saindo do sistema...');
          this.rl.close();
        } else {
          console.log('Opção inválida!');
          this.start();
        }
      });
    }

  insertValue(): void {
    this.rl.question('Digite o valor a ser inserido: ', (value) => {
      const parsedValue = parseInt(value);
      if (isNaN(parsedValue)) {
        console.log('Valor inválido!');
      } else {
        this.tree.insert(parsedValue);
        this.tree.printTree(this.tree.root)
        this.start()
      }
    });
  }

  removeValue(): void {
    this.rl.question('Digite o valor a ser removido: ', (value) => {
      const parsedValue = parseInt(value);
      if (isNaN(parsedValue)) {
        console.log('Valor inválido!');
      } else {
        this.tree.remove(parsedValue);
        this.tree.printTree(this.tree.root)
        this.start()
      }
    });
  }

  inspect(): void {
    this.rl.question('Digite o valor a ser inspecionado: ', (value) => {
        const parsedValue = parseInt(value);
        if (isNaN(parsedValue)) {
          console.log('Valor inválido!');
        } else {
          this.tree.printTree(this.tree.root)
          this.tree.inspectNode(parsedValue);
          this.start()
        }
      });
  }
}