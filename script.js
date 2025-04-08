function calculate() {
    // Очищаем сообщение об ошибке
    document.getElementById('error').innerHTML = '';

    // Получаем обязательные данные
    const fuelConsumption = parseFloat(document.getElementById('fuelConsumption').value);
    let startOdometer = parseInt(document.getElementById('startOdometer').value) || 0;
    let startFuel = parseInt(document.getElementById('startFuel').value) || 0;

    // Получаем вводимые данные
    let endOdometer = parseInt(document.getElementById('endOdometer').value) || null;
    let dailyMileage = parseInt(document.getElementById('dailyMileage').value) || null;
    let dailyFuelConsumption = parseFloat(document.getElementById('dailyFuelConsumption').value) || null;
    const refuel = parseInt(document.getElementById('refuel').value) || 0;

    // Проверяем, какие данные введены
    if (endOdometer !== null && dailyMileage === null && dailyFuelConsumption === null) {
        // Если введен только конечный спидометр
        dailyMileage = endOdometer - startOdometer;
        dailyFuelConsumption = (dailyMileage / 100) * fuelConsumption;
    } else if (dailyMileage !== null && endOdometer === null && dailyFuelConsumption === null) {
        // Если введен только пробег за день
        endOdometer = startOdometer + dailyMileage;
        dailyFuelConsumption = (dailyMileage / 100) * fuelConsumption;
    } else if (dailyFuelConsumption !== null && endOdometer === null && dailyMileage === null) {
        // Если введен только расход топлива за день
        dailyMileage = Math.round((dailyFuelConsumption / fuelConsumption) * 100);
        endOdometer = startOdometer + dailyMileage;
    }

    // Вычисляем остаток топлива
    let endFuel = startFuel - dailyFuelConsumption + refuel;

    // Проверяем на отрицательный остаток топлива
    if (endFuel < 0) {
        document.getElementById('error').innerHTML = 'Проверьте правильность ввода данных';
        return;
    }

    // Округляем значения до целых чисел
    endOdometer = Math.round(endOdometer);
    dailyMileage = Math.round(dailyMileage);
    endFuel = Math.round(endFuel);

    // Выводим результаты
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <p><strong>Показания спидометра при возвращении:</strong> ${endOdometer} км</p>
        <p><strong>Пробег за день:</strong> ${dailyMileage} км</p>
        <p><strong>Расход топлива за день:</strong> ${dailyFuelConsumption.toFixed(2)} л</p>
        <p><strong>Остаток топлива при возвращении:</strong> ${endFuel} л</p>
    `;

    // Обновляем обязательные данные для следующего расчета
    document.getElementById('startOdometer').value = endOdometer; // Округленное значение
    document.getElementById('startFuel').value = endFuel; // Округленное значение

    // Очищаем вводимые данные
    document.getElementById('endOdometer').value = '';
    document.getElementById('dailyMileage').value = '';
    document.getElementById('dailyFuelConsumption').value = '';
    document.getElementById('refuel').value = '';
}

function resetForm() {
    // Очищаем все поля формы
    document.getElementById('fuelConsumption').value = '';
    document.getElementById('startOdometer').value = '';
    document.getElementById('startFuel').value = '';
    document.getElementById('endOdometer').value = '';
    document.getElementById('dailyMileage').value = '';
    document.getElementById('dailyFuelConsumption').value = '';
    document.getElementById('refuel').value = '';
    document.getElementById('results').innerHTML = '';
    document.getElementById('error').innerHTML = '';
}