const weight = document.getElementById('Weigh');
const height = document.getElementById('heigh');
const result = document.getElementById('result');
const buttons = document.getElementsByClassName('button');

Array.from(buttons).forEach(function (button) {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        const h = parseFloat(height.value);
        const w = parseFloat(weight.value);

        if (!h || !w) {
            result.innerHTML = "Please enter valid height and weight";
            return;
        }

        const heightInMeter = h / 100;
        const bmi = w / (heightInMeter * heightInMeter);

        console.log("Your BMI is: " + bmi.toFixed(2));

        if (bmi < 18.6) {
            result.innerHTML = "Your BMI is " + bmi.toFixed(2);
            result.append(" - Under Weight");
            document.body.style.backgroundColor = 'yellow';
            result.style.color = "black";
            result.style.fontSize = "22px";
            console.log("underweight");
        } else if (bmi >= 18.6 && bmi <= 24.9) {
            result.innerHTML = "Your BMI is " + bmi.toFixed(2);
            result.append(" - Normal Weight");
            document.body.style.backgroundColor = 'green';
            result.style.color = "black";
            result.style.fontSize = "22px";
            console.log("normal weight");
        } else {
            result.innerHTML = "Your BMI is " + bmi.toFixed(2);
            result.append(" - Overweight");
            document.body.style.backgroundColor = 'red';
            result.style.color = "black";
            result.style.fontSize = "22px";
            console.log("overweight");
        }
    });
});
