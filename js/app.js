
/**
 * Main Application JavaScript
 * Handles the application logic, UI interactions, and data management
 */

// Application state
let state = {
  shipments: [],
  filteredShipments: [],
  currentPage: 1,
  rowsPerPage: 10,
  sortField: null,
  sortDirection: 'asc',
  searchQuery: '',
  filters: {
    dateRange: 'last7',
    startDate: null,
    endDate: null,
    serviceType: 'all',
    shipper: true,
    consignee: true,
    billToParty: true,
    delivered: true,
    undelivered: true,
    pickups: true
  },
  isMobile: window.innerWidth < 768,
  showFilters: true
};

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize state with data
  state.shipments = shipmentData;
  state.filteredShipments = [...shipmentData];
  
  // Initialize date range values
  setupInitialDateRange();
  
  // Set up event listeners
  setupEventListeners();
  
  // Render the initial view
  renderShipments();
  updatePaginationInfo();
  
  // Handle responsive behavior on load
  handleResponsiveLayout();
});

// Set up the initial date range values
function setupInitialDateRange() {
  const today = new Date();
  
  // Default to last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);
  
  state.filters.startDate = formatDateForInput(sevenDaysAgo);
  state.filters.endDate = formatDateForInput(today);
  
  // Set initial dates in the UI
  document.getElementById('start-date').value = state.filters.startDate;
  document.getElementById('end-date').value = state.filters.endDate;
}

// Format a date for date input fields (YYYY-MM-DD)
function formatDateForInput(date) {
  return date.toISOString().split('T')[0];
}

// Set up all event listeners for the application
function setupEventListeners() {
  // Search functionality
  document.getElementById('search-input').addEventListener('input', handleSearch);
  
  // Sorting table headers
  document.querySelectorAll('.sortable').forEach(header => {
    header.addEventListener('click', () => {
      handleSort(header.dataset.field);
    });
  });
  
  // Pagination
  document.getElementById('rows-per-page').addEventListener('change', handleRowsPerPageChange);
  document.getElementById('prev-page-btn').addEventListener('click', handlePrevPage);
  document.getElementById('next-page-btn').addEventListener('click', handleNextPage);
  
  // Filter controls
  document.getElementById('date-range-select').addEventListener('change', handleDateRangeChange);
  document.getElementById('start-date').addEventListener('change', handleCustomDateChange);
  document.getElementById('end-date').addEventListener('change', handleCustomDateChange);
  document.getElementById('service-type-select').addEventListener('change', handleServiceTypeChange);
  
  // Checkbox toggles
  document.getElementById('shipper-toggle').addEventListener('change', () => { 
    state.filters.shipper = !state.filters.shipper;
  });
  document.getElementById('consignee-toggle').addEventListener('change', () => { 
    state.filters.consignee = !state.filters.consignee;
  });
  document.getElementById('bill-to-toggle').addEventListener('change', () => { 
    state.filters.billToParty = !state.filters.billToParty;
  });
  document.getElementById('delivered-toggle').addEventListener('change', () => { 
    state.filters.delivered = !state.filters.delivered;
  });
  document.getElementById('undelivered-toggle').addEventListener('change', () => { 
    state.filters.undelivered = !state.filters.undelivered;
  });
  document.getElementById('pickups-toggle').addEventListener('change', () => { 
    state.filters.pickups = !state.filters.pickups;
  });
  
  // Filter actions
  document.getElementById('apply-filter-btn').addEventListener('click', handleApplyFilter);
  document.getElementById('reset-filter-btn').addEventListener('click', handleResetFilter);
  
  // Mobile filter drawer
  document.getElementById('toggle-filters-btn').addEventListener('click', toggleMobileFilters);
  document.getElementById('close-drawer-btn').addEventListener('click', closeMobileFilters);
  
  // Desktop filter toggle
  document.getElementById('show-filters-btn').addEventListener('click', toggleDesktopFilters);
  
  // Export to Excel button
  document.getElementById('export-excel-btn').addEventListener('click', handleExportToExcel);
  
  // Window resize handler
  window.addEventListener('resize', handleResponsiveLayout);
}

