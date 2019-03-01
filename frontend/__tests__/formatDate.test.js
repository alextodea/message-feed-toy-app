import {formatDate} from "../src/helpers/common";

describe("test formatDate function",() =>{
  it("should be a string",()=>{
    const date = new Date();
    expect(typeof formatDate(date)).toEqual("string");
  })
})