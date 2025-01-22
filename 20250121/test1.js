//변수 선언
let data_map = [];

let error_check = false; //false 정상적인 값 true 오류난 값(이때 버튼 비활성화할 것)
let btn_active = [false, false, false, false];
let modify_cnt = 0; //수정 버튼 클릭 여부
let position_ck = 0;

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

//버튼
const save_btn = document.getElementById("save");

//중복 확인용 배열
let id_arr = [];
let nickname_arr = [];

let ls = window.localStorage.getItem("_data", data_map);

//window 로드 이벤트
window.onload = function () {
  save_btn.disabled = true; // 비활성화
  //데이터 로드 시 값이 존재하는 지 확인하기
  if (ls === null) {
    //값이 존재하지 않을 경우
    console.log("로드 시 값이 없음");
  } else {
    console.log("로드 시 값이 존재 함");
    //console.log(typeof ls); //스트링
    console.log("로드 시 값 (JSON.parse(ls)): ", JSON.parse(ls));
    for (let j in JSON.parse(ls)) {
      data_map.push(JSON.parse(ls)[j]);
      id_arr.push(data_map[j]._id);
      position_ck++;
      //관리 버튼
      const modify_btn = document.createElement("button");
      const delete_btn = document.createElement("button");
      //row 생성
      const tr = document.createElement("tr");

      const td_name = document.createElement("td");
      const td_age = document.createElement("td");
      const td_career = document.createElement("td");
      const td_nickname = document.createElement("td");
      const td_management = document.createElement("td");

      td_name.innerText = data_map[j].name;
      td_age.innerText = data_map[j].age;
      td_career.innerText = data_map[j].career;
      td_nickname.innerText = data_map[j].nickname;
      nickname_arr.push(data_map[j].nickname);

      modify_btn.innerText = "수정";
      delete_btn.innerText = "삭제";

      td_management.appendChild(modify_btn);
      td_management.appendChild(delete_btn);

      tr.appendChild(td_name);
      tr.appendChild(td_age);
      tr.appendChild(td_career);
      tr.appendChild(td_nickname);
      tr.appendChild(td_management);

      let sub_input = document.createElement("input");
      let innerinput = data_map[j].career;
      let modify_inner = sub_input.vaule;

      modify_btn.addEventListener("click", () => {
        if (modify_cnt === 0) {
          modify_btn.innerText = "수정완료";
          td_career.innerText = "";
          sub_input.setAttribute("value", innerinput);
          modify_inner = sub_input.vaule;
          td_career.appendChild(sub_input);

          modify_cnt = 1;
        } else {
          modify_btn.innerText = "수정";
          modify_inner = sub_input.value;
          td_career.innerText = modify_inner;
          console.log("modify_inner", modify_inner);
          //JSON.stringify(list_data)[position_ck - 1].career = modify_inner;
          data_map[position_ck - 1].career = modify_inner;
          console.log(data_map);
          window.localStorage.setItem("_data", JSON.stringify(data_map));
          modify_cnt = 0;
        }
      });

      delete_btn.addEventListener("click", () => {
        console.log("delete_btn click");

        console.log(
          "data_map[position_ck - 1]",
          typeof data_map[position_ck - 1].name
        );
        //JSON.parse(data_map).splice(position_ck, 1);
        //console.log("data_map.splice(position_ck, 1)");
        //JSON.stringify("_data", data_map);

        data_map = data_map.filter(
          (e) => e.name !== data_map[position_ck - 1].name
        );
        console.log(data_map);
        window.localStorage.setItem("_data", JSON.stringify(data_map));
        table.removeChild(tr);
        position_ck--;
        return;
        console.log("set 전 data_map", data_map);
        window.localStorage.setItem("_data", JSON.stringify(data_map));
        console.log("data_map", data_map);

        //테이블에서의 삭제

        //스토리지에서도 삭제할것

        /*
        해당 행 삭제
        1.현재 행의 위치 파악하기 - id로 파악하기
        2.행의 값을 삭제 이후 값이 바로 위로 올라오게 하기 - 지워진 로컬 스토리지로 테이블 재생성?
        */
      });
      table.appendChild(tr);
      console.log("로드 시 값 (data_map): ", data_map);
    }
  }
};

