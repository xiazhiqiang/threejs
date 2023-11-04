import { getQuery } from "./utils/query";

const { q } = getQuery();

if (q) {
  try {
    // 根据参数，动态引用文件运行
    await import(`./${q}`);
  } catch (e) {}
}
