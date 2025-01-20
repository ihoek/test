//변수 선언
let data_map = [];
let cnt = 0;

const id_input = document.getElementById("id_input");
const name_input = document.getElementById("name_input");
const age_input = document.getElementById("age_input");
const career_input = document.getElementById("career_input");
const nickname_input = document.getElementById("nickname_input");

const error_id = document.getElementById("error_id");
const error_name = document.getElementById("error_name");
const error_age = document.getElementById("error_age");
const error_career = document.getElementById("error_career");
const error_nickname = document.getElementById("error_nickname");

//중복 확인용 배열
let id_arr = [];
let nickname_arr = [];

let ls = window.localStorage.getItem("_data", data_map);

//버튼
const save_btn = document.getElementById("save");

//window 로드 이벤트
window.onload = function () {
  //데이터 로드 시 값이 존재하는 지 확인하기
  if (ls === null) {
    //값이 존재하지 않을 경우
    console.log("로드 시 값이 없음");
  } else {
    console.log("로드 시 값이 존재 함");
    //console.log(typeof ls); //스트링

    for (let j in JSON.parse(ls)) {
      data_map.push(JSON.parse(ls)[j]);
      id_arr.push(data_map[j]._id);

      //row 생성
      const tr = document.createElement("tr");
      for (let i = 0; i < 4; i++) {
        const td = document.createElement("td");
        switch (i) {
          case 0:
            td.innerText = data_map[j].name;
            break;

          case 1:
            td.innerText = data_map[j].age;
            break;

          case 2:
            td.innerText = data_map[j].career;
            break;

          case 3:
            td.innerText = data_map[j].nickname;
            nickname_arr.push(data_map[j].nickname);
            break;
        }

        tr.appendChild(td);
        table.appendChild(tr);
      }
    }
  }
};

//버튼 클릭 시 이벤트
save_btn.addEventListener("click", () => {
  //local Storage get
  window.localStorage.getItem("_data", JSON.stringify(data_map));

  let infoData = {
    _id: id_input.value,
    name: name_input.value,
    age: age_input.value,
    career: career_input.value,
    nickname: nickname_input.value,
  };
  data_map.push(infoData);
  //console.log(id_input.value); //현재 input에 입력한 값
  //console.log(JSON.parse(data_map));

  //중복 값 확인
  let ck_id = id_input.value;
  let ck_nick = nickname_input.value;

  id_arr.push(infoData._id);
  nickname_arr.push(infoData.nickname);

  //조건에 맞게 입력하지 않았을 경우
  if (
    id_arr.slice(0, id_arr.length - 1).includes(ck_id) === true ||
    nickname_arr.slice(0, nickname_arr.length - 1).includes(ck_nick) === true ||
    career_input.value.length < 15 ||
    nickname_input.value < 2
  ) {
    //이미 입력된 값이라면
    if (id_arr.slice(0, id_arr.length - 1).includes(ck_id) === true) {
      error_id.innerText = "아이디를 중복 입력하셨습니다.";
    } else if (
      nickname_arr.slice(0, nickname_arr.length - 1).includes(ck_nick) === true
    ) {
      error_nickname.innerText = "별명을 중복 입력하셨습니다.";
    } else if (career_input.value.length < 15) {
      error_career.innerText = "15자 이상으로 입력하시오.";
    } else if (nickname_input.value < 2) {
      error_career.innerText = "2자 이상으로 입력하시오.";
    }

    id_input.value = null;
    name_input.value = null;
    age_input.value = null;
    career_input.value = null;
    nickname_input.value = null;
  } else {
    //row 생성
    const tr = document.createElement("tr");
    for (let i = 0; i < 4; i++) {
      const td = document.createElement("td");
      switch (i) {
        case 0:
          td.innerText = infoData.name;
          break;

        case 1:
          td.innerText = infoData.age;
          break;

        case 2:
          td.innerText = infoData.career;
          break;

        case 3:
          td.innerText = infoData.nickname;
          break;
      }

      tr.appendChild(td);
      table.appendChild(tr);

      id_input.value = null;
      name_input.value = null;
      age_input.value = null;
      career_input.value = null;
      nickname_input.value = null;
    }
    cnt++;

    //local Storage set
    window.localStorage.setItem("_data", JSON.stringify(data_map));
  }
});

//table
const main = document.querySelector(".main-wrap");
const table = document.createElement("table");

const header_list = ["이름", "나이", "커리어", "별명"];

const tr = document.createElement("tr");
for (let i = 0; i < 4; i++) {
  const td = document.createElement("td");
  td.innerText = header_list[i];
  tr.appendChild(td);
  table.appendChild(tr);
}
main.appendChild(table);
