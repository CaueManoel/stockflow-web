<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Bila Promo - Vitrine Digital</title>

    <link rel="shortcut icon" href="./assets/icone.png" type="image/x-icon">
    <link rel="icon" href="./assets/icone.png" type="image/x-icon">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">

    <style>
        :root {
            --primary-color: #ff4757;
            --secondary-color: #2f3542;
            --bg-light: #f1f2f6;
            --card-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }

        body {
            font-family: 'Poppins', sans-serif;
            background-color: var(--bg-light);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            scroll-behavior: smooth;
            overscroll-behavior-y: none;
        }

        main {
            flex: 1;
        }

        .store-header {
            background-color: white;
            border-bottom-left-radius: 30px;
            border-bottom-right-radius: 30px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            position: relative;
        }

        .store-banner {
            height: 150px;
            width: 100%;
            object-fit: cover;
            filter: brightness(0.8);
        }

        .store-info-container {
            margin-top: -50px;
            padding-bottom: 20px;
            position: relative;
            z-index: 2;
        }

        .store-logo {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            border: 4px solid white;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            object-fit: cover;
            background-color: #fff;
        }

        .delivery-info {
            font-size: 0.9rem;
            color: #747d8c;
            background: #dfe4ea;
            padding: 5px 15px;
            border-radius: 15px;
            display: inline-block;
            margin-top: 5px;
        }

        .category-nav {
            overflow-x: auto;
            white-space: nowrap;
            -webkit-overflow-scrolling: touch;
            padding: 15px 20px;
            scrollbar-width: none;
            display: flex;
        }

        .category-nav::-webkit-scrollbar {
            display: none;
        }

        .nav-pill {
            display: inline-block;
            padding: 8px 30px;
            margin-right: 10px;
            background: white;
            color: var(--secondary-color);
            border-radius: 25px;
            border: 1px solid #e1e1e1;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 600;
        }

        .nav-pill:last-child {
            margin-right: 0;
        }

        .nav-pill.active {
            background-color: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
            box-shadow: 0 4px 10px rgba(255, 71, 87, 0.3);
        }

        .section-title {
            font-size: 1.2rem;
            font-weight: 700;
            color: var(--secondary-color);
            padding-left: 10px;
            border-left: 4px solid var(--primary-color);
        }

        .product-card {
            border: none;
            border-radius: 20px;
            background: white;
            box-shadow: var(--card-shadow);
            transition: transform 0.2s;
            height: 100%;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }

        .product-card:active {
            transform: scale(0.98);
        }

        .product-img {
            height: 200px;
            width: 100%;
            object-fit: contain;
            background-color: #fff;
            padding: 10px;
        }

        .product-body {
            padding: 15px;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .product-title {
            font-weight: 700;
            font-size: 1.10rem;
            margin-bottom: 5px;
            color: var(--secondary-color);
            text-align: center;
            line-height: 1.2;
            min-height: 2.4em;
        }

        .qty-badge {
            font-size: 0.85rem;
            background-color: #f1f2f6;
            color: #57606f;
            padding: 4px 10px;
            border-radius: 12px;
            display: inline-block;
            font-weight: 600;
            margin-bottom: 10px;
            border: 1px solid #dfe4ea;
        }

        .price-tag {
            font-weight: 700;
            color: var(--primary-color);
            font-size: 1.3rem;
        }

        .btn-add {
            background-color: var(--secondary-color);
            color: white;
            border-radius: 12px;
            padding: 10px 15px;
            border: none;
            transition: all 0.2s;
            width: 100%;
            margin-top: 10px;
            font-weight: 600;
        }

        .btn-add:hover {
            background-color: var(--primary-color);
        }

        .site-footer {
            background-color: #2f3542;
            color: #dfe4ea;
            padding-top: 40px;
            padding-bottom: 0;
            margin-top: auto;
        }

        .footer-logo {
            font-weight: 700;
            font-size: 1.5rem;
            color: white;
            margin-bottom: 15px;
            display: block;
        }

        .social-icon {
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.1);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            margin-right: 10px;
            color: white;
            text-decoration: none;
            transition: all 0.3s;
        }

        .copyright-bar {
            background-color: #1e232d;
            padding: 15px 0;
            margin-top: 30px;
            font-size: 0.85rem;
            color: #747d8c;
            margin-bottom: 0;
        }

        .cart-bar {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            max-width: 600px;
            background-color: var(--primary-color);
            color: white;
            border-radius: 50px;
            padding: 15px 25px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 10px 25px rgba(255, 71, 87, 0.4);
            z-index: 1050;
            cursor: pointer;
            display: none;
            animation: slideUp 0.3s ease-out;
            -webkit-tap-highlight-color: transparent;
        }

        .cart-bar:active {
            transform: translateX(-50%) scale(0.98);
        }

        body.modal-open {
            overflow: hidden !important;
            padding-right: 0 !important;
        }

        @keyframes slideUp {
            from {
                bottom: -100px;
                opacity: 0;
            }

            to {
                bottom: 20px;
                opacity: 1;
            }
        }

        .modal-content {
            border-radius: 25px;
            border: none;
        }

        .modal-footer {
            padding-bottom: 20px;
        }

        .cart-item-img {
            width: 60px;
            height: 60px;
            border-radius: 10px;
            object-fit: cover;
        }

        .quantity-control {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: nowrap;
            gap: 8px;
            min-width: 90px;
        }

        .quantity-btn {
            width: 26px;
            height: 26px;
            border-radius: 50%;
            border: none;
            background: #dc3545;
            color: #fff;
            font-weight: bold;
            font-size: 15px;
            line-height: 1;
            flex-shrink: 0;
        }

        .qty-value {
            min-width: 22px;
            text-align: center;
            font-size: 0.9rem;
            flex-shrink: 0;
        }

        .input-error {
            border-color: #dc3545 !important;
            box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25) !important;
            animation: shake 0.3s;
        }

        @keyframes shake {
            0% {
                transform: translateX(0);
            }

            25% {
                transform: translateX(-5px);
            }

            50% {
                transform: translateX(5px);
            }

            75% {
                transform: translateX(-5px);
            }

            100% {
                transform: translateX(0);
            }
        }

        .btn-loading {
            position: relative;
            color: transparent !important;
            pointer-events: none;
        }

        .btn-loading::after {
            content: "";
            position: absolute;
            width: 20px;
            height: 20px;
            top: 50%;
            left: 50%;
            margin-top: -10px;
            margin-left: -10px;
            border: 3px solid #ffffff;
            border-top-color: transparent;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }

        .api-error-banner {
            background-color: #fff3cd;
            border: 1px solid #ffecb5;
            color: #664d03;
            padding: 15px;
            border-radius: 12px;
            margin-bottom: 20px;
            text-align: center;
        }
    </style>
