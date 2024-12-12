function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // Swap array elements
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }

    return array;
}

function spin() {

    const spinButton = document.getElementById('spin-button');
    const spinTimer = document.getElementById('spin-timer');

    // Disable the spin button and remove the "Spin" text
    spinButton.disabled = true;
    spinButton.textContent = '';

    // Show the timer
    spinTimer.classList.remove('hidden');
    spinTimer.classList.add('show');

    let timer = 10;
    spinTimer.textContent = timer;

    const countdown = setInterval(() => {
        timer--;
        spinTimer.textContent = timer;
        if (timer === 0) {
            clearInterval(countdown);

            // Hide the timer and re-enable the spin button
            spinTimer.classList.remove('show');
            spinTimer.classList.add('hidden');
            spinButton.disabled = false;
            spinButton.textContent = 'Spin';
        }
    }, 1000);

    const wheel = document.getElementById('wheel');
    const applause = document.getElementById('applause');
    const box = document.getElementById("box");
    const element = document.getElementById("mainbox");
    let SelectionItem = "";

    const currentUser = localStorage.getItem('currentUser');
    const users = JSON.parse(localStorage.getItem('users'));

    if (!currentUser || !users[currentUser]) {
        Swal.fire({
            title: 'Please Log In',
            text: 'You need to log in to Spin the wheel.',
            imageUrl: 'PleaseLog-InToSpin.png', // Added image path for pop-up
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Log In Image',
        });
        return;
    }

    if ((users[currentUser].balance || 0) < 100) {
        alert('Insufficient balance');
        return;
    }

    // Deduct 100 from the user's balance
    users[currentUser].balance = (users[currentUser].balance || 0) - 100;

    let Badge = shuffle([1690, 2050, 2410]);
    let Tshirt = shuffle([1610, 1970, 2330]);
    let Meal = shuffle([1530, 1890, 2250]);
    let Box = shuffle([1890, 2250, 2610]);
    let Copy = shuffle([1850, 2210, 2570]);
    let Books = shuffle([1770, 2130, 2490]);
    let Bad = shuffle([1810, 2170, 2530]);
    let Points = shuffle([1750, 2110, 2470]);
    let Tea = shuffle([1630, 1990, 2350]);
    let Cash = shuffle([1570, 1930, 2290]);

    let results = shuffle([
        Badge[0], Tshirt[0], Bad[0], Box[0], Copy[0],
        Books[0], Meal[0], Points[0], Tea[0], Cash[0]
    ]);

    if (Badge.includes(results[0])) SelectionItem = "Foundation Badge";
    if (Tshirt.includes(results[0])) SelectionItem = "Foundation T-Shirt";
    if (Meal.includes(results[0])) SelectionItem = "Biriyani";
    if (Box.includes(results[0])) SelectionItem = "Box";
    if (Copy.includes(results[0])) SelectionItem = "Long Khata";
    if (Books.includes(results[0])) SelectionItem = "Books";
    if (Bad.includes(results[0])) SelectionItem = "Better Luck Next Time";
    if (Points.includes(results[0])) SelectionItem = "Points 20";
    if (Tea.includes(results[0])) SelectionItem = "Cup of Tea Evening";
    if (Cash. includes(results[0])) SelectionItem = "Rs.50/-";

    wheel.play();

    box.style.setProperty("transition", "all ease 5s");
    box.style.transform = "rotate(" + results[0] + "deg)";
    element.classList.remove("animate");
    setTimeout(function() {
        element.classList.add("animate");
    }, 5000);

    setTimeout(function() {
        applause.play();
        Swal.fire({
            title: '👏😍Masha Allah😍👏',
            html: 'You Won👉👉 ' + SelectionItem + ' | ' + '<a href="#" style="text-decoration:none;color:blue"> Claim Now </a>',
            imageUrl: 'WinBabySmiling.avif',
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
        });

        // Add the win to the user's history
        const winEntry = {
            item: SelectionItem,
            date: new Date().toLocaleString() // Corrected from Date to date
        };
        users[currentUser].history = users[currentUser].history || [];
        users[currentUser].history.push(winEntry);
        localStorage.setItem('users', JSON.stringify(users));
    }, 5500);

    setTimeout(function() {
        box.style.setProperty("transition", "initial");
        box.style.transform = "rotate(90deg)";
    }, 6000);

    // Update user balance in profile bar
    updateBalance();
}

function toggleDropdown() {
    const dropdownMenu = document.getElementById('dropdown-menu');
    if (dropdownMenu.classList.contains('show')) {
        dropdownMenu.classList.remove('show');
        setTimeout(() => dropdownMenu.style.display = 'none', 300);
    } else {
        dropdownMenu.style.display = 'flex';
        setTimeout(() => dropdownMenu.classList.add('show'), 10);
    }
}

function toggleWallet() {
    const walletDropdown = document.getElementById('wallet-dropdown');
    if (walletDropdown.classList.contains('show')) {
        walletDropdown.classList.remove('show');
        setTimeout(() => walletDropdown.style.display = 'none', 300);
    } else {
        walletDropdown.style.display = 'flex';
        setTimeout(() => walletDropdown.classList.add('show'), 10);
    }
    updateBalance();
}

function updateBalance() {
    const currentUser = localStorage.getItem('currentUser');
    const users = JSON.parse(localStorage.getItem('users'));
    if (currentUser && users[currentUser]) {
        document.getElementById('current-balance').textContent = users[currentUser].balance || 0;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const currentUser = localStorage.getItem('currentUser');
    const users = JSON.parse(localStorage.getItem('users'));
    if (currentUser && users[currentUser]) {
        document.getElementById('profile-photo').src = users[currentUser].photo || 'profile.jpg';
        document.getElementById('profile-name').textContent = `Name: ${users[currentUser].name}`;
        document.getElementById('profile-number').textContent = `Phone Number: ${users[currentUser].phoneNumber}`;
        document.getElementById('profile-id').textContent = `Active Member's ID: ${currentUser}`;
        document.getElementById('profile-email').textContent = `Email: ${users[currentUser].email || ''}`;
        updateBalance();
    }
});

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

