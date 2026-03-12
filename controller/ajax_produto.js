const DELIVERY_FEE = 6.0;
const PHONE_NUMBER = "5581995476581";
const API_BASE_URL_ = "http://localhost/bilapromo-api/api/v1";
const API_BASE_URL = "https://www.bilapromo.com.br/api/v1";

let originalPaymentOptions = [];
let menuData = [];
let cart = [];
let currentCategory = "Todos";

document.addEventListener("DOMContentLoaded", () => {
  const yearElement = document.getElementById("currentYear");
  if (yearElement) yearElement.innerText = new Date().getFullYear();

  fetchProducts();

  const paymentSelect = document.getElementById("paymentMethod");
  if (paymentSelect) {
    paymentSelect.addEventListener("change", calculateTotal);
  }

  const btnCheckout = document.getElementById("btnCheckout");
  if (btnCheckout) {
    btnCheckout.addEventListener("click", finalizeOrder);
  }

  if (paymentSelect) {
    originalPaymentOptions = [...paymentSelect.options].map((opt) => ({
      value: opt.value,
      text: opt.text,
    }));
  }

  const phoneInput = document.getElementById("clientPhone");
  if (phoneInput) {
    phoneInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "");

      if (value.length > 11) value = value.slice(0, 11);

      if (value.length > 6) {
        value = value.replace(
          /^(\d{2})(\d{1})(\d{4})(\d{0,4}).*/,
          "($1) $2 $3-$4"
        );
      } else if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
      } else if (value.length > 0) {
        value = value.replace(/^(\d{0,2})/, "($1");
      }

      e.target.value = value;
    });
  }
});

function processApiData(products) {
  let kits = [];
  let unidades = [];

  products.forEach((item) => {
    const estoqueDisponivel = parseInt(item.qtdestoque, 10);
    const qtdVenda = parseInt(item.qtdvenda, 10);

    if (estoqueDisponivel <= 0) return;

    const imageUrl =
      item.linkfoto && item.linkfoto.trim() !== ""
        ? item.linkfoto
        : "https://via.placeholder.com/300?text=Sem+Foto";

    const productObj = {
      id: item.id,
      name: item.nome,
      price: parseFloat(item.precovenda),
      img: imageUrl,
      packSize: "",
    };

    if (qtdVenda > 1) {
      if (estoqueDisponivel >= qtdVenda) {
        productObj.packSize = `${qtdVenda} Unidades`;
        kits.push(productObj);
      }
    } else {
      productObj.packSize = "1 Unidade";
      unidades.push(productObj);
    }
  });

  menuData = [];

  if (kits.length > 0) {
    menuData.push({
      category: "Kits Promocionais",
      items: kits,
    });
  }

  if (unidades.length > 0) {
    menuData.push({
      category: "Unidades",
      items: unidades,
    });
  }

  renderCategories();
  renderMenu(currentCategory);
}

