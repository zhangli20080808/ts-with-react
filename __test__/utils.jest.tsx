import { sum } from "../src/utils/util";
// 表示分组
describe("sum", () => {
  // 定义一个单元测试
  test("1+1 ", () => {
    expect(sum).toBe(2);
  });
});