// Handle responsive layout changes
function handleResponsiveLayout() {
  const wasMobile = state.isMobile;
  state.isMobile = window.innerWidth < 768;
  
  // Only re-render if the device type changed
  if (wasMobile !== state.isMobile) {
    renderShipments();
    
    // Set up mobile filter drawer if switched to mobile
    if (state.isMobile) {
      setupMobileFilterDrawer();
    }
  }
}

// Set up mobile filter drawer by cloning the sidebar content
function setupMobileFilterDrawer() {
  const sidebarContent = document.querySelector('#filter-sidebar > div');
  const mobileContainer = document.getElementById('mobile-filters-container');
  
  if (sidebarContent && mobileContainer) {
    mobileContainer.innerHTML = '';
    mobileContainer.appendChild(sidebarContent.cloneNode(true));
    
    // Re-attach event listeners for the cloned elements
    setupMobileFilterEventListeners();
  }
}

// Set up event listeners for cloned filter elements in mobile drawer
function setupMobileFilterEventListeners() {
  // Re-attach event listeners to all form controls in the mobile drawer
  const mobileDrawer = document.getElementById('mobile-filters-container');
  
  // Date range selector
  const dateRangeSelect = mobileDrawer.querySelector('#date-range-select');
  if (dateRangeSelect) {
    dateRangeSelect.addEventListener('change', handleDateRangeChange);
  }
  
  // Custom date inputs
  const startDateInput = mobileDrawer.querySelector('#start-date');
  const endDateInput = mobileDrawer.querySelector('#end-date');
  if (startDateInput && endDateInput) {
    startDateInput.addEventListener('change', handleCustomDateChange);
    endDateInput.addEventListener('change', handleCustomDateChange);
  }
  
  // Service type selector
  const serviceTypeSelect = mobileDrawer.querySelector('#service-type-select');
  if (serviceTypeSelect) {
    serviceTypeSelect.addEventListener('change', handleServiceTypeChange);
  }
  
  // All the toggle switches
  const toggles = {
    'shipper-toggle': 'shipper',
    'consignee-toggle': 'consignee',
    'bill-to-toggle': 'billToParty',
    'delivered-toggle': 'delivered',
    'undelivered-toggle': 'undelivered',
    'pickups-toggle': 'pickups'
  };
  
  for (const [id, property] of Object.entries(toggles)) {
    const toggle = mobileDrawer.querySelector(`#${id}`);
    if (toggle) {
      toggle.addEventListener('change', () => {
        state.filters[property] = toggle.checked;
      });
    }
  }
  
  // Filter action buttons
  const applyFilterBtn = mobileDrawer.querySelector('#apply-filter-btn');
  const resetFilterBtn = mobileDrawer.querySelector('#reset-filter-btn');
  
  if (applyFilterBtn) {
    applyFilterBtn.addEventListener('click', handleApplyFilter);
  }
  
  if (resetFilterBtn) {
    resetFilterBtn.addEventListener('click', handleResetFilter);
  }
}

// Handle the search input
function handleSearch(e) {
  state.searchQuery = e.target.value.toLowerCase();
  
  if (state.searchQuery.trim() === '') {
    state.filteredShipments = [...state.shipments];
  } else {
    state.filteredShipments = state.shipments.filter(shipment => 
      shipment.shipmentNumber.toLowerCase().includes(state.searchQuery) ||
      shipment.bolRefs.toLowerCase().includes(state.searchQuery) ||
      shipment.shipper.toLowerCase().includes(state.searchQuery) ||
      shipment.shipTo.toLowerCase().includes(state.searchQuery)
    );
  }
  
  state.currentPage = 1;
  renderShipments();
  updatePaginationInfo();
}