async function fetchProducts() {
  const loading = document.getElementById("loadingIndicator");
  const menuContainer = document.getElementById("menuContainer");
  const errorContainer = document.getElementById("errorContainer");

  try {
    const nome = "";
    const estoque = "s";

    const url = `${API_BASE_URL}/produto.php?nome=${encodeURIComponent(
      nome
    )}&estoque=${estoque}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();

    if (!text || text.trim() === "") {
      if (errorContainer) {
        errorContainer.innerHTML = `
          <div class="alert alert-info text-center">
            Nenhum produto encontrado no estoque no momento.
          </div>
        `;
      }
      return;
    }

    let json;
    try {
      json = JSON.parse(text);
    } catch (e) {
      throw new Error("Resposta inválida da API");
    }

    if (Array.isArray(json) && json.length === 0) {
      if (errorContainer) {
        errorContainer.innerHTML = `
          <div class="alert alert-info text-center">
            Nenhum produto encontrado no estoque no momento.
          </div>
        `;
      }
      return;
    }

    if (Array.isArray(json)) {
      if (errorContainer) errorContainer.innerHTML = "";
      processApiData(json);
    } else {
      throw new Error("Formato de resposta inválido");
    }
  } catch (error) {
    console.error("Erro na comunicação com a API:", error);

    if (errorContainer) {
      errorContainer.innerHTML = `
        <div class="api-error-banner shadow-sm">
          <i class="bi bi-exclamation-triangle-fill fs-5 mb-2 d-block"></i>
          <strong>Erro de Conexão:</strong><br>
          Não foi possível conectar à API de produtos.<br>
          <small class="text-muted">Verifique a internet ou tente novamente.</small>
          <br>
          <button class="btn btn-sm btn-outline-warning mt-2" onclick="location.reload()">
            Tentar Novamente
          </button>
        </div>
      `;
    }
  } finally {
    if (loading) loading.style.display = "none";
  }
}

function processApiData(products) {
  let kits = [];
  let unidades = [];

  products.forEach((item) => {
    const imageUrl =
      item.linkfoto && item.linkfoto.trim() !== ""
        ? item.linkfoto
        : "https://via.placeholder.com/300?text=Sem+Foto";

    const productObj = {
      id: item.id,
      name: item.nome,
      price: parseFloat(item.precovenda),
      img: imageUrl,
      packSize: "",
    };

    if (parseInt(item.qtdvenda) > 1) {
      productObj.packSize = `${item.qtdvenda} Unidades`;
      kits.push(productObj);
    } else {
      productObj.packSize = "1 Unidade";
      unidades.push(productObj);
    }
  });

  menuData = [];

  if (kits.length > 0) {
    menuData.push({
      category: "Kits Promocionais",
      items: kits,
    });
  }

  if (unidades.length > 0) {
    menuData.push({
      category: "Unidades",
      items: unidades,
    });
  }

  renderCategories();
  renderMenu(currentCategory);
}

function renderCategories() {
  const nav = document.getElementById("categoryNav");

  if (menuData.length === 0) {
    nav.innerHTML =
      '<span class="text-muted">Nenhuma categoria disponível</span>';
    return;
  }

  let navHTML = `
        <span class="nav-pill ${currentCategory === "Todos" ? "active" : ""}" 
                onclick="filterCategory('Todos', this)">
            Todos
        </span>
    `;

  navHTML += menuData
    .map(
      (section) => `
        <span class="nav-pill ${
          currentCategory === section.category ? "active" : ""
        }" 
                onclick="filterCategory('${section.category}', this)">
            ${section.category}
        </span>
    `
    )
    .join("");

  nav.innerHTML = navHTML;
}

function filterCategory(category, element) {
  document
    .querySelectorAll(".nav-pill")
    .forEach((el) => el.classList.remove("active"));
  element.classList.add("active");
  currentCategory = category;
  renderMenu(category);
}

function renderMenu(filter) {
  const container = document.getElementById("menuContainer");
  container.innerHTML = "";

  if (menuData.length === 0) {
    container.innerHTML =
      '<div class="text-center text-muted">Nenhum produto encontrado.</div>';
    return;
  }

  menuData.forEach((section) => {
    if (filter !== "Todos" && section.category !== filter) return;

    const sectionTitle = `<div class="section-title" style="margin-top: 15px;">${section.category}</div>`;

    const grid = document.createElement("div");
    grid.className = "row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3 mb-4";

    grid.innerHTML = section.items
      .map(
        (item) => `
            <div class="col">
                <div class="product-card">
                    <img src="${item.img}" class="product-img" alt="${
          item.name
        }" 
                            onerror="this.src='https://cdn-icons-png.flaticon.com/512/2748/2748558.png'">
                    <div class="product-body">
                        <div class="text-center">
                            <h5 class="product-title">${item.name}</h5>
                            <span class="qty-badge">${item.packSize}</span>
                            <div class="price-tag mt-1">${formatCurrency(
                              item.price
                            )}</div>
                        </div>
                        <button class="btn-add shadow-sm" onclick="addToCart(${
                          item.id
                        })">
                            <i class="bi bi-plus-lg"></i> Adicionar
                        </button>
                    </div>
                </div>
            </div>
        `
      )
      .join("");

    container.innerHTML += sectionTitle + grid.outerHTML;
  });
}

function addToCart(id) {
  let itemToAdd;
  menuData.forEach((cat) => {
    const found = cat.items.find((i) => i.id === id);
    if (found) itemToAdd = found;
  });

  const existingItem = cart.find((item) => item.id === id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...itemToAdd, quantity: 1 });
  }

  updateCartUI();

  if (navigator.vibrate) navigator.vibrate(50);
  const btn = event.target.closest("button");
  if (btn) {
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="bi bi-check2"></i>';
    btn.classList.add("btn-success");
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.classList.remove("btn-success");
    }, 800);
  }
}

function removeFromCart(id) {
  const itemIndex = cart.findIndex((item) => item.id === id);
  if (itemIndex === -1) return;

  cart[itemIndex].quantity--;
  if (cart[itemIndex].quantity <= 0) {
    cart.splice(itemIndex, 1);
  }
  updateCartUI();
  renderCartItems();
}

function updateCartUI() {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const count = cart.reduce((acc, item) => acc + item.quantity, 0);

  const countEl = document.getElementById("cartCount");
  const totalEl = document.getElementById("cartTotal");
  const barEl = document.getElementById("cartBar");

  if (countEl) countEl.innerText = count;
  if (totalEl) totalEl.innerText = formatCurrency(total);
  if (barEl) barEl.style.display = count > 0 ? "flex" : "none";
}

function openCartModal() {
  const modalEl = document.getElementById("cartModal");
  if (modalEl) {
    renderCartItems();
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }
}

function toggleOrderType() {
  const isDeliveryEl = document.getElementById("typeDelivery");
  if (!isDeliveryEl) return;

  const isDelivery = isDeliveryEl.checked;
  const addressContainer = document.getElementById("addressContainer");
  const deliveryFeeRow = document.getElementById("deliveryFeeRow");
  const feeDisplay = document.getElementById("deliveryFeeDisplay");

  if (isDelivery) {
    if (addressContainer) addressContainer.style.display = "block";
    if (deliveryFeeRow) {
      deliveryFeeRow.style.textDecoration = "none";
      deliveryFeeRow.style.opacity = "1";
    }
    if (feeDisplay) feeDisplay.innerText = formatCurrency(DELIVERY_FEE);
  } else {
    if (addressContainer) addressContainer.style.display = "none";
    if (deliveryFeeRow) {
      deliveryFeeRow.style.textDecoration = "line-through";
      deliveryFeeRow.style.opacity = "0.5";
    }
    if (feeDisplay) feeDisplay.innerText = "R$ 0,00";
  }
  updatePaymentMethods();
  calculateTotal();
}

function updatePaymentMethods() {
  const isDelivery = document.getElementById("typeDelivery")?.checked;
  const paymentSelect = document.getElementById("paymentMethod");

  if (!paymentSelect) return;

  paymentSelect.innerHTML = "";

  if (isDelivery) {
    originalPaymentOptions.forEach((opt) => {
      paymentSelect.add(new Option(opt.text, opt.value));
    });
  } else {
    paymentSelect.add(new Option("Pix", "Pix"));
  }

  paymentSelect.value = "Pix";
  calculateTotal();
}

function calculateTotal() {
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const isDeliveryEl = document.getElementById("typeDelivery");
  const isDelivery = isDeliveryEl ? isDeliveryEl.checked : false;

  const paymentMethod = document.getElementById("paymentMethod")?.value || "";

  const deliveryFee = isDelivery ? DELIVERY_FEE : 0;
  const baseTotal = subtotal + deliveryFee;

  const isCard =
    paymentMethod === "Cartão de Crédito" ||
    paymentMethod === "Cartão de Débito";

  const cardFee = isCard ? baseTotal * 0.05 : 0;
  const total = baseTotal + cardFee;

  const subtotalEl = document.getElementById("summarySubtotal");
  const totalEl = document.getElementById("summaryTotal");
  const deliveryFeeEl = document.getElementById("deliveryFeeDisplay");

  const cardFeeRow = document.getElementById("cardFeeRow");
  const cardFeeDisplay = document.getElementById("cardFeeDisplay");

  if (subtotalEl) subtotalEl.innerText = formatCurrency(subtotal);
  if (deliveryFeeEl) deliveryFeeEl.innerText = formatCurrency(deliveryFee);
  if (totalEl) totalEl.innerText = formatCurrency(total);

  if (cardFeeRow && cardFeeDisplay) {
    if (isCard) {
      cardFeeDisplay.innerText = formatCurrency(cardFee);
      cardFeeRow.classList.remove("d-none");
    } else {
      cardFeeRow.classList.add("d-none");
    }
  }
}

function renderCartItems() {
  const container = document.getElementById("cartItemsContainer");
  const summaryDiv = document.getElementById("orderSummary");
  const btnCheckout = document.getElementById("btnCheckout");

  if (cart.length === 0) {
    container.innerHTML = `
            <div class="text-center py-5 text-muted">
                <i class="bi bi-cart-x fs-1"></i>
                <p class="mt-2">Sua sacola está vazia.</p>
            </div>
        `;
    if (summaryDiv) summaryDiv.style.display = "none";
    if (btnCheckout) btnCheckout.disabled = true;
    return;
  }

  container.innerHTML = cart
    .map(
      (item) => `
        <div class="d-flex align-items-center mb-3 pb-3 border-bottom">
            <img src="${item.img}" class="cart-item-img me-3" alt="${item.name}"
                onerror="this.src='https://cdn-icons-png.flaticon.com/512/2748/2748558.png'">
            <div class="flex-grow-1">
                <h6 class="mb-0 fw-bold">${item.name}</h6>
                <small class="d-block text-muted" style="font-size: 0.8rem">${
                  item.packSize
                }</small>
                <small class="text-primary fw-bold">${formatCurrency(
                  item.price
                )}</small>
            </div>
            <div class="quantity-control ms-3">
                <button class="quantity-btn" onclick="changeQty(${
                  item.id
                }, -1)">-</button>
                <span class="qty-value mx-2 fw-bold">
                    ${item.quantity}
                </span>
                <button class="quantity-btn" onclick="changeQty(${
                  item.id
                }, 1)">+</button>
            </div>
        </div>
    `
    )
    .join("");

  if (summaryDiv) summaryDiv.style.display = "block";
  if (btnCheckout) btnCheckout.disabled = false;

  toggleOrderType();
}

function changeQty(id, change) {
  const itemIndex = cart.findIndex((item) => item.id === id);
  if (itemIndex === -1) return;
  cart[itemIndex].quantity += change;
  if (cart[itemIndex].quantity <= 0) cart.splice(itemIndex, 1);

  updateCartUI();
  renderCartItems();
}

function finalizeOrder() {
  const btn = document.getElementById("btnCheckout");

  if (btn.classList.contains("btn-loading")) return;

  const nameInput = document.getElementById("clientName");
  const phoneInput = document.getElementById("clientPhone");
  const addressInput = document.getElementById("address");
  const paymentMethod = document.getElementById("paymentMethod").value;
  const isDeliveryEl = document.getElementById("typeDelivery");
  const isDelivery = isDeliveryEl ? isDeliveryEl.checked : false;

  let isValid = true;
  let firstInvalid = null;

  [nameInput, phoneInput, addressInput].forEach((el) =>
    el.classList.remove("input-error", "is-invalid")
  );

  if (!nameInput.value.trim()) {
    nameInput.classList.add("input-error", "is-invalid");
    isValid = false;
    if (!firstInvalid) firstInvalid = nameInput;
  }

  if (!phoneInput.value.trim()) {
    phoneInput.classList.add("input-error", "is-invalid");
    isValid = false;
    if (!firstInvalid) firstInvalid = phoneInput;
  }

  if (isDelivery && !addressInput.value.trim()) {
    addressInput.classList.add("input-error", "is-invalid");
    isValid = false;
    if (!firstInvalid) firstInvalid = addressInput;
  }

  if (!isValid) {
    firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
    firstInvalid.focus();
    return;
  }

  const originalText = btn.innerHTML;
  btn.classList.add("btn-loading");
  btn.innerHTML = "Enviando...";

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const deliveryFee = isDelivery ? DELIVERY_FEE : 0;
  const baseTotal = subtotal + deliveryFee;

  const isCardPayment =
    paymentMethod.toLowerCase().includes("crédito") ||
    paymentMethod.toLowerCase().includes("debito") ||
    paymentMethod.toLowerCase().includes("débito");

  const cardFee = isCardPayment ? baseTotal * 0.05 : 0;
  const total = baseTotal + cardFee;

  const orderJson = {
    nome: nameInput.value.trim(),
    telefone: phoneInput.value.trim(),
    endereco: isDelivery ? addressInput.value.trim() : "",
    entrega: isDelivery ? "S" : "N",
    pagamento: paymentMethod,
    total: total,
    status: "PENDENTE",
    itens: cart.map((item) => ({
      tbprodutokit_id: item.id.toString(),
      qtd: item.quantity,
      nome: item.name,
      precovenda: item.price,
      subtotal: item.price * item.quantity,
      linkfoto: item.image || "",
    })),
  };

  fetch(`${API_BASE_URL}/pedido.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderJson),
  })
    .then(async (response) => {
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao salvar pedido na API");
      }

      return data;
    })
    .then(() => {
      let message = `*PEDIDO - BILA PROMO*\n\n`;
      message += `*Cliente:* ${nameInput.value.trim()}\n`;
      message += `*Telefone:* ${phoneInput.value.trim()}\n`;
      message += `*Tipo:* ${isDelivery ? "Entrega" : "Retirada"}\n`;

      if (isDelivery) {
        message += `*Endereço:* ${addressInput.value.trim()}\n`;
      }

      message += `*Pagamento:* ${paymentMethod}\n\n`;
      message += `*ITENS DO PEDIDO:*\n`;

      cart.forEach((item) => {
        message += `${item.quantity}x ${item.name} - ${formatCurrency(
          item.price * item.quantity
        )}\n`;
      });

      message += `\n*Subtotal:* ${formatCurrency(subtotal)}`;

      if (isDelivery) {
        message += `\n*Taxa de entrega:* ${formatCurrency(deliveryFee)}`;
      }

      if (isCardPayment) {
        message += `\n*Acréscimo cartão (5%):* ${formatCurrency(cardFee)}`;
      }

      message += `\n*TOTAL:* ${formatCurrency(total)}`;

      const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
        message
      )}`;

      const cartModalEl = document.getElementById("cartModal");
      if (cartModalEl) {
        const modalInstance = bootstrap.Modal.getInstance(cartModalEl);
        if (modalInstance) modalInstance.hide();
      }

      window.location.href = whatsappUrl;
    })
    .catch((error) => {
      console.error("Erro ao enviar pedido:", error);

      showErrorModal(
        error.message || "Erro ao salvar pedido. Tente novamente."
      );
    }) 
    .finally(() => {
      btn.classList.remove("btn-loading");
      btn.innerHTML = originalText;
    });
}

function formatCurrency(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function showErrorModal(message) {
  const cartModalEl = document.getElementById("cartModal");
  if (cartModalEl) {
    const cartModalInstance = bootstrap.Modal.getInstance(cartModalEl);
    if (cartModalInstance) {
      cartModalInstance.hide();
    }
  }

  // Remove modal antigo se existir
  const existing = document.getElementById("dynamicErrorModal");
  if (existing) existing.remove();

  const modalHtml = `
    <div class="modal fade" id="dynamicErrorModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow">
          <div class="modal-body text-center p-4">
            <div class="mb-3">
              <i class="bi bi-x-circle-fill text-danger" style="font-size:48px"></i>
            </div>

            <h5 class="mb-2">Ops, algo deu errado</h5>

            <p class="text-muted mb-4">${message}</p>

            <button class="btn btn-danger px-4" data-bs-dismiss="modal">
              Entendi
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHtml);

  const modalEl = document.getElementById("dynamicErrorModal");
  const modal = new bootstrap.Modal(modalEl, {
    backdrop: "static",
    keyboard: false,
  });

  modal.show();

  modalEl.addEventListener("hidden.bs.modal", () => {
    modalEl.remove();
  });
}
