// ==========================================
// TOYS CORNER - GOOGLE REVIEW SYSTEM
// ==========================================

let overallRating = 0;
let step = 0;

// Replace with your Google Place ID
const PLACE_ID = "ChIJDbdJkXdPXjkRw08zCEFI8FY";

// Google Review URL
const reviewUrl = `https://search.google.com/local/writereview?placeid=${PLACE_ID}`;

// ==========================================
// REVIEW TEMPLATES
// ==========================================

const templates = [
    "Excellent collection of toys with reasonable prices. Staff was very helpful and polite.",
    "Great quality toys and lots of options for kids of every age. Highly recommended.",
    "My child loved the toy collection. Wonderful shopping experience.",
    "Very nice shop with genuine products and friendly service. Will visit again.",
    "Affordable prices and excellent customer service. Happy with my purchase.",
    "Good variety of educational and fun toys. Everything was well organized.",
    "The staff helped us choose the perfect gift. Really satisfied with the service.",
    "Very clean shop with quality products. Kids will definitely enjoy visiting.",
    "Excellent toy collection and quick service. Great experience overall.",
    "Purchased birthday gifts here and everyone loved them. Highly recommended.",
    "Lots of branded toys available at reasonable prices. Worth visiting.",
    "Amazing shopping experience with friendly staff and quality products.",
    "Found exactly what I was looking for. Great collection for children.",
    "Best toy shop in the area with excellent customer support.",
    "Highly recommended for anyone looking for quality toys and gifts.",
    "A fantastic place to buy toys with a wide range of products and friendly staff.",
    "Excellent shopping experience with quality products and fair pricing.",
    "The store has an amazing variety of toys and the service was outstanding.",
    "Very satisfied with my purchase. The toys are of excellent quality.",
    "A perfect destination for children's toys. Highly recommended."
];

// ==========================================
// RANDOM REVIEW
// ==========================================

function getRandomReview() {
    return templates[Math.floor(Math.random() * templates.length)];
}

// ==========================================
// GENERATE REVIEW
// ==========================================

function generate() {

    const name = document.getElementById("rName").value.trim() || "Customer";

    document.getElementById("reviewText").value =
`Name: ${name}

    Overall Rating: ${"⭐".repeat(overallRating)}

    Review:
        ${getRandomReview()}

    Highly recommended Toys Corner for quality toys and excellent customer service.`;
    }

// ==========================================
// STAR RATING
// ==========================================

function createStars() {

    const container = document.getElementById("overallStars");

    container.innerHTML = "";

    for (let i = 1; i <= 5; i++) {

        const star = document.createElement("i");
        star.className = "fa-solid fa-star";

        star.onclick = function () {

            overallRating = i;

            document.querySelectorAll("#overallStars i").forEach((s, index) => {
                s.classList.toggle("active", index < i);
    });

    generate();
};

container.appendChild(star);
}
}

// ==========================================
// TOAST
// ==========================================

function showToast(msg, type = "success") {

    document.getElementById("toastMsg").innerText = msg;

    const toast = document.getElementById("reviewToast");

    toast.className = `toast text-bg-${type} border-0`;

    bootstrap.Toast.getOrCreateInstance(toast, {
        delay: 2000
    }).show();
}

    // ==========================================
    // COPY REVIEW
    // ==========================================

    function copyText(textarea) {

        textarea.focus();
        textarea.select();
        textarea.setSelectionRange(0, 99999);

        try {

            document.execCommand("copy");

            showToast("Review copied successfully 📋");

            return true;

        } catch (e) {

            showToast("Copy failed ❌", "danger");

            return false;
        }
    }

    // ==========================================
    // RESET FORM
    // ==========================================

    function resetForm() {

        document.getElementById("rName").value = "";
        document.getElementById("reviewText").value = "";

        overallRating = 0;
        step = 0;

        document.querySelectorAll("#overallStars i").forEach(star => {
            star.classList.remove("active");
    });

    const btn = document.getElementById("submitReview");

    btn.innerText = "Submit Review";
    btn.className = "btn btn-success w-100 mt-3";
}

// ==========================================
// NAME CHANGE EVENT
// ==========================================

document.getElementById("rName").addEventListener("input", function () {

    if (overallRating > 0) {
        generate();
    }

});

// ==========================================
// SUBMIT BUTTON
// ==========================================

document.getElementById("submitReview").addEventListener("click", function () {

    const name = document.getElementById("rName").value.trim();

    if (name === "") {

        showToast("Please enter your name", "danger");
        return;
    }

    if (overallRating === 0) {

        showToast("Please select your rating", "danger");
        return;
    }

    const textarea = document.getElementById("reviewText");

    if (step === 0) {

        copyText(textarea);

        this.innerText = "Copy Review";
        this.className = "btn btn-primary w-100 mt-3";

        step = 1;

        return;
    }

    if (step === 1) {

        window.open(reviewUrl, "_blank");

        resetForm();
    }

});

// ==========================================
// INITIALIZE
// ==========================================

createStars();
