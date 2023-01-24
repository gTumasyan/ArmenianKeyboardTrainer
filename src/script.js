const input = document.querySelector("input");
const letters = Array.from(document.querySelectorAll("[data-letters]"));
const specs = Array.from(document.querySelectorAll("[data-spec]"));
const textExample = document.querySelector("#textExample");
const symbolsPerMinute = document.querySelector("#symbolsPerMinute");
const errorPercent = document.querySelector("#errorPercent");

const text =  "Արսենալ ակումբը հիմնվել է 1886 թվականին Լոնդոնի հարավ-արևելքում Վուլվիչում գտնվող Ռոյալ Արսենալ զինագործական գործարանի աշխատակիցների կողմից։ Սկզբում ակումբը կոչվում էր Դայալ Սքուեր։ Իր առաջին խաղը Արսենալը անցկացրել է 1886 թվականի դեկտեմբերի 11–ին Իսթերն Ուոնդերերսի դեմ։ Հաղթանակ տարան կանոնիրները 6։0 հաշվով։ Երկու շաբաթ անց Սուրբ Ծնունդի կապակցությամբ կազմակերպվել էր խաղացողների հավաք, որում որոշվել էր վերանվանել ակումբը Ռոյալ Արսենալ, ընտրվել էր խաղերի անցկացման վայրը և ֆուտբոլիստների մարզահագուստը։ Կարմիր գույնը առաջարկվել էր Նոթինգեմ Ֆորեսթի նախկին խաղացող Ֆրեդ Բիրդսլիի կողմից։ Պրոֆեսիոնալ ակումբի կարգավիճակ ստանալուց հետո՝ 1891 թվականին, այն վերանվանեցին Վուլվիչ Արսենալ։ Երկրպագուները ակումբը անվանում էին նաև Վուլվիչ Ռեդս։ Վուլիջ Արսենալը սկսեց հանդես գալ Անգլիայի ֆուտբոլային լիգայում 1893 թվականից սկսած և դարձավ այնտեղ հանդես եկող առաջին հարավային թիմը։ Ակումբը սկսեց մրցաշրջանը Երկրորդ դիվիզիոնում 1904 թվականին և դուրս եկավ Առաջին դիվիզիոն։ Սակայն աշխարհագրական հեռացվածության պատճառով ցածր էր խաղերի հաճախելությունը, որը բերեց ֆինանսական խնդիրների։ 1913 թվականին ակումբը անցավ Թեմզա գետը, որպեսզի զբաղեցնի նոր Հայբերի մարզադաշտը՝ տեղակայված Լոնդոնի հյուսիսում։ Թիմը անունից դուրս նետեց Վուլվիչը հաջորդ՝ 1914 թվականին։ 1919 թվականի մրցաշրջանը Արսենալը ավարտեց հինգերորդ հորիզոնականում, սակայն, այնուամենայնիվ, տեղափոխվեց Առաջին դիվիզիոն։ Բայց դիվիզիոնը Երկորրդում առաջին և երկրորդ տեղեր գրաված երկու թիմերի հաշվին մեծացնելու փոխարեն, Հենրի Նորրիսը կարողացավ համոզել Ջոն Մաքենային թողնել Լիգայի անդամների ընտրությանը այս կամ այն թիմի ճակատագիրը։ Թեկնածուները դրանցից մեկին յոթն էին, դրանց թվում՝ Արսենալը Տոտենհեմ Հոտսպուր, Բարնսլի և Վուլվերհեմփթոնը: Մաքենան Արսենալի կողմից եկավ՝ հաստատելով, որ այս ակումբը լուրջ արժանիքներ ունի Լիգայում ներկայացնելու համար և հիշեցրեց, որ Արսենալը Ֆուտբոլային լիգայում 15 տարի ավելի է խաղում, քան Տոտենհեմը։ Քվեարկությամբ հաղթեց Արսենալը։ Մյուս ուղեգիրները ստացան Չելսին, Դերբին և Պրեստոնը: Այս պատմությունը հիմք դարձավ Արսենալի և Տոտենհեմի հավերժ հակամարտության, իսկ կանոնիրները այդ ժամանակվանից այլևս երբեք չլքեցին Անգլիայի առաջնության բարձրագույն դիվիզիոնը։";

 
const party = createParty(text);

init();

function init() {
  input.addEventListener("keydown", keydownHandler);
  input.addEventListener("keyup", keyupHandler);

  viewUpdate();
}

