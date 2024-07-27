function generateTable() {
    var inputText = document.getElementById("inputText").value;
    var fontSize = document.getElementById("fontSizeSelect").value;
    var fontFamily = document.getElementById("fontFamilySelect").value;
    var words = inputText.split(/\s+/);

    // 새 창 열기
    var newWindow = window.open('', '', 'width=210mm,height=297mm,scrollbars=yes');

    newWindow.document.open();
    newWindow.document.write(`
        <html>
        <head>
            <title>텍스트 출력</title>
            <style>
                @page {
                    size: A4;
                    margin: 0;
                }
                body {
                    margin: 0;
                    padding: 20px;
                    font-family: ${fontFamily};
                    width: 210mm;
                    height: 297mm;
                    box-sizing: border-box;
                }
                .container {
                    display: flex;
                    flex-wrap: wrap;
                    margin: 0; /* 셀 간의 간격 제거 */
                    padding: 0; /* 셀 간의 패딩 제거 */
                }
                .textbox {
                    width: 16.6%; /* 6개의 셀이 동일한 너비를 가지도록 설정 */
                    box-sizing: border-box;
                    margin: 0; /* 텍스트 박스 간의 간격 제거 */
                    padding: 0; /* 텍스트 박스의 패딩 제거 */
                    font-family: ${fontFamily}; /* 폰트 패밀리 적용 */
                }
                .color-1 {
                    color: black;
                }
                .color-2 {
                    color: #d3d3d3 !important; /* 아주 연한 회색 */
                }
                .color-3 {
                    color: #d3d3d3 !important; /* 아주 연한 회색 */
                }
                .color-4 {
                    color: #d3d3d3 !important; /* 아주 연한 회색 */
                }
                .color-5 {
                    color: white;
                }
                .color-6 {
                    color: white;
                }
                textarea {
                    width: 100%;
                    height: ${parseInt(fontSize) + 10}px; /* 폰트 크기보다 10px 더 길게 설정 */
                    border: 1px solid black;
                    font-size: ${fontSize}px;
                    font-weight: bold;
                    white-space: nowrap; /* 줄바꿈 방지 */
                    overflow: hidden; /* 넘치는 텍스트 숨기기 */
                    background-color: transparent; /* 배경 투명 */
                    resize: none; /* 크기 조절 방지 */
                    text-align: center; /* 텍스트 수평 가운데 정렬 */
                    display: flex; /* 플렉스 박스로 설정 */
                    align-items: center; /* 수직 가운데 정렬 */
                    justify-content: center; /* 수평 가운데 정렬 */
                    box-sizing: border-box; /* 여백을 포함하여 너비 계산 */
                    padding: 0; /* 패딩 없음 */
                    color: inherit; /* 부모 요소의 글자 색상 상속 */
                    font-family: ${fontFamily}; /* 폰트 패밀리 적용 */
                }
                .break {
                    flex-basis: 100%; /* 줄바꿈을 위해 전체 너비 차지 */
                    height: ${parseInt(fontSize) *0.1}px; /* 텍스트 박스의 높이와 동일한 높이 설정 */
                }
            </style>
        </head>
        <body>
            <div class="container">
    `);

    // 첫 번째 셀의 너비를 측정하기 위한 임시 변수
    var firstCellWidth = null;

    // 단어별로 개별 텍스트 박스 생성
    words.forEach(function(word) {
        var row = '<div class="container">';
        for (var i = 0; i < 6; i++) {
            var colorClass = 'color-' + (i + 1);
            var cellContent = '';

            if (i < 4) {
                if (i === 0) {
                    cellContent = word;
                    // 첫 번째 셀의 너비를 계산
                    firstCellWidth = fontSize * word.length * 1.5; // 한글에 맞게 너비를 조정
                    row += `<div class="textbox ${colorClass}" style="width: ${firstCellWidth}px;"><textarea readonly>${cellContent}</textarea></div>`;
                } else {
                    cellContent = word;
                    row += `<div class="textbox ${colorClass}" style="width: ${firstCellWidth}px;"><textarea readonly>${cellContent}</textarea></div>`;
                }
            } else {
                // 다섯 번째와 여섯 번째 셀은 첫 번째 셀의 너비와 같도록 설정
                row += `<div class="textbox ${colorClass}" style="width: ${firstCellWidth}px;"><textarea readonly></textarea></div>`;
            }
        }
        row += '</div>';
        newWindow.document.write(row);

        // 여섯 번째 셀 이후에 줄바꿈 추가
        newWindow.document.write('<div class="break"></div>');
    });

    newWindow.document.write('</body></html>');
    newWindow.document.close();
}