</head>

<body>

    <header class="store-header text-center mb-4">
        <img src="./assets/logo.jpg" class="store-banner" alt="Banner Loja" onerror="this.src='https://images.unsplash.com/photo-1604719312566-b7cb04a23bd5?q=80&w=1000&auto=format&fit=crop'">

        <div class="store-info-container container">
            <img src="./assets/logo.jpg" class="store-logo mb-3" alt="Logo" onerror="this.src='https://cdn-icons-png.flaticon.com/512/3075/3075977.png'">

            <h2 class="fw-bold mb-1">Bila Promo</h2>
            <p class="text-muted mb-2"><i class="bi bi-geo-alt-fill text-danger"></i> Av. Severino Pinheiro, 16 - Limoeiro</p>

            <div class="d-flex justify-content-center gap-2 align-items-center flex-wrap">
                <span class="delivery-info">
                    <i class="bi bi-bicycle"></i> Entrega: R$ 6,00
                </span>
            </div>
        </div>
    </header>

    <div class="container bg-white py-2 sticky-top" style="z-index: 1020; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
        <div class="category-nav" id="categoryNav">
        </div>
    </div>

    <main class="container mb-5 mt-3">
        <div id="errorContainer"></div>
        <div id="loadingIndicator" class="text-center py-5">
            <div class="spinner-border text-danger" role="status">
                <span class="visually-hidden">Carregando...</span>
            </div>
        </div>

        <div id="menuContainer" class="row g-3">
        </div>
    </main>

    <footer class="site-footer">
        <div class="container">
            <div class="row g-4">
                <div class="col-md-4">
                    <span class="footer-logo"><i class="bi bi-shop me-2"></i>Bila Promo</span>
                    <p class="small text-white mb-3">
                        As melhores promoções de Limoeiro você encontra aqui.
                    </p>
                    <div class="d-flex">
                        <a href="https://www.instagram.com/viniciosabilio_/" target="_blank" class="social-icon"><i class="bi bi-instagram"></i></a>
                        <a href="https://wa.me/5581995476581" target="_blank" class="social-icon"><i class="bi bi-whatsapp"></i></a>
                    </div>
                </div>
 
                <div class="col-md-4">
                    <h5 class="text-white mb-3 fw-bold">Contato</h5>
                    <ul class="list-unstyled">
                        <li class="mb-2"><i class="bi bi-geo-alt me-2 text-danger"></i> Av. Severino Pinheiro, 16</li>
                        <li class="mb-2"><i class="bi bi-whatsapp me-2 text-success"></i> (81) 9 9547-6581</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="copyright-bar text-center">
            <div class="container">
                <small>&copy; <span id="currentYear"></span> Bila Promo.</small>
            </div>
        </div>
    </footer>

    <div class="cart-bar" id="cartBar" onclick="openCartModal()">
        <div class="d-flex align-items-center">
            <div class="position-relative me-3">
                <i class="bi bi-bag-fill fs-4"></i>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-white text-danger" id="cartCount">0</span>
            </div>
            <div>
                <small class="d-block" style="opacity: 0.9;">Total do pedido</small>
                <span class="fw-bold fs-5" id="cartTotal">R$ 0,00</span>
            </div>
        </div>
        <div class="d-flex align-items-center">
            <span class="me-2">Ver Sacola</span>
            <i class="bi bi-chevron-right"></i>
        </div>
    </div>

    <div class="modal fade" id="cartModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h5 class="modal-title fw-bold">Finalizar Pedido</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div id="cartItemsContainer">
                        <p class="text-center text-muted my-4">Seu carrinho está vazio.</p>
                    </div>

                    <div class="mt-4 pt-3 border-top" id="orderSummary" style="display: none;">
                        <div class="bg-light p-3 rounded mb-3">
                            <label class="form-label fw-bold mb-2">Como deseja receber?</label>
                            <div class="d-flex gap-2">
                                <input type="radio" class="btn-check" name="orderType" id="typeDelivery" value="Entrega" checked onchange="toggleOrderType()">
                                <label class="btn btn-outline-danger flex-fill" for="typeDelivery">
                                    <i class="bi bi-bicycle me-1"></i> Entrega
                                </label>

