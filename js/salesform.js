// Get salesman name from localStorage
const salesmanName = localStorage.getItem("salesmanName");

// Redirect to login if no salesman found
if (!salesmanName) {
  alert("Please login again.");
  window.location.href = "index.html";
}

// Display salesman name if element exists
const display = document.getElementById("salesmanDisplay");
if (display) {
  display.textContent = salesmanName;
}

function showLoader() {
  document.getElementById("loadingOverlay").style.display = "flex";
}

function hideLoader() {
  document.getElementById("loadingOverlay").style.display = "none";
}

function showSuccessModal() {
  document.getElementById("successModal").style.display = "flex";
}

function closeSuccessModal() {
  document.getElementById("successModal").style.display = "none";
}

// Function to add a new product row
function addProduct() {
  const container = document.getElementById("productsContainer");
  const div = document.createElement("div");
  div.className = "product";
  div.innerHTML = `
    <input type="text" name="productName[]" placeholder="Product Name" required>
    <input type="number" name="price[]" placeholder="Price" required>
    <input type="number" name="quantity[]" placeholder="Quantity" required>
  `;
  container.appendChild(div);
}

// Form submission handler
document.getElementById("salesForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector("button[type='submit']");

  // Prevent double submit
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  // Show loading popup
  showLoader();
  // Collect all product data
  const productNames = form.querySelectorAll("input[name='productName[]']");
  const prices = form.querySelectorAll("input[name='price[]']");
  const quantities = form.querySelectorAll("input[name='quantity[]']");

  const products = [];
  for (let i = 0; i < productNames.length; i++) {
    products.push({
      name: productNames[i].value,
      price: prices[i].value,
      quantity: quantities[i].value
    });
  }

  // Build the data object to send
  const data = {
    salesman: salesmanName,
    shopName: form.shopName.value,
    shopAddress: form.shopAddress.value,
    contact: form.contact.value,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    products: products
  };

  console.log("Submitting sales data:", data);

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbxb7ZP7bZt8lRlsRBCdAY3ahZ8qcC26pIwlc_DH0YwvjL1F_S05K08Jzcg2P6eF9ObE/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(data)
      }
    );

    const result = await response.json();

    if (result.status === "success") {
      // alert("Sales data submitted!");
      hideLoader();
      showSuccessModal();
      // Reset form
      form.reset();
      document.getElementById("productsContainer").innerHTML = `
        <div class="product">
          <input type="text" name="productName[]" placeholder="Product Name" required>
          <input type="number" name="price[]" placeholder="Price" required>
          <input type="number" name="quantity[]" placeholder="Quantity" required>
        </div>
      `;
    } else {
      hideLoader();
      alert("Error submitting data: " + result.message);
    }
  } catch (err) {
    hideLoader();
    alert("Error submitting data. Try again.");
    console.error(err);
  }
  
  // Re-enable submit button
  submitBtn.disabled = false;
  submitBtn.textContent = "✅ Submit Sales";
});


// function showToast() {
//   const toast = document.getElementById("toast");
//   toast.classList.add("show");

//   setTimeout(() => {
//     toast.classList.remove("show");
//   }, 2500);
// }

