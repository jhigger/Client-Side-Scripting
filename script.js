// Sidenav Initialization
const sideNav = document.querySelectorAll('.sidenav');
M.Sidenav.init(sideNav, {});

// Scrollspy Initialization
const scrollSpy = document.querySelectorAll('.scrollspy');
M.ScrollSpy.init(scrollSpy, {});

// Click button on Enter
// Get the input field
const input = document.getElementById('input');
// Execute a function when the user releases a key on the keyboard
input.addEventListener('keyup', function (event) {
	// Number 13 is the "Enter" key on the keyboard
	if (event.keyCode === 13) {
		// Cancel the default action, if needed
		event.preventDefault();
		// Trigger the button element with a click
		document.getElementById('go').click();
	}
});

// API
function searchByName() {
	// Get data from search bar
	const input = document.getElementById('input').value;
	// Search data using api
	fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`)
		.then((res) => {
			// Clear results area first
			document.getElementById('results').innerHTML = '';

			if (res.ok) {
				// Goes to next '.then' if successful
				return res.json();
			}
		})
		// Goes here if success
		.then((data) => {
			// If result from API is not empty
			if (data.drinks != null) {
				// console.log(data.drinks)

				// Create html element for each drink and add it to results area
				data.drinks.forEach((drink) => {
					// Make list for every drink
					const ul = document.createElement('ul');
					ul.setAttribute('class', 'collapsible popout');

					const li = document.createElement('li');
					ul.appendChild(li);

					// Header
					const div1 = document.createElement('div');
					div1.setAttribute('class', 'collapsible-header grey darken-2');
					// Drink name
					div1.innerText = drink.strDrink;
					li.appendChild(div1);

					// Body
					const div2 = document.createElement('div');
					div2.setAttribute('class', 'collapsible-body row');
					li.appendChild(div2);

					// Image
					const img = document.createElement('img');
					img.setAttribute('class', 'circle responsive-img col s5');
					img.setAttribute('src', drink.strDrinkThumb);
					div2.appendChild(img);

					// Ingredients
					const span = document.createElement('span');
					span.setAttribute('class', 'flow-text col s7');
					span.innerHTML = 'Ingredients:<hr>';
					for (let i = 1; drink['strIngredient' + i] != null; i++) {
						span.innerHTML += `<br>${i}. ${drink['strIngredient' + i]}`;
					}
					div2.appendChild(span);

					document.getElementById('results').appendChild(ul);
					// Scroll 200pixels down
					window.scroll(0, 200);

					// Collapsible Initialization
					const collapsible = document.querySelectorAll('.collapsible');
					M.Collapsible.init(collapsible, {});
				});
			} else {
				// display toast for 3seconds if search result is empty
				M.toast({html: 'Item not found', displayLength: 3000});
			}
		});
}