// Handle sorting when a table header is clicked
function handleSort(field) {
  // If already sorting by this field, toggle direction
  if (state.sortField === field) {
    state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    state.sortField = field;
    state.sortDirection = 'asc';
  }
  
  // Update sort icons
  updateSortIcons(field);
  
  // Sort the data
  sortShipments();
  renderShipments();
}

// Update sort icons in the table headers
function updateSortIcons(field) {
  // First, remove all sort classes
  document.querySelectorAll('.sortable').forEach(header => {
    header.classList.remove('sort-asc', 'sort-desc');
  });
  
  // Add the appropriate sort class to the current sort header
  const currentHeader = document.querySelector(`.sortable[data-field="${field}"]`);
  if (currentHeader) {
    currentHeader.classList.add(state.sortDirection === 'asc' ? 'sort-asc' : 'sort-desc');
  }
}

// Sort shipments based on current sort field and direction
function sortShipments() {
  const field = state.sortField;
  const direction = state.sortDirection;
  
  if (!field) return;
  
  state.filteredShipments.sort((a, b) => {
    let valueA = a[field];
    let valueB = b[field];
    
    // Handle empty values
    if (!valueA) valueA = '';
    if (!valueB) valueB = '';
    
    // Convert to string for comparison
    valueA = String(valueA).toLowerCase();
    valueB = String(valueB).toLowerCase();
    
    // Compare based on direction
    if (direction === 'asc') {
      return valueA.localeCompare(valueB);
    } else {
      return valueB.localeCompare(valueA);
    }
  });
}

// Handle changing rows per page
function handleRowsPerPageChange(e) {
  state.rowsPerPage = parseInt(e.target.value, 10);
  state.currentPage = 1;
  renderShipments();
  updatePaginationInfo();
}

// Go to previous page
function handlePrevPage() {
  if (state.currentPage > 1) {
    state.currentPage--;
    renderShipments();
    updatePaginationInfo();
  }
}

// Go to next page
function handleNextPage() {
  const totalPages = Math.ceil(state.filteredShipments.length / state.rowsPerPage);
  if (state.currentPage < totalPages) {
    state.currentPage++;
    renderShipments();
    updatePaginationInfo();
  }
}

// Update pagination information and button states
function updatePaginationInfo() {
  const totalItems = state.filteredShipments.length;
  const startItem = (state.currentPage - 1) * state.rowsPerPage + 1;
  const endItem = Math.min(startItem + state.rowsPerPage - 1, totalItems);
  const totalPages = Math.ceil(totalItems / state.rowsPerPage);
  
  // Update pagination text
  document.getElementById('pagination-info').textContent = 
    totalItems === 0 ? '0 - 0 of 0' : `${startItem} - ${endItem} of ${totalItems}`;
  
  // Update button states
  document.getElementById('prev-page-btn').disabled = state.currentPage === 1;
  document.getElementById('next-page-btn').disabled = state.currentPage === totalPages || totalItems === 0;
}

// Handle date range dropdown change
function handleDateRangeChange(e) {
  const range = e.target.value;
  state.filters.dateRange = range;
  
  const customDateContainer = document.getElementById('custom-date-container');
  
  if (range === 'custom') {
    customDateContainer.classList.remove('d-none');
  } else {
    customDateContainer.classList.add('d-none');
    
    // Set date range based on selection
    const today = new Date();
    let startDate;
    
    switch (range) {
      case 'last7':
        startDate = new Date();
        startDate.setDate(today.getDate() - 7);
        break;
      case 'last14':
        startDate = new Date();
        startDate.setDate(today.getDate() - 14);
        break;
      case 'last30':
        startDate = new Date();
        startDate.setDate(today.getDate() - 30);
        break;
      default:
        startDate = new Date();
        startDate.setDate(today.getDate() - 7);
    }
    
    state.filters.startDate = formatDateForInput(startDate);
    state.filters.endDate = formatDateForInput(today);
    
    // Update input values
    document.getElementById('start-date').value = state.filters.startDate;
    document.getElementById('end-date').value = state.filters.endDate;
  }
}