<!--                                <input type="radio" class="btn-check" name="orderType" id="typePickup" value="Retirada" onchange="toggleOrderType()">
                                <label class="btn btn-outline-secondary flex-fill" for="typePickup">
                                    <i class="bi bi-bag me-1"></i> Retirada
                                </label>
    -->
                            </div>
                        </div>

                        <div class="d-flex justify-content-between mb-2">
                            <span>Subtotal</span>
                            <span id="summarySubtotal">R$ 0,00</span>
                        </div>

                        <div
                            class="d-flex justify-content-between mb-2 text-muted"
                            id="deliveryFeeRow">
                            <span>Taxa de entrega</span>
                            <span id="deliveryFeeDisplay">R$ 6,00</span>
                        </div>

                        <div
                            class="d-flex justify-content-between mb-2 text-muted d-none"
                            id="cardFeeRow">
                            <span>Taxa do cartão (5%)</span>
                            <span id="cardFeeDisplay">R$ 0,00</span>
                        </div>

                        <div
                            class="d-flex justify-content-between fw-bold fs-5 mt-2 text-danger border-top pt-2">
                            <span>Total</span>
                            <span id="summaryTotal">R$ 0,00</span>
                        </div>

                        <div class="mt-4">
                            <h6 class="fw-bold mb-3">Seus Dados</h6>

                            <div class="mb-3">
                                <label for="clientName" class="form-label">Nome <span class="text-danger">*</span></label>
                                <input type="text" class="form-control form-control-lg" id="clientName" placeholder="Seu nome" maxlength="20">
                                <div class="invalid-feedback">Por favor, digite seu nome.</div>
                            </div>

                            <div class="mb-3">
                                <label for="clientPhone" class="form-label">Telefone / WhatsApp <span class="text-danger">*</span></label>
                                <input type="tel" class="form-control form-control-lg" id="clientPhone" placeholder="(XX) 99999-9999" data-mask="(99) 9 9999-9999">
                                <div class="invalid-feedback">Digite um telefone para contato.</div>
                            </div>

                            <div class="mb-3" id="addressContainer">
                                <label for="address" class="form-label">Endereço de Entrega <span class="text-danger">*</span></label>
                                <textarea class="form-control" id="address" rows="2" placeholder="Rua, Número, Bairro, Complemento"></textarea>
                                <div class="invalid-feedback">O endereço é obrigatório para entrega.</div>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Forma de Pagamento</label>
                                <select class="form-select form-select-lg" id="paymentMethod">
                                    <option value="Pix">Pix</option>
                                    <option value="Cartão de Crédito">Cartão de Crédito</option>
                                    <option value="Cartão de Débito">Cartão de Débito</option>
                                    <option value="Dinheiro">Dinheiro</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer border-0 justify-content-center">
                    <button type="button" class="btn btn-success rounded-pill px-3 py-2"
                        id="btnCheckout" style="width: 400px; font-size: 1rem;">
                        <i class="bi bi-whatsapp me-2"></i> Enviar Pedido
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

    <script src="controller/ajax_produto.js"></script>
</body>

</html>