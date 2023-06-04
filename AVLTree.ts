export class Node {
    value: number;
    left: Node | null;
    right: Node | null;
    altura: number;

    constructor(value: number) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.altura = 1;
    }
}
  
export class AVLTree {
  root: Node | null;
  
  constructor() {
    this.root = null;
  }
  
  getAltura(node: Node | null): number {
    return node === null ? 0 : node.altura
  }

  atualizaAltura(node: Node) {
    const alturaEsquerda = node.left && node.left.altura ? node.left.altura : 0;
    const alturaDireita = node.right && node.right.altura ? node.right.altura : 0;
    node.altura = Math.max(alturaEsquerda, alturaDireita) + 1;
  }
  

  getFatorBalanceamento(node: Node | null): number {
    if (node === null) {
      return 0;
    }
    const alturaEsquerda = node.left ? node.left.altura : 0;
    const alturaDireita = node.right ? node.right.altura : 0;
    
    return alturaEsquerda - alturaDireita;
  }


  insert(value: number): void {
    const valorJaInserido = this.searchValue(value)
    
    if(!valorJaInserido){
      console.log('');
      this.root = this.insertNode(this.root, value);
      console.log(`Valor ${value} inserido na árvore AVL.`);
      this.root = this.balancearNo(this.root);
      console.log(`Árvore balanceada após inserção.`);
    }else{
      console.log('');
      console.log(`A árvore já contém o valor ${value}.`);
    }
    
  }

  insertNode(root: Node | null, value: number): Node {
    if (root === null) {
      return new Node(value);
    }

    if (value < root.value) {
      root.left = this.insertNode(root.left, value);
      this.atualizaAltura(root);
    } else if (value > root.value) {
      root.right = this.insertNode(root.right, value);
      this.atualizaAltura(root);
    } else {
      return root;
    }

    
    
    return this.balancearNo(root)
  }

  buscaMinNode(node: Node): Node {
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
      this.root = this.removeNode(this.root, value);
      console.log(`Valor ${value} removido da árvore AVL.`);
      this.root = this.balancearNo(this.root);
      console.log(`Árvore balanceada após remoção.`);
    }else{
      console.log('');
      console.log(`A árvore não contém o ${value}.`);
    }

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
        const minValueNode = this.buscaMinNode(root.right);
        root.value = minValueNode.value;
        root.right = this.removeNode(root.right, minValueNode.value);
      }
    }

    if (root !== null) {
      this.atualizaAltura(root);
      this.balancearNo(root);
    }
    return root

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
    console.log(`Altura: ${node.altura}`)
    console.log(`fator balanceamento: ${this.getFatorBalanceamento(node)}`)
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

  rotacionarEsquerda(node: Node): Node {
    const auxNode = node.right!;
    node.right = auxNode.left;
    auxNode.left = node;

    this.atualizaAltura(node);
    this.atualizaAltura(auxNode);

    return auxNode;
  }

  rotacionarDireita(node: Node): Node {
    const auxNode = node.left!;
    node.left = auxNode.right;
    auxNode.right = node;

    this.atualizaAltura(node);
    this.atualizaAltura(auxNode);

    return auxNode;
  }

  rotacionarEsquerdaDireita(node: Node): Node {
    const leftChild = node.left!;
    node.left = this.rotacionarEsquerda(leftChild);
    return this.rotacionarDireita(node);
  }

  rotacionarDireitaEsquerda(node: Node): Node {
    const rightChild = node.right!;
  node.right = this.rotacionarDireita(rightChild);
  return this.rotacionarEsquerda(node);
  }

  balancearNo(node: Node): Node {
    this.atualizaAltura(node);

    if (this.getFatorBalanceamento(node) > 1) {
      if (this.getFatorBalanceamento(node.left!) < 0) {
        console.log(`Desbalanceamento detectado no nó ${node.value}. Realizando rotação dupla à esquerda-direita.`);
        return this.rotacionarEsquerdaDireita(node);
      } else {
        console.log(`Desbalanceamento detectado no nó ${node.value}. Realizando rotação à direita.`);
        return this.rotacionarDireita(node);
      }
    } else if (this.getFatorBalanceamento(node) < -1) {
      if (this.getFatorBalanceamento(node.right!) > 0) {
        console.log(`Desbalanceamento detectado no nó ${node.value}. Realizando rotação dupla à direita-esquerda.`);
        return this.rotacionarDireitaEsquerda(node);
      } else {
        console.log(`Desbalanceamento detectado no nó ${node.value}. Realizando rotação à esquerda.`);
        return this.rotacionarEsquerda(node);
      }
    }

    return node;
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