function showAddMoney() {
    const password = prompt('You Need to Password to Add Money. Please Ask Password from Author of this Website Sigger Khan/tel:+916289997667 for Add Money! :');
    if (password !== '14111710') {
        alert('Incorrect password.');
        return;
    }
    
    const amount = prompt('Enter the amount to add:');
    if (amount !== null && !isNaN(amount) && amount > 0) {
        const currentUser = localStorage.getItem('currentUser');
        const users = JSON.parse(localStorage.getItem('users'));
        users[currentUser].balance = (users[currentUser].balance || 0) + parseInt(amount, 10);
        localStorage.setItem('users', JSON.stringify(users));
        
        alert(`${amount} has been added to your account.`);
        updateBalance();
    } else {
        alert('Invalid amount.');
    }
}

function showEditProfile() {
    const currentUser = localStorage.getItem('currentUser');
    const users = JSON.parse(localStorage.getItem('users'));
    
    if (currentUser && users[currentUser]) {
        document.getElementById('edit-profile-name').value = users[currentUser].name;
        document.getElementById('edit-profile-number').value = users[currentUser].phoneNumber;
        document.getElementById('edit-profile-email').value = users[currentUser].email || '';
    
        const editProfileForm = document.getElementById('edit-profile-form');
        editProfileForm.style.display = 'block';
        setTimeout(() => editProfileForm.classList.add('show'), 10);
    }
} 

function cancelEdit() {
    const editProfileForm = document.getElementById('edit-profile-form');
    editProfileForm.classList.remove('show');
    setTimeout(() => editProfileForm.style.display = 'none', 300);
}

function saveProfile() {
    const currentUser = localStorage.getItem('currentUser');
    const users = JSON.parse(localStorage.getItem('users'));

    if (currentUser && users[currentUser]) {
        const name = document.getElementById('edit-profile-name').value;
        const phoneNumber = document.getElementById('edit-profile-number').value;
        const email = document.getElementById('edit-profile-email').value;

        users[currentUser].name = name;
        users[currentUser].phoneNumber = phoneNumber;
        users[currentUser].email = email;

        // Handle profile photo upload
        const profilePhotoInput = document.getElementById('edit-profile-photo');
        if (profilePhotoInput.files && profilePhotoInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('profile-photo').src = e.target.result;
                users[currentUser].photo = e.target.result;
                localStorage.setItem('users', JSON.stringify(users));
            };
            reader.readAsDataURL(profilePhotoInput.files[0]);
        } else {
            localStorage.setItem('users', JSON.stringify(users));
        }

        document.getElementById('profile-name').textContent = `Name: ${name}`;
        document.getElementById('profile-number').textContent = `Phone Number: ${phoneNumber}`;
        document.getElementById('profile-email').textContent = `Email: ${email}`;

        // Close the edit profile form
        const editProfileForm = document.getElementById('edit-profile-form');
        editProfileForm.classList.remove('show');
        setTimeout(() => editProfileForm,style.display = 'none', 300);
    }
}

function removeProfileImage() {
    const profileImage = document.getElementById('profile-photo');
    const currentUser = localStorage.getItem('currentUser');
    const users = JSON.parse(localStorage.getItem('users'));

    if (currentUser && users[currentUser]) {
        delete users[currentUser].photo;
        localStorage.setItem('users', JSON.stringify(users));
        profileImage.src = 'AddIMG.png'; // Path to your default image
    }
}

// NEW: Show Winning History
function showWinningHistory() {
    const currentUser = localStorage.getItem('currentUser');
    const users = JSON.parse(localStorage.getItem('users'));

    if (currentUser && users[currentUser] && users[currentUser].history) {
        const historyBody = document.getElementById('history-body');
        historyBody.innerHTML = '';

        // Calculate the starting index for numbering
        const totalEntries = users[currentUser].history.length;

        // Loop through the history in reverse order to show the most recent wins at the top
        users[currentUser].history.slice().reverse().forEach((entry, index) => {
            const newRow = document.createElement('tr');

            const noCell = document.createElement('td');
            noCell.textContent = totalEntries - index;
            newRow.appendChild(noCell);

            const wonCell = document.createElement('td');
            wonCell.textContent = entry.item;
            newRow.appendChild(wonCell);

            if (entry.date) {
            const [date, time] = entry.date.split(', '); // Split date and time

            const timeCell = document.createElement('td');
            timeCell.textContent = time;
            newRow.appendChild(timeCell);

            const dateCell = document.createElement('td');
            dateCell.textContent = date;
            newRow.appendChild(dateCell);
        } else {
            const timeCell = document.createElement('td');
            timeCell.textContent = "NA/A";
            newRow.appendChild(timeCell);

            const dateCell = document.createElement('td');
            dateCell.textContent = "NA/A";
            newRow.appendChild(dateCell);
        }

            historyBody.appendChild(newRow);
        });

        const winningHistory = document.querySelector('.winning-history');
        winningHistory.style.display = 'block';
        setTimeout(() => winningHistory.classList.add('show'), 10);
    } else {
        console.log("No winning history available or user not found");
        alert('No winning history available.');
    }
}

function closeWinningHistory() {
    const winningHistory = document.querySelector('.winning-history');
    winningHistory.classList.remove('show');
    setTimeout(() => winningHistory.style.display = 'none', 300);
}