// Handle custom date input changes
function handleCustomDateChange() {
  state.filters.startDate = document.getElementById('start-date').value;
  state.filters.endDate = document.getElementById('end-date').value;
}

// Handle service type dropdown change
function handleServiceTypeChange(e) {
  state.filters.serviceType = e.target.value;
}

// Apply the current filters
function handleApplyFilter() {
  // In a real app, this would implement actual filtering logic
  // For demo purposes, we'll just show a toast message
  
  // Close mobile filter drawer if open
  if (state.isMobile) {
    closeMobileFilters();
  }
  
  showToast('Filters Applied', 'Your filter settings have been applied to the data.');
}

// Reset all filters to default values
function handleResetFilter() {
  // Reset filter state
  state.filters = {
    dateRange: 'last7',
    serviceType: 'all',
    shipper: true,
    consignee: true,
    billToParty: true,
    delivered: true,
    undelivered: true,
    pickups: true
  };
  
  // Reset UI elements
  document.getElementById('date-range-select').value = 'last7';
  document.getElementById('custom-date-container').classList.add('d-none');
  document.getElementById('service-type-select').value = 'all';
  
  document.getElementById('shipper-toggle').checked = true;
  document.getElementById('consignee-toggle').checked = true;
  document.getElementById('bill-to-toggle').checked = true;
  document.getElementById('delivered-toggle').checked = true;
  document.getElementById('undelivered-toggle').checked = true;
  document.getElementById('pickups-toggle').checked = true;
  
  // Reset search and filtered data
  document.getElementById('search-input').value = '';
  state.searchQuery = '';
  state.filteredShipments = [...state.shipments];
  
  // Reset to first page and render
  state.currentPage = 1;
  renderShipments();
  updatePaginationInfo();
  
  // Show confirmation toast
  showToast('Filters Reset', 'All filters have been reset to default values.');
}

// Toggle mobile filter drawer
function toggleMobileFilters() {
  const drawer = document.getElementById('mobile-filter-drawer');
  drawer.style.display = 'block';
  setTimeout(() => {
    drawer.classList.add('show');
  }, 10);
}

// Close mobile filter drawer
function closeMobileFilters() {
  const drawer = document.getElementById('mobile-filter-drawer');
  drawer.classList.remove('show');
  setTimeout(() => {
    drawer.style.display = 'none';
  }, 300);
}

// Toggle desktop sidebar filters
function toggleDesktopFilters() {
  state.showFilters = !state.showFilters;
  const sidebar = document.getElementById('filter-sidebar');
  const btnText = document.getElementById('filter-btn-text');
  
  if (state.showFilters) {
    sidebar.classList.remove('d-none');
    btnText.textContent = 'Hide Filters';
  } else {
    sidebar.classList.add('d-none');
    btnText.textContent = 'Show Filters';
  }
}

// Handle export to Excel functionality
function handleExportToExcel() {
  // In a real app, this would implement actual export logic
  // For demo purposes, we'll just show a toast message
  showToast('Export Started', 'Your data is being exported to Excel...');
}

// Render shipments based on current state
function renderShipments() {
  if (state.isMobile) {
    renderShipmentCards();
  } else {
    renderShipmentTable();
  }
}

