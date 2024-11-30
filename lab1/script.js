$(document).ready(function () {
    let questions = [];

    // โหลดข้อมูลข้อสอบจากไฟล์ JSON
    $.getJSON("questions.json", function (data) {
        questions = data;
        renderQuestions();
    });

    // ฟังก์ชันแสดงคำถามทั้งหมด
    function renderQuestions() {
        const quizContainer = $("#quiz-container");
        quizContainer.empty(); // ลบข้อมูลเก่า

        questions.forEach((question, index) => {
            const questionHtml = `
                <div class="mb-6">
                    <h3 class="font-bold">${index + 1}. ${question.question}</h3>
                    ${question.choices.map((choice, choiceIndex) => `
                        <div>
                            <input type="radio" name="q${index}" value="${choiceIndex}" id="q${index}_c${choiceIndex}">
                            <label for="q${index}_c${choiceIndex}">${choice}</label>
                        </div>
                    `).join('')}
                </div>
            `;
            quizContainer.append(questionHtml);
        });
    }

    // ตรวจสอบคำตอบเมื่อกดปุ่ม "ตรวจคำตอบ"
    $("#quiz-form").submit(function (e) {
        e.preventDefault();

        let score = 0;

        questions.forEach((question, index) => {
            const selectedAnswer = $(`input[name="q${index}"]:checked`).val();
            if (selectedAnswer == question.answer) {
                score++;
            }
        });

        // แสดงผลลัพธ์
        $("#result-screen").removeClass("hidden");
        $("#score").text(`คุณได้คะแนน ${score} / ${questions.length}`);
    });
});
