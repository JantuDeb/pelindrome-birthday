const inputDOB = document.getElementById("dob")
const inputNumber = document.getElementById("luckyNumber")
const buttonCheck = document.getElementById("check")
const messageText = document.querySelector(".message")
const imgLoading = document.querySelector(".loading")

function isLeapYear(year) {
    if ((year % 400 == 0) && (year % 100 != 0) || (year % 4 == 0)) return true;
    return false;
}

function getPreviousDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (day === 0) {
        month--;

        if (month === 0) {
            month = 12;
            day = 31;
            year--;
        } else if (month === 2) {
            if (isLeapYear(year)) {
                day = 29;
            } else {
                day = 28;
            }
        } else {
            day = daysInMonth[month - 1];
        }
    }

    return {
        day: day,
        month: month,
        year: year,
    };
}

function getPreviousPalindromeDate(date) {
    let prevDate = getPreviousDate(date);
    let count = 0;
    while (1) {
        count++;
        let prevtDateString = getDateStringObject(prevDate)
        let dateArray = getDateStringInAllFormat(prevtDateString);
        let result = checkPelindromeForAllFormat(dateArray);
        if (result) return [count, prevtDateString]
        prevDate = getPreviousDate(prevDate);
    }
}

function getNextDate(date) {
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;

    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year,
    };
}


function getNextPalindromeDate(date) {
    let nextDate = getNextDate(date);
    let count = 0;
    while (1) {
        count++;
        let nextDateString = getDateStringObject(nextDate)
        let dateArray = getDateStringInAllFormat(nextDateString);
        let result = checkPelindromeForAllFormat(dateArray);
        if (result) return [count, nextDateString]
        nextDate = getNextDate(nextDate);
    }
}


function isPelindrome(str) {
    return str === str.split('').reverse().join('');
}


function getDateStringObject(date) {

    let dateObj = { day: "", month: "", year: "" }
    if (date.day < 10) {
        dateObj.day = "0" + date.day
    } else {
        dateObj.day = date.day.toString()
    }
    if (date.month < 10) {
        dateObj.month = "0" + date.month
    } else {
        dateObj.month = date.month.toString()
    }
    dateObj.year = date.year.toString()
    return dateObj
}

function getDateStringInAllFormat(date) {

    var ddmmyyyy = date.day + date.month + date.year;
    var mmddyyyy = date.month + date.day + date.year;
    var yyyymmdd = date.year + date.month + date.day;
    var ddmmyy = date.day + date.month + date.year.slice(-2);
    var mmddyy = date.month + date.day + date.year.slice(-2);
    var yyddmm = date.year.slice(-2) + date.day + date.month;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}


function checkPelindromeForAllFormat(listOfDates) {
    let pelindrome = false;
    for (let index = 0; index < listOfDates.length; index++) {
        const date = listOfDates[index];
        if (isPelindrome(date)) {
            pelindrome = true;
            break
        }

    }
    return pelindrome;
}





function handleButtonClick() {
    console.log("sahsaf ashdfahsf ");
    let input = inputDOB.value;
    console.log(input);

    let dateArray = input.split('-');
    let dateObject = { day: parseInt(dateArray[2]), month: parseInt(dateArray[1]), year: parseInt(dateArray[0]) };
    let dateString = getDateStringObject(dateObject);
    let formatedDateList = getDateStringInAllFormat(dateString);
    let isPelindrome = checkPelindromeForAllFormat(formatedDateList);

    if (isPelindrome) {
        imgLoading.style.display = "none"
        messageText.style.display = "block"
        messageText.innerHTML = "Your birthday is palindrome!"
    } else {
        imgLoading.style.display = "none"
        let [daysNext, dateNext] = getNextPalindromeDate(dateObject)
        let [daysPrev, datePrev] = getPreviousPalindromeDate(dateObject)

        if (daysPrev >= daysNext) {
            messageText.style.display = "block"
            messageText.innerHTML = `The nearest palindrome date is ${dateNext.day}-${dateNext.month}-${dateNext.year}, you missed by ${daysNext} days.`
        } else {
            messageText.style.display = "block"
            messageText.innerHTML = `The nearest palindrome date is ${datePrev.day}-${datePrev.month}-${datePrev.year}, you missed by ${daysPrev} days.`
        }

    }

}



buttonCheck.addEventListener('click', () => {
    imgLoading.style.display = "block"
    messageText.style.display = "none"
    if (inputDOB.value === undefined || inputDOB.value === "") {
        imgLoading.style.display = "none"
        messageText.style.display = "block"
        messageText.innerHTML = "Pick Your birthday"
    } else {
        setTimeout(() => {
            handleButtonClick()
        }, 2000);
    }
})
