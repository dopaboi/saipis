console.log("Скрипт успешно загружен");

$(document).ready(function() {
	$("#submitButton").click(() => {
        console.log("Отправка данных из формы");
        const text = $("#array").val();
        $("#array").val("");
		$.ajax({
			url: '/',
			method: 'POST',
			data: { "arr": text },
			success: () => {
				console.log("Запрос прошёл");
			},
			error: () => {
				console.log("Ошибка запроса");
			}
		});
	});
			
	$("#buttonShowOriginal").click(() => {
		console.log("Показ первоначального массива");
		$.ajax({
			url: '/original',
			success: (data) => {
				$("#originalArray").text(data);
				console.log("Запрос прошёл");
			},
			error: () => {
				console.log("Ошибка запроса");
			}
		});
    });
    
    $("#buttonShowFixed").click(() => {
		console.log("Показ изменённого массива");
		$.ajax({
			url: '/fixed',
			success: (data) => {
				$("#fixedArray").text(data);
				console.log("Показан изменённый массив");
			},
			error: () => {
				console.log("Ошибка");
			}
		});
	});
});