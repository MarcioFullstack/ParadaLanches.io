let orderItems = []; // Array para armazenar os pedidos
let total = 0; // Variável para armazenar o total

function addToOrder(itemName, itemPrice) {
    // Adiciona o item ao pedido
    orderItems.push({ name: itemName, price: itemPrice });
    total += itemPrice; // Atualiza o total
    updateOrderList();
    updateInvoice();
}

function updateOrderList() {
    const orderList = document.getElementById('orderList');
    orderList.innerHTML = ''; // Limpa a lista atual

    // Atualiza a lista de pedidos
    orderItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;

        // Cria o botão de remover
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.onclick = () => removeFromOrder(index); // Chama a função de remoção

        li.appendChild(removeButton); // Adiciona o botão à lista
        orderList.appendChild(li);
    });

    // Atualiza o total
    document.getElementById('totalPrice').textContent = `R$ ${total.toFixed(2)}`;
}

function removeFromOrder(index) {
    // Remove o item do pedido
    total -= orderItems[index].price; // Subtrai o preço do total
    orderItems.splice(index, 1); // Remove o item do array
    updateOrderList(); // Atualiza a lista
}

function clearOrder() {
    // Limpa o pedido
    orderItems = [];
    total = 0;
    updateOrderList();
    updateInvoice();
}

function updateInvoice() {
    const invoiceList = document.getElementById('invoiceList');
    invoiceList.innerHTML = ''; // Limpa a lista atual do cupom

    orderItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
        invoiceList.appendChild(li);
    });

    updateTotalPrice();
}

function updateTotalPrice() {
    const totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.textContent = `R$ ${total.toFixed(2)}`;
}

function sendOrder() {
    const clientName = document.getElementById('clientName').value.trim();

    // Verifica se o nome do cliente e o pedido estão preenchidos
    if (!clientName || orderItems.length === 0) {
        alert('Por favor, preencha o nome do cliente e adicione itens ao pedido.');
        return;
    }

    // Cria a mensagem para o WhatsApp
    let message = `Olá, meu nome é ${clientName}. Aqui está meu pedido:\n`;
    orderItems.forEach(item => {
        message += `${item.name} - R$ ${item.price.toFixed(2)}\n`;
    });
    message += `Total: R$ ${total.toFixed(2)}`;

    // Formata o link do WhatsApp
    const whatsappNumber = '558598222118'; // Número de WhatsApp
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Abre o WhatsApp com a mensagem
    window.open(whatsappLink, '_blank');

    clearOrder(); // Limpa o pedido após enviar
}