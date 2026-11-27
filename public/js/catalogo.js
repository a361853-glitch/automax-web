const VEHICULOS = [
  { id: 1, marca: 'Toyota', modelo: 'Corolla LE', anio: 2024, precioDia: 850, categoria: 'Sedán', detalleUrl: '/vehiculo-1' },
  { id: 2, marca: 'Honda', modelo: 'Civic Touring', anio: 2024, precioDia: 1050, categoria: 'Sedán', detalleUrl: '/vehiculo-2' },
  { id: 3, marca: 'Mazda', modelo: 'CX-5 Grand Touring', anio: 2025, precioDia: 1350, categoria: 'SUV', detalleUrl: '/vehiculo-3' },
  { id: 4, marca: 'Nissan', modelo: 'Versa Advance', anio: 2024, precioDia: 720, categoria: 'Sedán' },
  { id: 5, marca: 'Volkswagen', modelo: 'Jetta Comfortline', anio: 2024, precioDia: 960, categoria: 'Sedán' },
  { id: 6, marca: 'Kia', modelo: 'K3 EX', anio: 2025, precioDia: 790, categoria: 'Sedán' },
  { id: 7, marca: 'Hyundai', modelo: 'Elantra GLS', anio: 2024, precioDia: 890, categoria: 'Sedán' },
  { id: 8, marca: 'Chevrolet', modelo: 'Onix Premier', anio: 2024, precioDia: 740, categoria: 'Sedán' },
  { id: 9, marca: 'Toyota', modelo: 'RAV4 XLE', anio: 2025, precioDia: 1450, categoria: 'SUV' },
  { id: 10, marca: 'Honda', modelo: 'CR-V Turbo', anio: 2024, precioDia: 1480, categoria: 'SUV' },
  { id: 11, marca: 'Nissan', modelo: 'X-Trail Exclusive', anio: 2024, precioDia: 1390, categoria: 'SUV' },
  { id: 12, marca: 'Volkswagen', modelo: 'Taos Highline', anio: 2024, precioDia: 1280, categoria: 'SUV' },
  { id: 13, marca: 'Kia', modelo: 'Sportage SXL', anio: 2025, precioDia: 1420, categoria: 'SUV' },
  { id: 14, marca: 'Hyundai', modelo: 'Tucson Limited', anio: 2024, precioDia: 1360, categoria: 'SUV' },
  { id: 15, marca: 'Mazda', modelo: 'Mazda 3 Hatchback', anio: 2024, precioDia: 990, categoria: 'Hatchback' },
  { id: 16, marca: 'Suzuki', modelo: 'Swift Boosterjet', anio: 2024, precioDia: 680, categoria: 'Hatchback' },
  { id: 17, marca: 'SEAT', modelo: 'Ibiza Style', anio: 2023, precioDia: 710, categoria: 'Hatchback' },
  { id: 18, marca: 'Toyota', modelo: 'Yaris Hatchback', anio: 2024, precioDia: 730, categoria: 'Hatchback' },
  { id: 19, marca: 'Ford', modelo: 'Ranger XLT', anio: 2024, precioDia: 1650, categoria: 'Pickup' },
  { id: 20, marca: 'Toyota', modelo: 'Hilux Doble Cabina', anio: 2024, precioDia: 1690, categoria: 'Pickup' },
  { id: 21, marca: 'Nissan', modelo: 'Frontier PRO-4X', anio: 2025, precioDia: 1750, categoria: 'Pickup' },
  { id: 22, marca: 'Chevrolet', modelo: 'Tracker LT', anio: 2024, precioDia: 1150, categoria: 'SUV' },
  { id: 23, marca: 'Renault', modelo: 'Duster Iconic', anio: 2024, precioDia: 1090, categoria: 'SUV' },
  { id: 24, marca: 'Mitsubishi', modelo: 'Outlander Sport', anio: 2024, precioDia: 1240, categoria: 'SUV' },
  { id: 25, marca: 'Volkswagen', modelo: 'Virtus Comfortline', anio: 2025, precioDia: 820, categoria: 'Sedán' }
];

const grid = document.getElementById('catalogo-grid');
const buscador = document.getElementById('buscador');
const filtroCategoria = document.getElementById('filtro-categoria');

function formatearPrecio(monto) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0
  }).format(monto);
}

function renderCatalogo(lista) {
  grid.innerHTML = '';

  if (lista.length === 0) {
    grid.innerHTML = '<p>No se encontraron vehículos que coincidan con tu búsqueda.</p>';
    return;
  }

  lista.forEach((auto) => {
    const card = document.createElement('article');
    card.className = `car-card ${auto.detalleUrl ? 'featured' : ''}`;

    const badge = auto.detalleUrl
      ? '<span class="badge badge-featured">Destacado · Ficha completa</span>'
      : `<span class="badge badge-category">${auto.categoria}</span>`;

    const actionBtn = auto.detalleUrl
      ? `<a href="${auto.detalleUrl}" class="btn btn-primary">Ver detalle del vehículo</a>`
      : `<a href="/contacto" class="btn btn-secondary">Consultar disponibilidad</a>`;

    card.innerHTML = `
      <div>
        ${badge}
        <h3 class="car-title">${auto.marca} ${auto.modelo}</h3>
        <p class="car-meta">Año: <strong>${auto.anio}</strong> · Categoría: ${auto.categoria}</p>
      </div>
      <div>
        <p class="car-price">${formatearPrecio(auto.precioDia)} <span>/ día</span></p>
        ${actionBtn}
      </div>
    `;

    grid.appendChild(card);
  });
}

function aplicarFiltros() {
  const texto = buscador.value.trim().toLowerCase();
  const categoria = filtroCategoria.value;

  const filtrados = VEHICULOS.filter((auto) => {
    const coincideTexto =
      auto.marca.toLowerCase().includes(texto) ||
      auto.modelo.toLowerCase().includes(texto) ||
      String(auto.anio).includes(texto);
    const coincideCategoria = categoria === 'Todas' || auto.categoria === categoria;
    return coincideTexto && coincideCategoria;
  });

  renderCatalogo(filtrados);
}

buscador.addEventListener('input', aplicarFiltros);
filtroCategoria.addEventListener('change', aplicarFiltros);

renderCatalogo(VEHICULOS);