function keydownHandler(event) {
  event.preventDefault();

  const letter = letters.find((x) => x.dataset.letters.includes(event.key));

  if (letter) {
    letter.classList.add("pressed");
    press(event.key);
    return;
  }

  let key = event.key.toLowerCase();

  if (key === " ") {
    key = "space";
    press(" ");
  }

  if (key === "enter") {
    press("\n");
  }

  const ownSpecs = specs.filter((x) => x.dataset.spec === key);

  if (ownSpecs.length) {
    ownSpecs.forEach((spec) => spec.classList.add("pressed"));
    return;
  }

  console.warn("Не известный вид клавиши.", event);
}

function keyupHandler(event) {
  event.preventDefault();

  const letter = letters.find((x) => x.dataset.letters.includes(event.key));

  if (letter) {
    letter.classList.remove("pressed");

    return;
  }

  let key = event.key.toLowerCase();

  if (key === " ") {
    key = "space";
  }

  const ownSpecs = specs.filter((x) => x.dataset.spec === key);

  if (ownSpecs.length) {
    ownSpecs.forEach((spec) => spec.classList.remove("pressed"));
    return;
  }
}

function createParty(text) {
  const party = {
    text,
    strings: [],
    maxStringLength: 70,
    maxShowStrings: 3,
    currentStringIndex: 0,
    currentPressedIndex: 0,
    errors: [],
    started: false,

    statisticFlag: false,
    timerCounter: 0,
    startTimer: 0,
    errorCounter: 0,
    commonCounter: 0,
  };

  party.text = party.text.replace(/\n/g, "\n ");
  const words = party.text.split(" ");

  let string = [];
  for (const word of words) {
    const newStringLength =
      [...string, word].join(" ").length + !word.includes("\n");

    if (newStringLength > party.maxStringLength) {
      party.strings.push(string.join(" ") + " ");
      string = [];
    }

    string.push(word);

    if (word.includes("\n")) {
      party.strings.push(string.join(" "));
      string = [];
    }
  }

  if (string.length) {
    party.strings.push(string.join(" "));
  }

  return party;
}

function press(letter) {
  party.started = true;

  if (!party.statisticFlag) {
    party.statisticFlag = true;
    party.startTimer = Date.now();
  }

  const string = party.strings[party.currentStringIndex];
  const mustLetter = string[party.currentPressedIndex];

  if (letter === mustLetter) {
    party.currentPressedIndex++;

    if (string.length <= party.currentPressedIndex) {
      party.currentPressedIndex = 0;
      party.currentStringIndex++;

      party.statisticFlag = false;
      party.timerCounter = Date.now() - party.startTimer;
    }
  } else if (!party.errors.includes(mustLetter)) {
    party.errors.push(mustLetter);
    party.errorCounter++;
  }

  party.commonCounter++;

  viewUpdate();
}

function viewUpdate() {
  const string = party.strings[party.currentStringIndex];

  const showedStrings = party.strings.slice(
    party.currentStringIndex,
    party.currentStringIndex + party.maxShowStrings
  );

  const div = document.createElement("div");

  const firstLine = document.createElement("div");
  firstLine.classList.add("line");
  div.append(firstLine);

  const done = document.createElement("span");
  done.classList.add("done");
  done.textContent = string.slice(0, party.currentPressedIndex);
  firstLine.append(
    done,
    ...string
      .slice(party.currentPressedIndex)
      .split("")
      .map((letter) => {
        if (letter === " ") {
          return "_";
        }

        if (letter === "\n") {
          return "¶";
        }

        if (party.errors.includes(letter)) {
          const errorSpan = document.createElement("span");
          errorSpan.classList.add("hint");
          errorSpan.textContent = letter;
          return errorSpan;
        }

        return letter;
      })
  );

  for (let i = 1; i < showedStrings.length; i++) {
    const line = document.createElement("div");
    line.classList.add("line");
    div.append(line);

    line.append(
      ...showedStrings[i].split("").map((letter) => {
        if (letter === " ") {
          return "_";
        }

        if (letter === "\n") {
          return "¶";
        }

        if (party.errors.includes(letter)) {
          const errorSpan = document.createElement("span");
          errorSpan.classList.add("hint");
          errorSpan.textContent = letter;
          return errorSpan;
        }

        return letter;
      })
    );
  }

  textExample.innerHTML = "";
  textExample.append(div);

  input.value = string.slice(0, party.currentPressedIndex);

  if (!party.statisticFlag && party.started) {
    symbolsPerMinute.textContent = Math.round(
      (60000 * party.commonCounter) / party.timerCounter
    );

    errorPercent.textContent =
      Math.floor((10000 * party.errorCounter) / party.commonCounter) / 100 +
      "%";
  }
}
