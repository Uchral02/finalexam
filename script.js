// Package storage
const packages = [];

// Input validation function
function validatePackage(recipient, id, address, weight) {
    if (!/^[a-zA-Z\s]+$/.test(recipient)) {
        throw "Invalid Recipient Name. Please use alphabetic characters only.";
        
    if (!Number.isInteger(id) || id <= 0) {
        throw "Invalid Package ID. Please enter a positive integer.";
    }
    if (!address.trim() || /\d/.test(address)) {
        throw "Invalid Delivery Address. Please ensure it is non-empty and does not contain numbers.";
    }
    if (isNaN(weight) || weight <= 0) {
        throw "Invalid Weight. Please enter a positive number.";
    }
}}

// Generate tracking code
function generateTrackingCode(packageId, weight) {
    return (packageId << 4 | Math.floor(weight)).toString(2);
}

// Merge Sort for packages
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
}

function merge(left, right) {
    const sorted = [];
    while (left.length && right.length) {
        if (left[0].weight < right[0].weight) {
            sorted.push(left.shift());
        } else {
            sorted.push(right.shift());
        }
    }
    return sorted.concat(left, right);
}

// Add package
document.getElementById("packageForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const recipient = document.getElementById("recipientName").value.trim();
    const id = parseInt(document.getElementById("packageID").value.trim(), 10);
    const address = document.getElementById("deliveryAddress").value.trim();
    const weight = parseFloat(document.getElementById("weight").value.trim());

    try {
        validatePackage(recipient, id, address, weight);

        const trackingCode = generateTrackingCode(id, weight);
        packages.push({ recipient, id, address, weight, trackingCode });

        displayPackages();

        document.getElementById("message").textContent = "Package added successfully!";
        document.getElementById("message").style.color = "green";
    } catch (error) {
        document.getElementById("message").textContent = `Error: ${error}`;
        document.getElementById("message").style.color = "red";
    }
});

// Display sorted packages in the table
function displayPackages() {
    const table = document.getElementById("packageTable");
    table.innerHTML = ""; // Clear previous entries

    const sortedPackages = mergeSort(packages);
    sortedPackages.forEach((pkg) => {
        const row = `<tr>
            <td>${pkg.recipient}</td>
            <td>${pkg.id}</td>
            <td>${pkg.address}</td>
            <td>${pkg.weight}</td>
            <td>${pkg.trackingCode}</td>
        </tr>`;
        table.innerHTML += row;
    });
}