// Render the shipment table for desktop view
function renderShipmentTable() {
  const tableBody = document.getElementById('shipment-table-body');
  tableBody.innerHTML = '';
  
  // Calculate current page items
  const start = (state.currentPage - 1) * state.rowsPerPage;
  const end = start + state.rowsPerPage;
  const currentPageItems = state.filteredShipments.slice(start, end);
  
  // No results message
  if (currentPageItems.length === 0) {
    const noResultsRow = document.createElement('tr');
    noResultsRow.innerHTML = `
      <td colspan="15" class="text-center py-4">
        <div class="text-muted">No shipments found matching your criteria</div>
      </td>
    `;
    tableBody.appendChild(noResultsRow);
    return;
  }
  
  // Create rows for current page
  currentPageItems.forEach(shipment => {
    const row = document.createElement('tr');
    
    // Format status - special case for "Delayed"
    let displayStatus = shipment.status.includes("Delayed") 
      ? "Delivery Exception" 
      : shipment.status;
    
    // Remove date information from the status
    displayStatus = displayStatus.replace(/ on \d{2}\/\d{2}\/\d{2}/, '');
    
    // Create on-time indicator
    let onTimeDisplay = '-';
    if (shipment.onTime === 'Yes') {
      onTimeDisplay = '<i class="fas fa-check-circle text-tracking-success"></i>';
    } else if (shipment.onTime === 'No') {
      onTimeDisplay = '<i class="fas fa-times-circle text-tracking-danger"></i>';
    }
    
    row.innerHTML = `
      <td class="py-2">${shipment.shipDate}</td>
      <td class="py-2">${shipment.deliveryDateTime || '-'}</td>
      <td class="py-2">${shipment.etaDate}</td>
      <td class="py-2 fw-medium text-tracking-blue">
        <a href="#${shipment.shipmentNumber}" class="shipment-link">
          ${shipment.shipmentNumber}
        </a>
      </td>
      <td class="py-2">${shipment.bolRefs}</td>
      <td class="py-2">${shipment.shipper}</td>
      <td class="py-2">${shipment.shipperCity}</td>
      <td class="py-2">${shipment.shipTo}</td>
      <td class="py-2">${shipment.consigneeCity}</td>
      <td class="py-2">${shipment.province}</td>
      <td class="py-2">${shipment.zip}</td>
      <td class="py-2">${displayStatus}</td>
      <td class="py-2">${shipment.puPartnerPro || '-'}</td>
      <td class="py-2">${shipment.delPartnerPro || '-'}</td>
      <td class="py-2 text-center">${onTimeDisplay}</td>
    `;
    
    tableBody.appendChild(row);
  });
}

// Render shipment cards for mobile view
function renderShipmentCards() {
  const cardsContainer = document.getElementById('cards-container');
  cardsContainer.innerHTML = '';
  
  // Calculate current page items
  const start = (state.currentPage - 1) * state.rowsPerPage;
  const end = start + state.rowsPerPage;
  const currentPageItems = state.filteredShipments.slice(start, end);
  
  // No results message
  if (currentPageItems.length === 0) {
    cardsContainer.innerHTML = `
      <div class="text-center py-4">
        <div class="text-muted">No shipments found matching your criteria</div>
      </div>
    `;
    return;
  }
  
  // Create card for each shipment
  currentPageItems.forEach(shipment => {
    const card = document.createElement('div');
    card.className = 'shipment-card fade-in';
    
    // Create header and details sections
    const headerHTML = generateShipmentHeaderHTML(shipment);
    const detailsHTML = generateShipmentDetailsHTML(shipment);
    
    card.innerHTML = `
      ${headerHTML}
      ${detailsHTML}
      <hr class="my-2">
    `;
    
    cardsContainer.appendChild(card);
  });
}

// Show a toast notification
function showToast(title, message) {
  const toastContainer = document.getElementById('toast-container');
  const toastId = 'toast-' + Date.now();
  
  const toastHTML = `
    <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="me-auto">${title}</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        ${message}
      </div>
    </div>
  `;
  
  toastContainer.insertAdjacentHTML('beforeend', toastHTML);
  
  // Initialize and show the toast
  const toastElement = document.getElementById(toastId);
  const toast = new mdb.Toast(toastElement);
  toast.show();
  
  // Auto remove after shown
  toastElement.addEventListener('hidden.bs.toast', function() {
    toastElement.remove();
  });
}
