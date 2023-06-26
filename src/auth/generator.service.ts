import { Injectable } from "@nestjs/common";

@Injectable()
export class accountGenerator {
    accountnumberGenerator():string {
        const numberLength = 10;
        const minLength = Math.pow(10, length - 1);
        const maxLength = Math.pow(10, length) - 1;
        const accountNumbers = new Set<string>();

    while (accountNumbers.size < length) {
      const randomNumber = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
      accountNumbers.add(randomNumber.toString().padStart(length, '0'));
    }

    const result =  Array.from(accountNumbers)[0];
    console.log(result)
    return result;
    }
}