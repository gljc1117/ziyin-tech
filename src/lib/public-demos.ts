// Explicit public presentation list. Uploading a COS model does not publish it here.
export interface PublicDemo {
  id: string;
  title: string;
  department: string;
  organ: string;
  summary: string;
}
export const PUBLIC_DEMOS: PublicDemo[] = [
  {
    id: "lung-case", title: "肺部三维重建演示", department: "胸部影像", organ: "lung",
    summary: "交互查看肺部结构的分色、旋转与显隐，了解三维模型的展示方式。",
  },
  {
    id: "fullbody", title: "多器官三维重建演示", department: "多器官影像", organ: "multi",
    summary: "交互查看多个器官的空间关系，了解模型展示与医工沟通流程。",
  },
];
export function getPublicDemo(id: string) {
  return PUBLIC_DEMOS.find((item) => item.id === id);
}
