export class Node {
    value: number;
    left: Node | null;
    right: Node | null;
    height: number;

    constructor(value: number) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

  
export class AVLTree {
  root: Node | null;
  
  constructor() {
    this.root = null;
  }
  
  getHeight(node: Node | null): number {
    return node === null ? 0 : node.height
  }

  updateHeight(node: Node) {
    node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
  }

  getBalanceFactor(node: Node | null): number {
    if (node === null) {
      return 0;
    }
    return this.getHeight(node.left) - this.getHeight(node.right);
  }


  insert(value: number): void {
    const valorJaInserido = this.searchValue(value)
    
    if(!valorJaInserido){
      console.log('');
      console.log(`Valor ${value} inserido na árvore AVL.`);
    }else{
      console.log('');
      console.log(`A árvore já contém o valor ${value}.`);
    }
    
  
    this.root = this.insertNode(this.root, value);
  }

  insertNode(root: Node | null, value: number): Node {
    if (root === null) {
      return new Node(value);
    }

    if (value < root.value) {
      root.left = this.insertNode(root.left, value);
    } else if (value > root.value) {
      root.right = this.insertNode(root.right, value);
    } else {
      return root;
    }

    
    
    return root
  }

  findMinNode(node: Node): Node {
    let currentNode = node;
    while (currentNode.left !== null) {
      currentNode = currentNode.left;
    }
    return currentNode;
  }

  remove(value: number): void {

    const valorPresenteNaArvore = this.searchValue(value)
    
    if(valorPresenteNaArvore){
      console.log('');
      console.log(`Valor ${value} removido da árvore AVL.`);
    }else{
      console.log('');
      console.log(`A árvore não contém o ${value}.`);
    }



    this.root = this.removeNode(this.root, value);
  }

  removeNode(root: Node | null, value: number): Node | null {
    if (root === null) {
      return root;
    }

    if (value < root.value) {
      root.left = this.removeNode(root.left, value);
    } else if (value > root.value) {
      root.right = this.removeNode(root.right, value);
    } else {
      if (root.left === null && root.right === null) {
        root = null;
      } else if (root.left === null) {
        root = root.right;
      } else if (root.right === null) {
        root = root.left;
      } else {
        const minValueNode = this.findMinNode(root.right);
        root.value = minValueNode.value;
        root.right = this.removeNode(root.right, minValueNode.value);
      }
    }

    return root;
  }

   searchValue(value: number): boolean {
    return this.searchNode(this.root, value);
  }

  searchNode(node: Node | null, value: number): boolean {
    if (node === null) {
      return false;
    }

    if (value === node.value) {
      return true;
    }

    if (value < node.value) {
      return this.searchNode(node.left, value);
    } else {
      return this.searchNode(node.right, value);
    }
  }

  inspectNode(value: number): void {
    const node = this.searchNodeByValue(this.root, value);
    if (node === null) {
      console.log(`Node with value ${value} not found.`);
      return;
    }
  
    const leftChild = node.left ? node.left.value.toString() : "null";
    const rightChild = node.right ? node.right.value.toString() : "null";
  
    console.log('')
    console.log(`Valor: ${node.value}`)
    console.log(`Valor filho esquerda: ${leftChild}`)
    console.log(`Valor filho direita: ${rightChild}`)
    console.log(`Altura: ${node.height}`)
  }
  
  private searchNodeByValue(node: Node | null, value: number): Node | null {
    if (node === null || node.value === value) {
      return node;
    }
  
    if (value < node.value) {
      return this.searchNodeByValue(node.left, value);
    } else {
      return this.searchNodeByValue(node.right, value);
    }
  }
  


  printTree(root: Node | null, prefix = '', isLeft = false) {
    if (root === null) {
      return;
    }
  
    const printPrefix = prefix + (isLeft ? '├── ' : '└── ');
    console.log(printPrefix + root.value);
  
    const indent = prefix + (isLeft ? '│   ' : '    ');
  
    if (root.left !== null) {
      this.printTree(root.left, indent, true);
    }
  
    if (root.right !== null) {
      this.printTree(root.right, indent, false);
    }
  }

    
}

