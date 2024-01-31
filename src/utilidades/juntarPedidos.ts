export const juntarPedidos = (pedidos: any) => {
    const novoArray: any = {}

    for (let pedido of pedidos) {
        if (novoArray[pedido.produto_id]) {
            novoArray[pedido.produto_id].quantidade_produto += pedido.quantidade_produto;
        } else {
            novoArray[pedido.produto_id] = pedido
        }
    };

    return Object.values(novoArray)
}