//입력 중 출력 함수
function printId() {
  const content = document.getElementById("id_input").value;
  if (id_arr.slice(0, id_arr.length).includes(content) === true) {
    document.getElementById("error_id").innerText =
      "동일한 id값을 입력하셨습니다";
    btn_active[0] = false;
  } else {
    document.getElementById("error_id").innerText = "";
    btn_active[0] = true;
  }

  if (btn_active.indexOf(false) === -1) {
    //모두 활성화인 경우
    save_btn.disabled = false; // 활성화
  } else {
    save_btn.disabled = true; // 비활성화
  }
  //console.log("btn_active[0]", btn_active[0]);
}
function printAge() {
  if (parseInt(age_input.value) > 150) {
    document.getElementById("error_age").innerText = "150살 이하로 작성하시오.";
    btn_active[1] = false;
    //console.log("버튼 비활성화 실행 중");
  } else {
    document.getElementById("error_age").innerText = "";
    btn_active[1] = true;
    //console.log("버튼 활성화 실행 중");
  }

  if (btn_active.indexOf(false) === -1) {
    save_btn.disabled = false; // 활성화
  } else {
    save_btn.disabled = true; // 비활성화
  }
  //console.log("btn_active[1]", btn_active[1]);
}
function printCareer() {
  if (career_input.value.length < 15) {
    document.getElementById("error_career").innerText =
      "15자 이상으로 작성하시오.";
    btn_active[2] = false;
  } else {
    document.getElementById("error_career").innerText = "";
    btn_active[2] = true;
  }

  if (btn_active.indexOf(false) === -1) {
    save_btn.disabled = false; // 활성화
  } else {
    save_btn.disabled = true; // 비활성화
  }
  //console.log("btn_active[2]", btn_active[2]);
}
function printNickName() {
  const content = document.getElementById("nickname_input").value;
  if (nickname_arr.slice(0, nickname_arr.length).includes(content) === true) {
    document.getElementById("error_nickname").innerText =
      "별명을 중복 입력하셨습니다.";
    btn_active[3] = false;
  } else if (nickname_input.value.length < 2) {
    document.getElementById("error_nickname").innerText =
      "2자 이상으로 입력하시오.";
    btn_active[3] = false;
  } else {
    document.getElementById("error_nickname").innerText = "";
    btn_active[3] = true;
  }

  if (btn_active.indexOf(false) === -1) {
    //false 찾지 못한 경우 즉, 모두 True인 경우
    save_btn.disabled = false; // 활성화
  } else {
    save_btn.disabled = true; // 비활성화
  }
  //console.log("btn_active[3]", btn_active[3]);
}

