function calculator(string) {
  const roman_dict = {"M": 1000, "D": 500, "C": 100, "L": 50, "X": 10, "V": 5, "I": 1};
  const roman_validator = /^[IVXLCDM]*\s[+*/-]\s[IVXLCDM]*$/;
  const arab_validator = /^\d*\s[+*/-]\s\d*$/;
  const division_zero = /^\d*\s[/]\s0/;
  const other_principles = /(^[1|I|X]\s[+]\s[1|I|X][1|I]$)|(^[1|I|X][1|I]\s[+]\s[1|I|X]$)|(^[1]\s[+]\s[0]$)|(^[0]\s[+]\s[1]$)/
  
  if(!(arab_validator.test(string) || roman_validator.test(string)) || 
     division_zero.test(string) || other_principles.test(string)  
    ) {
    throw new Error('Unsupported expression!');
  }

  if(arab_validator.test(string)) {
    return String(parseInt(eval(string)));
  } else {
    let [a, s, b] = string.split(' ');
    console.log([a, s, b]);
    console.log([converter(a), s, converter(b)]);
    return converter(eval([converter(a), s, converter(b)].join('')));
  }

  function converter(number) {
    if(parseInt(number)) {
      let res = ''
      for (const [key, value] of Object.entries(roman_dict)) {
        if((number > 4 && value % number != value)) {
          res = res + key;
          number = number - value;
        } else {
          switch (number) {
            case 1:
              res = res + 'I';
              number = number - 1;
            case 2:
              res = res + 'II';
              number = number - 2;
            case 3:
              res = res + 'III';
              number = number - 3;
            case 4:
              res = res + 'IV';
              number = number - 4;
          }
          break;
        }
      };
      return res;
    } else {
      roman_to_arabic(number)
    }
  }

  function arabic_to_roman(number) {
    let r = ''
    let res = {};
    for (const [key, value] of Object.entries(roman)) {
        let e = num % value;
        if(e < value && e != num && num > 4) {
          let h = escalate(num, value, e);
          num = num - h;
            r = r + key;
        } else {
            r = r + "+";
        }
    }
    return r;

    function escalate(num, val, e) {
      let x = num - e / val
    }
  }

  function roman_to_arabic(number) {
    let numbers = number.split('').map(n => roman_dict[n]);
    let result = numbers.reduce( (accumulator, currentValue, currentIndex) => {
      if(currentIndex > 0) {
        if(currentValue > numbers[currentIndex - 1]) {
          accumulator = currentValue - accumulator;
        } else {
          accumulator = accumulator + currentValue;
        }
      } else {
        accumulator = currentValue;
      }
      return accumulator;
    });
    return result;
  }
}


module.exports = calculator; // Не трогайте эту строчку