//버튼 클릭 시 이벤트
save_btn.addEventListener("click", () => {
  console.log("버튼 실행중");
  save_btn.disabled = true; // 비활성화
  btn_active = [false, false, false, false];

  //local Storage get
  window.localStorage.getItem("_data", JSON.stringify(data_map));

  error_id.value = "";
  error_age.value = "";
  error_name.value = "";
  error_career.value = "";
  error_nickname.value = "";

  let infoData = {
    _id: id_input.value,
    name: name_input.value,
    age: age_input.value,
    career: career_input.value,
    nickname: nickname_input.value,
    po_ck: position_ck,
  };

  data_map.push(infoData);

  //중복 값 확인
  let ck_id = id_input.value;
  let ck_nick = nickname_input.value;
  //console.log("if문 들어오기전 data", data_map);
  //console.log("if문 들어오기전 data_map[0]", data_map[0]);
  if (
    id_arr.slice(0, id_arr.length).includes(ck_id) === true ||
    nickname_arr.slice(0, nickname_arr.length).includes(ck_nick) === true ||
    career_input.value.length < 15 ||
    nickname_input.value.length < 2 ||
    parseInt(age_input.value) > 150
  ) {
    //이미 입력된 값이라면
    if (id_arr.slice(0, id_arr.length).includes(ck_id) === true) {
      error_id.innerText = "아이디를 중복 입력하셨습니다.";
    } else {
      error_id.innerText = "";
    }
    if (nickname_arr.slice(0, nickname_arr.length).includes(ck_nick) === true) {
      error_nickname.innerText = "별명을 중복 입력하셨습니다.";
    } else if (nickname_input.value.length < 2) {
      error_nickname.innerText = "2자 이상으로 입력하시오.";
    } else {
      error_nickname.innerText = "";
    }

    if (career_input.value.length < 15) {
      error_career.innerText = "15자 이상으로 입력하시오.";
    } else {
      error_career.innerText = "";
    }

    if (parseInt(age_input.value) > 150) {
      error_age.innerText = "150살 이하로 작성하시오.";
    } else {
      error_age.innerText = "";
    }

    //로컬 스토리지에 저장된 값 삭제
    data_map.pop();
  } else {
    //console.log(data_map);
    id_arr.push(infoData._id);
    nickname_arr.push(infoData.nickname);
    position_ck++;

    error_id.innerText = "";
    error_age.innerText = "";
    error_name.innerText = "";
    error_career.innerText = "";
    error_nickname.innerText = "";

    //row 생성
    const tr = document.createElement("tr");

    const td_name = document.createElement("td");
    const td_age = document.createElement("td");
    const td_career = document.createElement("td");
    const td_nickname = document.createElement("td");
    const td_management = document.createElement("td");

    //관리 버튼
    const modify_btn = document.createElement("button");
    const delete_btn = document.createElement("button");

    // 버튼 id 값 삽입
    modify_btn.id = `modify${position_ck}`;
    delete_btn.id = `delete${position_ck}`;

    //row 내용 삽입
    td_name.innerText = infoData.name;
    td_age.innerText = infoData.age;
    td_career.innerText = infoData.career;
    td_nickname.innerText = infoData.nickname;

    //버튼 글자 삽입
    modify_btn.innerText = "수정";
    delete_btn.innerText = "삭제";
    td_management.appendChild(modify_btn);
    td_management.appendChild(delete_btn);

    //row 값 삽입
    tr.appendChild(td_name);
    tr.appendChild(td_age);
    tr.appendChild(td_career);
    tr.appendChild(td_nickname);
    tr.appendChild(td_management);

    table.appendChild(tr);

    id_input.value = "";
    name_input.value = "";
    age_input.value = "";
    career_input.value = "";
    nickname_input.value = "";

    //local Storage set
    window.localStorage.setItem("_data", JSON.stringify(data_map));

    //class 삽입
    let sub_input = document.createElement("input");
    let innerinput = infoData.career;
    let modify_inner = sub_input.vaule;

    modify_btn.addEventListener("click", () => {
      console.log(`modify${infoData.po_ck}번째 버튼 실행중`);
      if (modify_cnt === 0) {
        console.log("modify_btn click");

        modify_btn.innerText = "수정완료";
        td_career.innerText = "";
        sub_input.setAttribute("value", innerinput);
        modify_inner = sub_input.vaule;
        td_career.appendChild(sub_input);

        modify_cnt = 1;
      } else {
        modify_btn.innerText = "수정";
        modify_inner = sub_input.value;
        td_career.innerText = modify_inner;
        console.log("modify_inner", modify_inner);
        console.log("position_ck", position_ck);
        //JSON.stringify(list_data)[position_ck - 1].career = modify_inner;
        //data_map[infoData.po_ck - 1].career = modify_inner;

        data_map[position_ck - 1].career = modify_inner;
        console.log(
          "data_map[position_ck].career",
          data_map[position_ck - 1].career
        );
        console.log(data_map);
        window.localStorage.setItem("_data", JSON.stringify(data_map));
        modify_cnt = 0;
      }
    });

    delete_btn.addEventListener("click", () => {
      console.log("delete_btn click");

      console.log("infoData._id", infoData._id);
      //JSON.parse(data_map).splice(position_ck, 1);
      //console.log("data_map.splice(position_ck, 1)");
      //JSON.stringify("_data", data_map);

      data_map = data_map.filter((e) => e._id !== infoData._id);
      id_arr = id_arr.filter((e) => e !== infoData._id);
      nickname_arr = nickname_arr.filter((e) => e !== infoData.nickname);
      //console.log("id_arr", id_arr);
      //console.log(data_map);
      window.localStorage.setItem("_data", JSON.stringify(data_map));
      table.removeChild(tr);
      position_ck--;
    });
  }
});

//table
const main = document.querySelector(".main-wrap");
const table = document.createElement("table");

const header_list = ["이름", "나이", "커리어", "별명", "관리"];

const tr = document.createElement("tr");
for (let i = 0; i < 5; i++) {
  const td = document.createElement("td");
  td.innerText = header_list[i];
  tr.appendChild(td);
  table.appendChild(tr);
}
main.appendChild(table);
